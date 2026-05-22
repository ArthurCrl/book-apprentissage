// =============================================================================
// SOLAR SYSTEM 3D — React Three Fiber
// Lazy-loaded (client only). Gère le zoom sur planète et le panneau d'info.
// =============================================================================
import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Html, Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { semestersData, type SemesterData, type Moon } from '#/data/semesters'
import CockpitOverlay from './CockpitOverlay'
import InfoPanel from './InfoPanel'
import WarpEffect from './WarpEffect'

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------
const DEFAULT_CAM_POS = new THREE.Vector3(0, 18, 14)
const DEFAULT_LOOKAT = new THREE.Vector3(0, 0, 0)

const sharedTimer = new THREE.Timer()

type CameraTarget = { pos: THREE.Vector3; look: THREE.Vector3 } | null
type WarpData = { pullback: THREE.Vector3; look: THREE.Vector3 } | null

function toRad(deg: number) {
  return deg * (Math.PI / 180)
}

// ---------------------------------------------------------------------------
// Soleil
// ---------------------------------------------------------------------------
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08
  })
  return (
    <group>
      <pointLight intensity={12} distance={70} color="#FFB300" decay={1.5} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF6B00"
          emissiveIntensity={2.5}
          roughness={1}
          metalness={0}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#FFB300"
          emissive="#FFB300"
          emissiveIntensity={0.6}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      <Html
        center
        style={{ pointerEvents: 'none' }}
        position={[0, 1.5, 0]}
      >
        <div style={{
          fontFamily: "'Orbitron', monospace",
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 900,
          textShadow: '0 0 10px #FFD54F, 0 0 22px #FFA500',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          letterSpacing: '0.08em',
          lineHeight: 1.4,
        }}>
          LA POSTE<br />× POLYTECH
        </div>
      </Html>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Lune
// ---------------------------------------------------------------------------
function MoonMesh({ moon }: Readonly<{ moon: Moon }>) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!meshRef.current) return
    const angle = sharedTimer.getElapsed() * moon.orbitSpeed + moon.angleOffset
    meshRef.current.position.x = Math.cos(angle) * moon.orbitRadius
    meshRef.current.position.z = Math.sin(angle) * moon.orbitRadius
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[moon.size, 12, 12]} />
      <meshStandardMaterial
        color={moon.color || '#aaaaaa'}
        emissive={moon.color || '#aaaaaa'}
        emissiveIntensity={0.25}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// Anneau d'orbite
// ---------------------------------------------------------------------------
function OrbitRing({ radius, color }: Readonly<{ radius: number; color: string }>) {
  const points = useMemo<THREE.Vector3[]>(() => {
    return Array.from({ length: 129 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    })
  }, [radius])
  return <Line points={points} color={color} lineWidth={0.6} transparent opacity={0.18} />
}

// ---------------------------------------------------------------------------
// Planète
// ---------------------------------------------------------------------------
interface PlanetProps {
  semester: SemesterData
  onSelect: (semester: SemesterData, worldPos: THREE.Vector3) => void
  onHover: (semester: SemesterData | null) => void
  isSelected: boolean
  externallyHovered: boolean
}

function Planet({ semester, onSelect, onHover, isSelected, externallyHovered }: Readonly<PlanetProps>) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const effectiveHovered = hovered || externallyHovered
  const frozenAngleRef = useRef<number | null>(null)
  const orbitSpeed = useMemo(
    () => (Math.PI * 2) / semester.orbitDuration,
    [semester.orbitDuration],
  )
  const angleStart = useMemo(
    () => toRad(semester.orbitAngleStart),
    [semester.orbitAngleStart],
  )

  useFrame(() => {
    if (!groupRef.current) return
    if (isSelected) {
      if (frozenAngleRef.current === null) {
        frozenAngleRef.current = sharedTimer.getElapsed() * orbitSpeed + angleStart
      }
    } else {
      frozenAngleRef.current = null
    }
    const angle =
      frozenAngleRef.current ?? sharedTimer.getElapsed() * orbitSpeed + angleStart
    groupRef.current.position.x = Math.cos(angle) * semester.orbitRadius3D
    groupRef.current.position.z = Math.sin(angle) * semester.orbitRadius3D
    if (meshRef.current) meshRef.current.rotation.y += 0.004
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        scale={isSelected ? 1.6 : effectiveHovered ? 1.3 : 1}
        onClick={(e) => {
          e.stopPropagation()
          if (groupRef.current) onSelect(semester, groupRef.current.position.clone())
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (!isSelected) { setHovered(true); document.body.style.cursor = 'pointer' }
          onHover(semester)
        }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; onHover(null) }}
      >
        <sphereGeometry args={[semester.size3D, 32, 32]} />
        <meshStandardMaterial
          color={semester.color}
          emissive={semester.color}
          emissiveIntensity={isSelected ? 2.2 : effectiveHovered ? 1.4 : 0.7}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>

      {(effectiveHovered || isSelected) && (
        <mesh>
          <sphereGeometry args={[semester.size3D * (isSelected ? 2.4 : 1.7), 24, 24]} />
          <meshStandardMaterial
            color={semester.color}
            emissive={semester.color}
            emissiveIntensity={0.4}
            transparent
            opacity={isSelected ? 0.22 : 0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {!isSelected && (
        <Html
          center
          distanceFactor={14}
          style={{ pointerEvents: 'none' }}
          position={[0, semester.size3D + 0.18, 0]}
        >
          <div style={{
            fontFamily: "'Orbitron', monospace",
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 900,
            textShadow: `0 0 10px ${semester.color}, 0 0 22px ${semester.color}`,
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
          }}>
            {semester.label}
          </div>
        </Html>
      )}

      {effectiveHovered && !isSelected && (
        <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(5,5,22,0.93)',
            border: `1px solid ${semester.color}`,
            borderRadius: '10px',
            padding: '10px 14px',
            color: 'white',
            fontFamily: "'Orbitron', monospace",
            whiteSpace: 'nowrap',
            textAlign: 'center',
            boxShadow: `0 0 24px ${semester.color}50`,
            transform: 'translateY(-70px)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ color: semester.color, fontWeight: 900, fontSize: '16px', letterSpacing: '0.1em' }}>
              {semester.label}
            </div>
            <div style={{ color: 'rgba(200,220,255,0.85)', fontSize: '10px', marginTop: '3px', fontFamily: "'Exo 2', sans-serif" }}>
              {semester.period}
            </div>
            <div style={{ color: 'rgba(200,220,255,0.35)', fontSize: '8px', marginTop: '5px', fontFamily: 'monospace' }}>
              cliquer pour explorer →
            </div>
          </div>
        </Html>
      )}

      {semester.moons.map((moon) => (
        <MoonMesh key={moon.name} moon={moon} />
      ))}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Timer partagé (mis à jour une seule fois par frame)
// ---------------------------------------------------------------------------
function TimerUpdater() {
  useFrame(() => {
    sharedTimer.update()
  })
  return null
}

// ---------------------------------------------------------------------------
// Contrôleur caméra
// ---------------------------------------------------------------------------
function CameraController({
  target,
  warpData,
  controlsEnabled,
}: Readonly<{ target: CameraTarget; warpData: WarpData; controlsEnabled: boolean }>) {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (controlsEnabled) return

    if (!target && warpData) {
      // Phase warp : dézoom + orientation vers la planète
      camera.position.lerp(warpData.pullback, 0.035)
      lookAtRef.current.lerp(warpData.look, 0.09)
      camera.lookAt(lookAtRef.current)
      return
    }

    const destPos = target?.pos ?? DEFAULT_CAM_POS
    const destLook = target?.look ?? DEFAULT_LOOKAT
    camera.position.lerp(destPos, 0.062)
    lookAtRef.current.lerp(destLook, 0.062)
    camera.lookAt(lookAtRef.current)
  })

  return null
}

// ---------------------------------------------------------------------------
// Scène
// ---------------------------------------------------------------------------
interface SceneProps {
  selectedSemester: SemesterData | null
  hoveredSemester: SemesterData | null
  cameraTarget: CameraTarget
  warpData: WarpData
  controlsEnabled: boolean
  controlsRef: React.RefObject<unknown>
  onSelect: (semester: SemesterData, pos: THREE.Vector3) => void
  onHover: (semester: SemesterData | null) => void
}

function Scene({
  selectedSemester,
  hoveredSemester,
  cameraTarget,
  warpData,
  controlsEnabled,
  controlsRef,
  onSelect,
  onHover,
}: Readonly<SceneProps>) {
  return (
    <>
      <Stars radius={120} depth={60} count={5500} factor={4} saturation={0} fade speed={0.8} />
      <ambientLight intensity={0.06} />
      <TimerUpdater />
      <Sun />
      {semestersData.map((semester) => (
        <group key={semester.id}>
          <OrbitRing radius={semester.orbitRadius3D} color={semester.color} />
          <Planet
            semester={semester}
            onSelect={onSelect}
            onHover={onHover}
            isSelected={selectedSemester?.id === semester.id}
            externallyHovered={hoveredSemester?.id === semester.id}
          />
        </group>
      ))}
      <CameraController target={cameraTarget} warpData={warpData} controlsEnabled={controlsEnabled} />
      <OrbitControls
        ref={controlsRef as React.RefObject<null>}
        enabled={controlsEnabled}
        enablePan={false}
        minDistance={6}
        maxDistance={30}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Composant principal exporté
// ---------------------------------------------------------------------------
export default function SolarSystem3D() {
  const [selectedSemester, setSelectedSemester] = useState<SemesterData | null>(null)
  const [panelSemester, setPanelSemester] = useState<SemesterData | null>(null)
  const [hoveredSemester, setHoveredSemester] = useState<SemesterData | null>(null)
  const [cameraTarget, setCameraTarget] = useState<CameraTarget>(null)
  const [warpData, setWarpData] = useState<WarpData>(null)
  const [controlsEnabled, setControlsEnabled] = useState(true)
  const [warpTrigger, setWarpTrigger] = useState(0)
  const controlsRef = useRef(null)
  const deselectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warpTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearWarpTimers() {
    for (const t of warpTimersRef.current) clearTimeout(t)
    warpTimersRef.current = []
  }

  const handleSelect = useCallback((semester: SemesterData, worldPos: THREE.Vector3) => {
    if (deselectionTimerRef.current) {
      clearTimeout(deselectionTimerRef.current)
      deselectionTimerRef.current = null
    }
    clearWarpTimers()
    const dir = worldPos.clone().normalize()
    const camPos = new THREE.Vector3(
      dir.x * Math.max(1.8, worldPos.length() - 3.5),
      2.8,
      dir.z * Math.max(1.8, worldPos.length() - 3.5),
    )
    const pullback = new THREE.Vector3(0, 28, 22)
    setControlsEnabled(false)
    setSelectedSemester(semester)
    setPanelSemester(null)
    setCameraTarget(null)
    setWarpData({ pullback, look: worldPos.clone() })
    setWarpTrigger((t) => t + 1)
    warpTimersRef.current.push(
      setTimeout(() => {
        setCameraTarget({ pos: camPos, look: worldPos.clone() })
        setWarpData(null)
      }, 1700),
      setTimeout(() => setPanelSemester(semester), 2600),
    )
  }, [])

  const handleSelectBySemester = useCallback((semester: SemesterData) => {
    if (deselectionTimerRef.current) {
      clearTimeout(deselectionTimerRef.current)
      deselectionTimerRef.current = null
    }
    clearWarpTimers()
    const orbitSpeed = (Math.PI * 2) / semester.orbitDuration
    const angleStart = toRad(semester.orbitAngleStart)
    const angle = sharedTimer.getElapsed() * orbitSpeed + angleStart
    const worldPos = new THREE.Vector3(
      Math.cos(angle) * semester.orbitRadius3D,
      0,
      Math.sin(angle) * semester.orbitRadius3D,
    )
    const dir = worldPos.clone().normalize()
    const camPos = new THREE.Vector3(
      dir.x * Math.max(1.8, worldPos.length() - 3.5),
      2.8,
      dir.z * Math.max(1.8, worldPos.length() - 3.5),
    )
    const pullback = new THREE.Vector3(0, 28, 22)
    setControlsEnabled(false)
    setSelectedSemester(semester)
    setPanelSemester(null)
    setCameraTarget(null)
    setWarpData({ pullback, look: worldPos.clone() })
    setWarpTrigger((t) => t + 1)
    warpTimersRef.current.push(
      setTimeout(() => {
        setCameraTarget({ pos: camPos, look: worldPos.clone() })
        setWarpData(null)
      }, 1700),
      setTimeout(() => setPanelSemester(semester), 2600),
    )
  }, [])

  const handleDeselect = useCallback(() => {
    if (!selectedSemester) return
    clearWarpTimers()
    setSelectedSemester(null)
    setPanelSemester(null)
    setCameraTarget(null)
    setWarpData(null)
    deselectionTimerRef.current = setTimeout(() => {
      setControlsEnabled(true)
      if (controlsRef.current) {
        // biome-ignore lint/suspicious/noExplicitAny: OrbitControls API
        const ctrl = controlsRef.current as any
        ctrl.target.set(0, 0, 0)
        ctrl.update()
      }
    }, 1300)
  }, [selectedSemester])

  useEffect(() => {
    return () => {
      if (deselectionTimerRef.current) clearTimeout(deselectionTimerRef.current)
      clearWarpTimers()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 18, 14], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{ background: '#050510', position: 'absolute', inset: 0 }}
        onPointerMissed={handleDeselect}
      >
        <Scene
          selectedSemester={selectedSemester}
          hoveredSemester={hoveredSemester}
          cameraTarget={cameraTarget}
          warpData={warpData}
          controlsEnabled={controlsEnabled}
          controlsRef={controlsRef}
          onSelect={handleSelect}
          onHover={setHoveredSemester}
        />
      </Canvas>

      <CockpitOverlay
        hoveredSemester={hoveredSemester}
        onHover={setHoveredSemester}
        onSelect={handleSelectBySemester}
      />
      <WarpEffect trigger={warpTrigger} />
      <InfoPanel semester={panelSemester} onClose={handleDeselect} />
    </div>
  )
}

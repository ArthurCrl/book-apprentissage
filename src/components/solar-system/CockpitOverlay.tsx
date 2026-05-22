// =============================================================================
// COCKPIT OVERLAY — Illusion d'être dans un vaisseau spatial
// =============================================================================
import { useEffect, useState } from 'react'
import { semestersData, type SemesterData } from '#/data/semesters'

// ---------------------------------------------------------------------------
// Horloge / coordonnées dynamiques
// ---------------------------------------------------------------------------
function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------
export default function CockpitOverlay({
  hoveredSemester,
  onHover,
  onSelect,
}: Readonly<{
  hoveredSemester?: SemesterData | null
  onHover?: (semester: SemesterData | null) => void
  onSelect?: (semester: SemesterData) => void
}>) {
  const now = useClock()
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`

  // Fausse "vitesse" qui oscille légèrement
  const [speed, setSpeed] = useState(2847)
  useEffect(() => {
    const id = setInterval(() => {
      setSpeed((s) => s + Math.floor(Math.random() * 11) - 5)
    }, 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* ── Vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,4,20,0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Grille holographique subtile ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(79,195,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Cadre cockpit haut-gauche ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '220px',
          height: '220px',
          borderTop: '2px solid rgba(79,195,247,0.45)',
          borderLeft: '2px solid rgba(79,195,247,0.45)',
          borderTopLeftRadius: '4px',
          boxShadow: 'inset 2px 2px 20px rgba(79,195,247,0.08)',
        }}
      />
      {/* Coin décoration haut-gauche */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '12px',
          height: '12px',
          border: '1px solid rgba(79,195,247,0.7)',
          borderRadius: '2px',
        }}
      />

      {/* ── Cadre cockpit haut-droit ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '220px',
          height: '220px',
          borderTop: '2px solid rgba(79,195,247,0.45)',
          borderRight: '2px solid rgba(79,195,247,0.45)',
          borderTopRightRadius: '4px',
          boxShadow: 'inset -2px 2px 20px rgba(79,195,247,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '12px',
          height: '12px',
          border: '1px solid rgba(79,195,247,0.7)',
          borderRadius: '2px',
        }}
      />

      {/* ── Cadre cockpit bas-gauche ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '220px',
          height: '220px',
          borderBottom: '2px solid rgba(79,195,247,0.45)',
          borderLeft: '2px solid rgba(79,195,247,0.45)',
          borderBottomLeftRadius: '4px',
          boxShadow: 'inset 2px -2px 20px rgba(79,195,247,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          width: '12px',
          height: '12px',
          border: '1px solid rgba(79,195,247,0.7)',
          borderRadius: '2px',
        }}
      />

      {/* ── Cadre cockpit bas-droit ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '220px',
          height: '220px',
          borderBottom: '2px solid rgba(79,195,247,0.45)',
          borderRight: '2px solid rgba(79,195,247,0.45)',
          borderBottomRightRadius: '4px',
          boxShadow: 'inset -2px -2px 20px rgba(79,195,247,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          width: '12px',
          height: '12px',
          border: '1px solid rgba(79,195,247,0.7)',
          borderRadius: '2px',
        }}
      />

      {/* ── Barre haut centre ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          padding: '12px 32px 20px',
          borderLeft: '1px solid rgba(79,195,247,0.3)',
          borderRight: '1px solid rgba(79,195,247,0.3)',
          borderBottom: '1px solid rgba(79,195,247,0.3)',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          background:
            'linear-gradient(to bottom, rgba(0,4,20,0.7), rgba(0,4,20,0.2))',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: 'rgba(79,195,247,0.5)',
            textTransform: 'uppercase',
          }}
        >
          SYSTÈME SOLAIRE — LA POSTE × POLYTECH
        </div>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '16px',
            fontWeight: 900,
            letterSpacing: '0.15em',
            color: '#4FC3F7',
            textShadow: '0 0 16px rgba(79,195,247,0.8)',
          }}
        >
          PORTFOLIO v2026
        </div>
      </div>

      {/* ── Panel HUD gauche ── */}
      <HudPanel side="left">
        <HudRow label="DATE" value={dateStr} />
        <HudRow label="HEURE" value={timeStr} accent />
        <HudSep />
        <HudRow label="POSITION" value="α 04h 35m" />
        <HudRow label="DÉCL." value="−16° 30'" />
        <HudSep />
        <HudRow label="VITESSE" value={`${speed.toLocaleString()} km/s`} accent />
        <HudRow label="ALTITUDE" value="1.4 AU" />
        <HudSep />
        <HudRow label="CARBURANT" value="██████░ 87%" />
        <HudRow label="BOUCLIER" value="████████ 100%" accent />
      </HudPanel>

      {/* ── Panel HUD droit ── */}
      <HudPanel side="right">
        <HudRow label="SYSTÈMES" value="NOMINAL" accent />
        <HudRow label="PROPULSION" value="ACTIVE" />
        <HudSep />
        {semestersData.map((sem, i) => (
          <HudRow
            key={sem.id}
            label={sem.label}
            value={`${sem.orbitRadius3D.toFixed(1)} AU`}
            accent={i === semestersData.length - 1}
            highlightColor={hoveredSemester?.id === sem.id ? sem.color : undefined}
            onClick={() => onSelect?.(sem)}
            onMouseEnter={() => onHover?.(sem)}
            onMouseLeave={() => onHover?.(null)}
          />
        ))}
        <HudSep />
        <HudRow label="ASTRES" value="6 planètes · 24 lunes" />
      </HudPanel>

      {/* ── Réticule centre ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          pointerEvents: 'none',
        }}
      >
        {/* Croix fine */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(79,195,247,0.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(79,195,247,0.35)',
          }}
        />
        {/* Cercle */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '1px solid rgba(79,195,247,0.4)',
          }}
        />
        {/* Point central */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'rgba(79,195,247,0.8)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* ── Barre bas centre (contrôles) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 28px 14px',
          borderLeft: '1px solid rgba(79,195,247,0.3)',
          borderRight: '1px solid rgba(79,195,247,0.3)',
          borderTop: '1px solid rgba(79,195,247,0.3)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          background:
            'linear-gradient(to top, rgba(0,4,20,0.7), rgba(0,4,20,0.2))',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {[
          { key: 'CLIC', action: 'Explorer planète' },
          { key: 'DRAG', action: 'Orienter' },
          { key: 'SCROLL', action: 'Zoom' },
        ].map(({ key, action }) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Orbitron', monospace",
              fontSize: '9px',
            }}
          >
            <span
              style={{
                padding: '2px 6px',
                border: '1px solid rgba(79,195,247,0.5)',
                borderRadius: '3px',
                color: '#4FC3F7',
                letterSpacing: '0.08em',
                background: 'rgba(79,195,247,0.08)',
              }}
            >
              {key}
            </span>
            <span style={{ color: 'rgba(200,220,255,0.4)', letterSpacing: '0.06em' }}>
              {action}
            </span>
          </div>
        ))}
      </div>

      {/* ── Scanline subtile (effet CRT) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sous-composants HUD
// ---------------------------------------------------------------------------
function HudPanel({
  side,
  children,
}: Readonly<{ side: 'left' | 'right'; children: React.ReactNode }>) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [side]: '18px',
        width: '190px',
        padding: '16px',
        background: 'rgba(0,4,20,0.65)',
        border: '1px solid rgba(79,195,247,0.25)',
        borderRadius: '8px',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 0 30px rgba(79,195,247,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {children}
    </div>
  )
}

function HudRow({
  label,
  value,
  accent,
  highlightColor,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Readonly<{
  label: string
  value: string
  accent?: boolean
  highlightColor?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}>) {
  const interactive = !!(onClick || onMouseEnter)
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '8px',
        fontFamily: "'Orbitron', monospace",
        fontSize: highlightColor ? '10px' : '8.5px',
        letterSpacing: highlightColor ? '0.12em' : '0.06em',
        fontWeight: highlightColor ? 900 : 400,
        padding: highlightColor ? '3px 6px' : (interactive ? '2px 4px' : '0 0'),
        borderRadius: highlightColor ? '4px' : (interactive ? '3px' : '0'),
        background: highlightColor ? `${highlightColor}18` : 'transparent',
        border: highlightColor ? `1px solid ${highlightColor}55` : '1px solid transparent',
        boxShadow: highlightColor ? `0 0 12px ${highlightColor}40, inset 0 0 8px ${highlightColor}10` : 'none',
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{
        color: highlightColor ?? 'rgba(200,220,255,0.35)',
        flexShrink: 0,
        textShadow: highlightColor ? `0 0 10px ${highlightColor}, 0 0 20px ${highlightColor}` : 'none',
        transition: 'all 0.2s ease',
      }}>
        {label}
      </span>
      <span
        style={{
          color: highlightColor ?? (accent ? '#4FC3F7' : 'rgba(200,220,255,0.75)'),
          textShadow: highlightColor
            ? `0 0 10px ${highlightColor}, 0 0 20px ${highlightColor}`
            : (accent ? '0 0 8px rgba(79,195,247,0.6)' : 'none'),
          textAlign: 'right',
          fontVariantNumeric: 'tabular-nums',
          transition: 'all 0.2s ease',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function HudSep() {
  return (
    <div
      style={{
        height: '1px',
        background: 'rgba(79,195,247,0.15)',
        margin: '2px 0',
      }}
    />
  )
}

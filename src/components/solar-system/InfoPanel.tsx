import { useState, useEffect } from 'react'
import type { SemesterData } from '#/data/semesters'

type Tab = 'entreprise' | 'ecole' | 'missions'

interface InfoPanelProps {
  semester: SemesterData | null
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Sous-composant carte
// ---------------------------------------------------------------------------
function Card({
  title,
  color,
  children,
}: Readonly<{ title: string; color: string; children: React.ReactNode }>) {
  return (
    <div
      style={{
        background: 'rgba(200,220,255,0.04)',
        border: `1px solid ${color}22`,
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color,
          opacity: 0.8,
          marginBottom: '10px',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------
function Tag({ label, color }: Readonly<{ label: string; color: string }>) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: '4px',
        border: `1px solid ${color}55`,
        color,
        fontSize: '10px',
        fontFamily: "'Orbitron', monospace",
        background: `${color}12`,
        margin: '2px',
      }}
    >
      {label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------
export default function InfoPanel({ semester, onClose }: Readonly<InfoPanelProps>) {
  const [activeTab, setActiveTab] = useState<Tab>('entreprise')
  const [selectedMission, setSelectedMission] = useState<number | null>(null)

  // Réinitialise l'onglet à chaque changement de planète
  useEffect(() => {
    setActiveTab('entreprise')
    setSelectedMission(null)
  }, [semester?.id])

  const isOpen = semester !== null
  const color = semester?.color ?? '#4FC3F7'

  const tabs: { key: Tab; label: string }[] = [
    { key: 'entreprise', label: 'MISSION' },
    { key: 'ecole', label: 'ÉCOLE' },
    { key: 'missions', label: 'PROJETS' },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '540px',
        height: '100%',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(3, 3, 18, 0.92)',
        borderLeft: `1px solid ${color}28`,
        backdropFilter: 'blur(14px)',
        overflow: 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Halo ambiant */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: color,
          filter: 'blur(80px)',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {semester && (
        <>
          {/* ── En-tête ── */}
          <div
            style={{
              padding: '18px 18px 0',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Ligne titre + fermer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '20px',
                    fontWeight: 900,
                    color,
                    letterSpacing: '0.08em',
                    textShadow: `0 0 20px ${color}60`,
                  }}
                >
                  SEMESTRE {semester.label}
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid rgba(200,220,255,0.18)',
                  borderRadius: '6px',
                  color: 'rgba(200,220,255,0.45)',
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '9px',
                  padding: '5px 10px',
                  letterSpacing: '0.06em',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color
                  e.currentTarget.style.color = color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(200,220,255,0.18)'
                  e.currentTarget.style.color = 'rgba(200,220,255,0.45)'
                }}
              >
                ✕ FERMER
              </button>
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(200,220,255,0.55)',
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              {semester.period} · {semester.entreprise.name}
            </div>

            {/* Lunes / technologies */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                marginTop: '10px',
                marginBottom: '4px',
              }}
            >
              {semester.moons.map((moon) => (
                <span
                  key={moon.name}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '3px',
                    border: `1px solid ${moon.color}55`,
                    color: moon.color,
                    fontSize: '9px',
                    fontFamily: "'Orbitron', monospace",
                    background: `${moon.color}12`,
                  }}
                >
                  {moon.name}
                </span>
              ))}
            </div>
          </div>

          {/* ── Onglets ── */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              padding: '12px 18px 10px',
              flexShrink: 0,
              borderBottom: `1px solid ${color}15`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setSelectedMission(null)
                }}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '8px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  background:
                    activeTab === tab.key
                      ? color
                      : 'rgba(200,220,255,0.05)',
                  color:
                    activeTab === tab.key
                      ? '#050510'
                      : 'rgba(200,220,255,0.35)',
                  boxShadow:
                    activeTab === tab.key
                      ? `0 0 12px ${color}50`
                      : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Contenu défilant ── */}
          <div
            className="panel-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 18px 20px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* ——— MISSION ——— */}
            {activeTab === 'entreprise' && (
              <>
                <Card title="À PROPOS" color={color}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: 1.7,
                      color: 'rgba(200,220,255,0.75)',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {semester.entreprise.description}
                  </p>
                </Card>
                <Card title="ÉQUIPE" color={color}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: 1.7,
                      color: 'rgba(200,220,255,0.75)',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {semester.entreprise.team}
                  </p>
                </Card>
                <Card title="MÉTHODE" color={color}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: 1.7,
                      color: 'rgba(200,220,255,0.75)',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {semester.entreprise.workMethod}
                  </p>
                </Card>
                <Card title="STACK TECHNOLOGIQUE" color={color}>
                  <div>{semester.entreprise.tools.map((t) => <Tag key={t} label={t} color={color} />)}</div>
                </Card>
              </>
            )}

            {/* ——— ÉCOLE ——— */}
            {activeTab === 'ecole' && (
              <>
                <Card title={semester.ecole.name} color={color}>
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '9px',
                      color,
                      marginBottom: '8px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {semester.ecole.formation}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: 1.7,
                      color: 'rgba(200,220,255,0.75)',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {semester.ecole.description}
                  </p>
                </Card>
                <Card title="COMPÉTENCES" color={color}>
                  <div>{semester.ecole.skills.map((s) => <Tag key={s} label={s} color={color} />)}</div>
                </Card>
                <Card title="COURS" color={color}>
                  {semester.ecole.courses.map((c, i) => (
                    <div
                      key={c.name}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: i < semester.ecole.courses.length - 1 ? '12px' : 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: '9px',
                          color,
                          opacity: 0.4,
                          flexShrink: 0,
                          paddingTop: '1px',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: '9px',
                            fontWeight: 700,
                            color: 'rgba(200,220,255,0.85)',
                            marginBottom: '3px',
                          }}
                        >
                          {c.name}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'rgba(200,220,255,0.5)',
                            lineHeight: 1.5,
                            fontFamily: "'Exo 2', sans-serif",
                          }}
                        >
                          {c.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              </>
            )}

            {/* ——— PROJETS ——— */}
            {activeTab === 'missions' && selectedMission === null && (
              <div>
                {semester.missions.map((mission, i) => (
                  <button
                    key={mission.title}
                    onClick={() => setSelectedMission(i)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'rgba(200,220,255,0.04)',
                      border: `1px solid ${color}28`,
                      borderRadius: '8px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      marginBottom: '10px',
                      color: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${color}10`
                      e.currentTarget.style.borderColor = `${color}65`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(200,220,255,0.04)'
                      e.currentTarget.style.borderColor = `${color}28`
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: '10px',
                          fontWeight: 700,
                          color: 'rgba(200,220,255,0.85)',
                          flex: 1,
                        }}
                      >
                        {mission.title}
                      </span>
                      <span
                        style={{
                          padding: '2px 7px',
                          borderRadius: '3px',
                          fontSize: '8px',
                          fontFamily: "'Orbitron', monospace",
                          fontWeight: 700,
                          background:
                            mission.status === 'completed'
                              ? 'rgba(129,199,132,0.18)'
                              : 'rgba(79,195,247,0.18)',
                          color:
                            mission.status === 'completed' ? '#81C784' : '#4FC3F7',
                          border:
                            mission.status === 'completed'
                              ? '1px solid rgba(129,199,132,0.4)'
                              : '1px solid rgba(79,195,247,0.4)',
                          flexShrink: 0,
                        }}
                      >
                        {mission.status === 'completed' ? 'TERMINÉ' : 'EN COURS'}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '11px',
                        color: 'rgba(200,220,255,0.45)',
                        lineHeight: 1.5,
                        fontFamily: "'Exo 2', sans-serif",
                      }}
                    >
                      {mission.description.length > 90
                        ? `${mission.description.slice(0, 90)}…`
                        : mission.description}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'missions' && selectedMission !== null && (() => {
              const mission = semester.missions[selectedMission]
              return (
                <>
                  <button
                    onClick={() => setSelectedMission(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(200,220,255,0.4)',
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      padding: '0 0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = color }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(200,220,255,0.4)' }}
                  >
                    ← TOUS LES PROJETS
                  </button>
                  <Card title={mission.title} color={color}>
                    <p
                      style={{
                        margin: '0 0 12px',
                        fontSize: '12px',
                        lineHeight: 1.7,
                        color: 'rgba(200,220,255,0.75)',
                        fontFamily: "'Exo 2', sans-serif",
                      }}
                    >
                      {mission.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(200,220,255,0.4)',
                          fontFamily: "'Exo 2', sans-serif",
                        }}
                      >
                        {mission.duration}
                      </span>
                      <span
                        style={{
                          padding: '2px 7px',
                          borderRadius: '3px',
                          fontSize: '8px',
                          fontFamily: "'Orbitron', monospace",
                          fontWeight: 700,
                          background:
                            mission.status === 'completed'
                              ? 'rgba(129,199,132,0.18)'
                              : 'rgba(79,195,247,0.18)',
                          color:
                            mission.status === 'completed' ? '#81C784' : '#4FC3F7',
                          border:
                            mission.status === 'completed'
                              ? '1px solid rgba(129,199,132,0.4)'
                              : '1px solid rgba(79,195,247,0.4)',
                        }}
                      >
                        {mission.status === 'completed' ? 'TERMINÉ' : 'EN COURS'}
                      </span>
                    </div>
                  </Card>
                  <Card title="TECHNOLOGIES" color={color}>
                    <div>
                      {mission.technologies.map((t) => (
                        <Tag key={t} label={t} color={color} />
                      ))}
                    </div>
                  </Card>
                </>
              )
            })()}
          </div>
        </>
      )}
    </div>
  )
}

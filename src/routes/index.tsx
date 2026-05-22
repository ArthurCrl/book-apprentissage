import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const SolarSystem3D = lazy(
  () => import('#/components/solar-system/SolarSystem3D'),
)

export const Route = createFileRoute('/')({
  component: SolarSystemPage,
})

function SolarSystemPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050510' }}>
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#050510',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Orbitron', monospace",
              color: 'rgba(200, 220, 255, 0.4)',
              fontSize: '12px',
              letterSpacing: '0.2em',
            }}
          >
            INITIALISATION DU SYSTÈME SOLAIRE…
          </div>
        }
      >
        <SolarSystem3D />
      </Suspense>
    </div>
  )
}


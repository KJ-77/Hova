import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import ClassicBox3D from './ClassicBox3D.jsx'

/*
 * Scroll-driven hero sequence (pinned over ~2 viewport-heights of scroll):
 *   phase 0 — chocolate-pour video + HOVA logo, no 3D
 *   phase 1 — the Classic Box rises in, spinning slowly
 *   phase 2 — the box tips toward the camera and the lid opens,
 *             revealing the tray of 35 gold-wrapped pralines
 * `p` is scrollY / (2 * viewport height), clamped to 0..1.
 */

const seg = (p, a, b) => THREE.MathUtils.clamp((p - a) / (b - a), 0, 1)
const ease = (t) => t * t * (3 - 2 * t)

function HeroScene({ p, compact }) {
  const rig = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!rig.current) return
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointer.current.x * 0.35, 2.5, delta)
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, pointer.current.y * 0.15, 2.5, delta)
  })

  const enter = ease(seg(p, 0.16, 0.45)) // box rises in
  const open = ease(seg(p, 0.52, 0.88)) // lid opens
  const baseScale = compact ? 0.52 : 0.8

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.6, 6]} fov={38} />
      <ambientLight intensity={0.35 + 0.3 * enter} />
      <directionalLight position={[4, 6, 3]} intensity={1.6 + 0.9 * enter} color="#fff3d6" />
      <pointLight position={[-5, 2, -2]} intensity={18} color="#c9a557" />
      <pointLight position={[0, -3, 4]} intensity={6} color="#8a7238" />
      {/* extra warm light overhead so the gold foil sparkles once the lid opens */}
      <pointLight position={[0, 4, 2]} intensity={10 * open} color="#ffdf9e" />

      <group ref={rig}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          {/* once open, the box lifts and shrinks a little to clear room for the caption */}
          <group
            scale={baseScale * (0.55 + 0.45 * enter) * (1 - (compact ? 0.22 : 0.14) * open)}
            position={[0, (compact ? -0.9 : -0.45) - (1 - enter) * 3.2 + open * (compact ? 1.15 : 0.75), 0]}
            rotation={[0.32 + open * 0.36, (1 - enter) * 1.6, 0]}
          >
            <ClassicBox3D open={open} spin={open < 0.02} />
          </group>
        </Float>
      </group>

      <Sparkles count={90} scale={[10, 6, 6]} size={2.2} speed={0.35} color="#e8c877" opacity={0.55} />
    </>
  )
}

export default function Hero3D() {
  const [p, setP] = useState(0)
  const [enabled, setEnabled] = useState(true)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setCompact(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    // the hero section is 300vh tall; the pinned canvas plays over the first 2vh of scroll
    const onScroll = () => setP(Math.min(1, window.scrollY / (window.innerHeight * 2)))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) setEnabled(false)
    } catch {
      setEnabled(false)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <HeroScene p={p} compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  )
}

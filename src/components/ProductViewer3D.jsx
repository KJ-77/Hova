import { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { RotateCcw } from 'lucide-react'
import GiftBox3D from './GiftBox3D.jsx'
import ClassicBox3D from './ClassicBox3D.jsx'

/*
 * 360° product viewer: drag to rotate, tap the box to open/close the lid.
 * The lid animation is eased in useFrame so opening feels weighted, not snappy.
 */

function ViewerScene({ product, open }) {
  const openRef = useRef(0)
  const [, forceRender] = useState(0)

  useFrame((state, delta) => {
    const target = open ? 1 : 0
    const next = THREE.MathUtils.damp(openRef.current, target, 4, delta)
    if (Math.abs(next - openRef.current) > 0.0005) {
      openRef.current = next
      forceRender((n) => n + 1)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[3.2, 2.4, 4.6]} fov={35} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 7, 4]} intensity={1.7} color="#fff3d6" />
      <pointLight position={[-4, 3, -3]} intensity={14} color="#c9a557" />
      <pointLight position={[2, -2, 5]} intensity={5} color="#8a7238" />

      <group position={[0, -0.3, 0]}>
        {product.slug === 'classic-box' ? (
          <ClassicBox3D open={openRef.current} spin={false} />
        ) : (
          <GiftBox3D boxStyle={product.boxStyle} open={openRef.current} spin={false} />
        )}
        <ContactShadows position={[0, -0.55, 0]} opacity={0.6} scale={9} blur={2.2} far={2.5} />
      </group>

      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.9}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  )
}

export default function ProductViewer3D({ product }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative w-full h-[380px] md:h-[440px] bg-hova-black border border-hova-gold/20 rounded-lg overflow-hidden group">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        onClick={() => setOpen((o) => !o)}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <ViewerScene product={product} open={open} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-hova-muted text-xs tracking-[0.2em] uppercase pointer-events-none select-none opacity-80">
        <RotateCcw className="w-3.5 h-3.5 text-hova-gold" />
        Drag to rotate&nbsp;·&nbsp;Click to {open ? 'close' : 'open'}
      </div>
    </div>
  )
}

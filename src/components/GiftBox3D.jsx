import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/*
 * Procedural luxury gift box: lacquered base + lid, satin ribbon with bow,
 * gold-foil HOVA monogram. Colors come from product.boxStyle so every
 * product gets its own box (classic black/gold, pink edition, crimson wafers…).
 * `open` (0..1) lifts and tilts the lid; drive it with a spring from the parent.
 */

const BOX_W = 2.6
const BOX_D = 1.9
const BASE_H = 0.75
const LID_H = 0.28

function useLacquer(color, { metalness = 0.25, roughness = 0.32 } = {}) {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness,
        roughness,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
      }),
    [color, metalness, roughness],
  )
}

function useSatin(color) {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.75,
        roughness: 0.28,
        sheen: 1,
        sheenColor: new THREE.Color(color).multiplyScalar(0.6),
      }),
    [color],
  )
}

// matches the real Classic Box: ribbon and bow sit toward the box's edge,
// leaving the lid center clear for the embossed monogram
const RIBBON_X = -0.85

function Bow({ material }) {
  return (
    <group position={[RIBBON_X, LID_H + 0.1, 0]}>
      {/* two loops */}
      <mesh material={material} rotation={[0, 0, Math.PI / 5]} position={[-0.22, 0.05, 0]}>
        <torusGeometry args={[0.19, 0.055, 12, 24]} />
      </mesh>
      <mesh material={material} rotation={[0, 0, -Math.PI / 5]} position={[0.22, 0.05, 0]}>
        <torusGeometry args={[0.19, 0.055, 12, 24]} />
      </mesh>
      {/* knot */}
      <mesh material={material}>
        <sphereGeometry args={[0.11, 16, 16]} />
      </mesh>
    </group>
  )
}

export default function GiftBox3D({ boxStyle, open = 0, spin = true }) {
  const group = useRef()
  const lid = useRef()

  const baseMat = useLacquer(boxStyle.base)
  const lidMat = useLacquer(boxStyle.lid)
  const ribbonMat = useSatin(boxStyle.ribbon)
  // slight emissive glow: fully metallic gold reads black without an env map
  const goldMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e8c877',
        metalness: 0.55,
        roughness: 0.3,
        emissive: new THREE.Color('#96762e'),
        emissiveIntensity: 0.55,
      }),
    [],
  )
  const trayMat = useLacquer('#0d0d10', { metalness: 0.1, roughness: 0.6 })
  // gold foil wrap: needs a touch of emissive so the metal reads without an env map
  const foilMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#d4a94e',
        metalness: 0.55,
        roughness: 0.3,
        emissive: new THREE.Color('#5c4718'),
        emissiveIntensity: 0.35,
      }),
    [],
  )

  // 7×5 grid of wrapped pralines = the Classic Box's 35 pieces; deterministic
  // per-piece tilt so the foil catches the light unevenly, like the real tray
  const pieces = useMemo(() => {
    const arr = []
    const cols = 7
    const rows = 5
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
        arr.push({
          x: (i - (cols - 1) / 2) * 0.335,
          z: (j - (rows - 1) / 2) * 0.335,
          rot: (n - Math.floor(n) - 0.5) * 0.3,
        })
      }
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      if (spin) {
        group.current.rotation.y += delta * 0.15
      } else {
        // settle to the nearest full turn so the lid opens facing the camera
        const target = Math.round(group.current.rotation.y / (Math.PI * 2)) * Math.PI * 2
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 3, delta)
      }
    }
    if (lid.current) {
      // lid rises, slides back and tilts as `open` approaches 1
      const t = open
      lid.current.position.y = BASE_H / 2 + LID_H / 2 + t * 1.15
      lid.current.position.z = -t * 1.05
      lid.current.rotation.x = -t * 0.9
    }
  })

  return (
    <group ref={group}>
      {/* base */}
      <RoundedBox args={[BOX_W, BASE_H, BOX_D]} radius={0.06} smoothness={4} material={baseMat} />
      {/* black tray with a slim gold rim, visible when the lid opens */}
      <mesh material={trayMat} position={[0, BASE_H / 2 - 0.02, 0]}>
        <boxGeometry args={[BOX_W - 0.14, 0.06, BOX_D - 0.14]} />
      </mesh>
      <mesh material={goldMat} position={[0, BASE_H / 2 - 0.02, 0]}>
        <boxGeometry args={[BOX_W - 0.1, 0.02, BOX_D - 0.1]} />
      </mesh>
      <mesh material={trayMat} position={[0, BASE_H / 2 - 0.01, 0]}>
        <boxGeometry args={[BOX_W - 0.18, 0.05, BOX_D - 0.18]} />
      </mesh>
      {/* 35 gold-wrapped pralines */}
      <group position={[0, BASE_H / 2 + 0.11, 0]}>
        {pieces.map((p, i) => (
          <RoundedBox
            key={i}
            args={[0.28, 0.2, 0.28]}
            radius={0.035}
            smoothness={2}
            material={foilMat}
            position={[p.x, 0, p.z]}
            rotation={[0, p.rot, 0]}
          />
        ))}
      </group>
      {/* ribbon around base */}
      <mesh material={ribbonMat} position={[RIBBON_X, 0, 0]}>
        <boxGeometry args={[0.34, BASE_H + 0.02, BOX_D + 0.02]} />
      </mesh>

      {/* lid group */}
      <group ref={lid} position={[0, BASE_H / 2 + LID_H / 2, 0]}>
        <RoundedBox args={[BOX_W + 0.12, LID_H, BOX_D + 0.12]} radius={0.05} smoothness={4} material={lidMat} />
        {/* ribbon across lid */}
        <mesh material={ribbonMat} position={[RIBBON_X, 0, 0]}>
          <boxGeometry args={[0.34, LID_H + 0.02, BOX_D + 0.14]} />
        </mesh>
        <Bow material={ribbonMat} />
        {/* gold embossed monogram, centered on the clear part of the lid */}
        <Text
          position={[0.25, LID_H / 2 + 0.012, -0.08]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.34}
          letterSpacing={0.28}
          anchorX="center"
          anchorY="middle"
          material={goldMat}
        >
          {boxStyle.label}
        </Text>
        <Text
          position={[0.25, LID_H / 2 + 0.012, 0.28]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.09}
          letterSpacing={0.4}
          anchorX="center"
          anchorY="middle"
          material={goldMat}
        >
          PIECE OF JOY
        </Text>
      </group>
    </group>
  )
}

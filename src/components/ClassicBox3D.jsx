import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'

/*
 * Faithful model of the real HOVA Classic Box (from the brand photos):
 *  - flat, wide matte-black box with a shallow lid
 *  - the actual HŌVA wordmark (extracted from the brand PDF) gold-foiled
 *    on the lid center
 *  - black grosgrain ribbon printed with the gold logo, wrapping the box
 *    diagonally across two corners, tied in a bow at the upper-left
 *  - inside: black tray with 35 gold-wrapped pralines (7×5)
 * `open` (0..1) lifts and tilts the lid, which carries its ribbon and bow.
 */

const BOX_W = 3.15
const BOX_D = 2.3
const BASE_H = 0.42
const LID_H = 0.2
const RIBBON_W = 0.3
const LOGO_ASPECT = 773 / 1704

function CornerRibbonTop({ corner, dist, material, y }) {
  // flat strip lying on the top surface, crossing the corner at 45°;
  // ends land exactly on the edges so nothing floats past the box
  const [cx, cz] = corner
  const len = 2 * dist
  const px = cx * (BOX_W / 2 - dist * 0.7071)
  const pz = cz * (BOX_D / 2 - dist * 0.7071)
  const angle = cx * cz > 0 ? Math.PI / 4 : -Math.PI / 4
  return (
    <mesh material={material} position={[px, y, pz]} rotation={[0, angle, 0]}>
      <boxGeometry args={[len, 0.014, RIBBON_W]} />
    </mesh>
  )
}

function CornerRibbonSides({ corner, dist, material, height, y = 0 }) {
  // where the diagonal meets each edge, a thin strip continues flush down the side face
  const [cx, cz] = corner
  const t = 1.4142 * dist
  return (
    <>
      {/* strip on the x-facing side */}
      <mesh material={material} position={[cx * (BOX_W / 2 + 0.008), y, cz * (BOX_D / 2 - t)]}>
        <boxGeometry args={[0.016, height, RIBBON_W]} />
      </mesh>
      {/* strip on the z-facing side */}
      <mesh material={material} position={[cx * (BOX_W / 2 - t), y, cz * (BOX_D / 2 + 0.008)]}>
        <boxGeometry args={[RIBBON_W, height, 0.016]} />
      </mesh>
    </>
  )
}

function Bow({ material }) {
  return (
    <group position={[-BOX_W / 2 + 0.62, LID_H / 2 + 0.09, -BOX_D / 2 + 0.55]} rotation={[0, Math.PI / 4, 0]}>
      <mesh material={material} rotation={[0, 0, Math.PI / 5]} position={[-0.2, 0.04, 0]}>
        <torusGeometry args={[0.17, 0.05, 12, 24]} />
      </mesh>
      <mesh material={material} rotation={[0, 0, -Math.PI / 5]} position={[0.2, 0.04, 0]}>
        <torusGeometry args={[0.17, 0.05, 12, 24]} />
      </mesh>
      <mesh material={material}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      {/* hanging ribbon tails */}
      <mesh material={material} position={[-0.28, -0.06, 0.18]} rotation={[0.5, 0.4, 0.7]}>
        <boxGeometry args={[0.5, 0.012, 0.2]} />
      </mesh>
      <mesh material={material} position={[0.26, -0.06, 0.2]} rotation={[0.45, -0.5, -0.6]}>
        <boxGeometry args={[0.44, 0.012, 0.2]} />
      </mesh>
    </group>
  )
}

export default function ClassicBox3D({ open = 0, spin = true }) {
  const group = useRef()
  const lid = useRef()

  const [logoMap, ribbonMap] = useTexture(['/assets/hova-logo-gold.png', '/assets/hova-ribbon.png'])
  ribbonMap.wrapS = ribbonMap.wrapT = THREE.RepeatWrapping
  ribbonMap.rotation = Math.PI / 2

  // matte, lightly textured black card — not glossy lacquer
  const blackMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#131316',
        roughness: 0.62,
        metalness: 0.08,
        clearcoat: 0.12,
        clearcoatRoughness: 0.6,
      }),
    [],
  )
  const ribbonMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: ribbonMap,
        color: '#ffffff',
        roughness: 0.55,
        metalness: 0.1,
        sheen: 0.6,
        sheenColor: new THREE.Color('#3a3a40'),
      }),
    [ribbonMap],
  )
  const bowMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1a1a1e',
        roughness: 0.5,
        metalness: 0.1,
        sheen: 0.8,
        sheenColor: new THREE.Color('#4a4a52'),
      }),
    [],
  )
  const logoMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: logoMap,
        transparent: true,
        toneMapped: false,
        opacity: 0.95,
      }),
    [logoMap],
  )
  const trayMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#0d0d10', roughness: 0.6, metalness: 0.1 }),
    [],
  )
  const goldRimMat = useMemo(
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

  const pieces = useMemo(() => {
    const arr = []
    const cols = 7
    const rows = 5
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
        arr.push({
          x: (i - (cols - 1) / 2) * 0.4,
          z: (j - (rows - 1) / 2) * 0.4,
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
        const target = Math.round(group.current.rotation.y / (Math.PI * 2)) * Math.PI * 2
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 3, delta)
      }
    }
    if (lid.current) {
      lid.current.position.y = BASE_H / 2 + LID_H / 2 + open * 1.25
      lid.current.position.z = -open * 1.15
      lid.current.rotation.x = -open * 0.85
    }
  })

  return (
    <group ref={group}>
      {/* base */}
      <RoundedBox args={[BOX_W, BASE_H, BOX_D]} radius={0.03} smoothness={4} material={blackMat} />
      {/* ribbon wraps flush on the base sides, under the two diagonal corners */}
      <CornerRibbonSides corner={[-1, -1]} dist={0.72} material={ribbonMat} height={BASE_H} />
      <CornerRibbonSides corner={[1, 1]} dist={0.95} material={ribbonMat} height={BASE_H} />

      {/* tray + 35 gold pralines */}
      <mesh material={trayMat} position={[0, BASE_H / 2 - 0.02, 0]}>
        <boxGeometry args={[BOX_W - 0.14, 0.06, BOX_D - 0.14]} />
      </mesh>
      <mesh material={goldRimMat} position={[0, BASE_H / 2 - 0.02, 0]}>
        <boxGeometry args={[BOX_W - 0.1, 0.02, BOX_D - 0.1]} />
      </mesh>
      <mesh material={trayMat} position={[0, BASE_H / 2 - 0.01, 0]}>
        <boxGeometry args={[BOX_W - 0.18, 0.05, BOX_D - 0.18]} />
      </mesh>
      <group position={[0, BASE_H / 2 + 0.1, 0]}>
        {pieces.map((p, i) => (
          <RoundedBox
            key={i}
            args={[0.32, 0.19, 0.32]}
            radius={0.035}
            smoothness={2}
            material={foilMat}
            position={[p.x, 0, p.z]}
            rotation={[0, p.rot, 0]}
          />
        ))}
      </group>

      {/* lid — carries the logo foil, diagonal ribbons, and the bow */}
      <group ref={lid} position={[0, BASE_H / 2 + LID_H / 2, 0]}>
        <RoundedBox args={[BOX_W + 0.08, LID_H, BOX_D + 0.08]} radius={0.025} smoothness={4} material={blackMat} />
        <mesh material={logoMat} position={[0.12, LID_H / 2 + 0.006, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 1.5 * LOGO_ASPECT]} />
        </mesh>
        <CornerRibbonTop corner={[-1, -1]} dist={0.72} material={ribbonMat} y={LID_H / 2 + 0.008} />
        <CornerRibbonTop corner={[1, 1]} dist={0.95} material={ribbonMat} y={LID_H / 2 + 0.008} />
        <CornerRibbonSides corner={[-1, -1]} dist={0.72} material={ribbonMat} height={LID_H} />
        <CornerRibbonSides corner={[1, 1]} dist={0.95} material={ribbonMat} height={LID_H} />
        <Bow material={bowMat} />
      </group>
    </group>
  )
}

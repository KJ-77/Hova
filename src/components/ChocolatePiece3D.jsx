import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

/*
 * Procedural HOVA praline, modeled on the brand photo: a square milk-chocolate
 * piece with soft beveled edges and "HOVA" embossed on top. The bevel comes
 * from extruding a rounded-square profile, which gives the molded-chocolate
 * silhouette (slightly domed shoulders, crisp base).
 */

const SIZE = 2.3
const HEIGHT = 0.95
const CORNER = 0.22

function useChocolateGeometry() {
  return useMemo(() => {
    const half = SIZE / 2 - CORNER
    const shape = new THREE.Shape()
    shape.moveTo(-half, -SIZE / 2)
    shape.lineTo(half, -SIZE / 2)
    shape.quadraticCurveTo(SIZE / 2, -SIZE / 2, SIZE / 2, -half)
    shape.lineTo(SIZE / 2, half)
    shape.quadraticCurveTo(SIZE / 2, SIZE / 2, half, SIZE / 2)
    shape.lineTo(-half, SIZE / 2)
    shape.quadraticCurveTo(-SIZE / 2, SIZE / 2, -SIZE / 2, half)
    shape.lineTo(-SIZE / 2, -half)
    shape.quadraticCurveTo(-SIZE / 2, -SIZE / 2, -half, -SIZE / 2)

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: HEIGHT,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.14,
      bevelSegments: 5,
      curveSegments: 10,
    })
    geo.center()
    return geo
  }, [])
}

export default function ChocolatePiece3D({ spin = true, tilt = 0 }) {
  const group = useRef()

  const geometry = useChocolateGeometry()

  const chocolateMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#6b3f22',
        roughness: 0.38,
        metalness: 0.05,
        clearcoat: 0.55,
        clearcoatRoughness: 0.35,
        sheen: 0.4,
        sheenColor: new THREE.Color('#8a5a33'),
      }),
    [],
  )
  // embossed lettering: same chocolate family, slightly lighter so the relief reads
  const embossMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#8f5a31',
        roughness: 0.32,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    if (spin) group.current.rotation.y += delta * 0.25
    // scroll gently tips the piece forward, showing off the embossed top
    group.current.rotation.z = tilt * 0.35
  })

  return (
    <group ref={group}>
      {/* body — extrusion runs along z, so lay it flat */}
      <mesh geometry={geometry} material={chocolateMat} rotation={[-Math.PI / 2, 0, 0]} />

      {/* embossed monogram on the top face — sits just above body + bevel (0.475 + 0.16) */}
      <Text
        position={[0, HEIGHT / 2 + 0.185, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.52}
        letterSpacing={0.18}
        anchorX="center"
        anchorY="middle"
        material={embossMat}
      >
        HOVA
      </Text>
      <Text
        position={[0, HEIGHT / 2 + 0.185, 0.52]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.13}
        letterSpacing={0.35}
        anchorX="center"
        anchorY="middle"
        material={embossMat}
      >
        PIECE OF JOY
      </Text>
    </group>
  )
}

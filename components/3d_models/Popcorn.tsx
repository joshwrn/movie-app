/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Elephai (https://sketchfab.com/elephai)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/popcorn-25bf6d9807bb423a9017f01f11b215b4
title: Popcorn
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Popcorn_1_2_2_Mat2_0: THREE.Mesh
    Popcorn_1_2_2_Mat1_0: THREE.Mesh
    Cube_Mat_0: THREE.Mesh
    Cube_Mat2_0: THREE.Mesh
  }
  materials: {
    ['Mat.2']: THREE.MeshStandardMaterial
    ['Mat.1']: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
  }
}

export default function Popcorn({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(
    '/models/popcorn/scene.gltf'
  ) as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[27.76, 60.03, 36.75]}>
            <mesh
              geometry={nodes.Popcorn_1_2_2_Mat2_0.geometry}
              material={materials['Mat.2']}
            />
            <mesh
              geometry={nodes.Popcorn_1_2_2_Mat1_0.geometry}
              material={materials['Mat.1']}
            />
          </group>
          <group
            position={[124.96, -1069.9, -14.11]}
            rotation={[0.32, -0.81, 0.39]}
          >
            <mesh
              geometry={nodes.Cube_Mat_0.geometry}
              material={materials.material}
            />
            <mesh
              geometry={nodes.Cube_Mat2_0.geometry}
              material={materials['Mat.2']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/popcorn/scene.gltf')

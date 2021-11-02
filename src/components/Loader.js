import React, { Suspense, useRef } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import px2vw from '../utils/px2vw'
import { getRadians } from '../utils/utils'
import { flexColumnCentered } from '../styles/flex'

import dice1 from '../images/dice/dice_1.jpg'
import dice2 from '../images/dice/dice_2.jpg'
import dice3 from '../images/dice/dice_3.jpg'
import dice4 from '../images/dice/dice_4.jpg'
import dice5 from '../images/dice/dice_5.jpg'
import dice6 from '../images/dice/dice_6.jpg'

const CanvasConatiner = styled.div`
    ${flexColumnCentered}
  width: ${props => props.size};
  height: ${props => props.size};
`

const Dice = props => {
  const mesh = useRef(null)
  const dice1texture = useLoader(THREE.TextureLoader, dice1)
  const dice2texture = useLoader(THREE.TextureLoader, dice2)
  const dice3texture = useLoader(THREE.TextureLoader, dice5)
  const dice4texture = useLoader(THREE.TextureLoader, dice4)
  const dice5texture = useLoader(THREE.TextureLoader, dice3)
  const dice6texture = useLoader(THREE.TextureLoader, dice6)

  useFrame(({ clock }) => {
    const velocity = 5
    mesh.current.rotation.y = clock.getElapsedTime() * velocity
    mesh.current.rotation.z = getRadians(45)
  }, [])

  return (
    <mesh {...props} scale={1} ref={mesh} position={[0, 0, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} attach='geometry' />
      <meshBasicMaterial attachArray='material' map={dice4texture} />
      <meshBasicMaterial attachArray='material' map={dice2texture} />
      <meshBasicMaterial attachArray='material' map={dice5texture} />
      <meshBasicMaterial attachArray='material' map={dice6texture} />
      <meshBasicMaterial attachArray='material' map={dice1texture} />
      <meshBasicMaterial attachArray='material' map={dice3texture} />
    </mesh>
  )
}

const Loader = ({ size = px2vw(50) }) => {
  return (
    <CanvasConatiner size={size}>
      <Canvas
        camera={{
          fov: 11,
          near: 0.1,
          position: [0, 0, 10]
        }}
      >
        <Suspense fallback={null}>
          <Dice />
        </Suspense>
      </Canvas>
    </CanvasConatiner>
  )
}

export default Loader

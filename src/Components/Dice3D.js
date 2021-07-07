import React, { useRef, useState, Suspense } from 'react'
import styled from 'styled-components'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { getRadians } from '../utils/utils'

import dice1 from '../images/dice/dice_1.svg'
import dice2 from '../images/dice/dice_2.svg'
import dice3 from '../images/dice/dice_3.svg'
import dice4 from '../images/dice/dice_4.svg'
import dice5 from '../images/dice/dice_5.svg'
import dice6 from '../images/dice/dice_6.svg'

const CANVAS_WIDTH = 50

const CanvasConatiner = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_WIDTH}px;
`
const faces = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: getRadians(90) },
  3: { x: 0, y: getRadians(180) },
  4: { x: 0, y: getRadians(-90) },
  5: { x: getRadians(90), y: 0 },
  6: { x: getRadians(-90), y: 0 }
}

const velocity = 0.4

const Dice = props => {
  const mesh = useRef()
  const [rollDiceActive, setRollDiceActive] = useState(false)
  const [resetDice, setResetDice] = useState(false)
  const [score, setScore] = useState(0)
  const dice1texture = useLoader(THREE.TextureLoader, dice1)
  const dice2texture = useLoader(THREE.TextureLoader, dice2)
  const dice3texture = useLoader(THREE.TextureLoader, dice5)
  const dice4texture = useLoader(THREE.TextureLoader, dice4)
  const dice5texture = useLoader(THREE.TextureLoader, dice3)
  const dice6texture = useLoader(THREE.TextureLoader, dice6)

  useFrame(() => {
    if (resetDice) {
      if (Math.floor(mesh.current.rotation.x) > 0) {
        mesh.current.rotation.x -= velocity
      } else if (Math.floor(mesh.current.rotation.x) < 0) {
        mesh.current.rotation.x += velocity
      } else if (Math.floor(mesh.current.rotation.y) < 0) {
        mesh.current.rotation.y += velocity
      } else if (Math.floor(mesh.current.rotation.y) > 0) {
        mesh.current.rotation.y -= velocity
      } else {
        mesh.current.rotation.x = 0
        mesh.current.rotation.y = 0
        setScore(Math.floor(Math.random() * 6) + 1)
        setRollDiceActive(true)
        setResetDice(false)
      }
    }
  })

  useFrame(() => {
    if (rollDiceActive) {
      const { x, y } = faces[score]
      if (y && y < 0 && mesh.current.rotation.y > y) {
        mesh.current.rotation.y -= velocity
      } else if (y && y > 0 && mesh.current.rotation.y < y) {
        mesh.current.rotation.y += velocity
      } else if (x && x < 0 && mesh.current.rotation.x > x) {
        mesh.current.rotation.x -= velocity
      } else if (x && x > 0 && mesh.current.rotation.x < x) {
        mesh.current.rotation.x += velocity
      } else {
        setScore(0)
        setRollDiceActive(false)
      }
    }
  })

  const rollDice = () => {
    if (rollDiceActive) return
    if (mesh.current.rotation.x !== 0 || mesh.current.rotation.y !== 0) {
      setResetDice(true)
    } else {
      setScore(Math.floor(Math.random() * 6) + 1)
      setRollDiceActive(true)
    }
  }

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      onClick={rollDice}
      rotation={[0, 0, 0]}
    >
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

const Dice3D = () => {
  return (
    <CanvasConatiner>
      <Canvas
        camera={{
          fov: 17,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5]
        }}
      >
        <Suspense fallback={null}>
          <Dice position={[0, 0, 1]} />
        </Suspense>
      </Canvas>
    </CanvasConatiner>
  )
}

export default Dice3D

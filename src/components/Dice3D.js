import React, { useRef, useState, Suspense, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { px2vw, getRadians } from '../utils'

import dice1 from '../images/dice/dice_1.jpg'
import dice2 from '../images/dice/dice_2.jpg'
import dice3 from '../images/dice/dice_3.jpg'
import dice4 from '../images/dice/dice_4.jpg'
import dice5 from '../images/dice/dice_5.jpg'
import dice6 from '../images/dice/dice_6.jpg'

const CanvasConatiner = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
`
const faces = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: getRadians(90) },
  3: { x: getRadians(90), y: 0 },
  4: { x: 0, y: getRadians(-90) },
  5: { x: 0, y: getRadians(180) },
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
        setScore(score)
        setRollDiceActive(true)
        setResetDice(false)
      }
    }
  })

  useFrame(() => {
    if (rollDiceActive && faces[score]) {
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
        setRollDiceActive(false)
        setTimeout(() => {
          props.onDiceRollEnd && props.onDiceRollEnd()
        }, 1000)
      }
    }
  })

  const setDiceScoreAndActive = score => {
    setScore(score)
    mesh.current.rotation.x !== 0 || mesh.current.rotation.y !== 0
      ? setResetDice(true)
      : setRollDiceActive(true)
  }

  useEffect(() => {
    if (rollDiceActive || !props.score) return
    setDiceScoreAndActive(props.score)
  }, [props.score])

  const rollDice = () => {
    if (rollDiceActive) return
    setDiceScoreAndActive(Math.floor(Math.random() * 6) + 1)
  }

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      onClick={props.onClick || rollDice}
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

const Dice3D = ({ score, onDiceRollEnd, onClick, size = px2vw(40) }) => {
  return (
    <CanvasConatiner size={size}>
      <Canvas
        camera={{
          fov: 17,
          near: 0.1,
          far: 5,
          position: [0, 0, 5],
          aspect: 1
        }}
      >
        <Suspense fallback={null}>
          <Dice
            position={[0, 0, 1]}
            score={score}
            onDiceRollEnd={onDiceRollEnd}
            onClick={onClick}
          />
        </Suspense>
      </Canvas>
    </CanvasConatiner>
  )
}

export default Dice3D

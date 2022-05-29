import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import styled from 'styled-components'
import Glasses from '../components/3d_models/Glasses'
import Popcorn from '../components/3d_models/Popcorn'
const Login = () => {
  const [focus, setFocus] = useState(false)
  return (
    <Container focus={focus.toString()}>
      <CanvasContainer>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <pointLight position={[10, 10, 10]} />
          <Glasses position={[-14, -13, 30]} />
          <Popcorn scale={[0.5, 0.5, 0.5]} position={[0, 5, -450]} />
        </Canvas>
      </CanvasContainer>
      <Header>Login</Header>
      <form>
        <label>
          Username
          <input
            autoComplete="off"
            type="text"
            name="username"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          />
        </label>
        <br />
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <br />
        <SubmitButton type="submit" value="Submit">
          Submit
        </SubmitButton>
      </form>
    </Container>
  )
}

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 400px;
  padding: 10px 0;
  display: flex;
`

const Container = styled.div<{ focus: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    label {
      display: flex;
      flex-direction: column;
      font-size: 11px;
      background-color: ${({ focus }) =>
        focus === 'true' ? '#353535' : '#202020'};
      border-radius: 4px;
      padding: 10px;
      width: 100%;
      input {
        background-color: transparent;
        border: none;
      }
    }
  }
`

const CanvasContainer = styled.div`
  width: 800px;
  height: 300px;
`

const SubmitButton = styled.button`
  background: #5d45e6;
  color: ${({ theme }) => theme.fontColor.primary};
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`

export default Login

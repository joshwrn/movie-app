import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import styled from 'styled-components'
import Glasses from '../components/3d_models/Glasses'
import Popcorn from '../components/3d_models/Popcorn'
const Login = () => {
  const [focus, setFocus] = useState({ username: false, password: false })
  return (
    <Container>
      {/* <CanvasContainer>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <pointLight position={[10, 10, 10]} />
          <Glasses position={[-14, -13, 30]} />
          <Popcorn scale={[0.5, 0.5, 0.5]} position={[0, 5, -450]} />
        </Canvas>
      </CanvasContainer> */}
      <form>
        <StyledLabel focus={focus.username.toString()}>
          Username
          <input
            autoComplete="off"
            type="text"
            name="username"
            onBlur={() => setFocus({ ...focus, username: false })}
            onFocus={() => setFocus({ ...focus, username: true })}
          />
        </StyledLabel>
        <br />
        <StyledLabel focus={focus.password.toString()}>
          Password
          <input
            type="password"
            name="password"
            onBlur={() => setFocus({ ...focus, password: false })}
            onFocus={() => setFocus({ ...focus, password: true })}
          />
        </StyledLabel>
        <br />
        <SubmitButton type="submit" value="Submit">
          Login
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

const Container = styled.div`
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
  }
`
const StyledLabel = styled.label<{ focus: string }>`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  background-color: ${({ focus }) =>
    focus === 'true' ? '#353535' : '#202020'};
  border-radius: 4px;
  gap: 10px;
  padding: 10px 10px 15px 10px;
  width: 100%;
  input {
    background-color: transparent;
    border: none;
  }
`

const CanvasContainer = styled.div`
  width: 800px;
  height: 300px;
`

const SubmitButton = styled.button`
  background: #ffffff;
  color: var(--background-primary);
  border: none;
  border-radius: 8px;
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`

export default Login

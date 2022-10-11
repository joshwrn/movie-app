import type { FC } from "react"
import { useState } from "react"

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import styled from "styled-components"

const Login: FC = () => {
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
  background-color: ${({ focus }) => (focus === `true` ? `#353535` : `#202020`)};
  border-radius: 4px;
  gap: 10px;
  padding: 10px 10px 15px 10px;
  width: 100%;
  transition: background-color 0.2s ease-in-out;
  input {
    background-color: transparent;
    border: none;
    font-size: 16px;
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
  position: relative;
  margin-top: 25px;
  &:hover {
    &::after {
      opacity: 0.95;
    }
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 10px;
    opacity: 0;
    mix-blend-mode: screen;
    transition: opacity 0.35s;
    transform: translate(-55%);
    background: linear-gradient(90deg, #ffffff, #ff0000);
    border: 5px solid #3c91ff;
    box-shadow: 0px 0px 0px 5px #964bff;
    filter: blur(30px);
  }
`

export default Login

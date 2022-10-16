import type { FC } from "react"
import { useEffect } from "react"

import Footer from "@components/Footer/Footer"
import Nav from "@components/Nav/Nav"
import { RecoilInspector } from "@eyecuelab/recoil-devtools"
import { device } from "@styles/devices"
import { GlobalStyle } from "@styles/GlobalStyle"
import { ThemeWrapper } from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import styled from "styled-components"

const App: FC = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeWrapper>
        <GlobalStyle />
        <Nav />
        <Wrapper>
          <PageInner>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} />
            </AnimatePresence>
            <Footer />
            {/* <RecoilInspector /> */}
          </PageInner>
        </Wrapper>
      </ThemeWrapper>
    </RecoilRoot>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 0 40px;
  @media ${device.mobile} {
    padding: 0 15px;
  }
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`

export default App

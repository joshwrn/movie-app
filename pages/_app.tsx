import type { FC } from "react"

import Footer from "@components/Footer/Footer"
import Nav from "@components/Nav/Nav"
import { DEVICE } from "@styles/devices"
import { GlobalStyle } from "@styles/GlobalStyle"
import { ThemeWrapper } from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import styled from "styled-components"

import "../styles/index.css"

const queryClient = new QueryClient()

const App: FC = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 0 40px;
  @media ${DEVICE.mobile} {
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

import type { FC } from "react"

import { ApolloProvider } from "@apollo/client"
import Footer from "@components/Footer/Footer"
import Nav from "@components/Nav/Nav"
import { RecoilInspector } from "@eyecuelab/recoil-devtools"
import { device } from "@styles/devices"
import { GlobalStyle } from "@styles/GlobalStyle"
import { ThemeWrapper } from "@styles/theme"
import { RecoilRoot } from "recoil"
import styled from "styled-components"

import { useApollo } from "../apollo/client"

const App: FC<{ Component: FC; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <ThemeWrapper>
          <GlobalStyle />
          <Nav />
          <Wrapper>
            <PageInner>
              <Component {...pageProps} />
              <Footer />
              {/* <RecoilInspector /> */}
            </PageInner>
          </Wrapper>
        </ThemeWrapper>
      </RecoilRoot>
    </ApolloProvider>
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

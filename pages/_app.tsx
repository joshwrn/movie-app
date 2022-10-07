import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

import { GlobalStyle } from '@styles/GlobalStyle'
import styled from 'styled-components'

import Footer from '@components/Footer/Footer'

import Nav from '@components/Nav/Nav'
import { device } from '@styles/devices'
import { RecoilRoot } from 'recoil'
import { ThemeWrapper } from '@styles/theme'
import { RecoilInspector } from '@eyecuelab/recoil-devtools'

export default function App({ Component, pageProps }) {
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

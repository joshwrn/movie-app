import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

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
  const [top, setTop] = useState('true')

  const [topRef, topView] = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (topView) {
      setTop('true')
    } else {
      setTop('false')
    }
  }, [topView])

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <ThemeWrapper>
          <GlobalStyle />
          <Nav top={top} />
          <NavRef ref={topRef} />
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

const NavRef = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
`

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

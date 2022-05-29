import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

import { ThemeProvider } from 'styled-components'
import { darkTheme } from '../styles/theme'
import { GlobalStyle } from '../styles/GlobalStyle'
import styled from 'styled-components'

import Footer from '../components/Footer/Footer'

import Nav from '../components/Nav/Nav'

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
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Nav top={top} />
        <NavRef ref={topRef} />
        <Wrapper>
          <PageInner>
            <Component {...pageProps} />
            <Footer />
          </PageInner>
        </Wrapper>
      </ThemeProvider>
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
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`

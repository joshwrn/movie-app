import { atom, useRecoilValue } from 'recoil'
import { ThemeProvider } from 'styled-components'

export const ThemeWrapper = ({ children }) => {
  const currentTheme = useRecoilValue(currentThemeState)
  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}

export const currentThemeState = atom({
  key: 'currentThemeState',
  default: 'dark',
})

export const darkTheme = {
  type: 'dark',
  background: {
    primary: 'rgb(0, 0, 0)',
    nav: 'rgba(0, 0, 0, 0.416)',
    circle: 'rgb(46, 46, 46)',
  },
  fontColor: {
    primary: 'rgb(255, 255, 255)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    contentPrimary: 'rgb(255, 255, 255)',
    contentSecondary: 'rgba(255, 255, 255, 0.6)',
  },
  borderColor: {
    primary: 'rgba(255, 255, 255, 0.129)',
  },
  gradient: {
    hero: `linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.72) 52.89%,
      #000000 100%
    )`,
    reviewCard: `linear-gradient(180deg, transparent 0%, #000000b0 100%)`,
  },
}

export const lightTheme = {
  type: 'light',
  background: {
    primary: 'rgb(255, 255, 255)',
    nav: 'rgba(255, 255, 255, 0.416)',
    circle: 'rgba(109, 109, 109, 0.416)',
  },
  fontColor: {
    primary: 'rgb(55, 55, 55)',
    secondary: 'rgba(86, 86, 86, 0.9)',
    contentPrimary: 'rgb(255, 255, 255)',
    contentSecondary: 'rgba(255, 255, 255, 0.863)',
  },
  borderColor: {
    primary: 'rgba(255, 255, 255, 0.129)',
  },
  gradient: {
    hero: `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.88) 0%,
      rgba(255, 255, 255, 0.72) 52.89%,
      #ffffff 100%
    )`,
    reviewCard: `linear-gradient(180deg, transparent 0%, transparent 100%)`,
  },
}

export const darkTheme = {
  type: 'dark',
  background: {
    primary: '#000000',
    nav: '#0000006a',
  },
  fontColor: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.6)',
    contentPrimary: '#ffffff',
    contentSecondary: 'rgba(255, 255, 255, 0.6)',
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
    primary: '#ffffff',
    nav: '#ffffff6a',
  },
  fontColor: {
    primary: '#373737',
    secondary: 'rgba(86, 86, 86, 0.6)',
    contentPrimary: '#ffffff',
    contentSecondary: 'rgba(255, 255, 255, 0.863)',
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

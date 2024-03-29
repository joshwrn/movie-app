import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
:root {
  --padding-h: 25px;

  //fonts
  --font-color-primary: ${({ theme }) => theme.fontColor.primary};
  --font-color-secondary: ${({ theme }) => theme.fontColor.secondary};
  --font-color-content-primary: ${({ theme }) => theme.fontColor.contentPrimary};
  --font-color-content-secondary: ${({ theme }) =>
    theme.fontColor.contentSecondary};

  // backgrounds
  --background-primary: ${({ theme }) => theme.background.primary};
  --nav-background: ${({ theme }) => theme.background.nav};
  --circle-background: ${({ theme }) => theme.background.circle};

  // gradients
  --gradient-hero: ${({ theme }) => theme.gradient.hero};
  --review-card-gradient: ${({ theme }) => theme.gradient.reviewCard};

  //border colors
  --border-color-primary: ${({ theme }) => theme.borderColor.primary};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: var(--font-color-primary);
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

body {
  overflow-x: hidden;
  overflow-y: overlay;
}


::-webkit-scrollbar {
      width: 8px;
      height: 0;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border-color-primary);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--font-color-primary);
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }

a {
  text-decoration: none;
}

p {
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 500;
}

textarea:focus,
input:focus {
  outline: none;
}

button:focus {
  outline: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-size: 16px;
  background-color: var(--background-primary);
}

`

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: ${({ theme }) => theme.fontColor.primary};
}

::-webkit-scrollbar {
  display: none;
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
  background-color: ${({ theme }) => theme.background};
}

`;

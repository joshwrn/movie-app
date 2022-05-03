import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
  margin: 0;
  padding: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

img {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

a {
  font-family: 'helvetica';
  text-decoration: none;
}

p {
  font-family: 'helvetica';
}

h1,
h2,
h3,
h4,
h5 {
 font-family: 'helvetica'; 
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
  background-color: black;
}
`;
export default GlobalStyles;

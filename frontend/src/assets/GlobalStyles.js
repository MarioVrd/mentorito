import { createGlobalStyle } from 'styled-components'
import PoppinsRegular from './fonts/Poppins-Regular.ttf'
import PoppinsMedium from './fonts/Poppins-Medium.ttf'
import PoppinsBold from './fonts/Poppins-Bold.ttf'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Poppins";
  src: url(${PoppinsRegular});
}
@font-face {
  font-family: "Poppins";
  src: url(${PoppinsMedium});
  font-weight: 500;
}
@font-face {
  font-family: "Poppins";
  src: url(${PoppinsBold});
  font-weight: 700;
}

:root {
  --clr-primary: #2F3CED;
  --clr-accent: #FF7C5D;
  --clr-dark: #11142D;
  --clr-white: #fff;
  --clr-danger: hsl(3deg 100% 43%);
  --clr-success: hsl(119deg 68% 36%);
  --clr-info: hsl(197deg 74% 49%);
  --clr-grey-100: #e4e4e4;
  --clr-grey-200: #A3A3A5;
  --clr-grey-300: #808191;
}

*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
}

a {
  text-decoration: none;
  color: var(--clr-dark);
}

.text-accent {
  color: var(--clr-accent)
}
`
export default GlobalStyle

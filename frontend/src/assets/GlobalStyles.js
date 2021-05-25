import { createGlobalStyle } from 'styled-components'
import NunitoSansLight from './fonts/NunitoSans-Light.ttf'
import NunitoSansRegular from './fonts/NunitoSans-Regular.ttf'
import NunitoSansSemiBold from './fonts/NunitoSans-SemiBold.ttf'
import NunitoSansBold from './fonts/NunitoSans-Bold.ttf'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Nunito Sans";
  src: url(${NunitoSansRegular});
}
@font-face {
  font-family: "Nunito Sans";
  src: url(${NunitoSansLight});
  font-weight: 300;
}
@font-face {
  font-family: "Nunito Sans";
  src: url(${NunitoSansSemiBold});
  font-weight: 600;
}
@font-face {
  font-family: "Nunito Sans";
  src: url(${NunitoSansBold});
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
    font-family: 'Nunito Sans', sans-serif;
}

a {
  text-decoration: none;
  color: var(--clr-primary);

  &:hover {
    color: var(--clr-info)
  }
}

ul {
  padding-left: 2rem;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}

.text-accent {
  color: var(--clr-accent)
}
`
export default GlobalStyle

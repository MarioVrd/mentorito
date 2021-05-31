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
  --clr-primary: hsl(236deg 84% 56%);;
  --clr-primary-hover: hsl(236deg 84% 42%);
  --clr-accent: #FF7C5D;
  --clr-dark: hsl(234deg 20% 22%);
  --clr-white: #fff;
  --clr-danger: hsl(3deg 100% 43%);
  --clr-success: hsl(127deg 49% 48%);
  --clr-info: hsl(197deg 74% 49%);
  --clr-grey-100: hsl(0deg, 0%, 90%);
  --clr-grey-200: hsl(0deg, 0%, 70%);
  --clr-grey-300: hsl(0deg, 0%, 50%);
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
    color: var(--clr-primary-hover)
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

.table-lg-show {
  display: none;

  @media(min-width: 1400px) {
    display: table-cell;
  }
}

.table-md-show {
  display: none;

  @media(min-width:1000px) {
    display: table-cell;
  }

}
`
export default GlobalStyle

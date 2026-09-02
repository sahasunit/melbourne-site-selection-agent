import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.color.walnutShadow};
    color: ${({ theme }) => theme.color.warmCream};
    font-family: ${({ theme }) => theme.font.family};
    -webkit-font-smoothing: antialiased;
  }

  button, input {
    font-family: inherit;
  }

  a {
    color: ${({ theme }) => theme.color.warmCream};
  }
  a:hover {
    color: ${({ theme }) => theme.color.ember};
  }

  /* visible focus ring that reads against the warm-dark palette */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.ember};
    outline-offset: 2px;
  }
`

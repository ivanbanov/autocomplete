import { normalize } from 'styled-normalize';
import { injectGlobal } from 'styled-components';

export default () => injectGlobal`
  ${normalize}

  * { box-sizing: border-box; }

  html {
    font-size: 16px;
    line-height: 1.4;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #fff, #f0f0f0);
    font-family: Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100vh;
    width: 100vw;
    max-width: 550px;
    padding: 1rem;
  }
`;

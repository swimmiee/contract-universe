import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        width: 800px;
        height: 600px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        #root {
            min-width: 100%;
            min-height: 100%;
        }
    }
    body, html {
        overflow: scroll;
        white-space: nowrap;
    }
    
    code {
        font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
        line-height: normal;
        background: rgba(135,131,120,0.15);
        color: #EB5757;
        border-radius: 3px;
        font-size: 85%;
        padding: 0.2em 0.4em;
    }

    * {
        box-sizing: border-box;
    }
`
export default GlobalStyle;
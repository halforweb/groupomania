import { createGlobalStyle } from 'styled-components'
import colors from './colors'


const GlobalStyle = createGlobalStyle`
    * {
        font-family : sans-serif;
    }
    html {
        width : 100%;
        height : 100%;
    }
    body {
        margin : 0;
        width : 100%;
        height : 100%;
        display : flex;
        color : ${colors.tertiary};
        background-color : #FFF;
    }
    #root {
        width : 100%;
        height : 100%;
    }
    h1 {
        font-weight : bold;
        font-size : 24px;
    }
    h2 {
        font-weight : bold;
        font-size : 20px;
    }
    ul {
        list-style-type : none;
    }
    li {
        width : 120px;
        height : 18px;
        text-align : center;
        color : ${colors.tertiary};
        cursor : pointer;
        border-radius : 12.5px;
    }
`

const UseGlobalStyle = () => {

  return <GlobalStyle />;
};

export default UseGlobalStyle;
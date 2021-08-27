import Head from 'next/head';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Calc from '../components/Calc';

const theme = {
    mainBg: '#263138',
    mainText: '#92cdcf',

    inputBg: '#eeeff7',
    inputText: '#445878',
};

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: Roboto;
    background-color: ${p => p.theme.mainBg};
    color: ${p => p.theme.mainText};
  }
  
  * {
    box-sizing: border-box;
  }
`;

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <GlobalStyle />
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto"
                    />
                </Head>
                <Calc />
            </div>
        </ThemeProvider>
    );
}

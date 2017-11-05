import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import styled from 'react-emotion';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from './redux';
import client from './apollo';
import { Landing, Map, LazyBlur } from './components';
import './global.css';
import skyMin from './backgrounds/sky-min.jpg';

const theme = {};

const Layout = styled.main`
	display: block;
	height: 100vh;
	background-size: cover;

	> * {
		flex: 1;
	}
`;

// background: #e52 no-repeat center/100% url(${sky});

const App = () => (
  <ApolloProvider store={store} client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <LazyBlur background placeholderURL={skyMin} url={skyMin} aspectRatio="6:4">
            <Landing />
            {/* <Map /> */}
          </LazyBlur>
        </Layout>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);

export default App;

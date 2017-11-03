import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import styled from 'react-emotion';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from './redux';
import client from './apollo';
import { Landing } from './components';
import './global.css';
import sky from './backgrounds/sky.jpg';
const theme = {};

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;
	background: #e52 no-repeat center/100% url(${sky});
	background-size: cover;

	> * {
		flex: 1;
	}
`;

const App = () => (
	<ApolloProvider store={store} client={client}>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Layout>
						<Landing />
				</Layout>
			</ThemeProvider>
		</Provider>
	</ApolloProvider>
);

export default App;

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import reducers from './reducers';
import { SocketProvider } from './context/SocketProvider';
import App from './App';

const SOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#01a781',
    },
  },
});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <SocketProvider socketUrl={SOCKET_URL}>
        <App />
      </SocketProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

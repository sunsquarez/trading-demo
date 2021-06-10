import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import ConnectSwitcher from './components/ConnectSwitcher';
import SymbolSelector from './components/SymbolSelector';
import Ticker from './components/Ticker';
import OrderBook from './components/OrderBook';
import { SocketContext } from './context/SocketProvider';
import Channel from './config/Channel';

const App = () => {
  const symbol = useSelector((state) => state.app?.symbol);

  const {
    isSocketConnected,
    subscribeChannel,
    unsubscribeChannel,
  } = useContext(SocketContext);

  useEffect(() => {
    if (isSocketConnected) {
      subscribeChannel(Channel.TICKER, symbol);
      subscribeChannel(Channel.BOOK, symbol);
    }

    return () => {
      if (isSocketConnected) {
        unsubscribeChannel(Channel.TICKER);
        unsubscribeChannel(Channel.BOOK);
      }
    };
  }, [
    isSocketConnected,
    subscribeChannel,
    unsubscribeChannel,
    symbol,
  ]);

  return (
    <div className="App">
      <Container>
        <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ConnectSwitcher />
        </section>
        <section style={{ marginBottom: '2rem' }}>
          <h2>TICKER</h2>
          <SymbolSelector />
          <Ticker />
        </section>
        <section style={{ marginBottom: '2rem' }}>
          <h2>ORDER BOOK</h2>
          <OrderBook />
        </section>
      </Container>
    </div>
  );
};

export default App;

import {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Channel from '../config/Channel';
import { updateTicker } from '../actions/tickerAction';
import { updateOrderBook } from '../actions/orderBookAction';

const currentChannel = {};

export const SocketContext = createContext();

let socket;

export const SocketProvider = ({
  socketUrl,
  children,
}) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const dispatch = useDispatch();

  const initSocket = useCallback(() => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      setIsSocketConnected(true);
    };

    socket.onclose = () => {
      setIsSocketConnected(false);
    };
  }, [socketUrl]);

  const unsubscribeChannel = useCallback((channel) => {
    const currentChannelId = currentChannel[channel];

    if (!currentChannelId) {
      return;
    }

    currentChannel[channel] = null;

    const requestData = JSON.stringify({
      event: 'unsubscribe',
      chanId: currentChannelId,
    });

    socket.send(requestData);
  }, []);

  const subscribeChannel = useCallback((channel, symbol) => {
    if (currentChannel[channel]) {
      unsubscribeChannel(channel);
    }

    const requestData = JSON.stringify({
      event: 'subscribe',
      channel,
      symbol,
    });

    socket.send(requestData);

    socket.onmessage = (event) => {
      const responseData = JSON.parse(event.data);

      if (responseData.event === 'subscribed') {
        currentChannel[responseData.channel] = responseData.chanId;
      }

      if (Array.isArray(responseData)) {
        const channelId = responseData[0];
        let payload;

        switch (channelId) {
          case currentChannel[Channel.TICKER]:
            [, payload] = responseData;
            if (!Array.isArray(payload)) {
              break;
            }
            dispatch(updateTicker(payload));
            break;
          case currentChannel[Channel.BOOK]:
            [, payload] = responseData;
            if (!Array.isArray(payload)) {
              break;
            }
            dispatch(updateOrderBook(payload));
            break;
          default:
        }
      }
    };
  }, [unsubscribeChannel, dispatch]);

  const disconnectSocket = () => {
    socket.close();
  };

  const reconnectSocket = () => {
    initSocket();
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  return (
    <SocketContext.Provider
      value={{
        isSocketConnected,
        subscribeChannel,
        unsubscribeChannel,
        disconnectSocket,
        reconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  socketUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

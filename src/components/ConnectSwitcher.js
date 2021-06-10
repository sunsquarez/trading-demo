import { useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { SocketContext } from '../context/SocketProvider';

const ConnectSwitcher = () => {
  const {
    isSocketConnected,
    disconnectSocket,
    reconnectSocket,
  } = useContext(SocketContext);

  const handleChange = () => {
    if (isSocketConnected) {
      disconnectSocket();
    } else {
      reconnectSocket();
    }
  };

  return (
    <FormControlLabel
      control={(
        <Switch
          checked={isSocketConnected}
          onChange={handleChange}
          name="isSocketConnected"
          color="primary"
        />
      )}
      label="Connect"
    />
  );
};

export default ConnectSwitcher;

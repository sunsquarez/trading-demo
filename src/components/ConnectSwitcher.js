import { useContext, useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { SocketContext } from '../context/SocketProvider';

const ConnectSwitcher = () => {
  const {
    isSocketConnected,
    disconnectSocket,
    reconnectSocket,
  } = useContext(SocketContext);

  const [isHidden, setIsHidden] = useState(true);

  const handleChange = () => {
    if (isSocketConnected) {
      disconnectSocket();
    } else {
      reconnectSocket();
    }
  };

  useEffect(() => {
    if (!isHidden) {
      return;
    }

    if (isSocketConnected) {
      setIsHidden(false);
    }
  }, [isHidden, isSocketConnected]);

  if (isHidden) {
    return null;
  }

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

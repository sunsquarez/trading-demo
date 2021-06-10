import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { updateSymbol } from '../actions/appAction';
import TickerPair from '../config/TickerPair';

const renderMenuItems = () => (
  TickerPair.map((item) => (
    <MenuItem value={item.value} key={item.value}>
      {item.label}
    </MenuItem>
  ))
);

const SymbolSelector = () => {
  const symbol = useSelector((state) => state.app?.symbol);
  const dispatch = useDispatch();

  return (
    <FormControl fullWidth>
      <Select
        value={symbol}
        onChange={(e) => {
          dispatch(updateSymbol(e.target.value));
        }}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
};

export default SymbolSelector;

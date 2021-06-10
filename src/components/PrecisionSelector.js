import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { updatePrecision } from '../actions/orderBookAction';
import Precision from '../config/Precision';

const renderMenuItems = () => (
  Precision.map((item) => (
    <MenuItem value={item.value} key={item.value}>
      {item.label}
    </MenuItem>
  ))
);

const PrecisionSelector = () => {
  const precision = useSelector((state) => state.orderBook?.precision);
  const dispatch = useDispatch();

  return (
    <FormControl>
      <Select
        value={precision}
        onChange={(e) => {
          dispatch(updatePrecision(e.target.value));
        }}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
};

export default PrecisionSelector;

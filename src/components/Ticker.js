import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatPrice } from '../utils/formatHelper';

const Ticker = () => {
  const tickerData = useSelector((state) => state.ticker?.data);
  if (!tickerData.length) {
    return <div>Loading...</div>;
  }

  const [price, , , , priceChange, priceChangeInDecimal, , , high, low] = tickerData;

  return (
    <Card>
      <CardContent>
        <div style={{ fontSize: '1.2rem' }}>
          <b>{formatPrice(price)}</b>
        </div>
        <div style={{ color: priceChange > 0 ? '#01a781' : '#f05359' }}>
          <span>
            {formatPrice(priceChange)}
            {` (${(priceChangeInDecimal * 100).toFixed(2)}%)`}
          </span>
        </div>
        <div>
          <span>LOW: </span>
          <span>
            {formatPrice(low)}
          </span>
        </div>
        <div>
          <span>HIGH: </span>
          <span>
            {formatPrice(high)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ticker;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useThrottle } from 'react-use';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { formatPrice, formatToAbsolute } from '../utils/formatHelper';

const OrderBook = () => {
  const orderBookData = useSelector((state) => state.orderBook?.data);
  const throttledOrderBookData = useThrottle(orderBookData, 1000);
  const [bidRows, setBidRows] = useState([]);
  const [askRows, setAskRows] = useState([]);

  useEffect(() => {
    const rows = throttledOrderBookData.slice(0, 99);
    setBidRows(rows.filter((item) => item[2] > 0)?.slice(0, 10));
    setAskRows(rows.filter((item) => item[2] < 0)?.slice(0, 10));
  }, [throttledOrderBookData]);

  if (!orderBookData.length) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>COUNT</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bidRows.map((row) => (
                <TableRow key={row[3]}>
                  <TableCell component="th" scope="row">
                    {row[1]}
                  </TableCell>
                  <TableCell align="right">
                    {row[2]}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(row[0])}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PRICE</TableCell>
                <TableCell align="left">TOTAL</TableCell>
                <TableCell align="right">COUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {askRows.map((row) => (
                <TableRow key={row[3]}>
                  <TableCell component="th" scope="row">
                    {formatPrice(row[0])}
                  </TableCell>
                  <TableCell align="left">
                    {formatToAbsolute(row[2])}
                  </TableCell>
                  <TableCell align="right">
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default OrderBook;

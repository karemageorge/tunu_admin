import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { makeStyles, Paper, Grid, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../context/AuthContext/AuthContext";
import TableLoader from "../components/Shared/TableLoader";
import { REDEEMED, DASHBOARD } from "../routes";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TapedDashboard() {
  const classes = useStyles();

  const { user, logOut } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API}coupon/tapredeem`, {
          headers: { Authorization: token },
        });
        // update state using data from backend 
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("An unknown error occurred, please try again.");
      }
    };
    fetchData();
  }, []);

  console.log("DATA IS: ", data);
  const sorted_data = data.sort((a, b) => b.tap_Time - a.tap_Time)
  const tableData = sorted_data.map((res, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="left">{res.user}</TableCell>
        <TableCell align="left">{res.coupon}</TableCell>
        <TableCell align="left">{res.Description}</TableCell>
        <TableCell align="left">{res.user_Time}</TableCell>
        <TableCell align="left">{res.tap_Time}</TableCell>
    
      </TableRow>
    );
  });

  const handleLogOut = () => {
    logOut();
  };

  return (
    <Container style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={2} style={{ height: "100vh" }}>
          <h2>Dashboard</h2>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Logged in as:
              </Typography>
              {user && (
                <Typography variant="h5" component="h2">
                  {user.user}
                </Typography>
              )}
              <Typography variant="h6" component="h6">
                <Link
                  to={DASHBOARD}
                  style={{ color:"black", textDecoration: "none", marginLeft: "1em" }}
                >
                  Dashboard
                </Link>
              </Typography>
              <Typography variant="h6" component="h6">
                <Link
                  to={REDEEMED}
                  style={{ textDecoration: "none", marginLeft: "1em" }}
                >
                  Delivered
                </Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleLogOut}>
                Log Out
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Users</TableCell>
                  <TableCell align="left">Coupon</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Request Time</TableCell>
                  <TableCell align="left">Delivered Time</TableCell>
                </TableRow>
              </TableHead>
              {loading ? <TableLoader /> : <TableBody>{tableData}</TableBody>}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

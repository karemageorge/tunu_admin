import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import axios from "axios";
import { toast } from "react-toastify";

import { makeStyles, Paper, Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DashLayout from "../../Layouts/DashboardLayout";
import TableLoader from "../../Shared/TableLoader";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

const TapDashboard = () => {
  const [open, setOpen] = React.useState(false);
  // const [Gender, address] = React.useState('');
  const [Gender, setGender] = useState("");
  const [address, setaddress] = useState("");
  // const [couponIdValue, setcouponIdValue] = useState("");
  // const [couponType, setcouponType] = useState('');

  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API}coupon`, {
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

  const handleClose = () => {
    setOpen(false);
    setLoading(true);
    window.location.reload(true);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    setOpen(true);
    setLoading(true);
    console.log("Gender is ----------->",Gender);
    console.log("Address is ----------->",address);
    
    const couponIdValue = e.currentTarget.getAttribute("id");
    const couponType = e.currentTarget.getAttribute("type");

    console.log("coupon id  ------------>",couponIdValue);
    console.log("Coupon type ----------->",couponType);
    
    const data = {
      couponIdValue,
      couponType,
      Gender,
      address,
    };
    const token = localStorage.getItem("token");

    async function makePostRequest(token, data) {

      let res = await axios.post(`${process.env.REACT_APP_API}coupon/tapredeem`, data, {
        headers: { Authorization: token },
      });
  
      console.log("sent data response------------------>",res.data.status);
      setStatus(res.data.status);
    };
    makePostRequest(token, data);
    setLoading(false);
    
    // const delayInMilliseconds = 50000; //5 seconds
    // setTimeout(function() {
    // }, delayInMilliseconds);
    // window.location.reload(true);
  };
  const sorted_data = data.sort((a, b) => b.user_Time - a.user_Time)
  const tableData = sorted_data.map((res, index) => {
    const data_needed = {
      id: res.id,
      type: res.type,
    };

    return (
      <TableRow  className={classes.table} key={index}>
        <TableCell xs={10} align="left" id="user">
          {res.user}
        </TableCell>
        <TableCell xs={10} align="left" id="coupon">
          {res.coupon}
        </TableCell>
        <TableCell xs={10} align="left" id="Description">
          {res.Description}
        </TableCell>
        <TableCell xs={10} align="left" id="value">
          {res.Time} off
        </TableCell>
        <TableCell>
        <Select xs={10}
          labelId="Select Gender"
          id="Gender"
          placeholder="Select Gender"
          onChange={e => setGender(e.target.value)}
          required
        > 
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        </TableCell>
        <TableCell>
        <TextField
          // autoFocus
          width= ""
          margin="dense"
          id="address"
          label="User Address"
          type="address"
          fullWidth
          onChange={e => setaddress(e.target.value)}
          required
        /> 
        </TableCell>
        <TableCell align="left">
          <Button
            id={res.id}
            type={res.type}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSubmit}
          >
            Deliver
          </Button>

          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            { loading ? <TableLoader /> : 
            <div>
            <DialogContent>
              <DialogContentText>
                Status : {status}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
          </div>}
              
          </Dialog>
              
        </TableCell>
      </TableRow>
    );
  });

  return (
    <DashLayout>
      {" "}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          fullWidth
        >
          <TableHead align="justify">
            <TableRow >
              <TableCell align="left">Users</TableCell>
              <TableCell align="left">Coupon</TableCell>
              <TableCell  align="left">Description</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell size="large" align="left">Address</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          {loading ? <TableLoader /> : <TableBody>{tableData}</TableBody>}
        </Table>
      </TableContainer>
    </DashLayout>
  );
};

export default TapDashboard;

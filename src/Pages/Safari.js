import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Container from "@material-ui/core/Container";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableLoader from "../components/Shared/TableLoader";

const Safari = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_TUNU}/safari`);
        // update state using data from backend
        console.log("RES IS: ", res);
        setData(res.data.location_name);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("An unknown error occurred, please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tableData = data.map((res, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="left">{res.End_date}</TableCell>
        <TableCell align="left">{res.End_date}</TableCell>
        <TableCell align="left">{res.latitude}</TableCell>
        <TableCell align="left">{res.longitude} off</TableCell>
        <TableCell align="left">{res.valid}</TableCell>
      </TableRow>
    );
  });
  return (
    <Container>
      <TableHead>
        <TableRow>
          <TableCell align="left">End date</TableCell>
          <TableCell align="left">Start date</TableCell>
          <TableCell align="left">Latitude</TableCell>
          <TableCell align="left">longitude</TableCell>
          <TableCell align="left">name</TableCell>
        </TableRow>
      </TableHead>
      {loading ? <TableLoader /> : <TableBody>{tableData}</TableBody>}
    </Container>
  );
};

export default Safari;

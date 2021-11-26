import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext/AuthContext";
import { HOME } from "../routes";
import Spinner from "../components/Shared/Spinner";
import MainLayout from "../components/Layouts/MainLayout";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Coupons = () => {
  const history = useHistory();

  // destructure from auth context
  const { loading, isAuthenticated, user, loadUser } = useContext(AuthContext);

  // Load user from be using the token in local storage
  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <Spinner />;

  // if not authenticated
  if (!isAuthenticated) {
    return history.push(HOME);
  }

  return (
    <MainLayout>
      <Container>
        <TableHead>
          <TableRow>
            <TableCell align="left"> Coupon</TableCell>
            <TableCell align="left">Start date</TableCell>
            <TableCell align="left">End date</TableCell>
            <TableCell align="left">Total Remaining</TableCell>
          </TableRow>
        </TableHead>
      </Container>
    </MainLayout>
  );
};

export default Coupons;

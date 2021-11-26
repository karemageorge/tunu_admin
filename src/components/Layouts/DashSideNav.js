import React, { useContext } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../context/AuthContext/AuthContext";
import AdminMenu from "../../components/Dashboard/AdminDashboard/AdminMenu";
import { REDEEMED, DASHBOARD } from "../../routes";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DashSideNav = () => {
  const classes = useStyles();

  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      <h2>
        Dashboard -{" "}
        {user && (
          <span style={{ textTransform: "uppercase", fontWeight: "400" }}>
            {user.role}
          </span>
        )}
      </h2>
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
          {user && user.role === "tap" && (
            <>
              <Typography variant="h6" component="h6">
                <Link
                  to={DASHBOARD}
                  style={{ textDecoration: "none", marginLeft: "1em" }}
                >
                  Dashboard 
                </Link>
              </Typography>
              <Typography variant="h6" component="h6">
                <Link
                  to={REDEEMED}
                  style={{ color:"black", textDecoration: "none", marginLeft: "1em" }}
                >
                  Delivered 
                </Link>
              </Typography>
            </>
          )}
        </CardContent>

        {user && user.role === "Admin" && <AdminMenu />}

        <CardActions>
          <Button size="small" onClick={handleLogOut}>
            Log Out
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default DashSideNav;

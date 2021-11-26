import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AuthContext from "../context/AuthContext/AuthContext";
import MainLayout from "../components/Layouts/MainLayout";
import MenuItem from "@material-ui/core/MenuItem";
import { DASHBOARD } from "../routes";

const HomePage = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();

  // Dropdown user role state
  // tunu or tap
  const [role, setRole] = useState("tunu");

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}user/${role}/login`,
        data,
      });

      console.log("STATUS: ", res.data.status);
      if (res.data.status === "error") {
        toast.error(res.data.msg);
      } else {
        // successful login
        // Set token to local storage
        setToken(res.data.msg);
        // Redirect to dashboard
        history.push(DASHBOARD);
      }

      console.log("Response from server is: ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const roles = [
    {
      value: "tunu",
      label: "Admin",
    },
    {
      value: "tap",
      label: "Tap And Shop",
    },
  ];

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Username"
              required
              fullWidth
              id="user"
              // label="user"
              name="user"
              autoComplete="user"
              autoFocus
              inputRef={register({
                required: true,
              })}
            />
            {errors.user && <span>Username is required</span>}

            <TextField
              variant="outlined"
              label="Password"
              margin="normal"
              required
              fullWidth
              name="password"
              // label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                required: true,
              })}
            />
            {errors.password && <span>Password is required</span>}

            <TextField
              variant="outlined"
              name="role"
              label="User role"
              margin="normal"
              select
              fullWidth
              value={role}
              onChange={handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? contact Admin"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </MainLayout>
  );
};

export default HomePage;

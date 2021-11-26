import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext/AuthContext";
import { HOME } from "../routes";
import Spinner from "../components/Shared/Spinner";
import MainLayout from "../components/Layouts/MainLayout";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const AddSafari = () => {
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
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            label="safari"
            required
            fullWidth
            id="name"
            name="safari"
            autoComplete="safari"
            autoFocus
          />
          {errors.safari && <span>Safari is required</span>}

          <TextField
            id="Start_date"
            label="Start Date"
            type="datetime-local"
            defaultValue="2020-06-29T00:00"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.Start_date && <span>Start date is required</span>}
          <TextField
            id="End_date"
            label="End Date"
            type="datetime-local"
            defaultValue="2020-06-29T00:00"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.End_date && <span>End date is required</span>}
          <TextField
            id="latitude"
            label="Latitude"
            style={{ margin: 8 }}
            placeholder="Enter Safari name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.latitude && <span>latitude is required</span>}
          <TextField
            id="longitude"
            label="Longitude"
            input="number"
            style={{ margin: 8 }}
            placeholder="Enter Safari name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.longitude && <span>longitude is required</span>}
          <Button type="submit" fullWidth variant="contained" color="primary">
            submit
          </Button>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AddSafari;

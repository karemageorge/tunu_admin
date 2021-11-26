import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { HOME } from "../routes";
import Spinner from "../components/Shared/Spinner";
import MainLayout from "../components/Layouts/MainLayout";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const AddOutlet = () => {
  const history = useHistory();

  // destructure from auth context
  const { loading, isAuthenticated, loadUser } = useContext(AuthContext);

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
            label="partner"
            required
            fullWidth
            id="partner"
            name="partner"
            autoComplete="partner"
            autoFocus
          />
          {errors.partner && <span>Partner name is required</span>}
          <TextField
            id="outlet"
            label="outlet"
            style={{ margin: 8 }}
            placeholder="Enter outlet name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.outlet && <span>outlet is required</span>}

          <Button type="submit" fullWidth variant="contained" color="primary">
            submit
          </Button>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AddOutlet;

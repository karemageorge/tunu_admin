import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../context/AuthContext/AuthContext";
import MainLayout from "../components/Layouts/MainLayout";
import MenuItem from "@material-ui/core/MenuItem";
import DashLayout from "../components/Layouts/DashboardLayout";

const Safari = () => {
  const { register, handleSubmit, errors } = useForm();

  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accepted files are: ", acceptedFiles[0]);
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (data) => {
    console.log("Data submitted is: ", data);
    console.log("IMAGE IS: ", image);
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_TUNU}/partner`,
        data: {
          partner: data.partner,
          Description: data.description,
          logo: image,
        },
      });

      if (res.data.status === "error") {
        toast.error(res.data.msg);
      } else {
        toast.success("Success");
      }

      console.log("add partner res is : ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashLayout>
      <Container>
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              Add Partner
            </Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Partner"
                required
                fullWidth
                id="partner"
                name="partner"
                autoComplete="partner"
                autoFocus
                inputRef={register({
                  required: true,
                })}
              />
              {errors.partner && <span>Partner is required</span>}

              <TextField
                variant="outlined"
                label="Description"
                margin="normal"
                required
                fullWidth
                name="description"
                type="text"
                id="description"
                autoComplete="description"
                inputRef={register({
                  required: true,
                })}
              />
              {errors.description && <span>Description is required</span>}

              <div {...getRootProps()}>
                <input {...getInputProps()} accept="image/png, image/jpeg" />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Logo</p>}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </Container>
    </DashLayout>
  );
};

export default Safari;

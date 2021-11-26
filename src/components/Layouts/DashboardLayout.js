import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import DashSideNav from "./DashSideNav";

export default function Dashboard(props) {
  const { children } = props;
  return (
    <Container style={{ padding: "10px" }}>
      <Grid container spacing={1}>
        <Grid item xs={2} style={{ height: "100vh" }}>
          <DashSideNav />
        </Grid>
        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

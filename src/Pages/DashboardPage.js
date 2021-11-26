import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext/AuthContext";
import TapDashboard from "../components/Dashboard/TapDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import Spinner from "../components/Shared/Spinner";

const DashboardPage = () => {
  // destructure from auth context
  const { loading, user, loadUser } = useContext(AuthContext);

  // Load user from be using the token in local storage
  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <Spinner />;

  if (user.role === "tap") {
    return <TapDashboard />;
  } else if (user.role === "Admin") {
    return <AdminDashboard />;
  } else {
    toast.error("Something went wrong... please try again later");
  }
};

export default DashboardPage;

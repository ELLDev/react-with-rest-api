import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import UpdateCourse from "./components/UpdateCourse";

const PrivateCreateCourseRoute = () => {
  const navigate = useNavigate();
  const { authorizedUser } = useContext(Context);

  useEffect(() => {
    if (!authorizedUser) {
      navigate("/signin");
    }
  }, [authorizedUser, navigate]);

  return <UpdateCourse />;
};

export default PrivateCreateCourseRoute;

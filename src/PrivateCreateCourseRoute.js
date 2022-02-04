import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import CreateCourse from "./components/CreateCourse";

const PrivateCreateCourseRoute = () => {
  const navigate = useNavigate();
  const { authorizedUser } = useContext(Context);

  useEffect(() => {
    if (!authorizedUser) {
      navigate("/signin");
    }
  }, [authorizedUser, navigate]);

  return <CreateCourse />;
};

export default PrivateCreateCourseRoute;

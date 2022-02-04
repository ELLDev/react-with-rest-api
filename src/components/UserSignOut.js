import { useContext, useEffect } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router";

const UserSignOut = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.signOut();
    navigate("/");
  }, [actions, navigate]);
  return null;
};

export default UserSignOut;

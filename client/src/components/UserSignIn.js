import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../Context";

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { actions, authorizedUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizedUser) {
      navigate("/");
    }
  });

  function submit() {
    const credentials = {
      username: emailAddress,
      password: password,
    };
    actions.signIn(credentials);

    actions
      .signIn(credentials)
      .then(() => {
        navigate(-1);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  function handleEmailAddressInput(e) {
    setEmailAddress(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            onChange={handleEmailAddressInput}
            id="emailAddress"
            name="emailAddress"
            defaultValue=""
            required=""
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handlePasswordInput}
            id="password"
            name="password"
            defaultValue=""
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link to="/">
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;

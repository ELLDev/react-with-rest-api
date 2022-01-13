import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../Context";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState([]);
  const { data, actions } = useContext(Context);
  const navigate = useNavigate();

  function registerUser() {
    const body = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    data
      .createUser("/users", body)
      .then(() => {
        actions.signIn({
          username: emailAddress,
          password: password,
        });
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 400) {
          setErr(error.response.data.errors);
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
    e.currentTarget.reset();
  }
  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
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
        <h2>Sign Up</h2>

        {err.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {err.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            onChange={handleFirstName}
            id="firstName"
            name="firstName"
            value={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            onChange={handleLastName}
            id="lastName"
            name="lastName"
            value={lastName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            onChange={handleEmailAddressInput}
            id="emailAddress"
            name="emailAddress"
            value={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handlePasswordInput}
            id="password"
            name="password"
            value={password}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <Link to="/">
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
        <p>
          Already have a user account? Click here to
          <Link to="/signin"> sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

import React, { useState } from "react";
import axios from "axios";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  function registerUser() {
    const json = JSON.stringify({
      firstName,
      lastName,
      emailAddress,
      password,
    });
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(`http://127.0.0.1:5000/api/users`, json, { headers })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
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

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            onChange={handleFirstName}
            id="firstName"
            name="firstName"
            defaultValue=""
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            onChange={handleLastName}
            id="lastName"
            name="lastName"
            defaultValue=""
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            onChange={handleEmailAddressInput}
            id="emailAddress"
            name="emailAddress"
            defaultValue=""
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
            Sign Up
          </button>
          <button
            className="button button-secondary"
            // onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <a href="sign-in.html">sign in</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

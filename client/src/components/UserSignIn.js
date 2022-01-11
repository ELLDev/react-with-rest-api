import React from "react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            type="email"
            name="emailAddress"
            defaultValue=""
            required=""
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
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

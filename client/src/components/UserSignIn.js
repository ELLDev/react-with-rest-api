import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSignIn = () => {
  // const [coursesData, setCoursesData] = useState([]);

  // useEffect(() => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   axios
  //     .get(`http://127.0.0.1:5000/api/courses`, { headers })
  //     .then((response) => {
  //       setCoursesData(response.data.courses);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching and parsing data", error);
  //     });
  // }, []);

  // let courses = coursesData.map((course) => (
  //   <a
  //     className="course--module course--link"
  //     href="course-detail.html"
  //     key={course.id}
  //   >
  //     <h2 className="course--label">Course</h2>
  //     <h3 className="course--title">{course.title}</h3>
  //   </a>
  // ));

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
          <button
            className="button button-secondary"
            // onClick={()=>event.preventDefault() location.href='index.html'}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to
          <a href="sign-up.html">sign up</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;

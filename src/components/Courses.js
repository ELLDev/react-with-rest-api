import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiBaseUrl from "./config";

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${apiBaseUrl}/courses`, { headers })
      .then((response) => {
        setCoursesData(response.data.courses);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }, []);

  let courses = coursesData.map((course) => (
    <React.Fragment key={course.id}>
      <Link
        to={"/courses/" + course.id}
        className="course--module course--link"
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    </React.Fragment>
  ));
  return (
    <main>
      <div className="wrap main--grid">
        {courses}

        <Link
          to={"/courses/create"}
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;

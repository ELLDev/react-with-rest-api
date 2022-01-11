import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseDetail = (props) => {
  const id = props.courseId;
  const [course, setCourse] = useState({});
  const [courseUser, setCourseUser] = useState({});

  useEffect(() => {
    console.log(course);

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`http://127.0.0.1:5000/api/courses/${id}`, { headers })
      .then((response) => {
        setCourse(response.data.course);
        setCourseUser(response.data.course.users);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    }, []);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">
            Update Course
          </a>
          <a className="button" href="#">
            Delete Course
          </a>
          <a className="button button-secondary" href="index.html">
            Return to List
          </a>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {courseUser.firstName} {courseUser.lastName}
              </p>
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {course.materialsNeeded}
                {/* <li>1/2 x 3/4 inch parting strip</li>
            <li>1 x 2 common pine</li>
            <li>1 x 4 common pine</li>
            <li>1 x 10 common pine</li>
            <li>1/4 inch thick lauan plywood</li>
            <li>Finishing Nails</li>
            <li>Sandpaper</li>
            <li>Wood Glue</li>
            <li>Wood Filler</li>
            <li>Minwax Oil Based Polyurethane</li> */}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;

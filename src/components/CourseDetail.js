import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Context } from "../Context";
import ReactMarkDown from "react-markdown";

const CourseDetail = () => {
  const id = useParams().id;
  const { data, credentials } = useContext(Context);
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [courseUser, setCourseUser] = useState({});
  const [isCourseOwner, setIsCourseOwner] = useState(false);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`https://course-management-rest-api.herokuapp.com/api/courses/${id}`, { headers })
      .then((response) => {
        setCourse(response.data.course);
        setCourseUser(response.data.course.users);
        if (response.data.course.users.id === parseInt(localStorage.userId)) {
          setIsCourseOwner(true);
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }, [id]);

  const deleteCourse = () => {
    data.deleteCourse("/courses/" + id, credentials).then(() => {
      navigate("/");
    });
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {isCourseOwner && (
            <>
              <Link to={"/courses/" + course.id + "/update"} className="button">
                Update Course
              </Link>
              <button className="button" onClick={deleteCourse}>
                Delete Course
              </button>
            </>
          )}
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
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
              <ReactMarkDown>{course.description}</ReactMarkDown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkDown>{course.materialsNeeded}</ReactMarkDown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;

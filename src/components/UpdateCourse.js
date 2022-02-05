import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../Context";
import { useNavigate, Link, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const { data, credentials } = useContext(Context);
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`https://course-management-rest-api.herokuapp.com/api/courses/${id}`, { headers })
      .then((response) => {
        setTitle(response.data.course.title);
        setEstimatedTime(response.data.course.estimatedTime);
        setDescription(response.data.course.description);
        setMaterialsNeeded(response.data.course.materialsNeeded);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }, [id]);

  function updateCourse() {
    const body = {
      id,
      title,
      estimatedTime,
      description,
      materialsNeeded,
    };

    data
      .updateCourse("/courses/" + id, body, credentials)
      .then(() => {
        navigate("/courses/" + id);
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
    updateCourse();
    e.currentTarget.reset();
  }
  function handleTitleInput(e) {
    setTitle(e.target.value);
  }
  function handleEstimatedTimeInput(e) {
    setEstimatedTime(e.target.value);
  }
  function handleDescriptionTextArea(e) {
    setDescription(e.target.value);
  }
  function handleMaterialsNeededTextArea(e) {
    setMaterialsNeeded(e.target.value);
  }

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>

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
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                type="text"
                onChange={handleTitleInput}
                id="courseTitle"
                name="courseTitle"
                value={title}
              />

              <p>By Author Name</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                onChange={handleDescriptionTextArea}
                id="courseDescription"
                name="courseDescription"
                value={description}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                type="text"
                onChange={handleEstimatedTimeInput}
                id="estimatedTime"
                name="estimatedTime"
                value={estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                onChange={handleMaterialsNeededTextArea}
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <Link to="/">
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;

import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate, Link } from "react-router-dom";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [err, setErr] = useState([]);
  let { data, credentials } = useContext(Context);
  const navigate = useNavigate();

  function registerCourse() {
    const body = {
      title,
      estimatedTime,
      description,
      materialsNeeded,
      userId: localStorage.userId,
    };
    data
      .createCourse("/courses", body, credentials)
      .then(() => {
        navigate("/courses/create");
        setTitle("");
        setEstimatedTime("");
        setDescription("");
        setMaterialsNeeded("");
        setErr([]);
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
    registerCourse();
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
        <h2>Create Course</h2>

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
              ></textarea>
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
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <Link to="/">
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;

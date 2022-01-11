import React, { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  function registerCourse() {
    const json = JSON.stringify({
      title,
      estimatedTime,
      description,
      materialsNeeded,
    });
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(`http://127.0.0.1:5000/api/courses`, json, { headers })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
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
        {/* <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                type="text"
                onChange={handleTitleInput}
                id="courseTitle"
                name="courseTitle"
                defaultValue=""
              />

              <p>By Author Name</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                onChange={handleDescriptionTextArea}
                id="courseDescription"
                name="courseDescription"
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                type="text"
                onChange={handleEstimatedTimeInput}
                id="estimatedTime"
                name="estimatedTime"
                defaultValue=""
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                onChange={handleMaterialsNeededTextArea}
                id="materialsNeeded"
                name="materialsNeeded"
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button-secondary"
            // onclick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;

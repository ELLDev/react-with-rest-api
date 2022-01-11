import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const id = useParams().id;
  const [title, setTitle] = useState("New Updated Title");
  const [estimatedTime, setEstimatedTime] = useState("20h");
  const [description, setDescription] = useState("updated rats and queso");
  const [materialsNeeded, setMaterialsNeeded] = useState("chiss");
  const [userId, setUserId] = useState("1");

  function updateCourse() {
    const json = JSON.stringify({
      id,
      title,
      estimatedTime,
      description,
      materialsNeeded,
      userId,
    });
    const headers = {
      "Content-Type": "application/json",
      // Authorization: {
      //   name: "joe@smith.com",
      //   pass: "joepassword",
      // },
    };
    // const credentials = {
    //   name: "joe@smith.com",
    //   pass: "joepassword",
    // };
    console.log(json);
    // console.log(credentials);
    axios
      .put(`http://127.0.0.1:5000/api/courses/${id}`, json, { headers })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
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
              />
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

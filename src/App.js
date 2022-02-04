import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// App components
import Header from "./components/Header";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateCreateCourseRoute from "./PrivateCreateCourseRoute";
import PrivateUpdateCourseRoute from "./PrivateUpdateCourseRoute";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route exact path="/" element={<Courses />} />
            <Route
              path="/courses/create"
              element={<PrivateCreateCourseRoute />}
            />
            <Route
              path="/courses/:id/update"
              element={<PrivateUpdateCourseRoute />}
            />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signout" element={<UserSignOut />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;

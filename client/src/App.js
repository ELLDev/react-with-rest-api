import React, { Component } from "react";
import axios from "axios";

// App components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";

class App extends Component {
  render() {
    return (  
      <>
        <Header />
        {/* <Courses /> */}
        {/* <CourseDetail courseId="1" /> */}
        {/* <UserSignIn /> */}
        {/* <UserSignUp /> */}
        <CreateCourse />

      </>
    );
  }
}

export default App;

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  COURSE_URL,
  HOME_URL,
  LECTURER_URL,
  SEMESTER_URL,
  STUDENT_URL,
  STUDENT_ENROLLMENT_URL,
  UPLOAD_DOCUMENT_URL,
  SEND_EMAIL_URL,
  SEMESTER_Details_URL,
  COURSE_Details_URL,
  LECTURER_Details_URL,
  CLASSROOM_URL,
  CLASSROOM_Details_URL,
  STUDENT_Details_URL,
  STUDENT_ENROLLMENT_Details_URL,
} from "../../common/constant";
import Home from "../Home/home";
import Semester from "../Semester";
import SemesterDetails from "../Semester/component/SemesterDetails";
import DocumentUploader from "../DocumentUploader";
import Course from "../Course/Course";
import CourseDetails from "../Course/CourseDetails";
import Lecturer from "../Lecturer/Lecturer";
import LecturerDetails from "../Lecturer/LecturerDetails";
import Classroom from "../Classroom/Classroom";
import ClassroomDetails from "../Classroom/ClassroomDetails";
import StudentDetails from "../Student/StudentDetails";
import Student from "../Student/Student";
import StudentEnrollment from "../StudentEnrollment/StudentEnrollment";
import StudentEnrollmentDetails from "../StudentEnrollment/StudentEnrollmentDetails";

const Menu = () => (
  <BrowserRouter>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Student Grade Book
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={HOME_URL}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={SEMESTER_URL}>
            Semester
          </Nav.Link>
          <Nav.Link as={Link} to={COURSE_URL}>
            Course
          </Nav.Link>
          <Nav.Link as={Link} to={LECTURER_URL}>
            Lecturer
          </Nav.Link>
          <Nav.Link as={Link} to={CLASSROOM_URL}>
            Class
          </Nav.Link>
          <Nav.Link as={Link} to={STUDENT_URL}>
            Student
          </Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to={STUDENT_ENROLLMENT_URL}>
              Student Enrollment
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={UPLOAD_DOCUMENT_URL}>
              Upload Document
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={SEND_EMAIL_URL}>
              Send Email
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Routes>
      <Route path={HOME_URL} element={<Home />} />
      <Route path={SEMESTER_URL} element={<Semester />} />
      <Route path={SEMESTER_Details_URL} element={<SemesterDetails />} />

      <Route path={COURSE_URL} element={<Course />} />
      <Route path={COURSE_Details_URL} element={<CourseDetails />} />

      <Route path={LECTURER_URL} element={<Lecturer />} />
      <Route path={LECTURER_Details_URL} element={<LecturerDetails />} />

      <Route path={CLASSROOM_URL} element={<Classroom />} />
      <Route path={CLASSROOM_Details_URL} element={<ClassroomDetails />} />

      <Route path={STUDENT_URL} element={<Student />} />
      <Route path={STUDENT_Details_URL} element={<StudentDetails />} />

      <Route path={STUDENT_ENROLLMENT_URL} element={<StudentEnrollment />} />
      <Route
        path={STUDENT_ENROLLMENT_Details_URL}
        element={<StudentEnrollmentDetails />}
      />

      <Route path={UPLOAD_DOCUMENT_URL} element={<DocumentUploader />} />
      <Route path={SEND_EMAIL_URL} element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default Menu;

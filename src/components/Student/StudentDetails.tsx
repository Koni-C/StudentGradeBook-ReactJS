import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import useStudentDetails from "./hooks/useStudentDetails";
import { useNavigate } from "react-router-dom";
import { STUDENT_URL } from "../../common/constant";

const StudentDetails = () => {
  const location = useLocation();
  const StudentId = location.state.Student_id;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    student_ID: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    user: "",
  });

  const {
    deleteStudentDetail,
    putStudentDetail,
    fetchStudentDetail,
    fetchData,
    fetchStatus,
    deleteStatus,
    putStatus,
  } = useStudentDetails(StudentId);

  useEffect(() => {
    fetchStudentDetail();
  }, [StudentId]);

  useEffect(() => {
    if (fetchStatus === "success") {
      setFormValues({
        student_ID: fetchData.student_ID,
        first_name: fetchData.first_name,
        last_name: fetchData.last_name,
        email: fetchData.email,
        dob: fetchData.dob,
        user: fetchData.user,
      });
    }
  }, [fetchStatus]);

  useEffect(() => {
    if (putStatus === "success" || deleteStatus === "success") {
      navigate(STUDENT_URL);
    }
  }, [deleteStatus, putStatus]);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Determine which submit button was clicked based on its name
    const buttonName = event.nativeEvent.submitter.name;

    if (buttonName === "delete") {
      deleteStudentDetail();
    } else if (buttonName === "update") {
      putStudentDetail(formValues);
    }
  };

  return (
    <>
      {fetchStatus === "success" ? (
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 col-sm-3" controlId="student_ID">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="student_ID"
              value={formValues.student_ID}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-sm-3" controlId="dob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="text"
              placeholder="dob"
              value={formValues.dob}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-sm-3" controlId="user">
            <Form.Label>User Account</Form.Label>
            <Form.Control
              type="text"
              placeholder="user"
              value={formValues.user}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button className="col-sm-3" type="submit" name="update">
            Update
          </Button>
          <Button className="col-sm-3" type="submit" name="delete">
            Delete
          </Button>
        </Form>
      ) : null}
    </>
  );
};

export default StudentDetails;

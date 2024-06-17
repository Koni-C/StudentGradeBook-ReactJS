import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import useStudentEnrollmentDetails from "./hooks/useStudentEnrollmentDetails";
import { useNavigate } from "react-router-dom";
import { STUDENT_ENROLLMENT_URL } from "../../common/constant";

const StudentEnrollmentDetails = () => {
  const location = useLocation();
  const StudentEnrollmentId = location.state.StudentEnrollment_id;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    student_ID: "",
    class_enrolled: "",
    grade: "",
    enroll_time: "",
    grade_time: "",
  });

  const {
    deleteStudentEnrollmentDetail,
    putStudentEnrollmentDetail,
    fetchStudentEnrollmentDetail,
    fetchData,
    fetchStatus,
    deleteStatus,
    putStatus,
  } = useStudentEnrollmentDetails(StudentEnrollmentId);

  useEffect(() => {
    fetchStudentEnrollmentDetail();
  }, [StudentEnrollmentId]);

  useEffect(() => {
    if (fetchStatus === "success") {
      setFormValues({
        student_ID: fetchData.student_ID,
        class_enrolled: fetchData.class_enrolled,
        grade: fetchData.grade,
        enroll_time: fetchData.enroll_time,
        grade_time: fetchData.grade_time,
      });
    }
  }, [fetchStatus]);

  useEffect(() => {
    if (putStatus === "success" || deleteStatus === "success") {
      navigate(StudentEnrollmentId);
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
      deleteStudentEnrollmentDetail();
    } else if (buttonName === "update") {
      putStudentEnrollmentDetail(formValues);
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
          <Form.Group className="mb-3 col-sm-3" controlId="class_enrolled">
            <Form.Label>Class Enrolled</Form.Label>
            <Form.Control
              type="text"
              placeholder="class_enrolled"
              value={formValues.class_enrolled}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              placeholder="grade"
              value={formValues.grade}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="enroll_time">
            <Form.Label>Enroll Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="enroll_time"
              value={formValues.enroll_time}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-sm-3" controlId="grade_time">
            <Form.Label>Grade Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="grade_time"
              value={formValues.grade_time}
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

export default StudentEnrollmentDetails;

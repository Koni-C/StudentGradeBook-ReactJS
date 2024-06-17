import React, { useState, useEffect } from "react";
import useStudentEnrollment from "./hooks/useStudentEnrollment";
import Table from "react-bootstrap/Table";
import { StudentEnrollmentType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { STUDENT_ENROLLMENT_Details_URL } from "../../common/constant";

const StudentEnrollment = () => {
  const {
    fetchData,
    fetchStatus,
    fetchStudentEnrollment,
    updateStudentEnrollment,
    updateStatus,
  } = useStudentEnrollment();

  const [formValues, setFormValues] = useState({
    student_ID: "",
    class_enrolled: "",
    grade: "",
    enroll_time: "",
    grade_time: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchStudentEnrollment();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchStudentEnrollment();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateStudentEnrollment(formValues);
  };

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  return (
    <>
      <Form
        className="row align-items-center justify-content-center"
        onSubmit={handleSubmit}
      >
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

        <Button type="submit">Submit</Button>

        {updateStatus === "failure" ? (
          <>
            <div className="alert alert-danger" role="alert">
              Failed to get response
            </div>
          </>
        ) : null}

        {updateStatus === "success" ? (
          <>
            <div className="alert alert-success" role="alert">
              Successfully updated
            </div>
          </>
        ) : null}
      </Form>

      {fetchStatus === "success" ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Class Enrolled</th>
              <th>Grade</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map(
              (StudentEnrollment: StudentEnrollmentType, index: number) => {
                return (
                  <tr key={index}>
                    <td>{StudentEnrollment.student_ID}</td>
                    <td>{StudentEnrollment.class_enrolled}</td>
                    <td>{StudentEnrollment.grade}</td>
                    <td>
                      <Link
                        to={STUDENT_ENROLLMENT_Details_URL}
                        state={{ StudentEnrollment_id: StudentEnrollment.id }}
                      >
                        <Button>Detail</Button>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default StudentEnrollment;

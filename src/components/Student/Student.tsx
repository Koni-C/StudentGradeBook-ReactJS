import React, { useState, useEffect } from "react";
import useStudent from "./hooks/useStudent";
import Table from "react-bootstrap/Table";
import { StudentType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { STUDENT_Details_URL } from "../../common/constant";

const Student = () => {
  const { fetchData, fetchStatus, fetchStudent, updateStudent, updateStatus } =
    useStudent();

  const [formValues, setFormValues] = useState({
    student_ID: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    user: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchStudent();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateStudent(formValues);
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((Student: StudentType, index: number) => {
              return (
                <tr key={index}>
                  <td>{Student.student_ID}</td>
                  <td>{Student.first_name}</td>
                  <td>{Student.last_name}</td>
                  <td>
                    <Link
                      to={STUDENT_Details_URL}
                      state={{ Student_id: Student.id }}
                    >
                      <Button>Detail</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default Student;

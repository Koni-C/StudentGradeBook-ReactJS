import React, { useState, useEffect } from "react";
import useLecturer from "./hooks/useLecturer";
import Table from "react-bootstrap/Table";
import { LecturerType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { LECTURER_Details_URL } from "../../common/constant";

const Lecturer = () => {
  const {
    fetchData,
    fetchStatus,
    fetchLecturer,
    updateLecturer,
    updateStatus,
  } = useLecturer();

  const [formValues, setFormValues] = useState({
    staff_ID: "",
    first_name: "",
    last_name: "",
    email: "",
    courses: "",
    dob: "",
    user: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchLecturer();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchLecturer();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateLecturer(formValues);
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
        <Form.Group className="mb-3 col-sm-3" controlId="staff_ID">
          <Form.Label>Lecturer ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="staff_ID"
            value={formValues.staff_ID}
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
        <Form.Group className="mb-3 col-sm-3" controlId="courses">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="courses"
            value={formValues.courses}
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
              <th>Lecturer ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((Lecturer: LecturerType, index: number) => {
              return (
                <tr key={index}>
                  <td>{Lecturer.staff_ID}</td>
                  <td>{Lecturer.first_name}</td>
                  <td>{Lecturer.last_name}</td>
                  <td>
                    <Link
                      to={LECTURER_Details_URL}
                      state={{ Lecturer_id: Lecturer.id }}
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

export default Lecturer;

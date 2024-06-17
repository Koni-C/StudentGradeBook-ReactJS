import React, { useState, useEffect } from "react";
import useClassroom from "./hooks/useClassroom";
import Table from "react-bootstrap/Table";
import { ClassroomType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CLASSROOM_Details_URL } from "../../common/constant";

const Classroom = () => {
  const {
    fetchData,
    fetchStatus,
    fetchClassroom,
    updateClassroom,
    updateStatus,
  } = useClassroom();

  const [formValues, setFormValues] = useState({
    classroom_number: "",
    semester: "",
    course: "",
    lecturer: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchClassroom();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchClassroom();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateClassroom(formValues);
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
        <Form.Group className="mb-3 col-sm-3" controlId="classroom_number">
          <Form.Label>Classroom Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="classroom_number"
            value={formValues.classroom_number}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-sm-3" controlId="semester">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            type="text"
            placeholder="semester"
            value={formValues.semester}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-sm-3" controlId="course">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="course"
            value={formValues.course}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-sm-3" controlId="lecturer">
          <Form.Label>Lecturer</Form.Label>
          <Form.Control
            type="text"
            placeholder="lecturer"
            value={formValues.lecturer}
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
              <th>Classroom Number</th>
              <th>Semester</th>
              <th>Course</th>
              <th>Lecturer</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((Classroom: ClassroomType, index: number) => {
              return (
                <tr key={index}>
                  <td>{Classroom.classroom_number}</td>
                  <td>{Classroom.semester}</td>
                  <td>{Classroom.course}</td>
                  <td>{Classroom.lecturer}</td>
                  <td>
                    <Link
                      to={CLASSROOM_Details_URL}
                      state={{ Classroom_id: Classroom.id }}
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

export default Classroom;

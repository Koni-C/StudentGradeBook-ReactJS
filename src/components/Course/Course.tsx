import React, { useState, useEffect } from "react";
import useCourse from "./hooks/useCourse";
import Table from "react-bootstrap/Table";
import { CourseType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { COURSE_Details_URL, COURSE_URL } from "../../common/constant";

const Course = () => {
  const { fetchData, fetchStatus, fetchCourse, updateCourse, updateStatus } =
    useCourse();

  const [formValues, setFormValues] = useState({
    course_code: "",
    course_name: "",
    semester: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchCourse();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    //format payload
    const payload = {
      ...formValues,
      semesters: [formValues.semester],
    };
    updateCourse(payload);
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
        <Form.Group className="mb-3 col-sm-3" controlId="course_code">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="couse code"
            value={formValues.course_code}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-sm-3" controlId="course_name">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="course name"
            value={formValues.course_name}
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
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((Course: CourseType, index: number) => {
              return (
                <tr key={index}>
                  <td>{Course.course_code}</td>
                  <td>{Course.course_name}</td>
                  <td>
                    <Link
                      to={COURSE_Details_URL}
                      state={{ Course_id: Course.id }}
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

export default Course;

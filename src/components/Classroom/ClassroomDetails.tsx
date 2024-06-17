import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import useClassroomDetails from "./hooks/useClassroomDetails";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_URL } from "../../common/constant";

const ClassroomDetails = () => {
  const location = useLocation();
  const ClassroomId = location.state.Classroom_id;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    classroom_number: "",
    semester: "",
    course: "",
    lecturer: "",
  });

  const {
    deleteClassroomDetail,
    putClassroomDetail,
    fetchClassroomDetail,
    fetchData,
    fetchStatus,
    deleteStatus,
    putStatus,
  } = useClassroomDetails(ClassroomId);

  useEffect(() => {
    fetchClassroomDetail();
  }, [ClassroomId]);

  useEffect(() => {
    if (fetchStatus === "success") {
      setFormValues({
        classroom_number: fetchData.classroom_number,
        semester: fetchData.semester,
        course: fetchData.course,
        lecturer: fetchData.lecturer,
      });
    }
  }, [fetchStatus]);

  useEffect(() => {
    if (putStatus === "success" || deleteStatus === "success") {
      navigate(CLASSROOM_URL);
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
      deleteClassroomDetail();
    } else if (buttonName === "update") {
      putClassroomDetail(formValues);
    }
  };

  return (
    <>
      {fetchStatus === "success" ? (
        <Form className="row" onSubmit={handleSubmit}>
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

export default ClassroomDetails;

import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import useCourseDetails from "./hooks/useCourseDetails";
import { useNavigate } from "react-router-dom";
import { COURSE_URL } from "../../common/constant";

const CourseDetails = () => {
  const location = useLocation();
  const courseId = location.state.Course_id;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    course_code: "",
    course_name: "",
    semester: 1,
  });

  const {
    deleteCourseDetail,
    putCourseDetail,
    fetchCourseDetail,
    fetchData,
    fetchStatus,
    deleteStatus,
    putStatus,
  } = useCourseDetails(courseId);

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  useEffect(() => {
    if (fetchStatus === "success") {
      setFormValues({
        course_code: fetchData.course_code,
        course_name: fetchData.course_name,
        semester: fetchData.semesters[0],
      });
    }
  }, [fetchStatus]);

  useEffect(() => {
    if (putStatus === "success" || deleteStatus === "success") {
      navigate(COURSE_URL);
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
      deleteCourseDetail();
    } else if (buttonName === "update") {
      const payload = {
        ...formValues,
        semesters: [formValues.semester],
      };
      putCourseDetail(payload);
    }
  };

  return (
    <>
      {fetchStatus === "success" ? (
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 col-sm-3" controlId="course_code">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course code"
              value={formValues.course_code}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="course_name">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course name"
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

export default CourseDetails;

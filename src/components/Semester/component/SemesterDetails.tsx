import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import useSemesterDetails from "../hooks/useSemesterDetails";
import { useNavigate } from "react-router-dom";
import { SEMESTER_URL } from "../../../common/constant";

const SemesterDetails = () => {
  const location = useLocation();
  const semesterId = location.state.semester_id;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    year: 0,
    semester_number: 0,
  });

  const {
    deleteSemesterDetail,
    putSemesterDetail,
    fetchSemesterDetail,
    fetchData,
    fetchStatus,
    deleteStatus,
    putStatus,
  } = useSemesterDetails(semesterId);

  useEffect(() => {
    fetchSemesterDetail();
  }, [semesterId]);

  useEffect(() => {
    if (fetchStatus === "success") {
      setFormValues({
        year: Number(fetchData.year),
        semester_number: Number(fetchData.semester_number),
      });
    }
  }, [fetchStatus]);

  useEffect(() => {
    if (putStatus === "success" || deleteStatus === "success") {
      navigate(SEMESTER_URL);
    }
  }, [deleteStatus, putStatus]);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: Number(value) });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Determine which submit button was clicked based on its name
    const buttonName = event.nativeEvent.submitter.name;

    if (buttonName === "delete") {
      deleteSemesterDetail();
    } else if (buttonName === "update") {
      putSemesterDetail(formValues);
    }
  };

  return (
    <>
      {fetchStatus === "success" ? (
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 col-sm-3" controlId="year">
            <Form.Label>Semester year</Form.Label>
            <Form.Control
              type="text"
              inputMode="numeric"
              placeholder="semester year"
              value={formValues.year}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-sm-3" controlId="semester_number">
            <Form.Label>Semester number</Form.Label>
            <Form.Control
              type="text"
              inputMode="numeric"
              placeholder="semester number"
              value={formValues.semester_number}
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

export default SemesterDetails;

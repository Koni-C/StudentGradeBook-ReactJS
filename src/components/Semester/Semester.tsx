import React, { useState, useEffect } from "react";
import useSemester from "./hooks/useSemester";
import Table from "react-bootstrap/Table";
import { SemesterType } from "../../common/type";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SEMESTER_Details_URL } from "../../common/constant";

const Semester = () => {
  const {
    fetchData,
    fetchStatus,
    fetchSemester,
    updateSemester,
    updateStatus,
  } = useSemester();

  const [formValues, setFormValues] = useState({
    year: "",
    semester_number: "",
  });

  useEffect(() => {
    if (updateStatus === "success") {
      fetchSemester();
    }
  }, [updateStatus]);

  useEffect(() => {
    fetchSemester();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateSemester(formValues);
  };

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: Number(value) });
  };

  return (
    <>
      <Form
        className="row align-items-center justify-content-center"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3 col-sm-3" controlId="year">
          <Form.Label>Semester year</Form.Label>
          <Form.Control
            type="text"
            placeholder="year"
            value={formValues.year}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-sm-3" controlId="semester_number">
          <Form.Label>Semester number</Form.Label>
          <Form.Control
            type="text"
            placeholder="number"
            value={formValues.semester_number}
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
              <th>Semester year</th>
              <th>Semester number</th>
              <th>Update / Remove</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((semester: SemesterType, index: number) => {
              return (
                <tr key={index}>
                  <td>{semester.year}</td>
                  <td>{semester.semester_number}</td>
                  <td>
                    <Link
                      to={SEMESTER_Details_URL}
                      state={{ semester_id: semester.id }}
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

export default Semester;

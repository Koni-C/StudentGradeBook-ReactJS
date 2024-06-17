import React from "react";
import { Button, Form } from "react-bootstrap";

const DocumentUploader = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const file = event.target.formFileLg.files[0];
    console.log("file", file);
  };
  return (
    <>
      <Form
        className="row align-items-center justify-content-center"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>File input</Form.Label>
          <Form.Control type="file" size="lg" />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default DocumentUploader;

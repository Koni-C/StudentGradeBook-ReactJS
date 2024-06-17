import React, { useState, useCallback } from "react";
import { StudentType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useStudent = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as StudentType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchStudent = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<StudentType[]>(
        "http://127.0.0.1:8000/api/student/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateStudent = async (newStudent: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest(
        "http://127.0.0.1:8000/api/student/",
        "POST",
        newStudent
      );

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateStudent,
    fetchStudent,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useStudent;

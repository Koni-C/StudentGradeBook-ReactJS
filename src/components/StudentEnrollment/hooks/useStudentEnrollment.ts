import React, { useState, useCallback } from "react";
import { StudentEnrollmentType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useStudentEnrollment = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as StudentEnrollmentType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchStudentEnrollment = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<StudentEnrollmentType[]>(
        "http://127.0.0.1:8000/api/studentEnrollment/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateStudentEnrollment = async (newStudentEnrollment: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest(
        "http://127.0.0.1:8000/api/studentEnrollment/",
        "POST",
        newStudentEnrollment
      );

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateStudentEnrollment,
    fetchStudentEnrollment,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useStudentEnrollment;

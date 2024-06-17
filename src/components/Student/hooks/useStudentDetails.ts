import React, { useState, useCallback } from "react";
import { StudentType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useStudentDetails = (StudentId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as StudentType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchStudentDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<StudentType>(
        `http://127.0.0.1:8000/api/student_detail/${StudentId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putStudentDetail = useCallback(
    async (newStudentDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/student_detail/${StudentId}/`,
          "PUT",
          newStudentDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [StudentId]
  );

  const deleteStudentDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/student_detail/${StudentId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [StudentId]);

  return {
    deleteStudentDetail,
    putStudentDetail,
    fetchStudentDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useStudentDetails;

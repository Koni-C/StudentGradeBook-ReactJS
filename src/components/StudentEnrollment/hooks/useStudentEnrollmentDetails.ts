import React, { useState, useCallback } from "react";
import { StudentEnrollmentType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useStudentEnrollmentDetails = (StudentEnrollmentId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as StudentEnrollmentType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchStudentEnrollmentDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<StudentEnrollmentType>(
        `http://127.0.0.1:8000/api/studentEnrollment_detail/${StudentEnrollmentId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putStudentEnrollmentDetail = useCallback(
    async (newStudentEnrollmentDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/studentEnrollment_detail/${StudentEnrollmentId}/`,
          "PUT",
          newStudentEnrollmentDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [StudentEnrollmentId]
  );

  const deleteStudentEnrollmentDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/studentEnrollment_detail/${StudentEnrollmentId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [StudentEnrollmentId]);

  return {
    deleteStudentEnrollmentDetail,
    putStudentEnrollmentDetail,
    fetchStudentEnrollmentDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useStudentEnrollmentDetails;

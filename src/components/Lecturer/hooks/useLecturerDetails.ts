import React, { useState, useCallback } from "react";
import { LecturerType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useLecturerDetails = (LecturerId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as LecturerType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchLecturerDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<LecturerType>(
        `http://127.0.0.1:8000/api/lecturer_detail/${LecturerId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putLecturerDetail = useCallback(
    async (newLecturerDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/lecturer_detail/${LecturerId}/`,
          "PUT",
          newLecturerDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [LecturerId]
  );

  const deleteLecturerDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/lecturer_detail/${LecturerId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [LecturerId]);

  return {
    deleteLecturerDetail,
    putLecturerDetail,
    fetchLecturerDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useLecturerDetails;

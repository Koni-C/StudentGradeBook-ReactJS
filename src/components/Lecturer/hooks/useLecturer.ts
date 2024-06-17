import React, { useState, useCallback } from "react";
import { LecturerType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useLecturer = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as LecturerType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchLecturer = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<LecturerType[]>(
        "http://127.0.0.1:8000/api/lecturer/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateLecturer = async (newLecturer: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest(
        "http://127.0.0.1:8000/api/lecturer/",
        "POST",
        newLecturer
      );

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateLecturer,
    fetchLecturer,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useLecturer;

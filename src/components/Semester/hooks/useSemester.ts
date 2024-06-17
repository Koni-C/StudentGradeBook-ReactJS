import React, { useState, useCallback } from "react";
import { SemesterType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useSemester = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as SemesterType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchSemester = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<SemesterType[]>(
        "http://127.0.0.1:8000/api/semester/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateSemester = async (newSemester: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest(
        "http://127.0.0.1:8000/api/semester/",
        "POST",
        newSemester
      );

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateSemester,
    fetchSemester,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useSemester;

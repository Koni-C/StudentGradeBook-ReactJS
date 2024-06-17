import React, { useState, useCallback } from "react";
import { SemesterType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useSemesterDetails = (semesterId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as SemesterType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchSemesterDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<SemesterType>(
        `http://127.0.0.1:8000/api/semester/${semesterId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putSemesterDetail = useCallback(
    async (newSemesterDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/semester/${semesterId}/`,
          "PUT",
          newSemesterDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [semesterId]
  );

  const deleteSemesterDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/semester/${semesterId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [semesterId]);

  return {
    deleteSemesterDetail,
    putSemesterDetail,
    fetchSemesterDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useSemesterDetails;

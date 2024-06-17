import React, { useState, useCallback } from "react";
import { ClassroomType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useClassroom = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as ClassroomType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchClassroom = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<ClassroomType[]>(
        "http://127.0.0.1:8000/api/classroom/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateClassroom = async (newClassroom: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest(
        "http://127.0.0.1:8000/api/classroom/",
        "POST",
        newClassroom
      );

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateClassroom,
    fetchClassroom,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useClassroom;

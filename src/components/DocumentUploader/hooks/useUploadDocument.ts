import React, { useState, useCallback } from "react";
import { SemesterType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

export const useUploadDocuments = () => {
  const [uploadStatus, setUploadStatus] = useState<StatusType>("idle");

  const uploadDocument = async (document: File) => {
    //     try {
    //       setUpdateStatus("pending");
    //       await apiRequest(
    //         "http://127.0.0.1:8000/api/semester/",
    //         "POST",
    //         newSemester
    //       );

    //       setUpdateStatus("success");
    //     } catch {
    //       setUpdateStatus("failure");
    //     }
    //   };

    return {
      uploadDocument,
    };
  };
};

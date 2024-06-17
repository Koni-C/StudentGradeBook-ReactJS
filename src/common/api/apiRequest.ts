import { HttpMethodType } from "../type";
import axios from "axios";
import { omitBy, isNil } from "lodash";

export const apiRequest = async <T>(
  url: string,
  method: HttpMethodType,
  body?: any,
  headers?: any
): Promise<T> => {
  try {
    const config = {
      method,
      url,
      data: body,
      headers: headers ?? {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
    };

    const updatedConfig = omitBy(config, isNil);

    const { data } = await axios.request<T>(updatedConfig);

    return data;
  } catch (error) {
    throw error;
  }
};

import * as React from "react";
import Env from "../constants/Env";
import axios from "axios";

const request = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: Env.SERVER_URI + endpoint,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default request;

import * as React from "react";
// import { SERVER_URI } from "../constants/Env";
import axios from "axios";
import { SERVER_URI } from "@env";

const request = async (endpoint, data, handleError) => {
  try {
    console.log('SERVER URI', SERVER_URI);
    const response = await axios({
      url: SERVER_URI + endpoint,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    return null;
  }
};

export default request;

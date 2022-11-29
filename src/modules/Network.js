import axios from "axios";
import { SERVER_URI } from "@env";

const getRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: SERVER_URI + endpoint,
      method: "get",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    return null;
  }
};

const postRequest = async (endpoint, data, handleError) => {
  try {
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

const putRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: SERVER_URI + endpoint,
      method: "put",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    return null;
  }
};

const deleteRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: SERVER_URI + endpoint,
      method: "delete",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    return null;
  }
};
export { getRequest, postRequest, putRequest, deleteRequest };

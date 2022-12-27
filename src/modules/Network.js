import axios from "axios";
import { SERVER_URI } from "@env";

const getRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: 'http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis' + endpoint,
      method: "get",
    });
    return response;
  } catch (error) {
    console.log(error);
    // handleError(error);
    return null;
  }
};

const postRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: 'http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis' + endpoint,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    // handleError(error);
    return null;
  }
};

const putRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: 'http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis' + endpoint,
      method: "put",
      data: {...data},
    });
    return response;
  } catch (error) {
    console.log(error);
    // handleError(error);
    return null;
  }
};

const deleteRequest = async (endpoint, data, handleError) => {
  try {
    const response = await axios({
      url: 'http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis' + endpoint,
      method: "delete",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    // handleError(error);
    return null;
  }
};
export { getRequest, postRequest, putRequest, deleteRequest };

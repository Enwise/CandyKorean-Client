import Network from "./Network";
/* Class */
export const getClasses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/class/getClasses",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const getClassById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/class/getClassById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const createClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/class/createClass",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const updateClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/class/updateClass",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/class/deleteClass",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Contents */
export const getContents = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/content/getContents",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const getContentById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/content/getContentById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const createContent = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/content/createContent",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const updateContent = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/content/updateContent",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteContent = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/content/deleteContent",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Courses */
export const getCourses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/course/getCourses",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const getCourseById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/course/getCourseById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};

export const createCourse = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/course/createCourse",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data.member);
    setIsReady(true);
  }
};
export const updateCourse = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/course/updateCourse",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const deleteCourse = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/course/deleteCourse",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Levels */
export const getLevels = async (reqParam, setData, setIsReady, handleError) => {
  const response = await Network.request(
    "/level/getLevels",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const getLevelById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/level/getLevelById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const createLevel = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/level/createLevel",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const updateLevel = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/level/updateLevel",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const deleteLevel = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/level/deleteLevel",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Quizs */
export const getQuizs = async (reqParam, setData, setIsReady, handleError) => {
  const response = await Network.request(
    "/quiz/getQuizs",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const getQuizById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/quiz/getQuizById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const createQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/quiz/createQuiz",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const updateQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/quiz/updateQuiz",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/quiz/deleteQuiz",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Slides */
export const getSlides = async (reqParam, setData, setIsReady, handleError) => {
  const response = await Network.request(
    "/slide/getSlides",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};
export const getSlideById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/slide/getSlideById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const createSlide = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/slide/createSlide",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const updateSlide = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/slide/updateSlide",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteSlide = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/slide/deleteSlide",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Tutors */
export const getTutors = async (reqParam, setData, setIsReady, handleError) => {
  const response = await Network.request(
    "/tutor/getTutors",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const getTutorById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/tutor/getTutorById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const createTutor = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/tutor/createTutor",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const updateTutor = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/tutor/updateTutor",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteTutor = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/tutor/deleteTutor",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Users */
export const getUsers = async (reqParam, setData, setIsReady, handleError) => {
  const response = await Network.request(
    "/user/getUsers",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const getUserById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/user/getUserById",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const createUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/user/createUser",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const updateUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/user/updateUser",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

export const deleteUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await Network.request(
    "/user/deleteUser",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

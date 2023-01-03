import { getRequest, postRequest, putRequest, deleteRequest } from "./Network";
/* Class */
export const getClasses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/class", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getClassById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { id } = reqParam;
  const response = await getRequest(`/class/${id}`, reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getClassesCountByCourseId = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { id } = reqParam;
  const response = await getRequest(
    `/class/count/${id}`,
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};
export const getClassesByCourseId = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { id } = reqParam;
  const response = await getRequest(
    `/class/course/${id}`,
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/class", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const updateClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { id } = reqParam;

  const response = await putRequest(`/class/${id}`, reqParam, handleError);
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
  const { id } = reqParam;
  const response = await deleteRequest(`/class/${id}`, reqParam, handleError);
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
  const response = await getRequest("/content", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getContentById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/content", reqParam, handleError);
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
  const response = await postRequest("/content", reqParam, handleError);
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
  const response = await putRequest("/content", reqParam, handleError);
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
  const response = await deleteRequest("/content", reqParam, handleError);
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
  const response = await getRequest("/course", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getPremiumCourses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/course/premium", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};
  

export const getCourseById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { course_id } = reqParam;
  const response = await getRequest(
    `/course/${course_id}`,
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createCourse = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/course", reqParam, handleError);
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
  const response = await putRequest("/course", reqParam, handleError);
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
  const response = await deleteRequest("/course", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* PurchasedCourses */

export const getAllPurchasedCourses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/purchased_course", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getPurchasedCoursesByUserId = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { userId } = reqParam;
  const response = await getRequest(
    `/purchased_course/${userId}`,
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createPurchasedCourse = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest(
    "/purchased_course",
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

/* Levels */
export const getLevels = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/level", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};
export const getLevelById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { level_id } = reqParam;
  const response = await getRequest(`/level${level_id}`, reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};
export const createLevel = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/level", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};
export const updateLevel = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await putRequest("/level", reqParam, handleError);
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
  const response = await deleteRequest("/level", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Quizs */
export const getAllQuizs = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/quiz", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getQuizById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { quiz_id } = reqParam;
  const response = await getRequest(`/quiz/${quiz_id}`, reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/quiz", reqParam, handleError);
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
  const response = await putRequest("/quiz", reqParam, handleError);
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
  const response = await deleteRequest("/quiz", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* SolvedQuiz */
export const getSolvedQuizs = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/solved_quiz", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getSolvedQuizsByUser = async (reqParam, setData, setIsReady, handleError) => {
  const { user_id } = reqParam;
  const response = await getRequest(`/solved_quiz/${user_id}`, reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createSolvedQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/solved_quiz", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const updateSolvedQuiz = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await putRequest("/solved_quiz", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};


/* Slides */
export const getSlides = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/slide", reqParam, handleError);
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
  const response = await getRequest("/slide", reqParam, handleError);
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
  const response = await postRequest("/slide", reqParam, handleError);
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
  const response = await putRequest("/slide", reqParam, handleError);
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
  const response = await deleteRequest("/slide", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Tutors */
export const getTutors = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/tutor", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getTutorById = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest(
    "/tutor/" + reqParam.tutor_id,
    reqParam,
    handleError
  );
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createTutor = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/tutor", reqParam, handleError);
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
  const response = await putRequest("/tutor", reqParam, handleError);
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
  const response = await deleteRequest("/tutor", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Users */
export const getUsers = async (reqParam, setData, setIsReady, handleError) => {
  const response = await getRequest("/user", reqParam, handleError);
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
  const userId = reqParam;
  const response = await getRequest(`/user/${userId}`, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/user", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const updateUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const { userId, ...restParam } = reqParam;
  const response = await putRequest(`/user/${userId}`, restParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const deleteUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await deleteRequest("/user", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Login */
export const login = async (reqParam, setData, setIsReady, handleError) => {
  const response = await postRequest("/login", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

/* LearnedClass */
export const getLearnedClasses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/learned_class", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getPremiumLearnedClasses = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/learned_class/premium", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createLearnedClass = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/learned_class", reqParam, handleError);
  if (response !== null) {
    setData();
    setIsReady(true);
  }
};

/* Wishlist */

export const getAllWishlist = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/wishlist", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const getWishlistByUser = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await getRequest("/wishlist", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createWishlist = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await postRequest("/wishlist", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const deleteWishlist = async (
  reqParam,
  setData,
  setIsReady,
  handleError
) => {
  const response = await deleteRequest("/wishlist", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};


export const getAllNotice = async (
    reqParam,
    setData,
    setIsReady,
    handleError
) => {
  const response = await getRequest("/notice", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

export const createFeedback = async (
    reqParam,
    setData,
    setIsReady,
    handleError
) => {
  const response = await postRequest("/feedback", reqParam, handleError);
  if (response !== null) {
    setData(response.data);
    setIsReady(true);
  }
};

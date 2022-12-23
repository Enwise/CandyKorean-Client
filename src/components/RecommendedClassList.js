import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getCourses } from "../modules/NetworkFunction";
import RecommendedClass from "./RecommendedClass";

const RecommendedClassList = () => {
  const [courses, setCourses] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    getCourses(
      {},
      (d) => {
        setCourses(d.data);
      },
      () => {},
      (e) => {
        console.log(e);
      }
    );
  }, []);

  return (
    <View>
      {courses.map((course, index) => {
        return (
          <RecommendedClass
            key={index}
            tutor={course.tutor}
            thumbnail={course.thumbnail}
          />
        );
      })}
    </View>
  );
};

export default RecommendedClassList;

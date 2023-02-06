import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getCourses } from "../modules/NetworkFunction";
import RecommendedClass from "./RecommendedClass";

const RecommendedClassList = ({ navigation }) => {
  const [courses, setCourses] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    getCourses(
      {},
      (d) => {
        const course = d.data.filter((item) => {
          return item.tutor.enabled && item.is_for_sale;
        });
        setCourses(course);

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
            course={course}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

export default RecommendedClassList;

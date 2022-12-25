import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getCourseById,
  getLearnedClasses,
  getTutorById,
} from "../modules/NetworkFunction";

const ProgressLecture = ({ userId }) => {
  // 강의 이름, 썸네일, 코스(클래스)이름, 강사 이름, 현재 몇강인지
  // 강의 이름 -> getLearnedClasses class.name
  // 썸네일 -> getLearnedClasses class.thumbnail
  // 코스(클래스)이름 -> getLearnedClasses class.course_id -> getCourseById.name
  // 강사 이름 -> getLearnedClasses class.class_id -> getCourseById.tutor_id -> getTutorById.name
  // 현재 몇강인지 -> 추가요청
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [learnedClass, setLearnedClass] = React.useState([]);
  React.useEffect(() => {
    const getProgressLecture = async () => {
      let filterData = [];
      await getLearnedClasses(
        {},
        (d) => {
          filterData = d.data.filter((item) => {
            return item.user_id === Number(userId) && !item.is_completed;
          });
        },
        setIsLoaded,
        (e) => {
          console.log(e);
        }
      );

      const data = filterData.map(async (item) => {
        let courseName, tutorId, tutorName;
        await getCourseById(
          item.class.course_id,
          (d) => {
            courseName = d.data.name;
            tutorId = d.data.tutor_id;
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );
        await getTutorById(
          { tutor_id: tutorId },
          (d) => {
            tutorName = d.data.name;
          },
          () => {},
          (e) => {
            console.log(e);
          }
        );

        item.courseName = courseName;
        item.tutorName = tutorName;
        return item;
      });
      Promise.all(data).then((d) => {
        setLearnedClass(d);
      });
    };
    getProgressLecture();
  }, []);

  const CurrentClassComponent = ({ unit }) => {
    return (
      <View style={styles.currentClass}>
        <LinearGradient
          colors={["rgba(132, 233, 255, 1)", "rgba(201, 132, 255, 1)"]}
          locations={[0, 1]}
          start={[0.025, 0.5]}
          end={[0.975, 0.5]}
          style={{
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 18,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: "white",
              fontFamily: "Poppins-Medium",
            }}
          >
            {unit === 0 ? "OT" : `${unit}강`}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  const renderProgressLecture = () => {
    return learnedClass.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.container}
          activeOpacity="0.8"
        >
          <View style={styles.thumbnail}>
            <Image
              style={styles.image}
              source={{ uri: item.class.thumbnail }}
            />
            <CurrentClassComponent unit={item.class.unit} />
          </View>
          <View style={styles.description}>
            <Text style={styles.lectureTitle}>{item.class.name}</Text>
            <Text style={styles.lectureDescription}>{item.courseName}</Text>
            <Text style={styles.lectureTeacher}>Teacher. {item.tutorName}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    learnedClass.length > 0 && (
      <View style={{ marginBottom: 42 }}>
        <Text style={styles.title}>Lecture in progress</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
        >
          {renderProgressLecture()}
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginLeft: 20,
  },
  container: {
    height: 257,
    width: 231,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.07)",
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 15,
  },
  thumbnail: {
    height: 165,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  description: {
    paddingLeft: 16,
  },
  lectureTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginTop: 5,
  },
  lectureDescription: {
    fontSize: 10,
    color: "#737373",
    marginTop: 4,
  },
  lectureTeacher: {
    fontSize: 10,
    color: "#737373",
    marginTop: 15,
  },
  currentClass: {
    position: "absolute",
    top: 12,
    left: 13,
  },
});
export default ProgressLecture;

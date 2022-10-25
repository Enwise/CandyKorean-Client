import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

const Class = ({ classInfo, navigation, isShowAll }) => {
  return (
    <View style={styles.classContainer}>
      <View style={dstyles(isShowAll).topContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ClassInfo", { classInfo: classInfo })
            }
          >
            <Image
              style={dstyles(isShowAll).img}
              source={require("../assets/img/sample_class_img1.jpeg")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={dstyles(isShowAll).textContainer}>
          <View>
            <Text style={styles.className}>{classInfo.className}</Text>
          </View>
          <View>
            <Text style={styles.teacherName}>{classInfo.teacherName}</Text>
          </View>
          {isShowAll ? (
            <View>
              <Text style={styles.unitsNum}>9 Units</Text>
            </View>
          ) : null}
        </View>
      </View>
      {isShowAll ? (
        <View style={styles.bottomContainer}>
          <Button style={styles.button} title="Details / Samples"></Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  classContainer: {
    width: "100%",
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
    marginBottom: 20,
    width: 140,
  },

  className: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  teacherName: {
    textAlign: "center",
    marginBottom: 10,
  },
  bottomContainer: {
    marginTop: 15,
    width: 500,
    paddingLeft: 150,
    textAlign: "center",
  },
  button: {
    textAlign: "center",

    color: `'#2196F3'`,
  },
});

const dstyles = (isShowAll) =>
  StyleSheet.create({
    img: {
      width: isShowAll ? 250 : 140,
      height: isShowAll ? 140 : 250,
      marginRight: isShowAll ? 15 : 0,
    },
    topContainer: {
      flexDirection: isShowAll ? "row" : "column",
    },
    textContainer: {
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: isShowAll ? 35 : 0,
    },
  });
export default memo(Class);

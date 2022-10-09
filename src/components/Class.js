import React, { memo } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Class = ({ classInfo, navigation }) => {
  return (
    <View style={styles.classContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("ClassInfo")}>
        <View>
          <Image
            style={styles.classImg}
            source={require("../assets/img/sample_class_img1.jpeg")}
          ></Image>
        </View>
        <View>
          <Text style={styles.className}>{classInfo.className}</Text>
        </View>
        <View>
          <Text style={styles.teacherName}>{classInfo.teacherName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  classContainer: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
    marginBottom: 20,
    width: 140,
  },
  classImg: {
    width: 140,
    height: 250,
  },
  className: {
    width: "100%",
    textAlign: "center",
  },
  teacherName: {
    textAlign: "center",
  },
});

export default memo(Class);

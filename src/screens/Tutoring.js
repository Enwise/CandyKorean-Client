import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Tutor from "../components/Tutor";
import AlertDialog from "../components/AlertDialog";
const windowWidth = Dimensions.get("window").width;
const Tutoring = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.gatherTownImg}>
        <Image source={require("../assets/img/gather_town_ex.png")} />
      </View>
      <View style={styles.content}>
        <Text style={styles.classTitle}>Class Name</Text>
        <Text>강의 설명</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.tutor}>tutors</Text>
        <Tutor
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <Tutor
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <View style={styles.content}>
        <Text>튜터링 내역</Text>
      </View>
      <AlertDialog
        visible={modalVisible}
        setModalVisible={setModalVisible}
        url={"https://www.google.co.kr"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  gatherTownImg: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 40,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignSelf: "flex-start",
    marginTop: 20,
  },
  classTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  tutor: {
    fontSize: 20,
    marginBottom: 10,
  },
});
export default Tutoring;

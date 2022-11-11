import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import BackButton from "../components/BackButton";
import ProfileInput from "../components/ProfileInput";
import RadioButton from "../components/RadioButton";
import DropDownIcon from "../assets/icons/DropDownIcon";
import GradientButton from "../components/GradientButton";
import BottomSheet from "../components/BottomSheet";
import DateTimePicker from "react-native-modal-datetime-picker";
import LevelSelect from "../components/LevelSelect";
const windowWidth = Dimensions.get("window").width;
const UserInfo = ({ navigation }) => {
  const gender = ["Female", "Male", "Other"];
  const [email, setEmail] = React.useState();
  const [name, setName] = React.useState();
  const [genderSelect, setGenderSelect] = React.useState();
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [levelSelect, setLevelSelect] = React.useState();
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [date, setDate] = React.useState();

  const levelData = [
    {
      level: "Beginner",
      description: "I don't know anything about Korean.",
    },
    {
      level: "Intermediate",
      description: "I know something about Korean.",
    },
    {
      level: "Advanced",
      description: "I can speak and write Korean.",
    },
  ];

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.pop()} />
      </View>

      <View style={{ marginLeft: 20, flex: 6 }}>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            marginBottom: 22,
          }}
        >
          Profile
        </Text>
        <ProfileInput title={"Email"} />
        <ProfileInput title={"Username"} />

        <View style={styles.title}>
          <Text style={styles.titleText}>Gender</Text>
        </View>
        <View>
          <RadioButton
            data={gender}
            onPress={(value) => setGenderSelect(value)}
          />
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>Date of Birth</Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            activeOpacity={0.8}
            style={{ flexDirection: "row" }}
          >
            <View style={styles.dateSelectView}>
              <Text style={styles.dateText}>
                {date
                  ? `${date.getDate()} / ${
                      date.getMonth() + 1
                    } / ${date.getFullYear()}`
                  : "DD / MM/ YYYY"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={datePickerVisible}
          date={date}
          mode="date"
          onConfirm={(date) => {
            setDate(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />

        <View style={styles.title}>
          <Text style={styles.titleText}>Korean Level</Text>
          <TouchableOpacity
            style={styles.levelView}
            onPress={() => setBottomSheetVisible(true)}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                color: "#B8B5BC",
                flex: 0.95,
              }}
            >
              {levelSelect ? `${levelSelect.level}` : "Select your Level"}
            </Text>
            <DropDownIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginLeft: 20, flex: 1 }}>
        <GradientButton
          title={"SUBMIT"}
          onPress={() => navigation.navigate("Survey")}
        />
      </View>
      <BottomSheet
        visible={bottomSheetVisible}
        setVisible={setBottomSheetVisible}
        header={"Korean Level"}
      >
        <LevelSelect
          data={levelData}
          select={levelSelect}
          onPress={(value) => setLevelSelect(value)}
        />
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    marginLeft: 12,
    marginTop: Constants.statusBarHeight + 15,
    marginBottom: 42,
    width: 24,
    height: 24,
  },
  title: {
    marginTop: 24,
  },
  titleText: {
    fontFamily: "Poppins-Medium",
    color: "#B8B5BC",
    fontSize: 16,
    marginBottom: 10,
  },
  levelView: {
    height: 40,
    width: windowWidth - 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  dateSelectView: {
    height: 40,
    backgroundColor: "white",
    borderColor: "#E6E3EA",
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 22,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
    fontSize: 14,
  },
});

export default UserInfo;

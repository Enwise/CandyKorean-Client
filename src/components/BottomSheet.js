import { useFonts } from "expo-font";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CloseIcon from "../assets/icons/CloseIcon";
import LevelSelect from "./LevelSelect";

const BottomSheet = ({ visible, setVisible, levelSelect, level }) => {
  const screenHeight = Dimensions.get("screen").height;
  const panY = React.useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    // BottomSheet를 초기 위치로 돌려주는 함수
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    // BottomSheet를 내리는 함수
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  const panResponders = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    } else closeBottomSheet.start();
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
    });
  };

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
  const [selected, setSelected] = React.useState(level);
  const onSelect = (value) => {
    setSelected(value);
    levelSelect(value);
  };
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Korean Level</Text>
            <TouchableOpacity onPress={closeModal}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={{ margin: 20 }}>
            <LevelSelect
              data={levelData}
              select={selected}
              onPress={(value) => onSelect(value)}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
  },
  container: {
    height: 390,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#807F82",
  },
});
export default BottomSheet;

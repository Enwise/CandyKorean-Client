import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AlertDialog = ({ visible, setModalVisible }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text>입장하면 잔여 튜터링 횟수 1회 차감됩니다.</Text>
          <Text>
            튜터와의 스케줄이 조율되지 않은 경우, 횟수만 차감되고 튜터링은
            거절당할 수 있습니다.
          </Text>
          <Text>입장하시겠습니까???</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text>yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    backgroundColor: "white",
    width: "80%",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
export default AlertDialog;

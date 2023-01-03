import React from "react";
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CloseIcon from "../assets/icons/CloseIcon";
import * as Linking from "expo-linking";

const FeedbackAlertDialog = ({ navigation ,visible, setModalVisible, url, FeedbackAlertDialog }) => {
    const link = () => {
        Linking.openURL(url);
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            {FeedbackAlertDialog === "created" ?
                <View style={styles.background}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row-reverse", marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <CloseIcon />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>
                            failed..
                        </Text>
                        <View style={{display:"flex", alignItems:"center", width:"100%"}}>
                            <Image
                                source={require("../assets/img/feedback_complete.png")}
                            />
                        </View>

                    </View>
                </View>
                :


                <View style={styles.background}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row-reverse", marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                navigation.navigate("My")
                            }}>
                                <CloseIcon />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>
                            Thank you for your{"\n"}
                            feedback!
                        </Text>
                        <View style={{display:"flex", alignItems:"center", width:"100%"}}>
                            <Image
                                source={require("../assets/img/feedback_complete.png")}
                            />
                        </View>

                    </View>
                </View>
            }

        </Modal>
    );
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
        backgroundColor: "white",
        width: "90%",
        paddingHorizontal: 30,
        paddingBottom: 25,
        paddingTop: 15,
        borderRadius: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    button_y: {
        backgroundColor: "#444345",
        flex: 1,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    button_n: {
        flex: 1,
        backgroundColor: "#E6E3EA",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    button_text_y: {
        color: "white",
        fontFamily: "Poppins-Medium",
        fontsize: 14,
    },
    button_text_n: {
        color: "#444345",
        fontFamily: "Poppins-Medium",
        fontsize: 14,
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
        lineHeight: 24,
    },
    text: {
        fontFamily: "Poppins-Regular",
        color: "#B8B5BC",
        fontSize: 10,
        textAlign: "center",
        lineHeight: 15,
    },
});
export default FeedbackAlertDialog;

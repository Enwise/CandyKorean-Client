
import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import { launchImageLibrary } from 'react-native-image-picker';

const MyLesson = ({navigation}) => {


    return (
        <View style={styles.container}>
            <Text>lesson page 입니다.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        width: '100%',
        paddingTop: '15%',
        paddingBottom : '15%',
    },
    textCss: {
        fontSize:'21px',
        fontWeight:"700",
        marginTop:15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
export default MyLesson;

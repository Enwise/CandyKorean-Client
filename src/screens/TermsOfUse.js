import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import WebView from "react-native-webview";
const TermsOfUse = ({navigation, route}) => {

    console.log(route);
    return (
        <WebView
            source={{uri: route.params}}
            style={{marginTop: 20}}
        />
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
});

export default TermsOfUse;

import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import {updateUser} from "../modules/NetworkFunction";
const NoticeDetail = ({navigation, route}) => {


    return (
        <View style={styles.container}>
            <View style={{display:"flex", flexDirection:"row",alignItems:"center", width:"90%"}}>
                <BackButton onPress={() => navigation.navigate("Setting")}/>
            </View>
            <View style={{height:42}}/>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingBottom:10, width:"90%"}}>
                <View style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
                    <Text style={{fontSize:16, fontWeight:"500", color:"#444345", marginBottom:6}}>{route.params.title}</Text>
                </View>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Text style={{fontSize:10, fontWeight:"400", color:"#B8B5BC"}}>{route.params.date_updated.split("T")[0]}</Text>
                </View>
            </View>
            <View style={{height:2, backgroundColor:"#F1EFF4", width:"100%"}}/>
            <View style={{height:20}}/>
            <View style={{width:"90%"}}>
                <Text style={{fontWeight:"400", fontSize:12, color:"#807F82"}}>
                    {route.params.text}
                </Text>
            </View>
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
        backgroundColor:"#FFFFFF"
    },
});

export default NoticeDetail;

import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import { launchImageLibrary } from 'react-native-image-picker';


const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const Setting = ({navigation}) => {

    const [menuNum, setMenuNum] = useState(0);
    const [nickname, setNickname] = useState("peter");

    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            // console.log(response);
            if (response) {
                setPhoto(response);
            }
        });
    };

    const handleUploadPhoto = () => {
        fetch(`${SERVER_URL}/api/upload`, {
            method: 'POST',
            body: createFormData(photo, { userId: '123' }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"90%"}}>
                <View style={{width:"56%", display:"flex", flexDirection:"row-reverse"}}>
                    <Text style={{fontSize:"20px"}}>setting</Text>
                </View>
                <BackButton onPress={() => navigation.navigate("My")}/>
            </View>
            {menuNum === 0 ?
                <View style={{display:"flex", flexDirection:"column", width:"90%"}}>
                    <TouchableOpacity onPress={()=>{setMenuNum(1);}}>
                        <Text style={styles.textCss}>change profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMenuNum(2);}}>
                        <Text style={styles.textCss}>notice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMenuNum(3);}}>
                        <Text style={styles.textCss}>feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textCss}>terms of use</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textCss}>privacy policy</Text>
                    </TouchableOpacity>
                </View>
                :
                menuNum === 1 ?
                    <View style={{display:"flex", flexDirection:"column", width:"90%"}}>
                        <Text style={styles.textCss}>privacy policy</Text>
                        <Text style={styles.textCss}>nickname</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNickname}
                            value={nickname}
                            placeholder= "기존 닉네임"
                            keyboardType="default"
                        />

                        <View style={{width:"100%", display:"flex", alignItems:"center"}}>
                            <Image
                                source={require("../assets/LogoText.png")}
                                style={{width:200, height:200, borderRadius:"100"}}
                            />
                            <TouchableOpacity
                                onPress={()=>{alert("닉네임이 변경되었습니다.");}}
                            >
                                <Text>select a photo</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {photo && (
                                <>
                                    <Image
                                        source={{ uri: photo.uri }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                    <TouchableOpacity title="Upload Photo" onPress={handleUploadPhoto} ><Text>fs</Text></TouchableOpacity>
                                </>
                            )}
                            <TouchableOpacity title="Choose Photo" onPress={handleChoosePhoto} ><Text>fsdfsdfsd</Text></TouchableOpacity>
                        </View>



                        <TouchableOpacity
                            onPress={() => navigation.navigate("My")}
                        >
                            <Text>confirm</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <View/>

            }


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
export default Setting;
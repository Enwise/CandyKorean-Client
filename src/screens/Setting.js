import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import { launchImageLibrary } from 'react-native-image-picker';
import {createFeedback, getAllNotice, getUserById, updateUser} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";
import AlertDialog from "../components/AlertDialog";
import FeedbackAlertDialog from "../components/FeedbackAlertDialog";
import ImagePicker from 'react-native-image-picker';
import showImagePicker from 'react-native-image-picker';
import WebView from "react-native-webview";

const Setting = ({navigation}) => {

    const [menuNum, setMenuNum] = useState(0);
    const [nickname, setNickname] = useState();

    const [ img, setImageSource ] = useState("");


    function pickImg() {
        const options = {
            title: 'Select Avatar', //이미지 선택할 때 제목입니다 ( 타이틀 )
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }], // 선택 버튼을 커스텀 할 수 있습니다.
            storageOptions: {
                skipBackup: true,	// ios인 경우 icloud 저장 여부 입니다!
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setImageSource(response.uri); // 저는 여기서 uri 값을 저장 시킵니다 !
            }
        });
    }



    const menuArr = ["Setting", "Change profile", "Notice", "Feedback", "Terms of Use", "Privacy policy"];

    const [feedbackNum, setFeedbackNum] = useState(0);
    const [feedbackContent, setFeedbackContent] = useState("")
    const [feedbackResult, setFeedbackResult] = useState();
    const [modalVisible, setModalVisible] = useState(false);


    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const { authState } = React.useContext(AuthContext);



    const [notice, setNotice] = useState();
    const [isNoticeOpen, setIsNoticeOpen] = useState(0);

    React.useEffect(() => {
        getAllNotice(
            "",
            (d) => {
                console.log(d.data);
                setNotice(d.data);
            },
            () => {},
            (e) => {
                console.log("getAllNotice error");
            }
        );
    }, []);


    React.useEffect(() => {
        getUserById(
            authState.userId,
            (d) => {
                setNickname(d.data.name)
            },
            () => {},
            (e) => {
                console.log("getUserById error");
            }
        );
    }, [authState]);




    return (
        <View style={styles.container}>

            <View style={{display:"flex", flexDirection:"row",alignItems:"center", width:"90%"}}>
                {menuNum === 0 ?
                    <BackButton onPress={() => navigation.navigate("My")}/>
                    :
                    <BackButton onPress={() => setMenuNum(0)}/>
                }
                <View style={{marginLeft:100}}>
                    <Text style={{fontSize:20, fontWeight:"600"}}>{menuArr[menuNum]}</Text>
                </View>
                {
                    menuNum === 1 ?
                        <TouchableOpacity
                            style={{marginLeft:80}}
                            onPress={() => {
                                updateUser(
                                    {
                                        userId:authState.userId,
                                        name: nickname,
                                    },
                                    (d) => {
                                        console.log(d.data);
                                        setUser(d.data);
                                    },

                                    setIsUserLoaded,
                                    (e) => {
                                        console.log(e);
                                    }
                                );
                                navigation.navigate("My");
                            }}
                        >
                            <Image
                                source={require("../assets/img/mypage-ok-icon.png")}
                            />
                        </TouchableOpacity>
                        :
                        ""
                }
            </View>
            <View style={{height:40}}/>

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

                    <TouchableOpacity
                        onPress={() => navigation.navigate("TermsOfUse", "https://www.notion.so/Terms-of-Use-00a591c112064ed89b420f4f102dbf2e")}
                    >
                        <Text style={styles.textCss}>terms of use</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => navigation.navigate("TermsOfUse", "https://www.notion.so/Privacy-Policy-817a4465f7a74d64991143978f22c398")}
                    >
                        <Text style={styles.textCss}>privacy policy</Text>
                    </TouchableOpacity>
                </View>
                :
                menuNum === 1 ?
                    <View style={{display:"flex", flexDirection:"column", width:"90%"}}>

                        <View style={{width:"100%", display:"flex", alignItems:"center"}}>
                            <View style={{position:"relative", width:200, height:200}}>
                                {/*<Image*/}
                                {/*    source={require("../assets/img/sample_class_img2.png")}*/}
                                {/*    style={{width:200, height:200, borderRadius:100, position:"absolute"}}*/}
                                {/*/>*/}
                                <Image
                                    source={require("../assets/img/mypage-default-image.png")}
                                    style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                />
                                <TouchableOpacity
                                    style={{position:"absolute", right:20, bottom:0}}
                                >
                                    <Image
                                        source={require("../assets/img/profile-img-change-icon.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/*{img ?   // 이미지가 있으면 라이브러리에서 받아온 이미지로 출력, 없으면 디폴트 이미지 출력!*/}
                            {/*    <TouchableOpacity style={styles.imgWrapper} onPress={()=>pickImg()}>*/}
                            {/*        <Image source={{uri: img}} style={styles.imgStyle}/>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*    :*/}
                            {/*    <TouchableOpacity style={styles.imgWrapper} onPress={()=>pickImg()}>*/}
                            {/*        <Image source={require("../assets/img/icon-notice-detail.png")} style={styles.imgStyle}/>*/}

                            {/*    </TouchableOpacity>*/}
                            {/*}*/}
                            <TextInput
                                style={styles.input}
                                onChangeText={setNickname}
                                value={nickname}
                                placeholder= ""
                                keyboardType="default"
                            />




                        </View>

                    </View>
                    :
                    menuNum === 2 ?
                        <View style={{display:"flex", flexDirection:"column", width:"90%"}}>
                            <View style={{display:"flex", flexDirection:"column"}}>
                                {notice?.map((item, idx)=>{
                                    return (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("NoticeDetail", item)}
                                        >
                                            <View key={idx} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottom:"1px solid #F1EFF4", paddingBottom:20}}>
                                                <View style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
                                                    <Text style={{fontSize:16, fontWeight:"500", color:"#444345", marginBottom:6}}>{item.title}</Text>
                                                </View>
                                                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                                    <Text style={{fontSize:10, fontWeight:"400", color:"#B8B5BC"}}>{item.date_updated.split("T")[0]}</Text>
                                                    {/*<Image*/}
                                                    {/*    source={require("../assets/img/icon-notice-detail.png")}*/}
                                                    {/*    style={{width:24, height:24}}*/}
                                                    {/*/>*/}
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    );
                                })}
                            </View>



                        </View>
                        :
                        <View style={{display:"flex", flexDirection:"column", width:"90%"}}>
                            <Text style={{fontSize:12, fontWeight:"400", color:"#807F82"}}>please select your feedback</Text>
                            <View style={{display:"flex", flexDirection:"row",marginTop:10}}>
                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(1)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===1 ? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===1 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center", marginRight:10}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===1 ? "#FDFDFD" : "#B8B5BC"}}>content</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(2)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===2 ? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===2 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center", marginRight:10}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===2 ? "#FDFDFD" : "#B8B5BC"}}>bug</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(3)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===3? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===3 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===3 ? "#FDFDFD" : "#B8B5BC"}}>other</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <Text style={{fontSize:12, fontWeight:"400", color:"#807F82", marginTop:40, marginBottom:10}}>Please leave your feedback below</Text>
                            <TextInput
                                style={{height:300, borderWidth:1, borderColor:"#d9d9d9", backgroundColor:"#FDFDFD", padding:12, textAlignVertical:"top"}}
                                onChangeText={(event)=>{
                                    console.log(event)
                                    setFeedbackContent(event)
                                }}
                                value={feedbackContent}
                                keyboardType="default"
                                autoCorrect={false}
                            />

                            <TouchableOpacity
                                style={{marginTop:100}}
                                onPress={() => {

                                    createFeedback(
                                        {
                                            "text": feedbackContent,
                                            "category": feedbackNum ===1 ? "content" : feedbackNum===2 ? "bug" : "other",
                                            "user_id": authState.userId,
                                        }
                                        ,
                                        (d) => {
                                            console.log(d.message);
                                            if(d.message === "created"){
                                                setFeedbackResult(d.message);
                                                setModalVisible(true);
                                            }
                                        },
                                        () => {},
                                        (e) => {
                                            console.log("feedback send error");
                                        }
                                    );
                                }}
                            >
                                <View style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", height:50, borderRadius:50, backgroundColor:(feedbackNum !== 0 && feedbackContent !== "") ? "#A160E2" : "#B8B5BC"}}>
                                    <Text style={{fontSize:20, fontWeight:"600", color:"#FFFFFF" }}>submit</Text>
                                </View>

                            </TouchableOpacity>
                            <FeedbackAlertDialog
                                navigation={navigation}
                                visible={modalVisible}
                                setModalVisible={setModalVisible}
                                url={
                                    "https://app.gather.town/app/rcStwsUdkfF8lpoI/Candy%20Korean_class%20room"
                                }
                                feedbackResult={feedbackResult}
                            />
                        </View>

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
        backgroundColor:"#FFFFFF"
    },
    textCss: {
        fontSize:16,
        fontWeight:"500",
        color:"#444345",
        marginTop:15,
        paddingBottom:15,
    },
    input: {
        borderBottomColor:"#B8B5BC",
        borderBottomWidth:1,
        marginTop: 10,
        fontWeight:"600",
        fontSize:20,
        color:"#444345",
    },
});
export default Setting;

import React, {useEffect, useState} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import {createFeedback, fileUpload, getAllNotice, getUserById, updateUser} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";
import AlertDialog from "../components/AlertDialog";
import FeedbackAlertDialog from "../components/FeedbackAlertDialog";
import WebView from "react-native-webview";
import * as ImagePicker from 'expo-image-picker';
import BackButtonIcon from "../assets/icons/BackButtonIcon";
import axios from "axios";
import Svg, {Path} from "react-native-svg";

const Setting = ({navigation}) => {

    const [menuNum, setMenuNum] = useState(0);
    const [nickname, setNickname] = useState();


    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photo,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result.cancelled);

        if (!result.canceled) {
            

            console.log(result.assets[0].uri);
            console.log(result.assets[0]);


            // 폼데이터 생성
            let formData = new FormData();

            let image = {
                uri: result.assets[0].uri,
                type: 'multipart/form-data',
                name:`${result.assets[0].uri}`,
            }

            formData.append('file', image);

            console.log('formData', formData);

            axios.post('http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis/upload', formData, {
                headers: {'content-type' : 'multipart/form-data'}
            }).then((response) => {
                let img_url = response.data.data.link;
                setImage(img_url);
                updateUser(
                    {
                        userId:authState.userId,
                        img_url,
                    },
                    (d) => {
                        console.log(d.data);
                    },
                    () => {},
                    (e) => {
                        console.log(e);
                    }
                );
            }
            )

            // axios({
            //     method:'post',
            //     url:'http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis/upload',
            //     data: formData
            // })
            //     .then((response) => {
            //         console.log('image upload successfully', response);
            //         console.log('image upload successfully', response.data.data.link);
            //         updateUser(
            //             {
            //                 userId:authState.userId,
            //                 img_url: response.data.data.link,
            //             },
            //             (d) => {
            //                 console.log(d.data);
            //             },

            //             setIsUserLoaded,
            //             (e) => {
            //                 console.log(e);
            //             }
            //         );
            //     }).catch((error)=>{
            //         console.log('error raised', error)
            // })

        }
    };



    const menuArr = ["Setting", "Change profile", "Notice", "Feedback", "Terms of Use", "Privacy policy"];

    const [feedbackNum, setFeedbackNum] = useState(0);
    const [feedbackContent, setFeedbackContent] = useState("")
    const [feedbackResult, setFeedbackResult] = useState();
    const [modalVisible, setModalVisible] = useState(false);


    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const { authState } = React.useContext(AuthContext);
    const [userImage, setUserImage] = useState("");



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
                setUserImage(d.data.img_url);
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

            <View style={{display:"flex", flexDirection:"row",alignItems:"center", width:"90%", justifyContent:"center", position:"relative"}}>
                {menuNum === 0 ?
                    <TouchableOpacity onPress={() => navigation.navigate("MyPage")} style={{position:"absolute", left:0, top:5}}>
                        <Svg
                            width={48}
                            height={48}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="m15 6-6 6 6 6"
                                stroke="#000"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setMenuNum(0)} style={{position:"absolute", left:0 , top:5}}>
                        <Svg
                            width={48}
                            height={48}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="m15 6-6 6 6 6"
                                stroke="#000"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                }
                <View>
                    <Text style={{fontSize:20, fontWeight:"600", fontFamily: "Poppins-SemiBold"}}>{menuArr[menuNum]}</Text>
                </View>
                {
                    menuNum === 1 ?
                        <TouchableOpacity
                            style={{position:"absolute", right:0, top:5}}
                            onPress={() => {
                                updateUser(
                                    {
                                        userId:authState.userId,
                                        name: nickname,
                                    },
                                    (d) => {
                                        console.log(d.data);
                                    },

                                    setIsUserLoaded,
                                    (e) => {
                                        console.log(e);
                                    }
                                );
                                // navigation.navigate("MyPage");
                                setMenuNum(0);
                            }}
                        >
                            <View style={{width:48, height:48}}>
                                <Image
                                    style={{marginLeft:"auto"}}
                                    source={require("../assets/img/mypage-ok-icon.png")}
                                />
                            </View>

                        </TouchableOpacity>
                        :
                        ""
                }
            </View>
            <View style={{height:40}}/>

            {menuNum === 0 ?
                <View style={{display:"flex", flexDirection:"column", width:"90%"}}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("ChangeProfile")
                        
                    }}>
                        <Text style={styles.textCss}>Change profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMenuNum(2);}}>
                        <Text style={styles.textCss}>Notice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMenuNum(3);}}>
                        <Text style={styles.textCss}>Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("TermsOfUse", 
                            {
                                uri: "https://dazzling-whale-1af.notion.site/Terms-of-Use-00a591c112064ed89b420f4f102dbf2e",
                                title: "Terms of use"
                            })}
                    >
                        <Text style={styles.textCss}>Terms of use</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => navigation.navigate("TermsOfUse",
                            {
                                uri:"https://dazzling-whale-1af.notion.site/Privacy-Policy-817a4465f7a74d64991143978f22c398",
                                title:"Privacy policy"
                            })}
                    >
                        <Text style={styles.textCss}>Privacy policy</Text>
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
                                {userImage === "" ?
                                    <Image
                                        source={require("../assets/img/mypage-default-image.png")}
                                        style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                    />
                                    :
                                    image === null ?
                                        <Image
                                            source={{
                                                uri: `${userImage}`
                                            }}
                                            style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                        />
                                        :
                                        <Image
                                            source={{
                                                uri: `${image}`
                                            }}
                                            style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                        />
                                }

                                <TouchableOpacity
                                    style={{position:"absolute", right:20, bottom:0}}
                                    onPress={()=>{
                                        console.log("press button clk");
                                        pickImage();
                                    }}
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
                                                    <Text style={{fontSize:16, fontWeight:"500", color:"#444345", marginBottom:6, fontFamily: "Poppins-Medium"}}>{item.title}</Text>
                                                </View>
                                                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                                                    <Text style={{fontSize:10, fontWeight:"400", color:"#B8B5BC", fontFamily: "Poppins-Regular"}}>{item.date_updated.split("T")[0]}</Text>
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
                            <Text style={{fontSize:12, fontWeight:"400", color:"#807F82", fontFamily: "Poppins-Regular"}}>Please select your feedback</Text>
                            <View style={{display:"flex", flexDirection:"row",marginTop:10}}>
                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(1)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===1 ? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===1 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center", marginRight:10}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===1 ? "#FDFDFD" : "#B8B5BC", fontFamily: "Poppins-Regular"}}>Content</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(2)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===2 ? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===2 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center", marginRight:10}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===2 ? "#FDFDFD" : "#B8B5BC", fontFamily: "Poppins-Regular"}}>Bug</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>{setFeedbackNum(3)}}
                                >
                                    <View style={{backgroundColor:feedbackNum===3? "#A160E2":"#FDFDFD", borderWidth:1, borderColor:feedbackNum===3 ? "#A160E2" :"#F1EFF4", borderRadius:40,width:60, height:20, display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <Text style={{fontSize:10, fontWeight:"400", color:feedbackNum===3 ? "#FDFDFD" : "#B8B5BC", fontFamily: "Poppins-Regular"}}>Other</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <Text style={{fontSize:12, fontWeight:"400", color:"#807F82", marginTop:40, marginBottom:10, fontFamily: "Poppins-Regular"}}>Please leave your feedback below</Text>
                            <TextInput
                                style={{height:300, borderWidth:1, borderColor:"#d9d9d9", backgroundColor:"#FDFDFD", padding:12, textAlignVertical:"top",fontFamily: "Poppins-Regular" }}
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
                                    <Text style={{fontSize:20, fontWeight:"600", color:"#FFFFFF", fontFamily: "Poppins-SemiBold", letterSpacing:1.5}}>SUBMIT</Text>
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
        fontFamily:"Poppins-Medium"
    },
    input: {
        borderBottomColor:"#B8B5BC",
        borderBottomWidth:1,
        marginTop: 10,
        fontWeight:"600",
        fontSize:20,
        color:"#444345",
        fontFamily: "Poppins-SemiBold"
    },
});
export default Setting;

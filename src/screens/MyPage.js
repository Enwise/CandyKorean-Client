import React, {useEffect, useState} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import BackButton from "../components/BackButton";
import { Calendar } from "react-native-calendars";
import Plotly from "react-native-plotly";
import { LineChart } from "react-native-chart-kit";
import { VERTICAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AuthContext from "../contexts/AuthContext";
import {getLevels, getUserById} from "../modules/NetworkFunction";

const MyPage = ({ navigation }) => {
    const { signOut, authState } = React.useContext(AuthContext);
    const Width = Dimensions.get("window").width; //스크린 너비 초기화
    const Height = Dimensions.get("window").height; //스크린 높이 초기화
    const markedDates = {
        "2022-11-26": { selected: true },
        "2022-11-27": { marked: true },
        "2022-11-28": { marked: true },
        "2022-11-30": { selected: true },
    };
    const 데이터이름 = ["Score", "KDA", "Damage", "Vision", "Suvival", "Growth"];
    const 유저데이터 = [30, 24, 50, 23, 50, 34];
    const 평균데이터 = [100, 100, 100, 100, 100, 100, 100];
    const data = [
        {
            name: "avgGroup",
            type: "scatterpolar",
            r: 평균데이터,
            theta: [...데이터이름, 데이터이름[0]],
            fill: "none",
            mode: "lines", // 각 데이터 위에 점이 안찍히고 선으로만 이루어지게 한다!
            line: {
                color: "green",
            },
        },
        {
            name: "userGroup",
            type: "scatterpolar",
            r: [...유저데이터, 유저데이터[0]],
            theta: [...데이터이름, 데이터이름[0]],
            fill: "none",
            mode: "lines",
            line: {
                color: "blue",
            },
        },
    ];

    const layout = {
        height: 320, // 원하는 크기로 height를 지정해주었다!
        margin: {
            // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
            l: 0,
            r: 0,
            t: 20,
            d: 0,
        },
        polar: {
            radialaxis: {
                // 방사축 꾸미기 시작!
                visible: true,
                range: [0, 200],
                color: "#d9d9d9", // 방사축의 선 색깔
                showticklabels: false, // @1-1
                showline: false, // @1-2
                ticklen: 0, // @1-3
            },
            angularaxis: {
                // 각축 꾸미기 시작!
                rotation: 210, // 차트 회전율! (KDA가 제일 위로 올 수 있도록 돌려주었당)
                color: "#eee", // 각축의 선 색깔
                ticklen: 0, // @2-1
                tickfont: {
                    // @2-2
                    color: "#888",
                    size: 13,
                },
            },
            gridshape: "linear", // @3
        },
        showlegend: false, // @4
    };

    // getUserById

    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        getUserById(
            authState.userId,
            (d) => {
                console.log(d);
                setUser(d.data);
            },
            () => {},
            (e) => {
                console.log("getUserById error");
            }
        );
    }, [authState]);

    // const AbilityBar = (amount, total) => {
    //
    //
    //     const rate = amount / total * 171;
    //
    //     return (
    //         <View
    //             style={{
    //                 width:171,
    //                 backgroundColor:"#F1EFF4",
    //                 borderRadius:50,
    //             }}
    //         >
    //             <View style={{
    //                 width: {rate},
    //                 backgroundColor:"#A160E2",
    //                 borderRadius:50,
    //             }}>
    //                 <Text>
    //                     fsd
    //                 </Text>
    //             </View>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>
                        반가워요. {user?.name}!
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Setting");
                        }}
                    >
                        <Image
                            source={require("../assets/img/setting-icon.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <TouchableOpacity onPress={signOut}>
                        {/*, border:"1px solid #B8B5BC",*/}
                        <View
                            style={{
                                width: 50,
                                height: 20,
                                borderRadius: 5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontSize: 10, color: "#B8B5BC" }}>Log out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../assets/img/sample_class_img2.png")}
                    style={{ width: 110, height: 110, borderRadius: 55 }}
                />
                <View
                    style={{
                        marginLeft: 20,
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#444345" }}>
                        {user?.name}
                    </Text>
                    <View style={{ height: 7 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("MyPurchases");
                        }}
                        style={{
                            backgroundColor: "#807F82",
                            borderRadius: 9,
                            width: "100%",
                            height: 36,
                            justifyContent: "center",
                            paddingLeft: 20,
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#FFFFFF" }}>
                            My purchases
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 2 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("MyWishList", { isAdd: false });
                        }}
                        style={{
                            backgroundColor: "#807F82",
                            borderRadius: 9,
                            width: "100%",
                            height: 36,
                            paddingLeft: 20,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <AntDesign name="heart" size={15} color="#fff" />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#FFFFFF",
                            }}
                        >
                            Wish List
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: "90%", marginTop: 20 }}>
                <Calendar
                    style={styles.calendar}
                    // markedDates={markedDates}
                    theme={{
                        calendarBackground: "white",

                        // background: linear-gradient(96.07deg, #84E9FF 0%, #C284FF 100%)
                        selectedDayBackgroundColor:
                            "linear-gradient(96.07deg, #84E9FF 0%, #C284FF 100%",
                        selectedDayTextColor: "#FFFFFF",
                        selectedDotColor: "#166088",

                        dayTextColor: "#DBE9EE",
                        textDisabledColor: "#999999",
                        dotColor: "#DBE9EE",

                        monthTextColor: "#DBE9EE",
                        textMonthFontWeight: "bold",

                        arrowColor: "#DBE9EE",
                    }}
                    // theme={{
                    //   selectedDayBackgroundColor:
                    //     "linear-gradient(96.07deg, #84E9FF 0%, #C284FF 100%)",
                    //   arrowColor: "blue",
                    //   dotColor: "green",
                    //   todayTextColor:
                    //     "linear-gradient(96.07deg, #84E9FF 0%, #C284FF 100%)",
                    // }}
                    dayComponent={({ date, state, marking }) => {
                        return (
                            <LinearGradient
                                colors={
                                    marking ? ["#84E9FF", "#C284FF"] : ["#FFFFFF", "#ffffff"]
                                }
                                locations={[0, 1]}
                                start={[0.025, 0.5]}
                                end={[0.975, 0.5]}
                                style={{width: 20, height: 20, borderRadius:10}}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: state === "disabled" ? "gray" : "black",
                                    }}
                                >
                                    {date.day}
                                </Text>
                            </LinearGradient>
                        );
                    }}
                    markingType={"period"}
                    markedDates={{
                        "2022-12-15": { marked: true, dotColor: "#50cebb" },
                        "2022-11-16": { marked: true, dotColor: "#50cebb" },
                        "2022-11-17": {
                            startingDay: true,
                            color: "#FFFFFF",
                            textColor: "white",
                        },
                        "2022-11-18": { color: "#70d7c7", textColor: "white" },
                        "2022-11-19": {
                            color: "#70d7c7",
                            textColor: "white",
                            marked: true,
                            dotColor: "white",
                        },
                        "2022-11-20": { color: "#70d7c7", textColor: "white" },
                        "2022-11-21": {
                            endingDay: true,
                            color: "#50cebb",
                            textColor: "white",
                        },
                        "2022-12-20": { color: "#70d7c7", textColor: "white" },
                        "2022-12-21": { color: "#70d7c7", textColor: "white" },
                        "2022-12-22": { color: "#70d7c7", textColor: "white" },
                    }}
                />
            </View>

            <View
                style={{
                    width: "90%",
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    // borderTop:"1px solid #F1EFF4"
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#444345",
                        marginTop: 15,
                    }}
                >
                    Analysis
                </Text>


                <View
                    style={{
                        width: "100%",
                        marginTop: 15,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:"space-between"
                    }}
                >

                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems:"center",
                            marginBottom:10
                        }}>
                            <Image source={require("../assets/img/mypage-ability-text1.png")}  style={{width:56}}/>
                            <View style={{marginLeft:15}}>
                                <View
                                    style={{
                                        width:171,
                                        height:21,
                                        backgroundColor:"#F1EFF4",
                                        borderRadius:50,
                                    }}
                                >
                                    <View style={{
                                        width: 40,
                                        height:21,
                                        backgroundColor:"#A160E2",
                                        borderRadius:50,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <Text style={{
                                            marginLeft:"auto",
                                            marginRight:9,
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "#FDFDFD",
                                        }}>
                                            40
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems:"center",
                            marginBottom:10
                        }}>
                            <Image source={require("../assets/img/mypage-ability-text2.png")}  style={{width:56}}/>
                            <View style={{marginLeft:15}}>
                                <View
                                    style={{
                                        width:171,
                                        height:21,
                                        backgroundColor:"#F1EFF4",
                                        borderRadius:50,
                                    }}
                                >
                                    <View style={{
                                        width: 80,
                                        height:21,
                                        backgroundColor:"#A160E2",
                                        borderRadius:50,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <Text style={{
                                            marginLeft:"auto",
                                            marginRight:9,
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "#FDFDFD",
                                        }}>
                                            80
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems:"center"
                        }}>
                            <Image source={require("../assets/img/mypage-ability-text3.png")}  style={{width:56}}/>
                            <View style={{marginLeft:15}}>
                                <View
                                    style={{
                                        width:171,
                                        height:21,
                                        backgroundColor:"#F1EFF4",
                                        borderRadius:50,
                                    }}
                                >
                                    <View style={{
                                        width: 100,
                                        height:21,
                                        backgroundColor:"#A160E2",
                                        borderRadius:50,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <Text style={{
                                            marginLeft:"auto",
                                            marginRight:9,
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "#FDFDFD",
                                        }}>
                                            100
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </View>

                    <View style={{
                        marginLeft:22,
                        backgroundColor:"#A160E2",
                        borderRadius:13,
                        width:80,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                    }}>

                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "500",
                                color: "#FFFFFF",
                                marginTop:10
                            }}
                        >
                            Total score
                        </Text>
                        <View
                            style={{
                                width:40,
                                height:40,
                                borderRadius:20,
                                backgroundColor:"#FDFDFD",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "600",
                                    color: "#A160E2",
                                }}
                            >
                                220
                            </Text>

                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => {
                        // navigation.navigate("ClassMain");
                        navigation.navigate("ClassMore", {
                            title: "Lollipop Level",
                            courseList: {
                                "data": [
                                    {
                                        "course_id": 1,
                                        "name": "Conversational Korean Course",
                                        "price": 0,
                                        "info": "Learn Situational Korean and lots of useful expressions with Yoojin T. You'll be able to speak in Korean the most natural way",
                                        "category": "category",
                                        "view_count": 0,
                                        "date_created": "2022-12-22T12:57:32.412Z",
                                        "date_updated": "2022-12-26T18:15:12.000Z",
                                        "tutor_id": 11,
                                        "level_id": 5,
                                        "thumbnail": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671816780722.%EC%8D%B8%EB%84%A4%EC%9D%BC3-%EC%9C%A0%EC%A7%84T.JPG",
                                        "level": {
                                            "level_id": 5,
                                            "name": "Lollipop Level",
                                            "enabled": false,
                                            "info": "K-Culture with influencers!"
                                        },
                                        "tutor": {
                                            "tutor_id": 11,
                                            "enabled": true,
                                            "name": "Yoojin",
                                            "img_url": "",
                                            "profile_url": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671993517133.shin_yoo_jin_square.jpg",
                                            "introduction": ""
                                        }
                                    },
                                    {
                                        "course_id": 2,
                                        "name": "Survival Korean Course",
                                        "price": 0,
                                        "info": "Learn Survival Korean with Seongyeop T. You'll be able to learn the most commonly used Korean expressions.",
                                        "category": "category",
                                        "view_count": 0,
                                        "date_created": "2022-12-22T13:01:59.487Z",
                                        "date_updated": "2022-12-26T18:19:08.000Z",
                                        "tutor_id": 15,
                                        "level_id": 5,
                                        "thumbnail": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1672053527589.%EC%8D%B8%EB%84%A4%EC%9D%BC3-%EC%84%B1%EC%97%BDT.JPG",
                                        "level": {
                                            "level_id": 5,
                                            "name": "Lollipop Level",
                                            "enabled": false,
                                            "info": "K-Culture with influencers!"
                                        },
                                        "tutor": {
                                            "tutor_id": 15,
                                            "enabled": true,
                                            "name": "Seongyeop",
                                            "img_url": "",
                                            "profile_url": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671993756664.seongyeop_profile.png",
                                            "introduction": ""
                                        }
                                    },
                                    {
                                        "course_id": 3,
                                        "name": "After Like Course",
                                        "price": 0,
                                        "info": "Learn Korean and K-pop together with Kyungeun T. She'll be teaching K-pop dance skills and how to describe them in Korean. Be a K-pop master with this course!",
                                        "category": "category",
                                        "view_count": 0,
                                        "date_created": "2022-12-22T13:07:03.623Z",
                                        "date_updated": "2022-12-26T18:19:44.000Z",
                                        "tutor_id": 14,
                                        "level_id": 5,
                                        "thumbnail": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671816844583.%EC%8D%B8%EB%84%A4%EC%9D%BC3-%EA%B2%BD%EC%9D%80T.JPG",
                                        "level": {
                                            "level_id": 5,
                                            "name": "Lollipop Level",
                                            "enabled": false,
                                            "info": "K-Culture with influencers!"
                                        },
                                        "tutor": {
                                            "tutor_id": 14,
                                            "enabled": true,
                                            "name": "Kyungeun",
                                            "img_url": "",
                                            "profile_url": "https://candykoreanbucket.s3.ap-northeast-2.amazonaws.com/files/1671993606249.kyungeun_profile.png",
                                            "introduction": ""
                                        }
                                    },
                                    {
                                        "course_id": 5,
                                        "name": "test",
                                        "price": 0,
                                        "info": "testinfo",
                                        "category": "category_test",
                                        "view_count": 0,
                                        "date_created": "2022-12-26T18:42:30.276Z",
                                        "date_updated": "2022-12-26T18:42:30.276Z",
                                        "tutor_id": 1,
                                        "level_id": 1,
                                        "thumbnail": "",
                                        "level": {
                                            "level_id": 1,
                                            "name": "롤리팝",
                                            "enabled": false,
                                            "info": "test"
                                        },
                                        "tutor": {
                                            "tutor_id": 1,
                                            "enabled": false,
                                            "name": "tutor_change",
                                            "img_url": "123",
                                            "profile_url": "123123",
                                            "introduction": ""
                                        }
                                    },
                                    {
                                        "course_id": 6,
                                        "name": "test2",
                                        "price": 0,
                                        "info": "testinfo",
                                        "category": "category_test",
                                        "view_count": 0,
                                        "date_created": "2022-12-27T09:28:18.575Z",
                                        "date_updated": "2022-12-27T09:28:18.575Z",
                                        "tutor_id": 1,
                                        "level_id": 1,
                                        "thumbnail": "",
                                        "level": {
                                            "level_id": 1,
                                            "name": "롤리팝",
                                            "enabled": false,
                                            "info": "test"
                                        },
                                        "tutor": {
                                            "tutor_id": 1,
                                            "enabled": false,
                                            "name": "tutor_change",
                                            "img_url": "123",
                                            "profile_url": "123123",
                                            "introduction": ""
                                        }
                                    }
                                ],
                                "message": "findAll"
                            },
                        })
                    }}
                >
                    <View
                        style={{
                            marginTop:15,
                            borderWidth:1,
                            borderColor:"#B8B5BC",
                            borderRadius:50,
                            height:24,
                            width:"100%",
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                            paddingLeft:17,
                            paddingRight:10,
                            flexDirection:"row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "500",
                                color: "#B8B5BC",
                            }}
                        >
                            How to improve your Korean Level
                        </Text>
                        <Image source={require("../assets/img/mypage-right-icon.png")}/>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingTop: "15%",
        paddingBottom: "15%",
        backgroundColor: "#FFFFFF",
    },
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
});

export default MyPage;

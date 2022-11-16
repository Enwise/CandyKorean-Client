import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import BackButton from "../components/BackButton";
import { Calendar } from "react-native-calendars";
import Plotly from "react-native-plotly";
import { LineChart } from "react-native-chart-kit";
import {VERTICAL} from "react-native/Libraries/Components/ScrollView/ScrollViewContext";

const MyPage = ({ navigation }) => {
  const Width = Dimensions.get("window").width; //스크린 너비 초기화
  const Height = Dimensions.get("window").height; //스크린 높이 초기화
  const markedDates = {
    "2022-10-26": { selected: true },
    "2022-10-27": { marked: true },
    "2022-10-28": { marked: true },
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


  return (
    <View style={styles.container}>
      <View style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between", width: "90%", alignItems:"center", marginBottom:"40px"}}>

          <View>
              <Text style={{fontSize:"20px", fontWeight:"400"}}>반가워요. Bony!</Text>
          </View>
          <View
              style={{ display: "flex", flexDirection: "row-reverse" }}
          >
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
              <TouchableOpacity>
                  <View style={{width:"50px",height:"20px", border:"1px solid #B8B5BC", borderRadius:"5px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <Text style={{fontSize:"10px", color:"#B8B5BC"}}>Log out</Text>
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
          style={{ width: "110px", height: "110px", borderRadius: "55px" }}
        />
        <View
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "collum",
              width:"60%"
          }}
        >
            <Text style={{fontSize:"16px", fontWeight:"600", color:"#444345"}}>Bony</Text>
            <View style={{height:"7px"}}/>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("MyPurchases");
                }}
                style={{backgroundColor:"#807F82", borderRadius:"9px", width:"100%", height:"36px", justifyContent:"center", paddingLeft:"20px"}}
            >
                <Text style={{fontSize:"14px", fontWeight:"500", color:"#FFFFFF"}}>
                    My purchases
                </Text>
            </TouchableOpacity>
            <View style={{height:"2px"}}/>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("MyLesson");
                }}
                style={{backgroundColor:"#807F82", borderRadius:"9px", width:"100%", height:"36px", justifyContent:"center", paddingLeft:"20px"}}
            >
                <Text style={{fontSize:"14px", fontWeight:"500", color:"#FFFFFF"}}>
                    Go to Lesson
                </Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "90%", marginTop: 20 }}>
        <Calendar
          style={styles.calendar}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: "red",
            arrowColor: "blue",
            dotColor: "green",
            todayTextColor: "yellow",
          }}
        />
      </View>

      <View
        style={{
          width: "90%",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
            borderTop:"1px solid #F1EFF4"
        }}
      >
          <Text style={{fontSize:"16px", fontWeight:"600", color:"#444345", marginTop:"15px", marginBottom:"15px"}}>Analysis</Text>

          <Image
              source={require("../assets/img/Group 2026.png")}
              style={{width:340}}
          />

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
      backgroundColor:"#FFFFFF"
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default MyPage;

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import BackButton from "../components/BackButton";
import { Calendar } from "react-native-calendars";
import Plotly from "react-native-plotly";
import { LineChart } from "react-native-chart-kit";

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

  const linedata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 9, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View
        style={{ width: "90%", display: "flex", flexDirection: "row-reverse" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Setting");
          }}
        >
          <Text style={{ fontSize: 20, height: 30 }}>setting</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <Text style={{ fontSize: 20, height: 50 }}>Log out</Text>
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
          source={require("../assets/LogoText.png")}
          style={{ width: 150, height: 150, borderRadius: "75" }}
        />
        <View
          style={{
            marginLeft: 30,
            display: "flex",
            flexDirection: "collum",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>반가워요 Bony!</Text>
          <View
            style={{
              borderStyle: "solid",
              width: 200,
              height: 100,
              backgroundColor: "#d9d9d9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyPurchases");
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                My purchases
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>Go to Lesson</Text>
          </View>
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
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <LineChart
            data={linedata}
            width={Dimensions.get("window").width * 0.5} // from react-native
            height={120}
            // yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={{ width: "50%", marginLeft: 40 }}>
          <View
            style={{
              borderStyle: "solid",
              width: 150,
              height: 120,
              backgroundColor: "#d9d9d9",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              How to improve your Korean Level
            </Text>
            <Text style={{ fontSize: 20 }}>Go to Lesson</Text>
          </View>
        </View>
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
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default MyPage;

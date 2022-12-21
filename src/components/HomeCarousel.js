import React from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CottonCandyBanner from "../assets/img/CottonCandyBanner";
import LollipopBanner from "../assets/img/LollipopBanner";
import MintCandyBanner from "../assets/img/MintCandyBanner";
const windowWidth = Dimensions.get("window").width;
const HomeCarousel = () => {
  const data = [<LollipopBanner />, <CottonCandyBanner />, <MintCandyBanner />];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = ({ item }) => {
    return <View>{item}</View>;
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          backgroundColor: "#858585",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        containerStyle={{ paddingTop: 12, paddingBottom: 12 }}
      />
    );
  };

  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
      />
      {pagination()}
    </View>
  );
};

export default HomeCarousel;

import React, { useEffect, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel, { Pagination, ParallaxImage } from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;
const LessonSlides = ({ currentTime, slideList, screenWidth, screenHeight }) => {

  const data = [...slideList];
  const [activeIndex, setActiveIndex] = useState(0);
	
  const renderItem = ({item}) => {
    return <View 
		style={{
			width: Dimensions.get("screen").width,
			height: '100%',
		}}>
			<Image source={{uri : item.img_url}} style={{width : screenWidth, height: '100%'}}/>
		</View>;
  };

  const getSlideIndex = () => {
    let index = 0;
    slideList.map((item, i) => {
      if (item.display_time <= currentTime) {
        index = i;
      }
    });
    return index;

  }

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
    <View style={{
			height: screenHeight * (0.3),
		}}>
      <Carousel
        data={data}
				layout={'default'}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
        firstItem={getSlideIndex()}
      />
      {pagination()}
    </View>
  );
};

export default LessonSlides;

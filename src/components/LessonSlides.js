import React, { useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel, { Pagination, ParallaxImage } from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;
const LessonSlides = ({ slideList }) => {

  const data = [...slideList];
  const [activeIndex, setActiveIndex] = React.useState(0);
	
  const renderItem = ({item}) => {
    return <View 
		style={{
			width: Dimensions.get("screen").width,
			height: '100%',
		}}>
			<Image source={{uri : item}} style={{width : Dimensions.get("screen").width, height: '100%'}}/>
		</View>;
  };

	useEffect(() => {
		console.log("lesson slide data")
		// console.log(slideList);
	})

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
			height: Dimensions.get("screen").height * (0.35),
		}}>
      <Carousel
        data={data}
				layout={'default'}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
      />
      {pagination()}
    </View>
  );
};

export default LessonSlides;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const MyCart = ({ navigation, route }) => {
  const isAddToCart = route.params.isAddToCart ?? false;

  const [isSelectAll, setIsSelectAll] = useState(false);

  const [cartList, setCartList] = useState([
    {
      id: 1,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),

      className: "Trip Korean",
      price: 0,
      category: "K-culture",
      checked: false,
    },
    {
      id: 2,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),
      className: "Real Voca in K-Drama",
      price: 15,
      category: "K-culture",
      checked: false,
    },
    {
      id: 3,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),
      className: "Real Voca in K-Drama",
      price: 15,
      category: "K-culture",
      checked: false,
    },
  ]);

  // 장바구니에 담긴 상품들 불러오기
  useEffect(() => {
    console.log(route.params.classInfo);
  }, [isSelectAll]);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const changeCheckColor = (id = "default") => {
    if (id === "default") {
      if (isSelectAll) {
        setIsSelectAll(false);
        const newCartList = cartList.map((item) => {
          return { ...item, checked: false };
        });
        setCartList(newCartList);
      } else {
        setIsSelectAll(true);
        const newCartList = cartList.map((item) => {
          return { ...item, checked: true };
        });
        setCartList(newCartList);
      }
    } else {
      let isAllSelected = true;
      const newCartList = cartList.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });
      setCartList(newCartList);
      newCartList.map((item) => {
        if (!item.checked) {
          isAllSelected = false;
        }
      });
      if (isAllSelected) {
        setIsSelectAll(true);
      } else {
        setIsSelectAll(false);
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Cart</Text>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.selectAllContainer}>
          <TouchableOpacity
            onPress={() => {
              // 전체 선택
              changeCheckColor();
            }}
          >
            <Image
              style={styles.selectAllBtn}
              source={
                isSelectAll
                  ? require("../assets/img/ic-item-selected.png")
                  : require("../assets/img/ic-item-unselected.png")
              }
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // 전체 선택
              changeCheckColor();
            }}
          >
            <Text style={styles.selectAllText}>
              Select All ({cartList.length}/{cartList.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cartListContainer}>
        {cartList.map((item) => {
          return (
            <View style={styles.cartListItem}>
              <View style={styles.checkAndEdit}>
                <TouchableOpacity
                  onPress={() => {
                    // 상품 선택
                    changeCheckColor(item.id);
                  }}
                >
                  <Image
                    style={styles.selectBtn}
                    source={
                      item.checked
                        ? require("../assets/img/ic-item-selected.png")
                        : require("../assets/img/ic-item-unselected.png")
                    }
                  ></Image>
                </TouchableOpacity>
                <View style={styles.editBtn}>
                  <TouchableOpacity>
                    <Text style={styles.editBtnText}>edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.classInfoContainer}>
                <View style={styles.classImgContainer}>
                  <Image style={styles.classImg} source={item.imgUrl}></Image>
                </View>
                <View style={styles.classInfoTextContainer}>
                  <Text style={styles.classNameText}>{item.className}</Text>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.cateogryText}>{item.category}</Text>
                  </View>
                  <View style={styles.priceTextContainer}>
                    <Text style={styles.priceText}>
                      $ {item.price === 0 ? "Free" : item.price}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  console.log("BUY NOW");
                }}
              >
                <Image
                  style={styles.buyNowBtn}
                  source={require("../assets/img/ic-buynow-btn.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.bottomInfoContainer}>
        <View style={styles.selectedProductsContainer}>
          <Text style={styles.selectedProductsText}>Selected products</Text>
          <Text style={styles.selectedProductsNum}>2</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total</Text>
          <Text style={styles.totalPrice}>$ 15</Text>
        </View>
      </View>
      <View style={styles.checkoutBtnContainer}>
        <TouchableOpacity>
          <Image
            style={styles.checkoutBtn}
            source={require("../assets/img/btn-checkout.jpg")}
          ></Image>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    marginTop: 50,
    marginLeft: 35,
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    zIndex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  backBtn: {
    position: "absolute",
    top: 35,
    left: 25,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    zIndex: 1,

    backgroundColor: "white",
  },
  selectAllBtn: {
    marginRight: 5,
  },
  selectAllText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#B8B5BC",
  },
  cartListContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  cartListItem: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    marginBottom: 25,
  },
  checkAndEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  editBtnText: {
    color: "#B8B5BC",
    fontFamily: "Poppins-Regular",
    fontSize: 10,
  },
  classInfoContainer: {
    flexDirection: "row",
  },
  classImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  classNameText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#444345",
    marginBottom: 5,
  },
  categoryContainer: {
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#A160E2",
    borderWidth: 1,
    width: 65,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  cateogryText: {
    fontFamily: "Poppins-Regular",
    color: "#807F82",
    fontSize: 10,
  },
  priceText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  buyNowBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  bottomInfoContainer: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
  },
  selectedProductsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedProductsText: {
    fontFamily: "Poppins-Regular",
    color: "#444345",
    fontSize: 14,
  },
  selectedProductsNum: {
    fontFamily: "Poppins-Medium",
    color: "#000",
    fontSize: 20,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPriceText: {
    fontFamily: "Poppins-Regular",
    color: "#444345",
    fontSize: 14,
  },
  totalPrice: {
    fontFamily: "Poppins-Medium",
    color: "#000",
    fontSize: 20,
  },
  checkoutBtnContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  checkoutBtn: {},
});
export default MyCart;

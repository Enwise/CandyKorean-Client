import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const MyCart = ({ navigation, route }) => {
  const [isAddToCart, setIsAddToCart] = useState(
    route.params.isAddToCart ?? false
  );
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 장바구니에 담긴 상품들 불러오기
  useEffect(() => {
    console.log(route.params.classInfo);
    // let newPrice = 0;
    // cartList.map((item) => {
    //   newPrice += item.price;
    // });
    // setTotalPrice(newPrice);
    if (isAddToCart) {
      const classInfo = route.params.classInfo;
      const newProduct = {
        id: Date.now(),
        imgUrl: classInfo.imgUrl,
        category: classInfo.category,
        className: classInfo.className,
        level: classInfo.level,
        price: classInfo.price,
        units: classInfo.units,
        checked: false,
      };
      setCartList([...cartList, newProduct]);
      setIsAddToCart(false);
    }
  }, [isSelectAll, cartList, totalPrice, selectedCount]);

  const [cartList, setCartList] = useState([
    {
      id: 1,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),
      className: "Trip Korean",
      price: 0,
      category: "K-culture",
      checked: false,
      level: "Lollipop",
      units: 10,
    },
    {
      id: 2,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),
      className: "Real Voca in K-Drama",
      price: 15,
      category: "K-culture",
      checked: false,
      level: "CottonCandy",
      units: 10,
    },
    {
      id: 3,
      imgUrl: require("../assets/img/sample_class_img1.jpeg"),
      className: "Real Voca in K-Drama",
      price: 15,
      category: "K-culture",
      checked: false,
      level: "Lollipop",
      units: 10,
    },
  ]);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const changeCheckColor = (id = "default") => {
    console.log(id);
    let count = 0;
    if (id === "default") {
      if (isSelectAll) {
        setIsSelectAll(false);
        const newCartList = cartList.map((item) => {
          return { ...item, checked: false };
        });
        setCartList(newCartList);
        changePrice(newCartList);
        setSelectedCount(0);
      } else {
        setIsSelectAll(true);
        const newCartList = cartList.map((item) => {
          return { ...item, checked: true };
        });
        setCartList(newCartList);
        changePrice(newCartList);
        setSelectedCount(cartList.length);
      }
    } else {
      let isAllSelected = true;
      let newCartList = cartList.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });
      setCartList(newCartList);

      cartList.map((item) => {
        if (!item.checked) {
          isAllSelected = false;
        } else {
          count += 1;
        }
      });
      if (isAllSelected) {
        setIsSelectAll(true);
      } else {
        setIsSelectAll(false);
      }
      setSelectedCount(count);
      changePrice(newCartList);
    }
  };

  const changePrice = (cartList) => {
    console.log("changePrice");
    let newPrice = 0;
    cartList.map((item) => {
      if (item.checked) {
        newPrice += item.price;
      }
    });
    setTotalPrice(newPrice);
  };

  const deleteItem = (id) => {
    console.log(id);
    const newCartList = cartList.filter((item) => item.id !== id);
    setCartList(newCartList);
  };

  const checkBuyNow = (id) => {
    const newCartList = cartList.filter((item) => item.id === id);
    return newCartList;
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
        <SwipeListView
          data={cartList}
          // 어떻게 아이템을 렌더링 할 것인가
          renderItem={({ item }) => (
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
                {/* <View style={styles.editBtn}>
                  <TouchableOpacity>
                    <Text style={styles.editBtnText}>edit</Text>
                  </TouchableOpacity>
                </View> */}
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
                  const payList = checkBuyNow(item.id);
                  navigation.navigate("Payment", { payList: payList });
                }}
              >
                <Image
                  style={styles.buyNowBtn}
                  source={require("../assets/img/ic-buynow-btn.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          )}
          // 어떻게 숨겨진 아이템을 렌더링 할 것인가
          renderHiddenItem={({ item }) => (
            <View style={styles.swipeHiddenItemContainer}>
              <View style={styles.swipeHiddenItem}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClassMore", { title: item.level });
                  }}
                >
                  <Text style={styles.swipeHiddenItemText}>Similar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.swipeHiddenItem}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("delete");
                    deleteItem(item.id);
                  }}
                >
                  <Text style={styles.swipeHiddenItemText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          disableRightSwipe={true}
          // leftOpenValue={0}
        />
      </View>

      <View style={styles.bottomInfoContainer}>
        <View style={styles.selectedProductsContainer}>
          <Text style={styles.selectedProductsText}>Selected products</Text>
          <Text style={styles.selectedProductsNum}>{selectedCount}</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total</Text>
          <Text style={styles.totalPrice}>$ {totalPrice}</Text>
        </View>
      </View>
      <View style={styles.checkoutBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            const payList = cartList.filter((item) => item.checked);
            navigation.navigate("Payment", { payList: payList });
          }}
        >
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
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  titleContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    zIndex: 1,
    backgroundColor: "white",
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
    width: 350,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    marginBottom: 25,
    zIndex: 2,
    backgroundColor: "white",
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
    paddingBottom: 20,
  },
  swipeHiddenItemContainer: {
    paddingLeft: 30,
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  swipeHiddenItem: {
    height: "100%",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeHiddenItemText: {
    fontFamily: "Poppins-Medium",
    color: "#444345",
    fontSize: 14,
  },
});
export default MyCart;

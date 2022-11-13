import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
// import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";
import { Ionicons } from "@expo/vector-icons";
import SampleClassImg1 from "../assets/icons/SampleClassImg1";
import SampleClassImg2 from "../assets/icons/SampleClassImg2";

const MyWishList = ({ navigation, route }) => {
  const [isAdd, setIsAdd] = useState(route.params.isAdd ?? false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const [wishList, setWishList] = useState([]);
  const [wishListLength, setWishListLength] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  // 장바구니에 담긴 상품들 불러오기
  useEffect(() => {
    // console.log(route.params.classInfo);

    // let newPrice = 0;
    // wishList.map((item) => {
    //   newPrice += item.price;
    // });
    // setTotalPrice(newPrice);
    if (isAdd) {
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
      setWishList([...wishList, newProduct]);
      setIsAdd(false);
    }
    setWishListLength(wishList.length);
  }, [
    isSelectAll,
    wishList,
    totalPrice,
    selectedCount,
    wishListLength,
    dialogVisible,
  ]);

  const [wishList, setWishList] = useState([
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
        const newWishList = wishList.map((item) => {
          return { ...item, checked: false };
        });
        setWishList(newWishList);
        changePrice(newWishList);
        setSelectedCount(0);
      } else {
        setIsSelectAll(true);
        const newWishList = wishList.map((item) => {
          return { ...item, checked: true };
        });
        setWishList(newWishList);
        changePrice(newWishList);
        setSelectedCount(wishList.length);
      }
    } else {
      let isAllSelected = true;
      let newWishList = wishList.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });
      setWishList(newWishList);

      wishList.map((item) => {
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
      changePrice(newWishList);
    }
  };

  const changePrice = (wishList) => {
    console.log("changePrice");
    let newPrice = 0;
    wishList.map((item) => {
      if (item.checked) {
        newPrice += item.price;
      }
    });
    setTotalPrice(newPrice);
  };

  const deleteItem = (id) => {
    console.log(id);
    const newWishList = wishList.filter((item) => item.id !== id);
    setWishList(newWishList);
  };

  const checkBuyNow = (id) => {
    const newWishList = wishList.filter((item) => item.id === id);
    return newWishList;
  };

  return (
    <View
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      contentContainerStyle={{ ...styles.container }}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Wishlist</Text>
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
        {/* <View style={styles.selectAllContainer}>
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
              Select All ({wishList.length}/{wishList.length})
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {wishListLength === 0 ? (
        <View style={styles.wishListEmptyContainer}>
          <Text style={styles.wishListEmptyText}>Your Wishlist is empty</Text>
        </View>
      ) : (
        <FlatList
          contentContainerstyle={{ ...styles.wishListContainer }}
          numColumns={1}
          key={"_"}
          data={wishList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // 어떻게 아이템을 렌더링 할 것인가
          renderItem={({ item }) => (
            <View style={{ ...styles.wishListItem }}>
              {/* <View style={styles.checkAndEdit}>
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
              </View> */}

              <View style={styles.classInfoContainer}>
                <View style={styles.classImgContainer}>
                  <SampleClassImg1 />
                </View>
                <View style={styles.classInfoTextContainer}>
                  <View style={styles.classInfoTopContainer}>
                    <Text style={styles.classNameText}>{item.className}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setDialogVisible(true);
                        setSelectedId(item.id);
                      }}
                    >
                      <View style={styles.deleteContainer}>
                        <Text style={styles.deleteText}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

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
                  // const payList = checkBuyNow(item.id);
                  navigation.navigate("Payment", { item: item });
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
          //   renderHiddenItem={({ item }) => (
          //     <View style={styles.swipeHiddenItemContainer}>
          //       <View style={styles.swipeHiddenItem}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             navigation.navigate("ClassMore", { title: item.level });
          //           }}
          //         >
          //           <Text style={styles.swipeHiddenItemText}>Similar</Text>
          //         </TouchableOpacity>
          //       </View>
          //       <View style={styles.swipeHiddenItem}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             console.log("delete");
          //             deleteItem(item.id);
          //           }}
          //         >
          //           <Text style={styles.swipeHiddenItemText}>Delete</Text>
          //         </TouchableOpacity>
          //       </View>
          //     </View>
          //   )}
          //   rightOpenValue={-150}
          //   previewRowKey={"0"}
          //   previewOpenValue={-40}
          //   previewOpenDelay={3000}
          //   disableRightSwipe={true}
          //   // leftOpenValue={0}
          // />
        ></FlatList>
      )}
      <Dialog
        width={0.8}
        height={0.23}
        visible={dialogVisible}
        dialogStyle={{
          borderRadius: 25,
        }}
        onTouchOutside={() => {
          setDialogVisible(false);
        }}
        onHardwareBackPress={() => {
          setDialogVisible(false);
        }}
        dialogAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        footer={
          <DialogFooter
            bordered={false}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 20,
            }}
          >
            <DialogButton
              style={{
                backgroundColor: "#E6E3EA",
                borderRadius: 30,
                marginRight: 5,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "#444345",
                fontFamily: "Poppins-Medium",
                fontSize: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
              text="Return to Wishlist"
              onPress={() => {
                setDialogVisible(false);
              }}
            />
            <DialogButton
              style={{
                backgroundColor: "#444345",
                borderRadius: 30,
                marginLeft: 5,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "#E6E3EA",
                fontFamily: "Poppins-Medium",
                fontSize: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
              text="Delete"
              onPress={() => {
                setDialogVisible(false);
                deleteItem(selectedId);
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent
          style={{
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              paddingTop: 40,
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this class?
          </Text>
        </DialogContent>
        <TouchableOpacity
          onPress={() => {
            setDialogVisible(false);
          }}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <Ionicons name="ios-close-outline" size={24} color="black" />
        </TouchableOpacity>
      </Dialog>
      {/* 
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
            const payList = wishList.filter((item) => item.checked);
            navigation.navigate("Payment", { payList: payList });
          }}
        >
          <Image
            style={styles.checkoutBtn}
            source={require("../assets/img/btn-checkout.jpg")}
          ></Image>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "100%",
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
    marginBottom: 20,
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
  wishListContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  wishListItem: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    marginBottom: 35,
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
    position: "relative",
  },
  classInfoTextContainer: {
    width: "68%",
  },
  classInfoTopContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteContainer: {
    position: "absolute",
    right: 0,
  },
  deleteText: {
    color: "#B8B5BC",
    fontFamily: "Poppins-Regular",
    fontSize: 10,
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
  wishListEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
    backgroundColor: "white",
  },
  wishListEmptyText: {
    fontFamily: "Poppins-Regular",
    color: "#444345",
    fontSize: 14,
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
export default MyWishList;

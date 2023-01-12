import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
// import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";

import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";
import { Ionicons } from "@expo/vector-icons";
import { getWishlistByUser, getCourseById, deleteWishlist } from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";

const MyWishList = ({ navigation, route }) => {

  const { authState } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authState.userId);

  const [dialogVisible, setDialogVisible] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [isWishListLoaded, setIsWishListLoaded] = useState(false);
  
  const [courseIdList, setCourseIdList] = useState([]);
  const [courseList, setCourseList] = useState([]);


  // 장바구니에 담긴 상품들 불러오기
  useEffect(() => {
    
    // setUserId(authState.userId);
    console.log('user_id', userId)

    let updatedCourseList = [];
    
    if(!isWishListLoaded){
      getWishlistByUser(
        { user_id : userId },
        (d) => { 
          d.data.map((wishItem) => {

            console.log("wishItem", wishItem)
            console.log("-----------------");
            
              getCourseById(
                {course_id : wishItem.course_id},
                (d) => {
                console.log(d.data)
                let newData = d.data;
                newData['isSelected'] = false;
                setCourseList(
                  (prev) => [...prev, newData]
                );
                
              },
              () => {},
              (e) => {console.log(e)} 
              )
            
            
          })
          
          
      },
      setIsWishListLoaded,
      (e) => {
        console.log(e);
      })}

  }, [ ]);

  const deleteItem = (id) => {
    console.log(id);
    const newCourseList = courseList.filter((item) => item.course_id !== id);
    setCourseList(newCourseList);

    deleteWishlist(
      { user_id : userId, course_id : id },
      (d) => {
        console.log("delete success");
      },
      () => {},
      (e) => {console.log(e)}
    )

  };

  const updateSelected = (id) => {
    const newCourseList = courseList.map((item) => {
      if (item.course_id === id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    setCourseList(newCourseList);
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

      {courseList.length !== 0 ? (
        
        <View style={styles.flatListContainer}>
        <FlatList
          contentContainerstyle={{
            ...styles.wishListContainer,
            alignItems: "center",
          }}
          numColumns={1}
          key={"_"}
          data={courseList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // 어떻게 아이템을 렌더링 할 것인가
          renderItem={({ item }) => (
            <View style={{ ...dstyles(item.isSelected).wishListItem }}>
              <View style={styles.classInfoShadowContainer}>
                <TouchableOpacity
                  onPress={() => {
                    updateSelected(item.course_id);
                  }}
                >
                  <View style={styles.classInfoContainer}>
                    <Image
                      style={styles.classImgContainer}
                      source={{ uri: item.thumbnail }}
                    ></Image>
                    <View style={styles.classInfoTextContainer}>
                      <View style={styles.classInfoTopContainer}>
                        <Text style={styles.classNameText}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setDialogVisible(true);
                            setSelectedId(item.course_id);
                          }}
                        >
                          <AntDesign name="heart" size={24} color="#A160E2" />
                        </TouchableOpacity>
                      </View>

                      {/* <View style={styles.categoryContainer}>
                        <Text style={styles.cateogryText}>
                          {item.category}
                        </Text>
                      </View> */}
                      <View style={styles.priceTextContainer}>
                        <Text style={styles.priceText}>
                          {item.price == 0 ? "Free" : 
                          "$ " + item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {item.isSelected ? (
                <TouchableOpacity
                  onPress={() => {
                    // const payList = checkBuyNow(item.id);
                    navigation.navigate("Payment", { item: item, unitsNum: 10 });
                  }}
                >
                  <View style={styles.buyNowBtn}>
                    <Text style={styles.buyNowBtnText}>BUY NOW</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        ></FlatList>
      </View>
      ) : (
        <View style={styles.wishListEmptyContainer}>
          <Text style={styles.wishListEmptyText}>Your Wishlist is empty</Text>
        </View>
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

const dstyles = (isSelected) =>
  StyleSheet.create({
    wishListItem: {
      width: Dimensions.get("window").width * 0.9,
      marginBottom: isSelected ? 65 : 20,
      backgroundColor: "#fff",
      height: Dimensions.get("window").height * 0.15,
    },
  });

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
  flatListContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 180,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  wishListContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    flexGrow: 1,
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
  classInfoShadowContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.35,
    borderRadius: 9,
    backgroundColor: "#fff",

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: "gray",
        elevation: 5,
      },
    }),
    marginBottom: 15,
  },
  classInfoContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 9,
  },
  classImgContainer: {
    width: "30%",
    height: "80%",
    borderRadius: 10,
    marginRight: 10,
  },

  classInfoTextContainer: {
    width: "65%",
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
    width: Dimensions.get("window").width * 0.9,
    height: 30,
    backgroundColor: "#A160E2",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowBtnText: {
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    fontSize: 12,
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

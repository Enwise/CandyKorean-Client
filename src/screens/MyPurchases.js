import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import {getPurchasedCoursesByUserId, getUserById} from "../modules/NetworkFunction";
import AuthContext from "../contexts/AuthContext";
const MyPurchases = ({navigation}) => {

    const [isOpen, setIsOpen] = useState(0);
    const { signOut, authState } = React.useContext(AuthContext);
    const purchaseArr = [
        {
            No: "20220903TC",
            title: "trip korean",
            category: "k-culture",
            price: "free",
            period: "2022.09.27 - 2023.03.27",
        },
        {
            No: "20220922TC",
            title: "trip korean",
            category: "k-culture",
            price: "free",
            period: "2022.09.27 - 2023.03.27",
        },
    ]

    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [user, setUser] = React.useState(null);


    React.useEffect(() => {
        getPurchasedCoursesByUserId(
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

    return (
        <View style={styles.container}>
            <View style={{display:"flex", flexDirection:"row",alignItems:"center", width:"90%"}}>
                <BackButton onPress={() => navigation.navigate("My")}/>
                <View style={{marginLeft:47}}>
                    <Text style={{fontSize:20, fontWeight:"600"}}>Completed Purchases</Text>
                </View>
            </View>
            <View style={{height:40}}/>
            {purchaseArr.map((item, idx)=>{

                return (
                    <View key={idx} style={{display:"flex", flexDirection:"column", width:"90%", marginBottom:20}}>
                        <Text style={{fontSize:14, fontWeight:"500", color:"#807F82", marginBottom:5}}>{item.No}</Text>
                        {/*,boxShadow:"0px 2px 10px rgba(0, 0, 0, 0.07)"*/}
                        <View style={{display:"flex", flexDirection:"column",borderRadius:9}}>
                            <View style={{height:11}}/>
                            <View style={{display:"flex", flexDirection:"row"}}>
                                <View style={{width:11}}/>
                                <Image
                                    source={require("../assets/img/sample_class_img2.png")}
                                    style={{width:90, height:90, borderRadius:7}}
                                />
                                <View style={{display:"flex", flexDirection:"column", marginLeft:15}}>
                                    <Text style={{fontSize:16, fontWeight:"500", marginBottom:12, color:"#444345"}}>{item.title}</Text>
                                    {/*border:"1px solid #A160E2",*/}
                                    <View style={{backgroundColor:"rgba(161, 96, 226, 0.1)",borderRadius:20, display:"flex", justifyContent:"center", alignItems:"center",marginBottom:16, width:50}}>
                                        <Text style={{fontSize:10, fontWeight:"300",color:"#807F82"}}>{item.category}</Text>
                                    </View>

                                    <View style={{display:"flex", justifyContent:"space-between",alignItems:"center", flexDirection:"row", width:180}}>
                                        <Text style={{fontSize:14, fontWeight:"500"}}>$ {item.price}</Text>

                                        {isOpen === idx + 1 ?
                                            <TouchableOpacity
                                                onPress={()=>{setIsOpen(0)}}
                                            >
                                                <Image
                                                    source={require("../assets/img/icon-up.png")}
                                                    style={{width:18, height:14}}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                onPress={()=>{setIsOpen(idx+1)}}
                                            >
                                                <Image
                                                    source={require("../assets/img/icon-down.png")}
                                                    style={{width:18, height:14}}
                                                />
                                            </TouchableOpacity>
                                        }

                                    </View>

                                </View>

                            </View>
                            {isOpen === idx+1 ?
                                <View style={{display:"flex", flexDirection:"column", marginTop:11, backgroundColor:"rgba(241, 239, 244, 0.7)", padding:10}}>
                                    <Text style={{fontSize:10, fontWeight:"500", color:"#807F82"}}>from {item.period.split("-")[0]}</Text>
                                    <Text style={{fontSize:10, fontWeight:"500", color:"#807F82"}}>until {item.period.split("-")[1]}</Text>
                                    <View style={{display:"flex", flexDirection:"row" ,justifyContent:"space-between",paddingBottom:5}}>
                                        <Text style={{fontSize:10, fontWeight:"500", color:"#807F82"}}>Paypal</Text>
                                        <Text style={{fontSize:10, fontWeight:"500", color:"#807F82"}}>{item.price}</Text>
                                    </View>
                                    <View style={{width:"100%", height:0.5, backgroundColor:"#B8B5BC"}}/>
                                    <View style={{display:"flex", flexDirection:"row" ,justifyContent:"space-between", marginTop:5}}>
                                        <Text style={{fontSize:10, fontWeight:"500", color:"#444345"}}>Total</Text>
                                        <Text style={{fontSize:12, fontWeight:"500", color:"#A160E2"}}>{item.price}</Text>
                                    </View>
                                </View>
                                :
                                ""
                            }


                        </View>

                    </View>
                );
            })}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        width: '100%',
        paddingTop: '15%',
        paddingBottom : '15%',
        backgroundColor:"#FFFFFF"
    },
});

export default MyPurchases;

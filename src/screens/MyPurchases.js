import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
const MyPurchases = ({navigation}) => {

    const [isOpen, setIsOpen] = useState(0);
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

    return (
        <View style={styles.container}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"90%"}}>
                <View style={{width:"56%", display:"flex", flexDirection:"row-reverse"}}>
                    <Text style={{fontSize:"20px"}}>Completed Purchases</Text>
                </View>
                <BackButton onPress={() => navigation.navigate("My")}/>
            </View>
            <View style={{height:40}}/>
            {purchaseArr.map((item, idx)=>{

                return (
                    <View style={{display:"flex", flexDirection:"column", width:"90%", marginBottom:20}}>
                        <Text>{item.No}</Text>
                        <View style={{display:"flex", flexDirection:"column", backgroundColor:"#d9d9d9", padding:10}}>
                            <View style={{display:"flex", flexDirection:"row"}}>
                                <Image
                                    source={require("../assets/LogoText.png")}
                                    style={{width:100, height:100}}
                                />
                                <View style={{display:"flex", flexDirection:"column", marginLeft:60}}>
                                    <Text style={{fontSize:"20px", fontWeight:"500", marginBottom:10}}>title : {item.title}</Text>
                                    <Text style={{fontSize:"20px", fontWeight:"500", marginBottom:10}}>category : {item.category}</Text>
                                    <Text style={{fontSize:"20px", fontWeight:"500", marginBottom:10}}>price : {item.price}</Text>
                                </View>
                            </View>
                            {isOpen === idx+1 ?
                                <View style={{display:"flex", flexDirection:"column", marginTop:20}}>
                                    <Text>from {item.period.split("-")[0]}</Text>
                                    <Text>until {item.period.split("-")[1]}</Text>
                                    <View style={{display:"flex", flexDirection:"row" ,justifyContent:"space-between"}}>
                                        <Text>Paypal</Text>
                                        <Text>{item.price}</Text>
                                    </View>
                                    <View style={{width:"100%", height:1, backgroundColor:"#000000"}}/>
                                    <View style={{display:"flex", flexDirection:"row" ,justifyContent:"space-between"}}>
                                        <Text>Total</Text>
                                        <Text>{item.price}</Text>
                                    </View>
                                </View>
                                :
                                ""
                            }


                        </View>
                        <TouchableOpacity
                            onPress={()=>{setIsOpen(idx+1)}}
                        >
                            <View style={{height:20, width:"100%", backgroundColor:"blue"}}

                            />
                        </TouchableOpacity>
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
    },
});

export default MyPurchases;

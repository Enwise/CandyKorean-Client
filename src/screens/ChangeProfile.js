import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import BackButton from "../components/BackButton";
import WebView from "react-native-webview";
import AuthContext from "../contexts/AuthContext";
import { getUserById, updateUser } from '../modules/NetworkFunction';
import ChangeProfileCheck from '../assets/icons/ChangeProfileCheck';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const ChangeProfile = ({ navigation, route }) => {

  const { authState } = React.useContext(AuthContext);
	const [userId, setUserId] = useState(authState.userId);
	const [userImgUrl, setUserImgUrl] = useState();

	const [nickname, setNickname] = useState();


	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.photo,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
		});

		// console.log(result.cancelled);

		if (!result.canceled) {
				

				console.log(result.assets[0].uri);
				console.log(result.assets[0]);


				// 폼데이터 생성
				let formData = new FormData();

				let image = {
						uri: result.assets[0].uri,
						type: 'multipart/form-data',
						name:`${result.assets[0].uri}`,
				}

				formData.append('file', image);

				console.log('formData', formData);

				axios.post('http://ec2-13-209-87-211.ap-northeast-2.compute.amazonaws.com/apis/upload', formData, {
						headers: {'content-type' : 'multipart/form-data'}
				}).then((response) => {
						let img_url = response.data.data.link;
						setUserImgUrl(img_url);
						updateUser(
								{
										userId:authState.userId,
										img_url,
								},
								(d) => {
										console.log(d.data);
								},
								() => {},
								(e) => {
										console.log(e);
								}
						);
				})
			}

		};


	useEffect(() => {

		// 유저 정보 가져오기
		async function getUserInfo() {
			await getUserById(
				{ userId }, 
				(d) => {
				console.log(d.data)
				setNickname(d.data.name);
				setUserImgUrl(d.data.img_url);
			}, () => {}, (e) => {});
		}
		getUserInfo();

	}, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: "absolute", left: 20 }}>
          <BackButton onPress={() => navigation.pop()} />
        </View>
        <Text style={styles.headerText}>Change Profile</Text>
				<View style={{ position: "absolute", right: 20 }}  ><ChangeProfileCheck onPress={() => {
					updateUser(
						{
								userId:authState.userId,
								name: nickname,
						},
						(d) => {
								console.log(d.data);
						},
						() => {},
						(e) => {
								console.log(e);
						}
				);
					navigation.pop()}
				}/></View>
				
      </View>
			<View style={styles.changeImageContainer}>
			<View style={{width:"100%", display:"flex", alignItems:"center"}}>
                            <View style={{position:"relative", width:200, height:200}}>
  
                                {userImgUrl === "" || userImgUrl === undefined ?
                                    <Image
                                        source={require("../assets/img/mypage-default-image.png")}
                                        style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                    />
                                  :
                                  <Image
                                      source={{
                                          uri: `${userImgUrl}`
                                      }}
                                      style={{width:200, height:200, borderRadius:100, position:"absolute"}}
                                  />

                                }

                                <TouchableOpacity
                                    style={{position:"absolute", right:20, bottom:0}}
                                    onPress={()=>{
                                        console.log("press button clk");
                                        pickImage();
                                    }}
                                >
                                    <Image
                                        source={require("../assets/img/profile-img-change-icon.png")}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                onChangeText={setNickname}
                                value={nickname}
                                placeholder= ""
                                keyboardType="default"
                            />




                        </View>
			</View>

      {/* <WebView source={{ uri: route.params.uri }} style={{ flex: 1 }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {

    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#FDFDFD",
  },
  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
	changeImageContainer : {
		flex: 1,
		backgroundColor: "#FDFDFD",
		justifyContent:'center',
		alignItems:'center',
		marginBottom: 30,
	},
	input: {
		borderBottomColor:"#B8B5BC",
		borderBottomWidth:1,
		marginTop: 10,
		fontWeight:"600",
		fontSize:20,
		color:"#444345",
		fontFamily: "Poppins-SemiBold"
},

});

export default ChangeProfile;

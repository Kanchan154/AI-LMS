import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from './../constant/Colors'
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth'
import {auth, db} from './../configs/firebaseConfig'
import {doc, getDoc} from "firebase/firestore";
import {useContext} from 'react';
import {UserDetailContext} from "@/context/UserDetailContext";
export default function Index() {

  const router = useRouter();
  const { userDetail, setUserDetail }= useContext(UserDetailContext)

  onAuthStateChanged(auth, async(user) => {
    if(user) {
      console.log(user);
      const result=await getDoc(doc(db,'users',user?.email));
      setUserDetail(result.data())
      router.replace('/(tabs)/home')
    }
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >
      <Image source={require('./../assets/images/landing.png')}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70
        }}
      />
      <View style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,

      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-bold'
        }}>Welcome to coaching guru</Text>

        <Text style={{
          fontSize: 20,
          color: Colors.WHITE,
          marginTop: 20,
          textAlign: 'center',
          fontFamily: 'outfit'
        }}>Transform your ideas into engaging educational content effortlessly with AI 👋 🤖</Text>

        <TouchableOpacity style={styles.button}
          onPress={() => router.push('./auth/signUp')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('./auth/signIn')} style={[styles.button, {
          backgroundColor: Colors.PRIMARY,
          borderWidth: 1,
          borderColor: Colors.WHITE

        }]}>
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an account?</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10

  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit'
  }
})
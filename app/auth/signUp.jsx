import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import {useState} from 'react'
import Colors from './../../constant/Colors'
import { TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import {setDoc,doc} from 'firebase/firestore'
import {auth,db} from '../../config/firebaseConfig'
import {UserDetailContext} from './../../context/UserDetailContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
export default function SignUp() {
    // const auth = getAuth(app);
    const router = useRouter();
    const [fullName,setFullName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const {userDetail,setUserDetail}=useContext(UserDetailContext)
    const CreateNewAccount=async()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then( async (resp)=>{
            const user=resp.user;
            console.log(user);
            await SaveUser(user);
            //save user to database
        })
        .catch(e => {
            console.log(e.message)
        })
    }

    const SaveUser = async(user)=>{
        const data={
            name:fullName,
            email:email,
            member:false,
            uid:user?.uid
        }
        await setDoc(doc(db,'users',email),data)

        setUserDetail(data);

       
        //Navigate to new screen
    }

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 100,
            flex: 1,
            padding: 25,
            backgroundColor: Colors.WHITE
        }}>

            <Image source={require('./../../assets/images/logo.png')}
                style={{
                    width: 180,
                    height: 180
                }}
            />

            <Text style={{
                fontSize: 30,
                fontFamily: 'outfit-bold'
            }}>Create New Account</Text>

            <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={styles.textInput} />
            <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput} />
            <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput} />

            <TouchableOpacity
            onPress={CreateNewAccount}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                    marginTop: 25,
                    borderRadius: 10
                }}
            >
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.WHITE,
                    textAlign: 'center'
                }}>Create Account</Text>
            </TouchableOpacity>

            <View style={{
                display: 'flex',
                flexDirection: 'row', gap: 5,
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Already have an account?</Text>
                <Pressable
                    onPress={() => router.push('/auth/signIn')}
                >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>SignIn here</Text>
                </Pressable>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: '100%',
        padding: 10,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8
    }
})
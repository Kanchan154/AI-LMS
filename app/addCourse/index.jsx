import { View, Text, StyleSheet, TextInput, Pressable,topic} from 'react-native'
import React,{useState} from 'react'
import Colors from '../../constant/Colors'
import Button from '../components/Shared/Button'
import { GenerateTopicsAIModel } from '../../config/AiModel';
export default function AddCourse() {
    const [loading,setLoading]=useState(false);
    const [userInput,setUserInput]=useState();
    const [topics,setTopics]=useState([]);
    const [selectedTopics, setSelectedTopics]=useState([]);
   const onGenerateTopic=async()=>{
    // Get topic idea from AI model
    const PROMPT=userInput+prompt.IDEA;
    const aiResp=await GenerateTopicsAIModel.sendMessage(PROMPT)
    const topicIdea=JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea?.course_titles);
    setLoading(false);
   }
   const onTopicSelect=(topic)=>{
    const isAlreadyExist=selectedTopics.find((item)=>item==topic);
    if(!isAlreadyExist)
    {
        setSelectedTopics(prev=>[...prev,topic])
    }
    else{
        const topics=selectedTopics.filter(item=>item!==topic);
        setSelectedTopics(topics);
    }
   }
   const isTopicSelected=(topic)=>{
    const selection=selectedTopics.find(item=>item==topic);
    return selection?true:false
   }
  return (
    <View style={{
        padding: 25,
        backgroundColor:Colors.WHITE,
        flex:1
    }}>
     <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30
     }}>Create New Course </Text>
     <Text style={{
        fontFamily:'outfit',
        fontSize:25
     }}>What you want to learn today?</Text>

     <Text style={{
        fontFamily: 'outfit',
        fontSize: 20,
        marginTop: 8,
        color:Colors.GRAY
     }}>What courses you want to create (ex.Learn Python, React js,Digital Marketting Guide)</Text>
    
     <TextInput placeholder='(Ex.Learn Python, Learn 12th Chemistry) '
     style={styles.textInput}
     numberOfLines={3}
     multiline ={true}
     onChangeText={(value)=>setUserInput(value)}
     />

    <Button text={'Generate Topic'} type='outline' onPress={()=>onGenerateTopic} loading={loading}/>
    
    <View>
    <Text style={{
        fontFamily:'outfit',
        fontSize: 20

    }}>Select all the Topics which you wnat to learn.</Text>
    <View style={{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        gap: 10,
        marginTop:6
    }}>
    {topics.map((item,index)=>(
        <Pressable key={index} onPress={()=>onTopicSelect(item)}>
        <Text style={{
            padding: 7,
            borderWidth:.4,
            borderRadius:99,
            paddingHorizontal:15,
            backgroundColor:isTopicSelected(item)?Colors.PRIMARY:null,
            color:isTopicSelected(item)?Colors.WHITE:Colors.PRIMARY
        }}>{item}</Text>
        </Pressable>
    ))}
    </View>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        height: 100,
        marginTop:10,
        alignItems: 'flex-start',
        fontSize:18
    }
})
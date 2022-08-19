import {StatusBar, Button, StyleSheet, Text,Image, View, FlatList, Dimensions } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react'
import ImagePicker from './imagePicker/ImagePicker';
import { Feather,AntDesign } from '@expo/vector-icons';
import convertToHours from './imagePicker/convertToHours';

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pick, setPick] = useState(false);
  const [images,setImages] = useState([])
  const [items,setItems] =useState([])
const pickImage=()=>{
    if(!status.canAskAgain && !status.granted){
      const pkg = Constants.manifest.releaseChannel ? Constants.manifest.android.package : 'host.exp.exponent'
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')
      } else {
        IntentLauncher.startActivityAsync(
            IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
              { data: 'package:' + pkg },
        )
      }

      return;
    }
    requestPermission();
  
  setPick(true);
}
const win = Dimensions.get('window');

  return (
    <>
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>this is an example to create a custom image picker</Text>
          <Button title='Pick images' onPress={pickImage} />
        </View>
        <ImagePicker pick={pick} setPick={setPick} setItems={setItems}/>
        <FlatList data={items} renderItem={({item})=><>{item.mediaType === 'video' ?(
          <View>
          <Image source={{uri:item.uri}} 
                 style={{marginVertical:5,resizeMode:'contain',width:item.width < win.width?item.width:win.width ,
                     height:item.height * (win.width/item.width), aspectRatio:item.width/item.height }}
                 />
          <View style={{position:'absolute', left:'45%', bottom:'45%'}}>
              <AntDesign name="play" size={30} color="white" />
          </View>
          <View style={{position:'absolute', bottom:4,left:4}}>
               <Feather name="video" size={24} color="white" />
        </View>
        <View style={{position:'absolute', bottom:4,right:4}}>
               <Text style={{color:'white'}}>{convertToHours(item.duration)}</Text>
               
        </View>
          </View>
        ):(
          <Image source={{uri:item.uri}} 
                 style={{marginVertical:5,resizeMode:'contain',width:item.width < win.width?item.width:win.width ,
                     height:item.height * (win.width/item.width), aspectRatio:item.width/item.height }}
                 />
        )}
                              </>
                              }/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
},
content:{
 marginTop:20,
 marginBottom:5,
  justifyContent:'center',
  alignItems:'center',
}
});

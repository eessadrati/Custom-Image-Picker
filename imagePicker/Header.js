import { StyleSheet,Dimensions,Button, Text, View, Pressable, Platform } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({selectedImages,setItems,setSelectedImages,setPick}) => {
   
    const headerHeight = Platform.OS === "ios" ? 64 : 56
    const headerWidth = Dimensions.get('window').width;
    const pickImages = ()=>{
        setPick(false);
        setItems(selectedImages)
        setSelectedImages([])
    }
    const cancelSelection =()=>{
        setPick(false);
        setSelectedImages([])
        setItems([])
    }
  return (
   <>
    <View style={{shadowColor: "#000",shadowOffset: {width: 0,height: 2,},
                      shadowOpacity: 0.25,shadowRadius: 3.84, elevation: 5,
                      display:'flex', flexDirection:'row', paddingHorizontal:6,
                      backgroundColor:'#ffffff', width:headerWidth, paddingVertical:3,margin:0,height:headerHeight}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
         <Pressable onPress={cancelSelection}>
         <MaterialIcons name="cancel" size={24} color="black" />
         </Pressable>
       
        </View>
        <View style={{ padding:2, flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>
                {selectedImages.length <= 0 ? "Select item":selectedImages.length ===1 ? '1 item selected' :`${selectedImages.length} items selected`}
                 </Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            {selectedImages.length > 0 && <Button title="next" onPress={pickImages} />}
        </View>
    </View>
   </>
  )
}

export default Header

const styles = StyleSheet.create({})
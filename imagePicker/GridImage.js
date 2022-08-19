import { StyleSheet,Image, Text, View,Pressable } from 'react-native'
import React,{useState,memo} from 'react'
import { MaterialIcons,SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import convertToHours from './convertToHours';
const GridImage = (props) => {
    const { image,setSelectedImages,index } = props;
   
    const [imageSelected, setImageSelected] = useState(false);
    const selectImage = (img) => {
        if(!imageSelected){
            //add to selected
            setSelectedImages(prv=> [...prv,img]);
        }else{
            //remove from selected images
            setSelectedImages(prv => prv.filter(i=>i.id !== img.id));
        }
       setImageSelected(prv=>!prv);
    }
    
  return (
    <View style={ imageSelected ? styles.imageSelected : styles.gridImage} >
        <Pressable  style={{flex:1}}  onPress={()=>selectImage(image)}> 
         <Image source={{ uri:image?.uri}} style={styles.image} />
         </Pressable>
         {imageSelected &&
            <>
            <View style={{ position: 'absolute', bottom:"40%", right: "40%"}}>
            <MaterialIcons onPress={()=>selectImage(image)} name="done-outline" size={30} color="red"  />
            </View>
            <View style={{position:'absolute',backgroundColor:"red", top:0,right:0}}>
                <Text style={{color:"white",marginVertical:1,marginHorizontal:6}} >{index+1}</Text>
            </View>
            </>
        }
        {image.mediaType === 'video' &&(
         <>
        <View style={{position:'absolute', bottom:0,left:1}}>
               <Feather name="video" size={20} color="white" />
        </View>
        <View style={{position:'absolute', bottom:1,right:1}}>
               <Text style={{color:'white'}}>{convertToHours(image.duration)}</Text>
               
        </View>
        </>
        )}
     </View>
  )
    
}

export default memo(GridImage)

const styles = StyleSheet.create({
    gridImage: {
        width: "33%",
         flexDirection:'row',
        height:120,
        borderWidth: 1,
        margin:0.5,
        borderColor: "#ddd",
    },
    imageSelected: {
        width: "33%",
        flexDirection:'row',
       height:120,
       borderWidth: 1.5,
       margin:0.5,
       borderColor: "red",
       backgroundColor:"green"
    },
    image: {
        resizeMode: "cover",
        flex: 1,
    }
})
import {FlatList,ActivityIndicator, Button, Modal, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect, useRef} from 'react'
import Header from './Header'
import * as MediaLibrary  from 'expo-media-library';
import GridImage from './GridImage';
import FlatListFooter from './FlatListFooter';
import FlatListEmpty from './FlatListEmpty';

const ImagePicker = ({pick,setPick,setItems}) => {
  const [selectedImages,setSelectedImages]= useState([]);
  const [refreshing,setRefreshing]=useState(false)
  const [loading,setLoading]= useState(true);
  const [media, setMedia] = useState([]);
  const [nextMedia, setNextMedia] = useState({});
 
  useEffect(() => {
    //get all media
       const getMedia = async () => {
           setLoading(true)
           const firstPage = await MediaLibrary.getAssetsAsync({
               sortBy:[MediaLibrary.SortBy.default],
               mediaType: ['photo', 'video'],
           });
           if(pick){
           setMedia(firstPage.assets);
           const hasNextPage = firstPage.hasNextPage
           const endCursor = firstPage.endCursor
          
           setNextMedia({hasNextPage,endCursor})
           }
           setLoading(false)
       }
        getMedia()
}, [pick]);

const loadMoreMedia = async ()=>{
  if(nextMedia.hasNextPage){
    const nextPage = await MediaLibrary.getAssetsAsync({
      after: nextMedia.endCursor,
      sortBy:[MediaLibrary.SortBy.default],
      mediaType: ['photo', 'video'],
  });
  hasNextPage = nextPage.hasNextPage
  endCursor = nextPage.endCursor
  setNextMedia({hasNextPage,endCursor})
  setMedia(prv=>[...prv, ...nextPage.assets])
  }
}
const onRefresh = async()=>{
  setRefreshing(true)
  const firstPage = await MediaLibrary.getAssetsAsync({
    first: 20,
    sortBy:[MediaLibrary.SortBy.default],
    mediaType: ['photo', 'video'],
  });
  setMedia(firstPage.assets);
  let hasNextPage = firstPage.hasNextPage
  let endCursor = firstPage.endCursor
  setNextMedia({hasNextPage,endCursor})
  setRefreshing(false)

}

  return (
    <>
    {pick ? (
      <Modal
        animationType="fade"
        visible={true}
        >
        <View style={{width:'100%',height:'100%', zIndex: 1000, elevation: 1000,position:'absolute',}}>
          <Header selectedImages={selectedImages} setItems={setItems} setSelectedImages={setSelectedImages} setPick={setPick}/>
          <View style={{flex:1,marginTop:3}}>
           {loading ? <>
            <ActivityIndicator/>
           </>:(
            <>
            <FlatList
              data={media}
              numColumns = {3}
              keyExtractor={(item) => (item.id+ item.modificationTime) }
              onEndReached={loadMoreMedia}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onEndReachedThreshold={0.5}
              ListFooterComponent={<FlatListFooter end={!nextMedia.hasNextPage} />}
              ListEmptyComponent={FlatListEmpty}
              renderItem={({ item }) => <GridImage image={item}
                                                   index={selectedImages.indexOf(item)}
                                                   setSelectedImages={setSelectedImages} 
                                                   />}
              />
             
            </>
           )}
          </View>
            
         </View>
         </Modal>
    ): null}
    </>
   
  )
}

export default ImagePicker

const styles = StyleSheet.create({})
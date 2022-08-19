import { StyleSheet,Button,Dimensions, Text, View } from 'react-native'
import React from 'react'

const height = Dimensions.get('window').height 
const FlatListEmpty = ({refresh}) => {
  return (
    <View style={styles.emptyText}>
        <Text style={styles.text}>No Data at the moment</Text>
        <Button  onPress={refresh} title='Refresh'/> 
    </View>
  )
}

export default FlatListEmpty

const styles = StyleSheet.create({
    emptyText: {
        width:'100%',
        height:height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize:16,
        margin:4,
    }
})
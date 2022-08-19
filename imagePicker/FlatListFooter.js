import { StyleSheet, Text,ActivityIndicator, View } from 'react-native'
import React from 'react'

const FlatListFooter = ({end}) => {
  return (
    <View style={{padding:7,justifyContent:'center',alignItems:'center'}}>
      {end ?
         <Text style={{fontSize:16}}>No more media</Text>
         :(
            <>
                <ActivityIndicator size={30} color={"red"}/>
            </>
         )}
    </View>
  )
}

export default FlatListFooter

const styles = StyleSheet.create({})
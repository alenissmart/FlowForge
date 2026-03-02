import { router } from 'expo-router'
import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/splash-icon.png")} 
        resizeMode="cover"
        style={ styles.image }
      >
        <Text style={styles.title}>Main page</Text>
        
        <Pressable 
          style={styles.activityButtonStyle}
          onPress={() => {
            // function to save user input 
            router.push("/(onboarding)/preferences");
          }}
        >
          <Text style={styles.activityButtonText}>testing</Text>
        </Pressable>
      
      </ImageBackground>
    </View>
  )
}

export default app


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
  },
  title: {
    color: 'black',
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 120,
  },
  link: {
    marginHorizontal: 'auto',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  activityButtonStyle: {
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    justifyContent: 'center'
  },
  activityButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})

import { View, Text, Image, ImageBackground, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/splash-icon.png")} 
        resizeMode="cover"
        style={ styles.image }
      >
        <Text style={styles.title}>Main page</Text>

        <Link href='/activity' style={styles.link} asChild>
          <Pressable style={styles.activityButtonStyle}>
            <Text style={styles.activityButtonText}>activity</Text>
          </Pressable>
        </Link>

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

import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const preferencesScreen = () => {
  const [study, setStudy] = useState(60);
  const [exercise, setExercise] = useState(30);
  const [relax, setRelax] = useState(10);

  const total = study + exercise + relax;

  const handleNext = () => {
    if (total !== 100) {
      Alert.alert('Total must equal 100%', 'Please adjust the sliders so they add up to 100%.');
      return;
    }

    router.push('/(onboarding)/scheduleInfoScreen');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F5B3B6', '#C94B52']} style={styles.gradient}>
        
        <Text style={styles.title}>How should we balance your time?</Text>

        <Text style={styles.subtitle}>
          We'll use this to personalize your schedule.
        </Text>

        {/* Study */}
        <Text style={styles.label}>Study</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={study}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#ddd"
            onValueChange={(val) => {
              if (val + exercise + relax <= 100) setStudy(val);
            }}
          />
          <Text style={styles.percent}>{study}%</Text>
        </View>

        {/* Exercise */}
        <Text style={styles.label}>Exercise</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={exercise}
            minimumTrackTintColor="darkred"
            maximumTrackTintColor="#ddd"
            onValueChange={(val) => {
              if (study + val + relax <= 100) setExercise(val);
            }}
          />
          <Text style={styles.percent}>{exercise}%</Text>
        </View>

        {/* Relax */}
        <Text style={styles.label}>Relax</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={relax}
            minimumTrackTintColor="hotpink"
            maximumTrackTintColor="#ddd"
            onValueChange={(val) => {
              if (study + exercise + val <= 100) setRelax(val);
            }}
          />
          <Text style={styles.percent}>{relax}%</Text>
        </View>

        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            styles.nextButtonStyle,
            {
              transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
            },
          ]}
        >
          <Text style={styles.mainButtonText}>Next</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.smallText,
                {
                  color: pressed
                    ? 'rgba(91, 90, 90, 1)'
                    : 'rgba(182, 179, 179, 1)',
                  marginTop: 10,
                },
              ]}
            >
              Back
            </Text>
          )}
        </Pressable>

      </LinearGradient>
    </View>
  );
};

export default preferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  gradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontSize: 38,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2b2b2b',
    marginBottom: 40,
  },

  label: {
    color: 'white',
    fontSize: 24,
    marginTop: 20,
  },

  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },

  slider: {
    flex: 1,
  },

  percent: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
    width: 60,
    textAlign: 'right',
  },

  nextButtonStyle: {
    width: 200,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(163,51,58,1)',
    justifyContent: 'center',
    marginTop: 40,
  },

  mainButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
  },

  smallText: {
    marginTop: 15,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
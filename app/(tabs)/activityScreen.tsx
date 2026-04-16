import AuthScreenLayout from '@/app/screenTemplate';
import { auth } from '@/config/firebase';
import { getSchedule } from '@/services/dbServices';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 200;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const activityConfig: any = {
  exercise: { color: '#FF6B6B', emoji: '💪', messages: ['Push it.', 'Stay strong.', 'Keep going.'] },
  study: { color: '#4D96FF', emoji: '📚', messages: ['Lock in.', 'Focus up.', 'Stay sharp.'] },
  relax: { color: '#6BCB77', emoji: '🧘', messages: ['Breathe.', 'Slow down.', 'Reset.'] },
  meal: { color: '#FFD93D', emoji: '🍽️', messages: ['Eat well.', 'Fuel up.', 'Take your time.'] },
  class: { color: '#845EC2', emoji: '🏫', messages: ['Stay engaged.', 'Pay attention.', 'Take notes.'] },
};

const activityPage = () => {
  const [activity, setActivity] = useState<any>('study');
  const [className, setClassName] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(60);

  // format current time to match schedule keys (HH:MM)
  const getCurrentTimeKey = () => {
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / 5) * 5;
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = minutes.toString().padStart(2, '0');
    return `${hours}:${mins}`;
  };

  const getDayKey = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  // 🔥 ACTUAL SCHEDULE LOGIC
  const loadActivityFromSchedule = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const schedule = await getSchedule(user.uid);
    if (!schedule) return;

    const day = getDayKey();
    const time = getCurrentTimeKey();

    const value = schedule?.[day]?.[time];

    if (!value) {
      setActivity('relax');
      return;
    }

    const lower = value.toLowerCase();

    if (['study', 'exercise', 'relax', 'meal'].includes(lower)) {
      setActivity(lower);
      setClassName('');
    } else {
      // it's a class code
      setActivity('class');
      setClassName(value);
    }
  };

  useEffect(() => {
    loadActivityFromSchedule();

    // refresh every minute
    const interval = setInterval(loadActivityFromSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  // random message
  useEffect(() => {
    const msgs = activityConfig[activity].messages;
    setMessage(msgs[Math.floor(Math.random() * msgs.length)]);

    // timers per activity
    if (activity === 'study') {
      setTimeLeft(1500);
      setTotalTime(1500);
    } else if (activity === 'exercise') {
      setTimeLeft(30);
      setTotalTime(30);
    } else if (activity === 'relax') {
      setTimeLeft(60);
      setTotalTime(60);
    } else {
      setTimeLeft(0);
      setTotalTime(0);
    }
  }, [activity]);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // progress math
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <AuthScreenLayout
      headerContent={
        <Text style={[styles.title, { color: activityConfig[activity].color }]}>
          {activity === 'class' ? className : activity.toUpperCase()}
        </Text>
      }
      middleContent={
        <View style={styles.middleContainer}>
          {/* 🔥 REAL CIRCULAR TIMER */}
          <View>
            <Svg width={SIZE} height={SIZE}>
              {/* background circle */}
              <Circle
                stroke={activityConfig[activity].color + '30'}
                fill="none"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
              />

              {/* progress circle */}
              <Circle
                stroke="white"
                fill="none"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${SIZE / 2}, ${SIZE / 2}`}
              />
            </Svg>

            {/* emoji in center */}
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{activityConfig[activity].emoji}</Text>
            </View>
          </View>

          <Text style={styles.message}>{message}</Text>
        </View>
      }
      bottomContent={
        <View style={styles.buttonRow}>
          {Object.keys(activityConfig).map((key) => (
            <Pressable key={key} onPress={() => setActivity(key)} style={styles.button}>
              <Text>{key}</Text>
            </Pressable>
          ))}
        </View>
      }
    />
  );
};

export default activityPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  middleContainer: {
    alignItems: 'center',
    gap: 30,
  },
  emojiContainer: {
    position: 'absolute',
    top: 75,
    left: 75,
  },
  emoji: {
    fontSize: 50,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#00000020',
    borderRadius: 8,
  },
});
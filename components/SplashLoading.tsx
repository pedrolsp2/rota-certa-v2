import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '@/assets/lottie/loadingSplash.json';

const SplashLoading = () => {
  const animation = useRef<LottieView>(null);
  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={loading}
        autoPlay
        loop
        style={{
          width: 380,
          height: 380,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashLoading;

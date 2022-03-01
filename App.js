import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Gameboard from './Gameboard';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  )
}
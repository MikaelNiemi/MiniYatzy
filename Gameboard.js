import { Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_SPOTS = 6;
const NBR_OF_POINTS = 6;
const BONUS = 63;


export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState('');
  const [bonusStatus, setBonusStatus] = useState('');
  const [selectDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));
  const [selectSpots, setSelectedSpots] =
    useState(new Array(NBR_OF_SPOTS).fill(false));
  const [selectPoints, setSelectedPoints] =
    useState(new Array(NBR_OF_POINTS).fill(false));

  // Noppien valinta
  function selectDice(i) {
    let dices = [...selectDices];
    dices[i] = selectDices[i] ? false : true;
    setSelectedDices(dices);
  }

  // Spottien valinta
  function selectSpot(i) {
    let spots = [...selectSpots];
    spots[i] = selectSpots[i] ? false : true;
    setSelectedSpots(spots);
  }

  // Noppien heitto
  function throwDices() {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectDices[i]) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);

  }

  // Muokkaa paljon
  function checkBonusPoints() {
    if (nbrOfThrowsLeft === 0) {
      setStatus('Select your points');
    }
    else {
      setStatus('Select and throw dices again');
    }
  }

  useEffect(() => {
    checkBonusPoints();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started');
      setBonusStatus('You are ' + [BONUS] + ' points away from bonus');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsLeft]);

  // Noppa rivi
  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
          key={"row" + i}
          onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name ={board[i]}
          key={"row" + i}
          size={50}
          color={selectDices[i] ? "black" : "steelblue"}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

  // Pojo rivi
  const pointsRow = [];
  for (let i = 1; i <= NBR_OF_SPOTS; i++) {
    pointsRow.push(
      <Pressable
          key={"row" + i}
          onPress={() => selectSpot(i)}>
        <MaterialCommunityIcons
          name ={"numeric-" + [i] + "-circle"}
          key={"row" + i}
          size={50}
          color={selectSpots[i] ? "black" : "steelblue"}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

  // Bonus pojorivi
  const bonusRow = [];
  let points = 0;
  for (let i = 1; i <= NBR_OF_POINTS; i++) {
    bonusRow.push(
      <Text>{points}</Text>
    );
  }

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
      <Text style={styles.gameinfo}>Total: {sum}</Text>
      <Text style={styles.gameinfo}>{bonusStatus}</Text>
      <Grid>
        <Row style={styles.gameinfo}>{bonusRow}</Row>
        <Row style={styles.gameinfo}>{pointsRow}</Row>
      </Grid>
    </View>
  );
}
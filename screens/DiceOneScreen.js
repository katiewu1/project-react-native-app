import React, { useState, useRef, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  Vibration,
} from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

import SensorComponent from '../components/SensorComponent'

const displayChore = (chore) => {
  switch (chore) {
    case '1':
      return 'robot-vacuum'
    case '2':
      return 'washing-machine'
    case '3':
      return 'shopping'
    case '4':
      return 'dishwasher'
    case '5':
      return 'sleep'
    case '6':
      return 'television-play'
    default:
      return 'dice-multiple'
  }
}

const rollDice = () => {
  // ending value: 6; starting value: 1
  return Math.floor(Math.random() * 6) + 1
}

const DiceOneScreen = () => {
  const [diceChore, setDiceChore] = useState('')

  const handleShake = () => {
    shake()
    Vibration.vibrate()
    let counter = 0
    let interval = setInterval(() => {
      setDiceChore(rollDice().toString())
      counter++
      if (counter === 10) {
        clearInterval(interval)
      }
    }, 50)
  }

  // = shake animation
  const anim = useRef(new Animated.Value(0))

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -4,
          duration: 50,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 4,
          duration: 50,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 3 times
      { iterations: 3 }
    ).start()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chore Dice</Text>
      <View style={styles.viewContainer}>
        <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={displayChore(diceChore)}
              size={120}
              color='#006600'
            />
          </View>
        </Animated.View>
        <Text style={styles.text}>{displayChore(diceChore)}</Text>
      </View>
      <Button
        title='Roll Dice'
        onPress={() => {
          // invoke shake function -> illustrate 'shaking' dice
          shake()
          // vibrates the device once
          Vibration.vibrate()
          // invoke rollDice 10 times with an interval of 50ms
          let counter = 0
          let interval = setInterval(() => {
            setDiceChore(rollDice().toString())
            counter++
            if (counter === 10) {
              clearInterval(interval)
            }
          }, 50)
        }}
        color='#F4A442'
        accessibilityLabel='Press the button to roll the dice'
      />
      <View style={styles.viewContainer}>
        <Text style={styles.text}>or try to shake</Text>
        <AntDesign name='shake' size={40} color='#006600' />
        {/* SensorComponent - pass the handleShake as prop */}
        <SensorComponent onShake={handleShake} />
      </View>
    </View>
  )
}

// = StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#006600',
    fontSize: 40,
    margin: 20,
  },
  viewContainer: {
    alignItems: 'center',
    margin: 30,
  },
  icon: {
    borderWidth: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#006600',
  },
  text: {
    margin: 10,
  },
})

export default DiceOneScreen

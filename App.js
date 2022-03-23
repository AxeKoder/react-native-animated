/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Pressable,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Constant = {
  animDuration: 285,
}

const Stack = createStackNavigator()

const HomeScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [ isActive, setActive ] = useState(false)
  
  const colorValue = isActive ? 1 : 0
  const animColor = useRef(new Animated.Value(0)).current
  const interpolatedColor = animColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(86, 86, 86, 0.9)', 'rgba(0, 255, 0, 1)']
  })

  const animatedTextColor = animColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(14, 14, 18, 1)', 'rgba(248, 212, 12, 1)']
  })

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  useEffect(() => {
    Animated.timing(
      animColor, {
        toValue: colorValue,
        duration: Constant.animDuration,
        useNativeDriver: false,
      }
    ).start()
  }, [isActive])

  const onPress = () => {
    console.log(`isActive = ${isActive}`);
    setActive(!isActive)
  }

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    // </SafeAreaView>
    <Animated.View style={[styles.topContainer, {
      backgroundColor: interpolatedColor,
    }]}>
      <Animated.Text style={[styles.statusTitle, {
        color: animatedTextColor,
      }]}>{isActive ? "Active" : "Inactive"}</Animated.Text>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{
          width: "100%",
        }}>
          <FlexNumericView isActive={isActive}></FlexNumericView>
        </View>
      </TouchableWithoutFeedback>
      {/* <Text style={styles.navButton}>네비게이션</Text> */}
      <Button
        title="Go to detail" 
        color={animatedTextColor}
        onPress={ () => navigation.push('Detail') }/>

    </Animated.View>
  );
};

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.topContainer}>
      <Text>Detail View</Text>
    </View>
  )
}

const FlexNumericView = ({ isActive }) => {
  const anim = useRef(new Animated.Value(30)).current
  const animColor = useRef(new Animated.Value(0)).current
  const interpolatedColor = animColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 1)', 'rgba(255, 212, 0, 1)'],
  })

  useEffect(() => {
    console.log(`isActive = ${isActive}`);
    const vPadding = isActive ? 60 : 30
    const colorValue = isActive ? 1 : 0
    
    Animated.timing(
      anim, {
        toValue: vPadding,
        duration: Constant.animDuration,
        useNativeDriver: false,
      }
    ).start()

    Animated.timing(
      animColor, {
        toValue: colorValue,
        duration: Constant.animDuration,
        useNativeDriver: false,
      }
    ).start()
  }, [isActive])

  const onTouchCenter = () => {
    alert('pressed center!')
  }

  return (
    <Animated.View style={[styles.outerWrap, {
      paddingVertical: anim,
      backgroundColor: interpolatedColor,
    }]}>
      <VerticalText isActive={ isActive }></VerticalText>
      <VerticalText isActive={ isActive }></VerticalText>
      <VerticalText isActive={ isActive }></VerticalText>
    </Animated.View>
  )
}

const VerticalText = ({ isActive }) => {
  const anim = useRef(new Animated.Value(8)).current
  const toValue = isActive ? 8 : 0

  useEffect(() => {
    Animated.timing(
      anim, {
        toValue: toValue,
        duration: Constant.animDuration,
        useNativeDriver: false,
      }
    ).start()
  }, [isActive])

    return (
    <Animated.View style={[styles.innerWrap, {
      marginHorizontal: anim,
    },]}>
      <Text style={styles.sectionTitle}>1</Text>
      <Text style={styles.sectionTitle}>2</Text>
      <Text style={styles.sectionTitle}>3</Text>
    </Animated.View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Button(props) {
  const { onPress, title = 'Next', color } = props
  console.log(`Button: color = ${color}`);
  
  return (
    <Animated.View style={[styles.navButton, {
      backgroundColor: color,
    }]}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    paddingVertical: 4,
    backgroundColor: "gray",
  },
  statusTitle: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  outerWrap: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  innerWrap: {
    display: "flex",
    flexDirection: "column",
    width: 44,
    // alignItems: 'center',
    padding: 4,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    padding: 12,
    backgroundColor: "black",
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '700',
    color: "white",
    paddingVertical: 10,
  }
});

export default App;

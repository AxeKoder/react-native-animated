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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Constant = {
  animDuration: 250,
}

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [ isActive, setActive ] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const onPress = () => {
    console.log(`isActive = ${isActive}`);
    
    setActive(!isActive)
  }

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    // </SafeAreaView>
    <View style={styles.topContainer}>
      {
        isActive ? 
        <Text style={styles.statusTitle}>Active</Text> : 
        <Text style={styles.statusTitle}>Inactive</Text>
      }
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{
          width: "100%",
        }}>
          <FlexNumericView isActive={isActive}></FlexNumericView>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.navButton}>네비게이션</Text>
    </View>
  );
};

const FlexNumericView = ({ isActive }) => {
  const anim = useRef(new Animated.Value(30)).current
  const animColor = useRef(new Animated.Value(0)).current
  const interpolatedColor = animColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 1)', 'rgba(121, 244, 182, 1)'],
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

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "gray",
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
  },
  innerWrap: {
    display: "flex",
    flexDirection: "column",
    width: 44,
    // alignItems: 'center',
    padding: 4,
  },
  navButton: {
    fontSize: 40,
    fontWeight: '900',
    width: "100%",
    textAlign: "center",
    color: "white",
    paddingVertical: 10,
    marginVertical: 40,
  }
});

export default App;

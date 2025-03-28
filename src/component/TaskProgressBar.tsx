/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../config/Env';
import {Shadow} from 'react-native-shadow-2';

interface ProgressBarProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  totalPercentage: number;
}

const TaskProgressBar: React.FC<ProgressBarProps> = ({
  title,
  currentStep,
  totalSteps,
  totalPercentage,
}) => {
  // const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Shadow
      distance={3}
      style={{
        width: '100%',
        borderRadius: responsiveScreenHeight(1),
      }}
      startColor={color.gray2}
      offset={[0, 0]}>
      <View style={styles.container}>
        <View style={styles.progressBar}>
          {/* Progress Bar Filled Section */}
          <View style={[styles.filled, {width: `${Math.ceil(totalPercentage)}%`}]} />

          {/* Text and Step Information */}
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>{currentStep}</Text>
              <Image
                source={require('../assests/icons/small-logo.png')}
                style={styles.stepIcon}
              />
              <Text style={styles.stepText}>{totalSteps}</Text>
            </View>
          </View>
        </View>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: responsiveScreenHeight(1),
  },
  progressBar: {
    flex: 1,
    height: responsiveScreenHeight(4),
    borderRadius: responsiveScreenHeight(1),
    overflow: 'hidden',
    backgroundColor: '#eaf3f4',
    justifyContent: 'center', // Center content vertically
  },
  filled: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#a0c4ce',
    borderRadius: responsiveScreenHeight(1),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(3), // Add padding for spacing
  },
  titleText: {
    color: color.black87,
    fontSize: responsiveScreenFontSize(1.5),
    fontWeight: '400',
    fontFamily: font.NunitoMedium,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: color.black60,
    fontSize: responsiveScreenFontSize(1.5),
    fontWeight: '400',
    fontFamily: font.NunitoMedium,
  },
  stepIcon: {
    width: responsiveScreenWidth(2),
    aspectRatio: 1,
    tintColor: color.primary,
    marginHorizontal: responsiveScreenWidth(0.5),
  },
});

export default TaskProgressBar;

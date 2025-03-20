import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../config/Env';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import AuthWarper from '../Auth/AuthWarper';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const ProjectSelection = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useAppSelector(state => state.userStore);
  console.log('user--------->', user);
  // const dispatch = useAppDispatch();
  const width = responsiveScreenWidth(90);
  const sliderWidth = width * 0.5;
  const [selected, setSelected] = useState('Ongoing');
  const translateX = useSharedValue(selected === 'Ongoing' ? 0 : sliderWidth);

  const handleToggle = (value: 'Ongoing' | 'Completed') => {
    setSelected(value);
    translateX.value = withTiming(value === 'Ongoing' ? 0 : sliderWidth, {
      duration: 200,
    });
  };

  return (
    <AuthWarper>
      <View style={[styles.toggleContainer, {width}]}>
        <Animated.View style={[styles.slider, {transform: [{translateX}]}]} />
        <Pressable
          onPress={() => handleToggle('Ongoing')}
          style={styles.button}>
          <Text
            style={
              selected === 'Ongoing' ? styles.activeText : styles.inactiveText
            }>
            Ongoing
          </Text>
          <View
            style={[
              styles.badge,
              selected === 'Ongoing'
                ? styles.activeBadge
                : styles.inactiveBadge,
            ]}>
            <Text
              style={
                selected === 'Ongoing'
                  ? styles.activeBadgeText
                  : styles.inactiveBadgeText
              }>
              02
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => handleToggle('Completed')}
          style={styles.button}>
          <Text
            style={
              selected === 'Completed' ? styles.activeText : styles.inactiveText
            }>
            Completed
          </Text>
          <View
            style={[
              styles.badge,
              selected === 'Completed'
                ? styles.activeBadge
                : styles.inactiveBadge,
            ]}>
            <Text
              style={
                selected === 'Completed'
                  ? styles.activeBadgeText
                  : styles.inactiveBadgeText
              }>
              01
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.selectionCityCard}>
        <Text style={styles.cardHeading}>Which Site you want to see?</Text>
        <FlatList
          data={[1, 1, 1, 1, 1, 1]}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: responsiveScreenWidth(3),
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={{
                  flex: 1,
                  marginVertical: responsiveScreenHeight(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate(routes.PM_HOMEPAGE)}>
                <Image
                  source={require('../../assests/image4.png')}
                  style={{
                    width: responsiveScreenWidth(38),
                    height: responsiveScreenHeight(15),
                    borderRadius: 10,
                  }}
                />
                <Text style={{color: 'white', marginTop: 5}}>Site Name</Text>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </AuthWarper>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    // width: responsiveScreenWidth(90),
    // height: responsiveScreenHeight(6),
    paddingVertical: responsiveScreenHeight(1.2),
    backgroundColor: color.white,
    borderRadius: responsiveScreenWidth(10),
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  slider: {
    position: 'absolute',
    width: '50%',
    // height: responsiveScreenHeight(5),
    paddingVertical: responsiveScreenHeight(2.7),
    backgroundColor: color.primary,
    borderRadius: responsiveScreenWidth(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    gap: 10,
  },

  activeText: {
    color: 'white',
    fontSize: responsiveScreenWidth(3),
    fontFamily: font.NunitoBold,
  },

  inactiveText: {
    color: '#7D7D7D',
    fontSize: responsiveScreenWidth(3),
    fontFamily: font.NunitoExtraBold,
  },

  badge: {
    width: responsiveScreenWidth(5),
    height: responsiveScreenWidth(5),
    borderRadius: responsiveScreenWidth(5) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeBadge: {
    backgroundColor: color.white,
  },

  inactiveBadge: {
    backgroundColor: 'rgba(216, 214, 214, 0.5)',
  },

  activeBadgeText: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: responsiveScreenWidth(3),
  },

  inactiveBadgeText: {
    color: color.black60,
    fontWeight: 'bold',
    fontSize: responsiveScreenWidth(3),
  },

  selectionCityCard: {
    backgroundColor: color.primaryForTop,
    marginTop: responsiveScreenHeight(6),
    height: '83%',
    borderRadius: responsiveScreenWidth(5),
    marginHorizontal: responsiveScreenWidth(4.5),
  },

  cardHeading: {
    alignSelf: 'center',
    fontSize: responsiveScreenFontSize(2),
    color: color.white,
    marginVertical: responsiveScreenWidth(2),
    fontFamily: font.NunitoBold,
  },
});

export default ProjectSelection;

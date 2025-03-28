import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Shadow } from 'react-native-shadow-2';
import { color, font, routes } from '../../config/Env';
// import { useProject } from '../../hooks/apiHooks/useProject';
import { useAppSelector } from '../../hooks/hooks';
import AuthWarper from '../Auth/AuthWarper';

const ProjectSelection = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  
  // Manage project status toggle
  const [status, setStatus] = useState<'Ongoing' | 'Completed'>('Ongoing');
  // const { projects, isProjectsLoading } = useProject(status);

  const projects = useAppSelector((state) => state.projectStore.projects);
  

  const animatedLeft = useSharedValue(0);

  const handleToggle = (newStatus: 'Ongoing' | 'Completed') => {
    if (status !== newStatus) {
      animatedLeft.value = withTiming(
        newStatus === 'Ongoing' ? 0 : responsiveScreenWidth(47),
        { duration: 300 }
      );
      setStatus(newStatus);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({ left: animatedLeft.value }));

  return (
    <AuthWarper>
      <View style={styles.container}>
        <Shadow distance={2} startColor={color.black10} offset={[0, 0]}>
          <View style={styles.toggleContainer}>
            <Animated.View style={[styles.animatedBackground, animatedStyle]} />
            <Pressable
              onPress={() => handleToggle('Ongoing')}
              style={styles.toggleButton}>
              <Text style={[styles.toggleText, status === 'Ongoing' && styles.activeText]}>
                Ongoing
              </Text>
              <View
                style={[
                  styles.badge,
                  status === 'Ongoing' ? styles.activeBadge : styles.inactiveBadge,
                ]}>
                <Text
                  style={[
                    styles.badgeText,
                    status === 'Ongoing' ? styles.activeBadgeText : styles.inactiveBadgeText,
                  ]}>
                  {projects?.length ?? 0}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => handleToggle('Completed')}
              style={styles.toggleButton}>
              <Text style={[styles.toggleText, status === 'Completed' && styles.activeText]}>
                Completed
              </Text>
              <View
                style={[
                  styles.badge,
                  status === 'Completed' ? styles.activeBadge : styles.inactiveBadge,
                ]}>
                <Text
                  style={[
                    styles.badgeText,
                    status === 'Completed' ? styles.activeBadgeText : styles.inactiveBadgeText,
                  ]}>
                  {projects?.length ?? 0}
                </Text>
              </View>
            </Pressable>
          </View>
        </Shadow>
      </View>
      <View style={styles.selectionCityCard}>
        <Text style={styles.cardHeading}>Which Site you want to see?</Text>
        {false ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={projects ?? []}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <Pressable
                style={styles.siteItem}
                onPress={() =>
                  navigation.navigate(routes.PM_HOMEPAGE, {
                    projectId: item?._id,
                  })
                }>
                <Image source={item?.photo} style={styles.siteImage} />
                <Text style={styles.siteText}>{item?.name}</Text>
              </Pressable>
            )}
            keyExtractor={item => item._id.toString()}
          />
        )}
      </View>
    </AuthWarper>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  toggleContainer: {
    borderRadius: 100,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: color.white,
    width: responsiveScreenWidth(94),
  },
  animatedBackground: {
    width: '50%',
    backgroundColor: color.primary,
    borderRadius: 100,
    position: 'absolute',
    height: '100%',
    top: 0,
  },
  toggleButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveScreenHeight(1.3),
  },
  toggleText: {
    color: color.black87,
    fontFamily: font.NunitoMedium,
    fontSize: responsiveScreenFontSize(1.5),
    marginRight: 5,
  },
  activeText: { color: color.white },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: { backgroundColor: '#FFF' },
  inactiveBadge: { backgroundColor: '#E0E0E0' },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  activeBadgeText: { color: color.primary },
  inactiveBadgeText: { color: '#757575' },
  selectionCityCard: {
    backgroundColor: color.primaryForTop,
    marginTop: responsiveScreenHeight(6),
    height: '83%',
    borderRadius: responsiveScreenWidth(5),
    marginHorizontal: responsiveScreenWidth(4.5),
    paddingVertical: responsiveScreenHeight(2),
  },
  cardHeading: {
    alignSelf: 'center',
    fontSize: responsiveScreenFontSize(2),
    color: color.white,
    marginVertical: responsiveScreenWidth(2),
    fontFamily: font.NunitoBold,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  siteItem: {
    flex: 1,
    marginVertical: responsiveScreenHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  siteImage: {
    width: responsiveScreenWidth(38),
    height: responsiveScreenHeight(15),
    borderRadius: 10,
  },
  siteText: { color: 'white', marginTop: 5 },
  loadingText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: responsiveScreenFontSize(2),
  },
});

export default ProjectSelection;
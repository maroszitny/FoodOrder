import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import ImageContent from "../../components/ImageContent";
import styles from './style';

const NotifyTemplate = () => {
  return <>
    <ActivityIndicator color="#fff"/>
    <Text style={{color: "#fff", marginTop: 10}}>Loading Menu...</Text>
  </>;
};

export const RenderView = () => {
  return <ImageContent style={styles.container}>
    <NotifyTemplate />
  </ImageContent>;
};
export default RenderView;

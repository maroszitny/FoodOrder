import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet} from 'react-native';
import {Footer} from 'native-base';
import colors from "../themes/dark/colors";
import LinearGradient from "react-native-linear-gradient";
const styles = StyleSheet.create({
  bgImage: {
    height: 'auto'
  },
});
const SMFooter = ({children, style}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.background, colors.backgroundLight]}
      style={[styles.bgImage, {...style}]}
    >
      <Footer backgroundColor="transparent" style={{elevation: 0, borderWidth: 0, backgroundColor: "transparent", alignItems: "baseline",...Platform.select({
          android: {
            marginTop: 5,
          },
        }),}}>
        {children}
      </Footer>
    </LinearGradient>
  );
};

SMFooter.propTypes = {
  children: PropTypes.node,
};
export default SMFooter;

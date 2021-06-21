import { StyleSheet, Dimensions } from 'react-native';
import {colors} from "../../styles";

export const styles = StyleSheet.create({
  button: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.backgroundLight,
    height: Dimensions.get('window').width/2 - 70,
    minWidth: Dimensions.get('window').width/2 - 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
  },
  icon: {position: 'absolute', top:18},
  text: {position: 'absolute', bottom:10, color: colors.textInputColor},
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  tabContainer: {
    borderBottomColor: '#090909'
  },
  tabText: {
    padding: 15,
    color: colors.ButtonTextColor,
    fontSize: 18,
    fontWeight: '500'
  },
  separator: {
    height: 0,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff'
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  sectionHeaderText: {
    color: '#010101',
    backgroundColor: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingHorizontal: 15
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: '#131313'
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313'
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16
  },
  itemRow: {
    flexDirection: 'row'
  }
});

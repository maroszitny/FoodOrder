import React, {useEffect, useState} from 'react';

import {View, Text, FlatList} from 'react-native';
import {colors} from '../styles';
import {Body, CheckBox, ListItem} from "native-base";
import {notEmpty, trimPrice} from "utils/helper";

export default function RNSRadioGroup(
  {
    items,
    isMultiple,
    selectedIndex,
    onChange,
  }
) {
  const [selectedId, setSelectedId] = useState(selectedIndex);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (isMultiple && !notEmpty(selectedIndex)) {
      setSelectedId([]);
    }
  }, []);

  useEffect(() => {
    if (changed) {
      setChanged(false);
      onChange(selectedId);
    }
  }, [changed]);

  const setIndex = (id) => {
    if (isMultiple) {
      let temp = notEmpty(selectedId) ? selectedId : [];
      const index = temp.findIndex(item => item === id);
      console.log(index);
      if (index > -1) {
        temp.splice(index, 1);
      } else {
        temp.push(id);
      }
      setSelectedId(temp);
    } else {
      setSelectedId(id);
    }
    setChanged(true);
  };

  const checkIndex = (id) => {
    const temp = notEmpty(selectedId) ? selectedId : [];
    return (isMultiple) ? temp.findIndex(item => item === id) > -1 : temp === id;
  };
  return (
    <FlatList
      data={items}
      renderItem={({item}) => <ListItem onPress={() => setIndex(item.id)}>
        <CheckBox checked={checkIndex(item.id)} color={colors.textInputColor} onPress={() => setIndex(item.id)}/>
        <Body>
          <Text style={{color: colors.textInputColor, marginStart: 10}}>{`${item.name} ${item.price ? '(+$' + trimPrice(item.price) + ')' :  ''}`}</Text>
        </Body>
      </ListItem>}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  underline: {
    borderWidth: 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  itemUnderline: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
  },
  itemActive: {
    backgroundColor: colors.primary,
  },
  itemActiveUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  text: {
    color: colors.primary,
  },
  textUnderline: {
    color: '#a6a6a6',
  },
  textActive: {
    color: colors.white,
  },
  textActiveUnderline: {
    color: colors.primary,
  },
};

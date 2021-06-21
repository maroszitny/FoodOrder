import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import {Container, Button, ListItem, CheckBox, Body, Label, Textarea} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {SMHeader, SMContent, RadioGroup} from "../../components";
import colors from "../../themes/dark/colors";
import {notEmpty, thumbnail, trimPrice} from "utils/helper";
import {useDispatch, useSelector} from "react-redux";
import foodCore from "../../core/food";
import SMFooter from "components/SMFooter";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import mainCore from "../../core/main";
import {useFirestoreConnect} from "react-redux-firebase";
import {docId} from "../../config/config";

export default function FoodMenuScreen(props) {
  const dispatch = useDispatch();
  useFirestoreConnect(() => [{
    collection: 'cache',
    doc: docId,
    storeAs: docId,
  }]);
  const cacheData = useSelector(({ firestore: { data } }) => data[docId]);
  const selectFood = props.navigation.getParam('item');
  const isEdit = props.navigation.getParam('isEdit');
  const cartKey = props.navigation.getParam('key') || null;
  const variations = useSelector(state => foodCore.selectors.getVariations(state));
  const currentUser = useSelector(state => mainCore.selectors._user(state));

  const [modifiers, setModifiers] = useState([]);
  const [amount, setAmount] = useState((isEdit) ? selectFood.amount : 1);
  const [totalPrice, setTotalPrice] = useState(selectFood.priceMin);
  const [modifierData, setModifierData] = useState((isEdit) ? selectFood.modifierData : {});

  useEffect(() => {
    const selectedModifier = dispatch(foodCore.actions.getModifierTypes(selectFood, {location: cacheData}));
    setModifiers(selectedModifier);
  }, [cacheData]);
  const addAmount = () => {
    const a_m = amount + 1;
    setAmount(a_m);
    // onAddCart()
  };

  const deleteAmount = () => {
    const a_m = amount - 1;
    if (a_m > 0) setAmount(a_m);
    // onDeleteCart()
  };
  const addCart = (item) => {
    const cart = {...item, modifierData, amount};
    console.log('modifierData:', modifierData);
    if (isEdit) {
      props.editCart(cartKey, cart);
    } else {
      props.addCart(cart);
    }
    props.navigation.navigate('Cart', {item});
  };
  const handleModifierData = (cateId, isMultiple, data) => {
    console.log('cateId:', cateId);
    console.log('handleModifierData:', data);
    modifierData[cateId] = data;
    setModifierData(modifierData);
  };
  return (
    <Container style={{backgroundColor: colors.backgroundLight}}>
      <SMContent noPadding>
        <Image source={{ uri: thumbnail(selectFood.image, '512x512') }} style={{width: Dimensions.get('window').width, aspectRatio: 1.25, resizeMode: 'cover', position: 'absolute', top: 0}}/>
        <SMHeader
          navigation={props.navigation}
          isMenu={false}
          isHome
          isBack
          isRefresh={false}
          transparent
        />
        <View style={{marginTop: Dimensions.get('window').width/1.25 - 170, }}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.4)', 'rgba(0,0,0, 0.6)']} style={{height: 90, paddingHorizontal: 20, borderWidth: 0}}>
            <Text style={{color: colors.ButtonTextColor, fontSize: 20, fontWeight: 'bold', marginTop: 20}}>{selectFood.name}</Text>
            <Text style={{color: colors.ButtonTextColor, fontSize: 15 }}>{selectFood.description}</Text>
          </LinearGradient>
          <View style={{paddingTop: 20, paddingHorizontal: 20}}>
            {notEmpty(modifiers) &&
              <FlatList
                data={modifiers}
                renderItem={({item}) =>
                  <ModifierItem
                    data={item}
                    modifierData={notEmpty(selectFood.modifierData) ? selectFood.modifierData[item.id]: null}
                    dataChange={(data) => handleModifierData(item.id, item.isMultiple, data)}
                  />
                }
                keyExtractor={item => item.id.toString()}
              />
            }
            <View style={{paddingHorizontal: 10, marginVertical: 10}}>
              <Label style={[styles.label, {color: colors.textInputColor}]}>Add Note</Label>
              <Textarea
                disableFullscreenUI
                rowSpan={3}
                style={[
                  styles.inputTextArea,
                ]}
                placeholder=""
                placeholderTextColor={colors.grey}
                bordered={false} underline={false}
                onChangeText={(value) => {}}
              />
            </View>
          </View>
        </View>
      </SMContent>
      <SMFooter>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 120}}>
            <Button
              bordered
              iconLeft
              rounded
              small
              transparent
              style={{width: 30, padding: 5, borderColor: colors.gray, alignSelf: 'center'}}
              onPress={() => deleteAmount()}
            >
              <AntDesignIcon name='minus' size={18}/>
            </Button>
            <View style={{paddingTop: 3, paddingHorizontal: 10}}>
              <Text>{amount}</Text>
            </View>
            <Button
              bordered
              iconLeft
              rounded
              small
              transparent
              style={{width: 30, padding: 5, borderColor: colors.gray, alignSelf: 'center'}}
              onPress={() => addAmount()}
            >
              <AntDesignIcon name='plus' size={18}/>
            </Button>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 10}}>
            <Button full rounded style={{backgroundColor: colors.yellowDark, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => addCart(selectFood)}>
              <Text style={{color: colors.ButtonTextColor, fontWeight: 'bold', fontSize: 18}}>{isEdit ? 'EDIT CART' : 'ADD CART'}</Text>
              <Text style={{color: colors.ButtonTextColor, marginStart: 5, fontSize: 12}}>${trimPrice(totalPrice * amount)}</Text>
            </Button>
          </View>
        </View>
      </SMFooter>
    </Container>
  );
}

const ModifierItem = ({data, modifierData, dataChange}) => {
  return <View style={{marginBottom: 10, padding: 8, flexDirection: 'row'}}>
    <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}}>
      <View style={{}}>
        <Text style={{color: colors.textInputColor, fontSize: 15, fontWeight: 'bold'}}>{data.name}</Text>
        <RadioGroup items={data.modifiers} isMultiple={data.isMultiple} selectedIndex={notEmpty(modifierData) ? modifierData : null} onChange={dataChange}/>
      </View>
    </View>
  </View>
};
const styles = StyleSheet.create({
  label: {color: colors.textInputColor, fontSize: 14, fontWeight: 'bold', marginTop: 3},
  inputTextArea: {
    color: colors.textInputColor,
    // width: '100%',
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: colors.textInputColor,
    padding: 5,
  },
});

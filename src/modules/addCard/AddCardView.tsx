import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import {Container, Text, Button, List, ListItem, Left, Right, CardItem, Card} from 'native-base';
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import {SMHeader, TakePicker, SMContent} from "../../components";
import {colors} from '../../styles';
import SuccessModal from "./SuccessModal";
import {debounce, notEmpty, thumbnail} from "utils/helper";
import CheckoutPayment from "components/CheckoutPayment";

const CategoryItem = ({data, onClearCart, onDeleteCart, onEditCart}) => {
  const [amount, setAmount] = useState(data.amount);
  const addAmount = () => {
    const a_m = amount + 1;
    setAmount(a_m);
  };

  const deleteAmount = () => {
    const a_m = amount - 1;
    setAmount(a_m);
  };

  return <Card>
      <View style={{marginBottom: 10, padding: 5, backgroundColor: colors.white, flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image source={{uri: thumbnail(data.image, '115x115')}} style={{width: 85, height: 85}}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDeleteCart()}
          style={{position: 'absolute', justifyContent: 'center', top: 0, right: 0, width: 30, height: 20, zIndex: 100}}
        >
          <AntDesignIcon style={{marginTop: 3, paddingRight: 5}} name='delete' size={18} color={colors.primary}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onEditCart()}
          style={{position: 'absolute', justifyContent: 'center', top: 0, right: 25, width: 30, height: 20, zIndex: 100}}
        >
          <AntDesignIcon style={{marginTop: 3, paddingRight: 5}} name='edit' size={18} color={colors.blue}/>
        </TouchableOpacity>
        <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}}>
          <View style={{}}>
            <Text>{data.name}</Text>
            <Text style={{fontSize: 12}}>{data.description}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{alignSelf: 'flex-end', color: colors.green, fontWeight: 'bold'}}>${data.priceMin}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                bordered
                iconLeft
                rounded
                small
                transparent
                style={{width: 30, padding: 5, borderColor: colors.gray}}
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
                style={{width: 30, padding: 5, borderColor: colors.gray}}
                onPress={() => addAmount()}
              >
                <AntDesignIcon name='plus' size={18}/>
              </Button>
            </View>

          </View>
        </View>
      </View>
  </Card>
};

export default function CartScreen(props) {

  console.log('carts', props.carts);
  const [modalVisible, setModalVisible] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  const debounceQuery = useRef(debounce(() => setModalVisible(false), 5000)).current;
  useEffect(() => {
    calculatePrice();
  }, []);

  useEffect(() => {
    if (isChanged) {
      setIsChanged(false);
      calculatePrice();
    }
  }, [isChanged]);

  const calculatePrice = () => {
    if (notEmpty(props.carts)) {
      let tempSubTotalSum = 0;
      Object.keys(props.carts).map(key => {
        const item = props.carts[key];
        tempSubTotalSum += item.amount * item.priceMin;
      });
      setSubTotalPrice(tempSubTotalSum);
    }
  };
  const checkOut = () => {
    setModalVisible(true);
    props.addToOrder(props.carts);
    props.clearAllCart();
    // debounceQuery();
  };

  const editCart = (key) => {
    console.log(props.carts[key]);
    props.navigation.navigate('FoodDetailScreen', {item: props.carts[key], isEdit: true, key});
  };

  const closeSussessModal = () => {
    props.navigation.navigate('Orders');
    setModalVisible(false);
  }

  const deleteCart = (key) => {
    delete props.carts[key];
    props.deleteCart(props.carts[key]);
    setIsChanged(true);
    calculatePrice();
  }

  return (
    <Container>
      <SMHeader title="Cart" navigation={props.navigation} isRefresh={false}/>
      <SMContent>
        <TakePicker onCancel={() => {}}/>
        {notEmpty(props.carts) &&
        <FlatList
          data={Object.keys(props.carts)}
          renderItem={({item}) =>
            <CategoryItem
              data={props.carts[item]}
              onClearCart={() => props.clearCart(props.carts[item])}
              onEditCart={() => editCart(item)}
              onDeleteCart={() => deleteCart(item)}
              onAddCart={() => props.addCart(props.carts[item])}
            />
          }
          keyExtractor={item => item.toString()}
        />
        }
        <View>
          <List style={{backgroundColor: colors.white}}>
            <ListItem>
              <Left>
                <Text>SubTotal</Text>
              </Left>
              <Right>
                <Text>${subTotalPrice}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Shipping</Text>
              </Left>
              <Right>
                <Text>${shippingPrice}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Total</Text>
              </Left>
              <Right>
                <Text>${subTotalPrice + shippingPrice}</Text>
              </Right>
            </ListItem>
          </List>
          <View style={{paddingTop: 20, paddingHorizontal: 20}}>
            <CheckoutPayment checkOut={() => checkOut()} onCancel={() => {}}/>
          </View>
        </View>

        <SuccessModal modalVisible={modalVisible} closeModal={closeSussessModal}/>

      </SMContent>

    </Container>
  );
}

import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import {Container, Card, CardItem, Text, Button} from 'native-base';
import SMHeader from "../../components/SMHeader";
import SMContent from "../../components/SMContent";
import {notEmpty, trimPrice, thumbnail} from "../../utils/helper";
import {colors} from '../../styles';
import {useDispatch, useSelector} from "react-redux";
import foodCore from "../../core/food";
import moment from "moment";
const payload = require('../../config/payload.init');

const OrderItem = ({data, onSetData, onReorder, onDelete}) => {
  return <Card style={{marginBottom: 10}}>
    <CardItem>
      <TouchableOpacity style={{backgroundColor: colors.white, flexDirection: 'row'}} onPress={() => onSetData()}>
        <Image source={{uri: thumbnail(data.image, '115x115')}} style={{width: 85, height: 85}}/>
        <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}}>
          <View style={{}}>
            <Text>{data.name}</Text>
          </View>
          <View style={{}}>
            <Text style={{fontSize: 12, color: colors.darkGray}}>{moment(data.orderDate).format("MMM D YYYY, h:mm:ss a")}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{alignSelf: 'flex-end', color: colors.green, fontWeight: 'bold'}}>${trimPrice(data.priceMin)} ~
              ${trimPrice(data.priceMax)}</Text>

            <Button rounded small style={{backgroundColor: colors.yellowDark, marginTop: 3}} onPress={onReorder}>
              <Text style={{color: colors.ButtonTextColor}}>Reorder</Text>
            </Button>
            {/*<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginTop: 3}} onPress={onDelete}>*/}
            {/*  <AntDesignIcon style={{marginTop: 3, paddingRight: 5}} name={'delete'} size={18} color={colors.primary}/>*/}
            {/*  /!*<Text style={{color: colors.primary}}>{data.points}</Text>*!/*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
      </TouchableOpacity>
    </CardItem>
  </Card>
};

export default function FoodOrdersScreen(props) {
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {

  }, []);

  useEffect(() => {
    if (isChanged) {
      setIsChanged(false);
    }
  }, [isChanged]);

  const reOrder = (item) => {
    dispatch(foodCore.actions.addCart(item));
    props.navigation.navigate('Cart', {item});
  };

  const goToDetail = (item) => {
    props.navigation.navigate('FoodDetailScreen', {item, isEdit: false});
  };

  const deleteOrder = (key) => {
    dispatch(foodCore.actions.deleteOrder(key));
    setIsChanged(true);
    delete props.orders[key];
  }
  return (
    <Container>
      <SMHeader title={"Past Orders"} navigation={props.navigation} isRefresh={false}/>
      <SMContent>
        {notEmpty(props.orders) &&
        <FlatList
          data={Object.keys(props.orders)}
          renderItem={({item, index}) =>
            <OrderItem
              data={props.orders[item]}
              onSetData={() => goToDetail(props.orders[item])}
              onReorder={() => reOrder(props.orders[item])}
              onDelete={() => deleteOrder(item)}/>
          }
          keyExtractor={item => item}
        />
        }
      </SMContent>
    </Container>
  );
}

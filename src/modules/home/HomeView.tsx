import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Container, Text, CardItem} from 'native-base';
import {useSelector} from "react-redux";
import mainCore from "../../core/main";

import { Dimensions } from 'react-native';
import SMHeader from "../../components/SMHeader";
import SMContent from "../../components/SMContent";
import {notEmpty} from "../../utils/helper";
import {colors} from '../../styles';
const CategoryItem = ({data, onSetData, height}) => {
  return <TouchableOpacity style={{marginBottom: 10}} onPress={() => onSetData()}>
    <CardItem cardBody style={{alignItems: 'center'}}>
      <Image source={{uri: data.img}} style={{height, flex: 1}}/>
      <View style={{
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center'
      }}>
        <Text style={{color: colors.ButtonTextColor, fontSize: 28}}>{data.name}</Text>
        <Text style={{color: colors.ButtonTextColor, fontSize: 14}}>{data.address}</Text>
      </View>
    </CardItem>
  </TouchableOpacity>
};
export default function HomeScreen(props) {
  // const locations = useSelector(state => mainCore.selectors.getLocations(state));
  const locations = [
    {name: 'TAP NYC Upper West', address: '267 Columbus Ave. New York', image: 'https://storage.googleapis.com/fav-ordering.appspot.com/AXEZBCY8MYR42/locations/9CHAGD1K14KFJ1613588687422.png'},
    {name: 'TAP NYC Essex', address: '267 Columbus Ave. New York', image: 'https://cdn.vox-cdn.com/thumbor/cz8plifxn90BPsOH0zqSprjYg9U=/0x0:5760x3840/2570x1446/filters:focal(2445x2478:3365x3398):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63834584/Essex_Market_1.0.jpg'},
    {name: 'TAP NYC Brooklyn', address: '267 Columbus Ave. New York', image: 'https://www.visitbritain.com/sites/default/files/styles/consumer_hero_image_mobile/public/consumer_components_enhanced/header_image/london-skyline-vb34141642.jpg?itok=5N7sFvRf'},
    {name: 'Bratislava', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/8f/12/9f/20170904-112355-largejpg.jpg?w=1000&h=-1&s=1'},
  ];
  const goToDetail = (item) => {
    props.navigation.navigate('FoodMenuScreen');
  };
  const { height } = Dimensions.get('window');
  const itemHeight = (height - 200) * Math.max(25, 100/locations.length) / 100;
  return (
    <Container>
      <SMHeader title="Select Store" navigation={props.navigation} isRefresh={false}/>
      <SMContent>
        {notEmpty(locations) &&
        <FlatList
          data={locations}
          renderItem={({ item }) => <CategoryItem height={itemHeight} data={item} onSetData={() => goToDetail(item)}/>}
          keyExtractor={item => item.name.toString()}
        />
        }
      </SMContent>
    </Container>
  );
}

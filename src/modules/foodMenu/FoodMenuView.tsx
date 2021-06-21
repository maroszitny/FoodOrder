import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {Container, Card, CardItem, Text, ScrollableTab, Tab, Tabs} from 'native-base';
import SectionList from 'react-native-tabs-section-list';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import SMHeader from "../../components/SMHeader";
import SMContent from "../../components/SMContent";
import {notEmpty, trimPrice, thumbnail} from "../../utils/helper";
import {colors} from '../../styles';
import {styles} from './FoodMenuStyle';
import {useDispatch, useSelector} from "react-redux";
import foodCore from "../../core/food";

const payload = require('../../config/payload.init');

const FoodItem = ({data, onSetData, onSetFavorite}) => {
  return <Card style={{marginBottom: 10}}>
    <CardItem>
      <TouchableOpacity style={{backgroundColor: colors.white, flexDirection: 'row'}} onPress={() => onSetData()}>
        <Image source={{uri: thumbnail(data.image, '115x115')}} style={{width: 85, height: 85}}/>
        <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}}>
          <View style={{}}>
            <Text>{data.name}</Text>
          </View>
          <View style={{}}>
            <Text style={{fontSize: 12, color: colors.darkGray}}>{data.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{alignSelf: 'flex-end', color: colors.green, fontWeight: 'bold'}}>${trimPrice(data.priceMin)} ~
              ${trimPrice(data.priceMax)}</Text>

            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginTop: 3}} onPress={onSetFavorite}>
              <AntDesignIcon style={{marginTop: 3, paddingRight: 5}} name={data.isFav? 'heart': 'hearto'} size={18} color={colors.primary}/>
              {/*<Text style={{color: colors.primary}}>{data.points}</Text>*/}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </CardItem>
  </Card>
};

export default function FoodMenuScreen(props) {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const loading = useSelector(state => foodCore.selectors.loading(state));
  const foods = useSelector(state => foodCore.selectors.getFoods(state));
  const favorites = useSelector(state => foodCore.selectors.getFavorites(state));
  const categories = useSelector(state => foodCore.selectors.getCategories(state));
  useEffect(() => {
    if (!loading && notEmpty(foods)) {
      setSections(categories.map(category => {
        return {...category, data: foods.filter(food => food.categoryId === category.id)}
      }));
    }
  }, [loading]);

  useEffect(() => {
    if (isChanged) {
      setIsChanged(false);
    }
  }, [isChanged]);

  const checkIsFav = (key) => {
    return notEmpty(favorites) && notEmpty(favorites[key]);

  };
  const goToDetail = (item) => {
    props.navigation.navigate('FoodDetailScreen', {item, isEdit: false});
  };

  const handleFavorite = (item, index) => {
    setIsChanged(true);
    dispatch(foodCore.actions.addFavorite(item));
  }
  return (
    <Container>
      <SMHeader title={""} navigation={props.navigation} hasTabs isMenu={false}
                isBack isRefresh={false}/>
      <SectionList
        sections={sections}
        keyExtractor={item => item.name}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={{backgroundColor: colors.white}}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({ name, isActive }) => (
          <View
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 1 : 0 }
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? '#090909' : '#9e9e9e' }
              ]}
            >
              {name}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionHeaderText}>{section.name}</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <FoodItem data={item} onSetData={() => goToDetail(item)} onSetFavorite={() => handleFavorite(item, index)}/>
        )}
      />
    </Container>
  );
}

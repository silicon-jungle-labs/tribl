import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors'
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

class SingleMatch extends Component {

    render() {
        return (
            <ScrollView vertical={true} contentContainerStyle={{paddingTop:64,paddingBottom:150}}>
                <StatusBar
                    hidden={false}
                    barStyle="light-content"
                />
                <View style={{flex:3}}>
                    <IndicatorViewPager
                        style={{height:200,flex:1}}
                        indicator={this._renderDotIndicator()}>
                        <View>
                            <Image source={{uri: 'https://images.unsplash.com/photo-1465326117523-6450112b60b2'}}
                                   style={[{width: null, height: null,flex:1},styles.sliderImages]} />
                        </View>
                        <View>
                            <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                   style={[{width: null, height: null,flex:1},styles.sliderImages]} />
                        </View>
                        <View>
                            <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                   style={[{width: null, height: null,flex:1},styles.sliderImages]} />
                        </View>
                        <View>
                            <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                   style={[{width: null, height: null,flex:1},styles.sliderImages]} />
                        </View>
                    </IndicatorViewPager>
                    <View style={{position:'absolute',bottom:30,left:20,backgroundColor:'transparent'}}>
                        <Text style={{color:'#fff',fontSize:20}}>Lisa, 27</Text>
                        <Text style={{color:'#fff',fontSize:20}}>Houston,TX</Text>
                    </View>
                    <View style={styles.countries}>
                        <Image source={require('@images/country/angola.png')} style={[styles.flag,borderRadius]}></Image>
                    </View>
                </View>
                <View style={{flex:7}}>
                    <Text style={[{paddingBottom:15,paddingTop:15,paddingLeft:15,paddingRight:15,backgroundColor:'#FFFFFF'},styles.fontColor]}>Ambitious entrepreneur</Text>
                    <View style={[styles.list,{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}]}>
                        <Text  style={[{lineHeight:25,marginRight:10},styles.fontColor]}>Mututal Friends:</Text>
                        <Image source={require('@images/first.png')} style={{width:40,height:40,marginRight:10}}></Image>
                        <Image source={require('@images/second.png')} style={{width:40,height:40,marginRight:10}}></Image>
                        <Image source={require('@images/third.png')} style={{width:40,height:40,marginRight:10}}></Image>
                        <Image source={require('@images/fourth.png')} style={{width:40,height:40,marginRight:10}}></Image>
                        <Image source={require('@images/first.png')} style={{width:40,height:40,marginRight:10}}></Image>
                    </View>
                    <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
                        <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15,borderRightWidth:1,borderColor:'#eee'}}>
                            <Image source={require('@images/Instagram-Filled-50.png')} style={{width:20,height:20,marginRight:10}}></Image>
                            <Text style={styles.fontColor}>@davidOK</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15}}>
                            <Image source={require('@images/Twitter-Filled-50.png')} style={{width:20,height:20,marginRight:10}}></Image>
                            <Text style={styles.fontColor}>@davidOK</Text>
                        </View>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <Text>ETHNICITY</Text>
                            <Text style={[styles.fontColor]}>Jamaican</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>EDUCATION</Text>
                            <Text style={[styles.fontColor]}>Howard University</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>OCCUPATION</Text>
                            <Text style={[styles.fontColor]}>CEO</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>RELIGION</Text>
                            <Text style={[styles.fontColor]}>Christian</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>INTERESTS</Text>
                            <Text style={[styles.fontColor]}>Sports</Text>
                            <Text style={[styles.fontColor]}>Music</Text>
                            <Text style={[styles.fontColor]}>Technology</Text>
                            <Text style={[styles.fontColor]}>Art</Text>
                            <Text style={[styles.fontColor]}>Movies</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>On Saturday you can find me...</Text>
                            <Text style={[styles.fontColor]}>At the gym for sure. I work crazy hours during the week so I spend at least a few hours in the gym on Saturday.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>If I had to eat the same thing for every meal...</Text>
                            <Text style={[styles.fontColor]}>I'd definitely eat pizza for every meal.</Text>
                        </View>
                        <View>
                            <Text>If i could do one thing in life again...</Text>
                            <Text style={[styles.fontColor]}>I'd probably go back to college and start over. I feel like I wasteda lot of time.</Text>
                        </View>
                    </View>
                    <View style={{paddingTop:12,paddingBottom:12,flexDirection:'row',justifyContent:'center',paddingLeft:30,paddingRight:30}}>
                        <LinearGradient colors={['#E80438', '#D2021D']} style={[styles.linearGradient,{marginRight:15}]}>
                            <Button
                                containerStyle={{flex:1,backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
                                style={[{fontSize: 21, color: '#fff',lineHeight:30}]}>
                                PASS
                            </Button>
                        </LinearGradient>

                        <LinearGradient colors={['#EAFFD8', '#E6FFD1']} style={[styles.linearGradient,{marginLeft:15}]}>
                            <Button
                                containerStyle={{backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
                                style={[{fontSize: 21, color: '#333',lineHeight:30}]}>
                                MATCH
                            </Button>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>

        )
    }
    _renderDotIndicator() {
        return (
            <PagerDotIndicator
                pageCount={4}
                dotStyle={{backgroundColor:'#E6DFDE',marginRight:15}}
                selectedDotStyle={{backgroundColor:'#D0021B',marginRight:15}}
                containerStyle={{position:'absolute',bottom:10}}

            />
        );
    }

}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    sliderImages:{
        flex:1,

        resizeMode:'stretch'
    },
    countries:{
        position:'absolute',
        bottom:15,
        right:0,
        flexDirection:'row'
    },
    flag:{
        width:40,
        height:30,
        marginRight:5,
        overflow:'hidden'
    },
    fontColor:{
        color:'#656565'
    },
    list:{
        padding:15
    },
    listItem:{
        marginBottom:15
    }
});
export default SingleMatch
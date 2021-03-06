import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  NativeModules,
Linking,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors'
import { connect } from 'react-redux';
import EditProfileInputModal from './edit-profile-input-dialog';
import moment from 'moment';
import {
  updateUserEthnicityAction,
  updateUserQuestionAction,
  updateUserReligionAction,
  updateUserTwitterAction,
  updateUserInstagramAction,
} from '../../action-creators';
import SyncDataToServer from '../../sync-to-server';

const simpleAuthClient = require('react-native-simple-auth');

let topPadding = 64;
if(Platform.OS =='android'){
  topPadding = 54
}

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: {} };
    this._getTwitterHandle = _.bind(this._getTwitterHandle, this);
    this._getUserLocation = _.bind(this._getUserLocation, this);
    this._getInstagramHandle = _.bind(this._getInstagramHandle, this);
    this._storeReligion = _.bind(this._storeReligion, this);
    this._storeEthnicity = _.bind(this._storeEthnicity, this);
    this._saveToStore = _.bind(this._saveToStore, this);
  }

  componentWillMount() {
    const { chosenPhotos } = this.props.profilePictures;
    _.forEach(chosenPhotos, photo => this._getLargePic(photo.id));
  }

  componentDidMount() {
    Actions.refresh({ onRight: this._saveToStore });
    Linking.getInitialURL()
    .then(url => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    })
    .catch(err => console.error('An error occurred', err));
  }

  _getLargePic(picId) {
    const {token} = this.props.facebook.credentials;
    fetch(`https://graph.facebook.com/v2.7/${picId}/picture?redirect=false&access_token=${token}`)
    .then(data => data.json())
    .then( ({ data }) => {
      const oldState = this.state;
      oldState[picId] = data.url;
      this.setState({ ...oldState })
    })
    .catch(err => {
      console.log(`Error here: ${err}`)
    })
  }

  _saveToStore() {
    const {
      twitter,
      instagram,
      ethnicity,
      religion,
      questions,
    } = this.state;

    _.forIn(questions, (answer, index) => {
      this.props.dispatchUpdateUserQuestion({ index, answer });
    });

    if (twitter) this.props.dispatchUpdateTwitter(twitter);
    if (instagram) this.props.dispatchUpdateInstagram(instagram);
    if (religion) this.props.dispatchUpdateReligion(religion);
    if (ethnicity) this.props.dispatchUpdateEthnicity(ethnicity);

    SyncDataToServer();
    Actions.profileMain({type:'replace'});
  }

  _getInstagramHandle() {
    simpleAuthClient.configure('instagram', {
      client_id: 'cf412cd65bb64d4a868e902f73c41729',
      redirect_uri: 'http://tribl.app.link/tOLoVhpZAv',
    })
    .then(() => {
      console.log('succesfuly configured ig');
      return simpleAuthClient.authorize('instagram');
    })
    .then(({ data: instagram }) => this.setState({ instagram }))
    .catch(error => {
      console.log(error);
      console.log(`Error instagram: ${error.code} and ${error.description}`);
    });
  }

  _getInstagramData(token) {
    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(`instagram data error: ${err}`)
    })
  }

  _getTwitterHandle() {
    simpleAuthClient.configure('twitter-web', {
      consumer_key: 'fssXaegjxfYwUNlK070WUBejv',
      consumer_secret: 'TAXZncan8E2ISC6holmiHXOsepjSCFQLiD3dhnR4FzKix37QAJ',
    })
    .then(() => {
      console.log('succesfuly configured twitter');
      return simpleAuthClient.authorize('twitter-web');
    })
    .then((response) => {
      console.log('twitter response');
      console.log(response);
      this.setState({ twitter: response });
    })
    .catch(err => {
      console.log(`twitter data error: ${err}`)
      console.log(err);
    })
  }

  _storeEthnicity(event) {
    const { text: ethnicity } = event.nativeEvent;
    this.setState({ ethnicity });
    Actions.pop();
  }

  _storeAnswer({ event, index }) {
    const { text: answer } = event.nativeEvent;
    const { questions: oldQuestions } = this.state;
    const questions = { ...oldQuestions };
    questions[index] = answer; 
    this.setState({ questions });
    Actions.pop();
  }

  _storeReligion(event) {
    const { text: religion } = event.nativeEvent;
    this.setState({ religion });
    Actions.pop();
  }

  _renderProfilePictures() {
    const { chosenPhotos } = this.props.profilePictures;
    return _.map(chosenPhotos, photo => {
      return (
        <View key={photo.picture}>
          <Image source={{uri: this.state[photo.id] }}
            style={[{width: null, height: null,flex:1},styles.sliderImages]} />
        </View>
      );
    })
  }


  _getWork() {
    const { work } = this.props.userInfo;
    console.log(work);
    if (!work) return 'N/A';
    return 'placeholder';

    // return work;
  }

  _getReligion() {
    const { religion } = this.state;
    if (!religion) return 'Add Religion';

    return religion;
  }

  _getEthnicity() {
    const { ethnicity } = this.state;
    if (!ethnicity) return 'Add Ethnicity';

    return ethnicity;
  }

  _getEducation() {
    const { education } = this.props.userInfo.bio;
    if (!education) return 'N/A';
    const mostRecent = _.orderBy(education, entry => {
      if (entry.year) return parseInt(entry.year.name);
      return 0;
    },'desc')[0];

    return mostRecent.school.name;
  }

  _getUserDetails() {
    const { name, birthday } = this.props.userInfo.bio;
    const age = moment().year() - moment(new Date(birthday)).year();
    return `${name}, ${age}`;
  }
  _getInterests() {
    const { chosenLikes } = this.props.userInfo.interests;
    return _.map(chosenLikes, like => {
      return (
        <Text key={like} style={[styles.fontColor]}>{like}</Text>
      );
    });
  }

  _getUserBio() {
    return this.props.userInfo.bio.text;
  }
  _getFlags() {
    const {flags} = this.props.userInfo;
    return _.map(flags, flag => {
      if (!flag.name) return null;
      const source = {uri: flag.picture};
      return (
        <Image key={flag.name} source={source} style={[styles.flag,borderRadius]}></Image>
      );
    });
  }

  _getUserLocation() {
    return this.props.userInfo.bio.location.city;
  }

  _renderQuestions() {
    const {questions} = this.props.userInfo;
    return _.map(questions, (questionObj, index) => {
      return (
        <TouchableOpacity
          key={questionObj.question}
          onPress={() => {
            Actions.customModal({ 
              component: () => {
                return (
                  <EditProfileInputModal placeholder={questionObj.question}
                    saveAction={event => this._storeAnswer({event, index })} />
                )
              }
            })
          }}
          style={styles.listItem}
        >
          <Text>{questionObj.question}</Text>
          <Text style={[styles.fontColor,styles.editLink]}>
            {this.state.questions[index] || 'Answer this question'}
          </Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <ScrollView vertical={true} contentContainerStyle={{paddingTop:topPadding,paddingBottom:90}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        <View style={{flex:3}}>
          <IndicatorViewPager
            style={{height:200,flex:1}}
            indicator={this._renderDotIndicator()}>
            {this._renderProfilePictures()}
          </IndicatorViewPager>
          <View style={{position:'absolute',bottom:30,left:20,backgroundColor:'transparent'}}>
            <Text style={{color:'#fff',fontSize:20}}>{this._getUserDetails()}</Text>
            <Text style={{color:'#fff',fontSize:20}}>
              {this._getUserLocation()}
            </Text>
          </View>
          <View style={styles.countries}>
            {this._getFlags()}
          </View>
        </View>
        <View style={{flex:7}}>
          <View style={{paddingBottom:15,paddingTop:15,paddingLeft:15,paddingRight:15,backgroundColor:'#FFFFFF'}}>
            <Text style={[styles.fontColor]}>{this._getUserBio()}</Text>
          </View>
          <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
            <TouchableOpacity
              onPress={this._getInstagramHandle}
              style={{
                flex:1,
                flexDirection:'row',
                paddingLeft:15,
                paddingBottom:15,paddingTop:15,borderRightWidth:1,borderColor:'#eee'}}>
              <Image source={require('@images/Instagram-Filled-50.png')}
                style={{width:20,height:20,marginRight:10}}></Image>
              <Text style={[styles.fontColor,styles.editLink]}>
                { this.state.instagram ? `@${this.state.instagram.username}` : 'Add Account' }
              </Text>
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15}}>
              <Image source={require('@images/Twitter-Filled-50.png')} style={{width:20,height:20,marginRight:10}}>
              </Image>
              <Text onPress={this._getTwitterHandle} style={[styles.fontColor,styles.editLink]}>
                { this.state.twitter ? `@${this.state.twitter.screen_name}` : 'Add Account' }
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text>ETHNICITY</Text>
              <Text style={[styles.fontColor,styles.editLink]}
                onPress={() => Actions.customModal({ 
                  component: () => <EditProfileInputModal placeholder='Ethnicity'
                    saveAction={this._storeEthnicity} />
                  })}>
                  {this._getEthnicity()}
                </Text>
              </View>
            <View style={styles.listItem}>
              <Text>EDUCATION</Text>
              <Text style={[styles.fontColor]}>{this._getEducation()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>OCCUPATION</Text>
              <Text style={[styles.fontColor]}>{this._getWork()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>RELIGION</Text>
              <Text style={[styles.fontColor,styles.editLink]}
                onPress={() => Actions.customModal({ 
                  component: () => <EditProfileInputModal placeholder='Religion'
                    saveAction={this._storeReligion} />
                  })}
                >
                  {this._getReligion()}
                </Text>
            </View>
            <View style={styles.listItem}>
              <Text>INTERESTS</Text>
              {this._getInterests()}
            </View>
            {this._renderQuestions()}
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
  },
  editLink:{
    color:'#db203c'
  }
});
const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdateEthnicity: ethnicity => dispatch(updateUserEthnicityAction(ethnicity)),
    dispatchUpdateUserQuestion: ({ answer, index }) => dispatch(updateUserQuestionAction({ answer, index })),
    dispatchUpdateReligion: religion => dispatch(updateUserReligionAction(religion)),
    dispatchUpdateTwitter: twitter => dispatch(updateUserTwitterAction(twitter)),
    dispatchUpdateInstagram: instagram => dispatch(updateUserInstagramAction(instagram)),
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilePage);

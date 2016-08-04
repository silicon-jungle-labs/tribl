import AppStore from './app-store';
import { Actions } from 'react-native-router-flux'

export default () => {
  const userAppState = AppStore.getState();
  const { userId: facebookId } = userAppState.facebook.credentials;
  fetch(`${userAppState.appConfig.server}/saveUserAppState/${facebookId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userAppState)
  })
  .catch(err => {
    Actions.errorModal({ error: 'Failed to sync to Sever' });
  });
}
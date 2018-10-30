import Axios from 'axios'
import Parameters from '../parameters'
import EventBus from './eventbus';

export default {
  init (payload) {
     // Axios.defaults.headers.common['X-Auth-Token'] = payload.authToken
  }
}

export const ApiClient = Axios.create({
  baseURL: Parameters.apiBaseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

ApiClient.interceptors.response.use(
  function (response) {
    // if (response.status === 200) {
    //   Notification.success({
    //     message: 'http.success.default',
    //     title: 'notifications.success'
    //   })
    // }
    return Promise.resolve(response)
  },
  function (error) {
    const response = error.response;
    if (response.status >= 500 && response.data !== undefined && response.data.detail !== undefined) {
      EventBus.$emit('app-error', response, response.status);
    }
    return Promise.reject(error)
  }
);

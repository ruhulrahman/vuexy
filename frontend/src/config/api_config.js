import axios from 'axios'
import Store from '../store'

export const studyPressBaseUrl = 'http://localhost:8000/'

// Handling server error
const errorHandler = (error) => {
  if (error.response.status === 401) {
    // Store.dispatch('Auth/updateAuthUser', null)
    localStorage.removeItem('accessUsername')
    localStorage.removeItem('access_token')
    Store.commit('mutateCommonProperties', {
      hasDropdownLoaded: false
    })
    window.vm.$toast.error({
      title: 'Error',
      message: 'Unauthorized access.'
    })
    window.vm.$router.push('/login')
  } else if (error.response.status === 500) {
    Store.commit('mutateCommonProperties', {
      loading: false,
      listReload: false
    })
    window.vm.$toast.error({
      title: 'Error',
      message: 'Server Error'
    })
  } else {
    window.vm.$toast.error({
      title: 'Error',
      message: 'Operation failed due to an unknown error.'
    })
  }
  return error
}
export default {
  async execute (baseUrl, method, uri, data, params = {}) {
    const accessToken = localStorage.getItem('access_token')
    const client = axios.create({
      baseURL: baseUrl,
      json: true
    })

    client.interceptors.response.use(response => response, error => errorHandler(error))
    return client({
      method,
      url: uri,
      data,
      params: params,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        accessUsername: localStorage.getItem('accessUsername'),
        accessUserId: localStorage.getItem('accessUserId'),
        accessMenuName: window.location.href
      }
    }).then(req => {
      return req.data
    })
  },
  getData (baseUrl, uri, params = {}) {
    return this.execute(baseUrl, 'get', uri, {}, params)
  },
  postData (baseUrl, uri, data) {
    return this.execute(baseUrl, 'post', uri, data)
  },
  putData (baseUrl, uri, data) {
    return this.execute(baseUrl, 'put', uri, data)
  },
  deleteData (baseUrl, uri) {
    return this.execute(baseUrl, 'delete', uri)
  }
}

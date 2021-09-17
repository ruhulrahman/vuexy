import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
  },
  state: {
    authUser: {},
    list: [],
    commonObj: {
      hasDropdownLoaded: false,
      perPage: 10,
      dateFormat: 'DD/MM/YYYY',
      fiscaleYear: 'YYYY-YYYY',
      timeFormat: 'h:m',
      unitOfTime: 'day',
      loading: false,
      listReload: false,
      countryList: []
    }
  },
  actions,
  mutations,
  getters,
  strict: process.env.DEV,
})

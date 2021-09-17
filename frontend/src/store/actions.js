export default {
    mutateCommonProperties ({ commit }, payload) {
      commit('mutateCommonProperties', payload)
    },
    AuthUser ({ commit }, payload) {
      console.log('action-authUserData', payload)
      commit('AuthUser', payload)
    },
    setList ({ commit }, payload) {
      commit('setList', payload)
    },
    resetList ({ commit }) {
      commit('resetList', [])
    },
    removeItemFromSetList ({ commit }, payload) {
      commit('removeItemFromSetList', payload)
    },
    toggleStatus ({ commit }, payload) {
      commit('toggleStatus', payload)
    },
    toggleDropdownItemStatus ({ commit }, payload) {
      commit('toggleDropdownItemStatus', payload)
    },
    resetState ({ commit }) {
      commit('resetState')
    },
    setNotification ({ commit }, payload) {
      commit('setNotification', payload)
    }
  }

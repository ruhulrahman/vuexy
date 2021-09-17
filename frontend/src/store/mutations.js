export default {
    mutateCommonProperties (state, payload) {
      state.commonObj = Object.assign({}, state.commonObj, payload)
    },
    AuthUser (state, payload) {
      console.log('authUserData', payload)
      state.authUser = payload
    },
    setList (state, payload) {
      state.list = payload
    },
    resetList (state, payload) {
      state.list = payload
    },
    removeItemFromSetList (state, payload) {
      const index = state.list.findIndex(item => item.id === payload)
      state.list.splice(index, 1)
    },
    toggleStatus (state, payload) {
      state.list = state.list.map(function (item) {
        if (item.id === payload.id && item.status === 2) {
          return Object.assign(item, { status: 1 })
        } else if (item.id === payload.id && item.status === 0) {
          return Object.assign(item, { status: 1 })
        }
        return item
      })
    },
    // for farmer request reject
    toggleRejectItemStatus (state, payload) {
        state.commonObj[payload.dropdownName] = state.commonObj[payload.dropdownName].map(item => {
            if (item.value === payload.itemId) {
              return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
            }
            return item
          })
    },
    setNotification (state, payload) {
        state.commonObj.notificationso = payload
    }
  }

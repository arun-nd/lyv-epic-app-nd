const state = () => ({
  message: '',
  color:'',
})

const mutations = {
  setSnack (state, snack) {
    state.message = snack
    // state.color = snack.color
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
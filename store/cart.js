export const state = () => ({
  items:[]

})

export const mutations = {
  setCart(state,data){
    state.items = data

  }
}

export const actions = {
  async fetchCart({commit,state,dispatch}){
     let session_id = this.$auth.$storage.getCookie('session_id')
      const responce = await this.$axios.get(`/api/get_cart?session_id=${session_id}`)
      commit('setCart', responce.data)
  },
  eraseCart({commit,state}, data) {
    commit('setCart', { "id": 13,
    "pizza_constructors": [],
    "souces": [],
    "items": [],
    "total_price": 0,
    "total_bonuses": 0,
    "created_at": "2021-02-03T15:19:49.805297+03:00",
    "updated_at": "2021-02-03T15:19:49.805320+03:00",
    "client": null,
    "guest": 11})

  }

}

export const getters = {
  getCart: (state) => state.items

}


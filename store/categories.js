export const state = () => ({
    categories:[]
})


export const mutations = {
    setCategories(state,data){
        state.categories = data
    }
}

export const actions = {
    async fetchCategories({commit}){
      console.log('get categories')
        if (this.state.categories.categories.length===0){
            const responce_data = await this.$axios.get(`/api/get_categories`)
          console.log('responce_data.data',responce_data.data)
            commit('setCategories',responce_data.data)
        }
    }
}

export const getters = {
    getCategories: (state) => state.categories
}


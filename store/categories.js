export const state = () => ({
    user_bg:[]
})


export const mutations = {
    setUserBg(state, bg) {
        console.log(state)
        state.user_bg = bg
    }
}

export const actions = {
    async fetchUserBg({commit}){
        console.log('user_bg first check',this.state.user_bg.user_bg)
        if (this.state.user_bg.user_bg.length===0){
            const user_bg_data = await this.$axios.get(`/api/v1/user/get_user_bg`)
            commit('setUserBg',user_bg_data.data)
            console.log('user_bg after update',this.state.user_bg)
        }
    }
}

export const getters = {
    getUserBg: (state) => state.user_bg
}


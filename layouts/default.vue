<template>
  <div class="main-wrapper">
    <Header/>
    <Nuxt />

    <Footer/>
    <div v-if="!this.$auth.$storage.getCookie('cookie_agree')" ref="cookie_message" class="cookie-message"
    :class="{'hideCookie':hideCookie}"
    >
      <div class="container cookie-message__inner">
         <p>Продолжая использовать наш сайт, вы даете согласие на обработку странных cookie, которые обеспечивают
        правильную работу сайта. Благодаря им мы улучшаем сайт, обслуживание и товары</p>
      <el-button class="btn" @click="cookie_agree" type="info">ПРИНЯТЬ КУКИ</el-button>
      </div>



    </div>
  </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        data:function(){
            return{
              hideCookie:false,

            }
        },
        components:{
            Header,
            Footer
        },
        methods: {
          cookie_agree(){
            this.$auth.$storage.setCookie('cookie_agree',true)
            this.hideCookie = true
          }
        },
      mounted() {
          if (this.$auth.$storage.getCookie('_token.local')){
            this.$auth.logout()
            this.$auth.$storage.removeCookie('_token.local')
          }
      }


    }
</script>

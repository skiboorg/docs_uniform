<template>
  <div>
    <Header/>
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        data:function(){
            return{
            }
        },
        components:{
            Header,
            Footer


        },
        methods: {

        },
    }
</script>

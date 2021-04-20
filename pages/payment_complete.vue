<template>
  <div class="">
   <section>
     <div class="container">
       Заказ оплачен
     </div>
   </section>


  </div>
</template>

<script>

export default {
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios,route}){
    try{
      const responce = await $axios.post(`/api/order_payed`,{pay_id:route.query.pay_id})
      console.log(responce.data)
      return {}
    } catch (e){
      console.log(e)
    }
  },

  data() {
    return {}
  },
}
</script>



<template>

   <div class="lk-tab">
                <h1 class="lk-tab__title ">Мои заказы</h1>


                    <div class="lk-order-item" v-for="order in orders" :key="order.id">
                     <div class="lk-order-item__info--group">
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Дата заказа</p>
                                <p class="fs12">{{new Date(order.created_at).toLocaleString()}}</p>
                            </div>
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Номер заказа</p>
                                <p class="fs12">{{order.order_code}}</p>
                            </div>
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Статус оплаты</p>

                                <p class="fs12">{{order.is_payed ? 'Оплачен' : 'Не оплачен'}}</p>
                            </div>

                        </div>
                        <div class="lk-order-item__info--group">
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">тип доставки</p>
                                <p class="fs12">{{order.delivery.name}}</p>
                            </div>

                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Адрес доставки</p>

                                <p class="fs12">{{order.city ? `г. ${order.city.name}` : '-'}}{{order.street}} {{order.house}} {{order.flat}}</p>
                            </div>
                         <div class="">
                            <p class="item-info__subtitle">Общая сумма</p>
                             <p class="lk-order-item__price">{{order.total_price}}₽</p>
                         </div>
                        </div>
                      <hr/>
                        <div class="lk-order-item__info--group" v-for="item in order.items" :key="item.id">

                        <div class="lk-order-item__img">
                        <img :src="base_url+item.item_type.image" alt="">
                    </div>

                    <div class="lk-order-item__info" >
<!--                        <p class="lk-order-item__info&#45;&#45;status">{% if order.is_complete %}Доставлен{% endif %}</p>-->
<!--                        <p class="lk-order-item__info&#45;&#45;status">{% if order.is_payed %}Оплачен{% endif %}</p>-->
                        <p class="cart-item__info__art">{{item.item_type.article}}</p>
                        <p class="lk-order-item__info--name">{{item.item_type.name}}</p>
                      <span style="font-size: 12px;opacity: .5;">
                  {{item.item_type.color.name}}
                  {{item.item_type.size.name}}
                  {{item.item_type.height.name}}
                </span>

                    </div>
                    <p class="lk-order-item__num">{{item.quantity}} шт</p>
                    <p class="lk-order-item__price">{{item.price}} ₽</p>
                        </div>


                </div>



            </div>

</template>

<script>

export default {
  layout: 'lk',
  scrollToTop: false,
  auth: true,
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios,$auth}){
    const get_orders = await $axios.get(`/api/get_user_orders?user_id=${$auth.user.id}`)
    const orders = get_orders.data
    console.log(orders)
    return {orders}
  },
  data() {
    return {
      base_url:process.env.img_url,

    }
  },



}
</script>



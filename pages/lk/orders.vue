<template>

   <div class="lk-tab">
                <h1 class="lk-tab__title ">Мои заказы</h1>


                    <div class="lk-order-item">
                     <div class="lk-order-item__info--group">
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Дата заказа</p>
                                <p class="fs12"></p>
                            </div>
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Номер заказа</p>
                                <p class="fs12"></p>
                            </div>
                            <div class="lk-order-item__info--group--item">
                                <p class="item-info__subtitle">Адрес доставки</p>
                                <p class="fs12">г. Уфа, ул. Казанская 4, 14</p>
                            </div>
                         <div class="">
                             <p class="lk-order-item__price">₽</p>
                         </div>
                        </div>

                        <div class="lk-order-item__info--group">
                        <div class="lk-order-item__img">
                        <img src="" alt="">
                    </div>

                    <div class="lk-order-item__info">
                        <p class="lk-order-item__info--status">{% if order.is_complete %}Доставлен{% endif %}</p>
                        <p class="lk-order-item__info--status">{% if order.is_payed %}Оплачен{% endif %}</p>

                        <p class="lk-order-item__info--name"></p>

                    </div>
                    <p class="lk-order-item__num"> шт</p>
                    <p class="lk-order-item__price">₽</p>
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
  data() {
    return {

    }
  },



}
</script>



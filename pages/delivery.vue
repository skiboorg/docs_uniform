<template>
  <div class="">
    <div class="container">
      <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
      </svg>
        <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
      </p>
    </div>
    <MarqueeLine :text="'ДОСТАВКА И ОПЛАТА'"/>
    <section class="delivery">
      <div class="container">
        <h3 class="section-header">ЗАКАЖИТЕ ВСЁ, ЧТО ВАМ ПОНРАВИЛОСЬ, И МЫ БЫСТРО ДОСТАВИМ ПОСЫЛКУ ПО РОССИИ КУРЬЕРСКОЙ СЛУЖБОЙ</h3>
        <div class="delivery-info">
          <div class="delivery-info__top">
            <div class="delivery-info__item">
              <p >САМОВЫВОЗ</p>
              <p >Вы можете забрать Ваш заказ в шоуруме в Москве<br> с 10:00 до 19:00 в удобное для вас время по адресу:<br> г.Москва, Фрунзенская набережная, 30, стр. 5, этаж 1</p>
            </div>
            <div class="delivery-info__item">
              <p >ДОСТАВКА</p>
              <p >Осуществляется по всей России и странам СНГ.<br><br>
                Доставка компанией СДЭК:<br><br>
                - Сроки и стоимость доставки варьируются в зависимости от региона.<br>
                - Сделайте заказ на свой адрес или в один из пунктов выдачи СДЭК по всей России.<br>
                - После отправки заказа Вам на почту, указанную при оформлении заказа, будет направлено письмо с трек-номером.<br>
                - Отслеживайте доставку заказа на сайте СДЭК.<br><br>
                Доставка Почтой России:<br><br>
                Сроки и стоимость доставки варьируются в зависимости от региона.<br><br>
                - Сделайте заказ в один из ближайших к Вам отделений Почта России.<br>
                - После отправки заказа Вам на почту, указанную при оформлении заказа, будет направлено письмо с с трек-номером.<br>
                - Отслеживайте доставку заказа на сайте Почта России.
              </p>
            </div>
          </div>
          <div class="delivery-info__bottom">
            <div class="delivery-info__item">
              <p>ОПЛАТА</p>
              <p>Картой на сайте или в шоуруме.<br>
                Принимаются карты всех основных систем оплаты.<br>
                Для корпоративных партнёров возможна оплата безналичным банковским переводом.</p>
            </div>
            <div class="delivery-info__item">
              <p>ВОЗВРАТ</p>
              <p>Решили вернуть вещь после получения товара?<br>
                Сделайте это в течение 14 дней с момента покупки. Напишите на <a style="text-decoration: underline" href="mailto:sales@uni-docs.ru">sales@uni-docs.ru</a> с темой сообщения «Возврат» или позвоните по телефону 8(495)-205-93-94</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MarqueeLine from '@/components/Marquee'

export default {
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  head() {
    return {
      title: `Доставка и оплата медицинской одежды в интернет-магазине DOC’S`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `
Способы доставки и оплаты интернет-магазина DOC’S ✅ Новые коллекции, быстрая доставка по России и СНГ ☝️ Заходите!`
        }
      ]
    }
  },
  components:{
    MarqueeLine
  },
  data() {
    return {}
  },
}
</script>




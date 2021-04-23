<template>
  <div class="">
    <div class="container">
      <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
      </svg>
        <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
      </p>
    </div>
    <MarqueeLine :text="'КОНТАКТЫ'"/>
    <section class="subcategories">
      <div class="container">
        <p class="partners-text-green fs35">+7 (495) 205-93-94</p>
        <p class="mb-15"><span class="partners-text-green">Адрес шоурума:</span> Москва, Фрунзенская набережная, 30, стр. 5, этаж 1</p>
        <p  class="mb-15"><span class="partners-text-green">Юридический адрес:</span>  119048, г. Москва, Хамовнический вал, дом № 24, кв. 39</p>
        <div  class="mb-50">
          <a href="https://www.instagram.com/docsuniform/" target="_blank" style="display: inline-block; margin-right: 10px">
            <img src="/inst_icon.png" alt="" >
          </a>
          <a href="viber://chat?number=74952059394" target="_blank" style="display: inline-block; margin-right: 10px">
            <img src="/viber_icon.png" alt="" >
          </a>
          <a href="https://wa.me/74952059394" target="_blank">
            <img src="/whatsapp_icon.png" alt="" >
          </a>
        </div>
        <div class="mb-40">
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeca6e5a9284d9b9250395670972f79acaf69b81e87c95fd6db908b42c8366841&amp;source=constructor" width="100%" height="450" frameborder="0"></iframe>
        </div>
        <div class="mb-40"></div>
        <section class="social">
          <div class="container">
            <div class="contact-images">
              <div class="social-item">
                <img src="/contact1.png" alt="">
                <p style="font-weight: bold">Наш шоурум!<br>Заходите :)</p>
              </div>
              <div class="social-item">
                <img src="/contact2.png" alt="">
              </div>
              <div class="social-item">
                <img src="/contact3.png" alt="">
              </div>
              <div class="social-item">
                <img src="/contact4.png" alt="">
              </div>
            </div>
          </div>
        </section>
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
  components:{
    MarqueeLine
  },
  data() {
    return {}
  },
}
</script>



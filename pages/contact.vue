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
        <p class="mb-15">Москва, Фрунзенская набережная, 30, стр. 5, этаж 1</p>
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.9520836614515!2d37.582423916266265!3d55.72458488054585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b9fd4b756dd%3A0x8ab11fefbe6fbcd6!2z0KTRgNGD0L3Qt9C10L3RgdC60LDRjyDQvdCw0LEuLCAzMCwg0Y3RgtCw0LYgMSwg0JzQvtGB0LrQstCwLCAxMTkxNDY!5e0!3m2!1sru!2sru!4v1608456140628!5m2!1sru!2sru" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        <div class="mb-40"></div>
        <section class="social">
          <div class="container">
            <div class="social-wrapper">
              <div class="social-item">
                <img src="/social-item4.png" alt="">
              </div>
              <div class="social-item">
                <img src="/social-item4.png" alt="">
              </div>
              <div class="social-item">
                <img src="/social-item4.png" alt="">
              </div>
              <div class="social-item">
                <img src="/social-item4.png" alt="">
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



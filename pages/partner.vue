<template>
  <div class="">
    <div class="container">
      <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
      </svg>
        <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
      </p>
    </div>
    <MarqueeLine :text="'МЕДИЦИНСКАЯ ОДЕЖДА'"/>
    <section class="partners">
      <div class="container">
        <div class="partners-top">
          <h1 class="section-header">ВЫ ТОЖЕ СЧИТАЕТЕ, ЧТО ОДЕЖДА ДОКТОРОВ ДОЛЖНА БЫТЬ КАЧЕСТВЕННОЙ И СТИЛЬНОЙ? ТОГДА НАМ ПО ПУТИ!</h1>
          <p class="partners-text">Заказать стильную женскую и мужскую одежду оптом стало просто
            и недорого. Мы делаем поставки большим и маленьким организациям
            и стараемся сделать выгодными условия для каждого.</p>
          <a href="" class="btn">обсудить</a>
        </div>
        <div class="partners-images">
          <img src="/parner1.jpg" alt="">
          <img src="/parner2.jpg" alt="">
        </div>
      </div>
    </section>
    <section class="partners-bottom">
      <div class="container">
        <div class="partners-bottom__inner">
          <h3 class="section-header">МЫ ГОТОВЫ ОБЩАТЬСЯ!</h3>
          <p class="partners-text mb-40">Расскажем об оптовых ценах и ответим на любой другой вопрос: напишите нам или позвоните по телефону</p>
          <p class="partners-text-green ">Хотите сделать образ компании уникальным? </p>
          <p class="partners-text mb-40">Нанесем ваш логотип, имена сотрудников и другие элементы корпоративного стиля на одежду. А если его ещё нет, наши дизайнеры разработают фирменный стиль для вас.</p>
          <p class="partners-text-green ">Разделяете наши взгляды на медицинскую одежду?</p>
          <p class="partners-text mb-40">Мы рады сотрудничать.</p>
          <p class="partners-text-green ">Хотите стать посредником?</p>
          <p class="partners-text mb-40">Давайте обсудим.</p>
          <p class="partners-text-green fs35">+7 (495) 205-93-94</p>
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
  components:{
    MarqueeLine
  },
  data() {
    return {}
  },
}
</script>



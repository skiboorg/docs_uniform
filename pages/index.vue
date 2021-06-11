<template>
  <div class="">
    <MarqueeLine :is_index="true" text="магазин медицинской одежды "/>
    <section class="categories">
      <div class="container">
        <div class="categories-wrapper">
          <div v-if="category.is_at_home" @click="$router.push(`/category/${category.name_slug}`)" class="categories-item"
               :style="`background: url(${category.image}) center`"
               v-for="(category,index) in this.$store.getters['categories/getCategories']"
               :key="category.id">
            <!--            :class="category.is_for_man ? 'man' : 'woman'"-->
            <p class="categories-item__text" >{{category.name}}</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <client-only>
          <swiper :options="bannerOptions">
            <div class="swiper-pagination" slot="pagination"></div>
            <swiper-slide v-for="banner in banners" :key="banner.id">
              <div class="offer-banner-item">
                <img :src="banner.image" >
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination" slot="pagination"></div>
        </client-only>
      </div>
    </section>
    <section class="collection" v-for="collection in collections" :key="collection.id">
      <div class="container">
        <h2 class="section-header">
          {{collection.name}}
        </h2>

        <p class="section-header__link">
          <nuxt-link :to="`/collection/${collection.name_slug}`">Смотреть полностью</nuxt-link>
        </p>
        <div class="collection-wrapper">
          <!--           <ItemCard v-for="item in _.takeRight(collection.collection_items, 3)" :key="item.id"-->
          <ItemCard v-for="item in _.take(collection.collection_items, 4)" :key="item.id"
                    :collection_name="item.subcategory.name"
                    :item_name="item.name"
                    :item_price="item.price"
                    :discount="item.discount"
                    :item_slug="item.name_slug"
                    :cat_slug="item.category"
                    :subcat_slug="item.subcategory.name_slug"
                    :image="item.images"/>
        </div>
      </div>
    </section>

    <section class="collection">
      <div class="container">
        <h2 class="section-header">
          Новинки
        </h2>


        <div class="collection-wrapper">
          <!--           <ItemCard v-for="item in _.takeRight(collection.collection_items, 3)" :key="item.id"-->
          <!--         <ItemCard v-for="item in _.take(collection.collection_items, 3)" :key="item.id"-->
          <ItemCard v-for="item in new_items" :key="item.id"
                    :collection_name="item.subcategory.name"
                    :item_name="item.name"
                    :item_price="item.price"
                    :discount="item.discount"
                    :item_slug="item.name_slug"
                    :cat_slug="item.category"
                    :subcat_slug="item.subcategory.name_slug"
                    :image="item.images"/>
        </div>
      </div>
    </section>
    <!--    <section class="about">-->
    <!--      <div class="container">-->
    <!--        <div class="about-wrapper">-->
    <!--          <div class="about-img">-->
    <!--            <el-image  src="/index-about.png" lazy></el-image>-->
    <!--          </div>-->
    <!--          <div class="about-text">-->
    <!--            <h3 class="section-header">ИНТЕРНЕТ-МАГАЗИН ОДЕЖДЫ ДЛЯ СОВРЕМЕННЫХ ВРАЧЕЙ</h3>-->
    <!--            <p class="text">DOC’S — это опыт врачей и хороший вкус дизайнеров: вместе мы делаем стильную и комфортную-->
    <!--              медицинскую одежду. Мы придумываем лаконичные и удобные модели,-->
    <!--              которые выглядят эстетично и не мешают в процессе работы.-->
    <!--            </p>-->
    <!--            <nuxt-link class="link" to="/about">Узнать больше</nuxt-link>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->
    <section class="about-new">
      <div class="container">
        <h2 class="section-header">ИНТЕРНЕТ-МАГАЗИН ОДЕЖДЫ ДЛЯ СОВРЕМЕННЫХ ВРАЧЕЙ</h2>
        <p>DOC’S — это опыт врачей и хороший вкус дизайнеров: вместе мы делаем стильную и комфортную медицинскую одежду. Мы придумываем лаконичные и удобные модели, которые выглядят эстетично и не мешают в процессе работы.</p>
        <div style="display: flex;justify-content: center">
          <nuxt-link style="padding: 25px 70px" class="btn" to="/about">узнать больше</nuxt-link>
        </div>

      </div>
    </section>
    <section class="feedback">
      <div class="container">
        <h2 class="section-header">
          ОТЗЫВЫ
        </h2>
        <div class="feedback-wrapper">
          <div class="feedback-item">
            <div class="feedback-item__top">
              <img src="http://placehold.it/50" alt="">
              <div class="feedback-item__top-name">
                <p>Валентин <span>Педиатр</span></p>
                <el-rate
                  v-model="rate1"
                  disabled

                  :colors="['#519999', '#519999', '#519999']">

                </el-rate>
              </div>
            </div>
            <div class="feedback-item__bottom">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos eos error eveniet id numquam odio optio perferendis quasi quo!</p>
            </div>

          </div>
        </div>
      </div>
    </section>
    <section class="social">
      <div class="container">
        <div class="social-top">
          <h3 class="text text-300 text-center text-upper">подписывайтесь на наш инстаграм</h3>
          <p class="text-center"><a href="#" class="text text-f-80">@docsuniform</a></p>
        </div>
        <div class="social-wrapper">
          <div class="social-item">
            <img  src="/i1.jpg" >
          </div>
          <div class="social-item">
            <img  src="/i2.jpg" >
          </div>
          <div class="social-item">
            <img  src="/i3.jpg" >

          </div>
          <div class="social-item">
            <img  src="/i4.jpg" >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import ItemCard from "@/components/ItemCard";
import MarqueeLine from '@/components/Marquee'
export default {
  components: {
    ItemCard,
    MarqueeLine
  },
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios}){
    const get_banners = await $axios.get(`/api/get_banners`)
    const get_collections = await $axios.get(`/api/get_home_collections`)
    const get_new = await $axios.get(`/api/get_new_items`)
    const banners = get_banners.data
    const collections = get_collections.data
    const new_items = get_new.data
    return {banners,collections,new_items}
  },
  data() {
    return {
      rate1:4,
      bannerOptions: {
        slidesPerView: 1,

        //centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // breakpoints: {
        //   // when window width is >= 320px
        //   320: {
        //     centeredSlides: true,
        //     slidesPerView: 1,
        //     spaceBetween: 20
        //   },
        //   // when window width is >= 480px
        //   480: {
        //     slidesPerView: 1,
        //     spaceBetween: 30
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 1,
        //     spaceBetween: 40
        //   }
        // }
      },
    }
  }
}
</script>
<style lang="sass">
.social-item
  img
    width: 300px
    height: 300px
    object-fit: cover
</style>



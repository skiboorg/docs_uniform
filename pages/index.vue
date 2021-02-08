<template>
  <div class="">
    <section class="categories">
      <div class="container">
        <div class="categories-wrapper">
          <div @click="$router.push(`/category/${category.name_slug}`)" class="categories-item"
               :style="`background: url(${category.image}) center`"
               v-for="(category,index) in this.$store.getters['categories/getCategories']"
               :key="category.id">
            <p class="categories-item__text" :class="category.is_for_man ? 'man' : 'woman'">{{category.name}}</p>
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
        <h3 class="section-header">
          {{collection.name}}
        </h3>
        <p class="section-header__link">
          <nuxt-link :to="`category/${collection.category}/${collection.subcategory.name_slug}`">Смотреть полностью</nuxt-link>
        </p>
        <div class="collection-wrapper">
         <ItemCard v-for="item in collection.collection_items" :key="item.id"
                        :collection_name="collection.subcategory.name"
                        :item_name="item.name"
                        :item_price="item.price"
                        :discount="item.discount"
                        :item_slug="item.name_slug"
                        :cat_slug="collection.category"
                        :subcat_slug="collection.subcategory.name_slug"
                        :image="item.images[0].image_thumb"/>
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <div class="about-wrapper">
          <div class="about-img">
            <el-image  src="/index-about.png" lazy></el-image>
          </div>
          <div class="about-text">
            <h3 class="section-header">ИНТЕРНЕТ-МАГАЗИН ОДЕЖДЫ ДЛЯ СОВРЕМЕННЫХ ВРАЧЕЙ</h3>
            <p class="text">DOC’S — это опыт врачей и хороший вкус дизайнеров: вместе мы делаем стильную и комфортную
              медицинскую одежду. Мы придумываем лаконичные и удобные модели,
              которые выглядят эстетично и не мешают в процессе работы.
            </p>
            <nuxt-link class="link" to="/about">Узнать больше</nuxt-link>
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
            <el-image  src="/social-item1.png" lazy></el-image>
          </div>
          <div class="social-item">
            <el-image  src="/social-item2.png" lazy></el-image>
          </div>
          <div class="social-item">
            <el-image  src="/social-item3.png" lazy></el-image>
            <p class="text hide-mob-600">МЕДИЦИНСКАЯ ОДЕЖДА DOC’S workwear for life</p>
            <a class="link hide-mob-600" href="#">подписаться</a>
          </div>
          <div class="social-item">
            <el-image  src="/social-item4.png" lazy></el-image>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import ItemCard from "@/components/ItemCard";

export default {
  components: {
    ItemCard
  },
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios}){
    const get_banners = await $axios.get(`/api/get_banners`)
    const get_collections = await $axios.get(`/api/get_home_collections`)
    const banners = get_banners.data
    const collections = get_collections.data
    return {banners,collections}
  },
  data() {
    return {
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



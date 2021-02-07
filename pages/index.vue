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

        <div class="offer-slider">
          <div class="offer-banner-item">
            <el-image  src="http://placehold.it/500" lazy></el-image>

          </div><!--// offer-banner-item-->
        </div>
      </div>


    </section>
    <section class="collection">
      <div class="container">
        <h3 class="section-header">
          collection.name
        </h3>
        <p class="section-header__link"><a href="#">Смотреть полностью</a></p>
        <div class="collection-wrapper">

          <div class="collection-item">
            <p class="collection-item-name">collection.subcategory.name</p>
            <div class="collection-item__img" >
              <a href="#">
                <img src="http://placehold.it/500" alt="">
              </a>

            </div>
            <p class="collection-item__name">item.name </p>
            <p class="collection-item__price">item.price ₽</p>
          </div>


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
            <a class="link" href="#">Узнать больше</a>

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
export default {
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
     await store.dispatch('cart/fetchCart')
  },
  // async asyncData({$axios}){
  //   const get_streamers = await $axios.get(`/api/v1/user/get_streamers?at_home=true`)
  //   const streamers = get_streamers.data
  //   return {streamers,streams,top_streamers}
  // },
  data() {
    return {

    }
  }
}
</script>



<template>
  <div style="position: relative" class="">
    <img @click="mailModal=true" class="subimg" src="/sub.png" alt="">
     <div class="container">
      <div style="display: flex;align-items: center;justify-content: flex-end;flex-wrap: wrap">

         <div style="color: #E0E0E0">
        <h1 >Интернет-магазин медицинской одежды DOC’S</h1>
      </div>
      </div>


    </div>
    <MarqueeLine :is_index="true" text="магазин медицинской одежды "/>
    <section class="categories">
      <div class="container">
        <div class="categories-wrapper">
          <div v-if="category.is_at_home" @click="$router.push(`/category/${category.name_slug}`)" class="categories-item"
               :style="`background: url(${category.image}) center`"
               v-for="(category,index) in this.$store.getters['categories/getCategories']"
               :key="category.id">
            <!--            :class="category.is_for_man ? 'man' : 'woman'"-->
            <h2 class="categories-item__text" >{{category.name}}</h2>
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
                <a :href="banner.url">
                   <img :src="banner.image" >
                </a>

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
          SALE
        </h2>
        <div class="collection-wrapper">
          <!--           <ItemCard v-for="item in _.takeRight(collection.collection_items, 3)" :key="item.id"-->
          <!--         <ItemCard v-for="item in _.take(collection.collection_items, 3)" :key="item.id"-->
          <ItemCard v-for="item in new_items" :key="item.id"
                    :collection_name="item.subcategory.name"
                    :item_name="item.name"
                    :item_price="item.price"
                    :item_old_price="item.old_price"
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
        <h3 class="section-header">ИНТЕРНЕТ-МАГАЗИН ОДЕЖДЫ ДЛЯ СОВРЕМЕННЫХ ВРАЧЕЙ</h3>
        <p>DOC’S — это опыт врачей и хороший вкус дизайнеров: вместе мы делаем стильную и комфортную медицинскую одежду. Мы придумываем лаконичные и удобные модели, которые выглядят эстетично и не мешают в процессе работы.</p>
        <div style="display: flex;justify-content: center">
          <nuxt-link style="padding: 25px 70px" class="btn" to="/about">узнать больше</nuxt-link>
        </div>

      </div>
    </section>
    <section>
      <div class="container">
        <img src="/i.png" alt="">
      </div>
    </section>
    <section class="feedback">
      <div class="container">
        <h2 class="section-header">
          ОТЗЫВЫ
        </h2>
        <div class="feedback-wrapper">
          <div class="feedback-item" v-for="item in feedbacks":key="item.id">
            <div class="feedback-item__top">
              <img :src="`f${item.id}.png`" alt="">
              <div class="feedback-item__top-name">
                <p>{{item.from}} <span>{{item.nick}}</span></p>
                <el-rate
                  v-model="item.rate"
                  disabled

                  :colors="['#519999', '#519999', '#519999']">

                </el-rate>
              </div>
            </div>
            <div class="feedback-item__bottom">
              <p>{{item.text}}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
    <section class="social">
      <div class="container">
        <div class="social-top">
          <h3 class="text text-300 text-center text-upper"><a href="https://www.instagram.com/docsuniform/" target="_blank">подписывайтесь на наш инстаграм</a></h3>
          <p class="text-center"><a href="https://www.instagram.com/docsuniform/" target="_blank" class="text text-f-80">@docsuniform</a></p>
        </div>
        <div class="social-wrapper">
          <div class="social-item">
            <a href="https://www.instagram.com/docsuniform/" target="_blank">
              <img  src="/i1.jpg" >
            </a>

          </div>
          <div class="social-item">
            <a href="https://www.instagram.com/docsuniform/" target="_blank">
              <img  src="/i2.jpg" >
            </a>

          </div>
          <div class="social-item">
            <a href="https://www.instagram.com/docsuniform/" target="_blank">
              <img  src="/i3.jpg" >
            </a>

          </div>
          <div class="social-item">
            <a href="https://www.instagram.com/docsuniform/" target="_blank">
               <img  src="/i4.jpg" >
            </a>
          </div>
        </div>
      </div>
    </section>
              <el-dialog  class="mail-modal" :visible.sync="mailModal">
            <img src="/mailModal.jpg" alt="">
            <div class="inner">
              <p class="title">Cкидка <span>10%</span><br> за подписку</p>
              <p class="mb-20">Отправляем только самое интересное <br> и полезное</p>
        <el-form  :model="data" status-icon :rules="registerRules" ref="registerForm">
                  <el-form-item prop="email">
                      <el-input class="mb-15" prefix-icon="el-icon-message" v-model="data.email"  placeholder="Введите почту"></el-input>
                  </el-form-item>
          <el-checkbox class="mb-10" v-model="agree">Я принимаю условия рассылки</el-checkbox>
                      <el-button type="primary" :disabled="!agree" class="btn" @click="addSubscribe">Получить скидку</el-button>
        </el-form>
            </div>
</el-dialog>
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
   head() {
    return {
      title: `Купить медицинскую одежду из каталога интернет-магазина DOC’S`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Покупайте стильную, современную одежду для врачей, удобную медицинскую униформу в интернет-магазине DOC’S :white_check_mark: Новые коллекции, быстрая доставка по России и СНГ :point_up: Заходите!`
        }
      ]
    }
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
      agree:false,
      mailModal:false,
      data:{
        email:null,
      },
      registerRules: {

        email:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          { type: 'email', message: 'Введите корректный E-Mail адрес', trigger: ['blur', 'change'] }
          ]


      },
      rate1:4,
      feedbacks:[
        {id:1,rate:5,img:'',from:'Иллина',nick:'ashata77',text:'Купили форму у вас в магазине дня 3 назад.. решили написать отзыв) Качество шикарное 👍 идеально подошел костюмчик! 👌 цену оправдывает)) Придём еще!)'},
        {id:2,rate:5,img:'',from:'Dahi Abdullayev',nick:'marmotte2016',text:'Здравствуйте! Вы были абсолютно правы! Костюм подошел просто идеально! Такая приятная для тела ткань! 😍😍😍 И сама модель обалденная! Про цвет я вообще молчу - мой любимый! Пожалуйста, не останавливайтесь на достигнутом! Только вперед! Успехов вам и только довольных клиентов!💰'},
        {id:3,rate:4,img:'',from:'Darria',nick:'_protege_moi',text:'Спасибо большое, качество хорошее, размеры точные, но виз короткий, хотя бы 1-2 см добавить и было бы отлично. Но все равно намного лучше чем у других производителей'},
      ],
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
  },
  methods:{
     addSubscribe(){
       this.$refs.registerForm.validate( async(valid) => {
        if (valid) {
           await this.$axios.post(`/api/add_subscribe`,{email:this.data.email})
       this.$notify({
        title:'ВЫ ПОДПИСАНЫ НА НОВОСТНУЮ РАССЫЛКУ!',
         message:'Спасибо за подписку на рассылку.',
        type: 'success'
      });
      this.data.email=null
      this.mailModal = false
        } else {

          return false;
        }
      });

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
.mail-modal
  & .el-dialog
    width: 400px !important

  & .inner
    padding: 25px
  & .title
    font-size: 35px
    font-weight: 700
    line-height: 38px
    margin-bottom: 10px
    span
      color: red
  & .btn
    width: 100%
    max-width: 100%

  & .el-dialog__header
    display: none
  & .el-dialog__body
    padding: 0
    img
      width: 100%
      height: auto

@media (max-width: 600px)
  .mail-modal
    & .el-dialog
      width: 100% !important

</style>



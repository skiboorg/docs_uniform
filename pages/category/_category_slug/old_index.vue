<template>
  <div class="category-page">
    <div class="container">
      <div style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap">
         <div class="">
        <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
      </svg>
        <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
      </p>
      </div>

         <div style="color: #E0E0E0">
        <h1>{{ h1 }}</h1>

      </div>
      </div>


    </div>
    <MarqueeLine :text="`${ this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).string}`"/>
    <section class="subcategories">
      <div class="container">
        <div class="subcategories-wrapper">
          <div class="subcategories-item"
               v-for="subcategory in this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).subcategories"
               :key="subcategory.id">
            <div @click="$router.push(`/category/${$route.params.category_slug}/${subcategory.name_slug}`)"
                 class="subcategories-item__img">
               <el-image  :src="subcategory.image" lazy></el-image>
            </div>
            <h2 class="subcategories-item__name">{{subcategory.name}}</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MarqueeLine from '@/components/Marquee'

export default {
  async fetch({store,route}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData ({ store, $axios, params, error,route }) {
    console.log(route.params.category_slug === 'muzhchinam')
      switch(route.params.category_slug) {
        case 'muzhchinam':
          break
        case 'zhenschinam':
          break
        case 'aksessuaryi':
          break
        default:
          return error({ statusCode: 404 })
    }
    const responce= await $axios.get(`/api/get_items_by_category?name_slug=${route.params.category_slug}`)
    const items = responce.data

    return {items}

  },
  head() {
    return {
      title: this.page_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page_description
        }
      ]
    }
  },
  components: {
    MarqueeLine
  },
  data() {
    return {
      category: null,
      marqueeText:''
    }
  },
  created() {
    try {
      this.category = this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug)
      this.marqueeText = this.category.is_for_man ? 'Мужская' : 'Женская'
    }catch (e) {
      this.$nuxt.error({ statusCode: 404 })
    }


  },
  computed:{
    h1(){
      return this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).h1
    },
    page_title(){
      return this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).title
    },
    page_description(){
      return this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).description
    },
  }

}
</script>



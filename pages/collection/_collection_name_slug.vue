<template>
 <div class="">
   <div class="container mb-50">
        <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
        </svg>
            <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
        </p>
    </div>


   <section  class="collection">
        <div class="container">
        <p style="font-size: 14px;letter-spacing: 0.1em;text-transform: uppercase;opacity: .5;margin-bottom: 15px"> {{collection[0].title}} </p>
            <h3 class="section-header">
                 {{collection[0].name}}
            </h3>


            <div style="flex-wrap: wrap" class="collection-wrapper">

              <ItemCard  v-for="item in  collection[0].collection_items" :key="item.id"
                        :collection_name="item.subcategory.name"
                        :item_name="item.name"
                        :item_price="item.price"
                        :discount="item.diccount"
                         :item_old_price="item.old_price"
                        :item_slug="item.name_slug"
                        :cat_slug="item.category"
                        :subcat_slug="item.subcategory.name_slug"
                        :image="item.images"
              />
            </div>
        </div>
    </section>
 </div>
</template>

<script>
import MarqueeLine from '@/components/Marquee'
import ItemCard from '@/components/ItemCard'

export default {
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
   head() {
    return {
      title: this.collection[0].name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.collection[0].name
        }
      ]
    }
  },
  components: {
    MarqueeLine,
    ItemCard


  },
  async asyncData({$axios,params}){
    const responce= await $axios.get(`/api/get_collection_by_slug?name_slug=${params.collection_name_slug}`)
    const collection = responce.data

    return {collection}
  },
  data() {
    return {
      category: null,
      marqueeText:'',
      collections:[]
    }
  },
  mounted() {


  },

}
</script>



<template>
 <div class="">
   <div class="container">
        <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
        </svg>
            <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
        </p>
    </div>

    <MarqueeLine :text="`${ this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).string}`"/>



   <section v-if="!collection.is_base_collection" class="collection" v-for="collection in collections" :key="collection.id">
        <div class="container">
        <p style="font-size: 14px;letter-spacing: 0.1em;text-transform: uppercase;opacity: .5;margin-bottom: 15px"> {{collection.title}} </p>
            <h3 class="section-header">
                 {{collection.name}}
            </h3>

            <div style="flex-wrap: wrap" class="collection-wrapper">

              <ItemCard  v-for="item in  items.filter(x=>x.collection.id===collection.id)" :key="item.id"

                        :collection_name="item.subcategory.name"
                        :item_name="item.name"
                        :item_price="item.price"
                        :discount="item.diccount"
                        :item_slug="item.name_slug"
                        :cat_slug="$route.params.category_slug"
                        :subcat_slug="$route.params.subcategory_slug"
                        :image="item.images[0].image_thumb"/>
            </div>
        </div>
    </section>
    <section style="margin-bottom: 0">
     <div class="container collection-wrapper">
      <ItemCard v-if="item.collection.is_base_collection" v-for="item in items" :key="item.id"
                        :collection_name="item.subcategory.name"
                        :item_name="item.name"
                        :item_price="item.price"
                        :discount="item.diccount"
                        :item_slug="item.name_slug"
                        :cat_slug="$route.params.category_slug"
                        :subcat_slug="$route.params.subcategory_slug"
                        :image="item.images[0].image_thumb"/>
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
  components: {
    MarqueeLine,
    ItemCard


  },
  async asyncData({$axios,params}){
    // const responce_data = await $axios.get(`/api/get_collections?subcategory_name_slug=${params.subcategory_slug}`)
    // const collections = responce_data.data
    const responce_items = await $axios.get(`/api/get_subcategory_items?subcategory_name_slug=${params.subcategory_slug}`)
    const items = responce_items.data
    return {items}
  },
  data() {
    return {
      category: null,
      marqueeText:'',
      collections:[]
    }
  },
  mounted() {
    console.log( this.items)
    for (let i of this.items){
      if (i.collection) !this.collections.find(x=>x.id===i.collection.id) ? this.collections.push(i.collection) : null

    }
    this.collections = _.orderBy(this.collections,'order_num' )
    console.log(this.collections)

  },

}
</script>



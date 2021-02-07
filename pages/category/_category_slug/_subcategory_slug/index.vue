<template>
 <div class="">
   <div class="container">
        <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
        </svg>
            <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
        </p>
    </div>

    <MarqueeLine :text="`${ this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).is_for_man ? 'Мужская':'Женская'}  медицинская одежда`"/>
    <section class="subcategories">
        <div class="container">

            <div class="subcategories-wrapper">
                    <div class="subcategories-item" v-for="subcategory in this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug).subcategories" :key="subcategory.id">
                        <div class="subcategories-item__img">
                                 <img :src="subcategory.image" alt="">


                        </div>
                        <p class="subcategories-item__name">{{subcategory.name}}</p>
                    </div>

            </div>

        </div>
    </section>
 </div>
</template>

<script>
import MarqueeLine from '@/components/Marquee'

export default {
  components: {
    MarqueeLine


  },
  data() {
    return {
      category: null,
      marqueeText:''
    }
  },
  mounted() {
    this.category = this.$store.getters['categories/getCategories'].find(x => x.name_slug === this.$route.params.category_slug)
    this.marqueeText = this.category.is_for_man ? 'Мужская' : 'Женская'
  },

}
</script>



<template>
  <div class="collection-item" >
    <p class="collection-item-name">{{collection_name}}</p>
    <div class="collection-item__img" >
      <nuxt-link :to="`/category/${cat_slug}/${subcat_slug}/${item_slug}`">
        <el-image  :src="image | get_preview" lazy>
         <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
       </el-image>
      </nuxt-link>
    </div>
    <p class="collection-item__name">{{item_name}}</p>
    <p class="collection-item__price">{{item_price}} ₽</p>

  </div>
</template>

<script>
export default {
  props:['collection_name','image','item_name','item_price','discount','cat_slug','subcat_slug','item_slug'],
  data() {
    return {}
  },
  filters:{
    get_preview(val){
      let img = val.find(x=>x.is_preview===true)
      return img ? img.image_thumb : val[0].image_thumb
    }
  }

}
</script>



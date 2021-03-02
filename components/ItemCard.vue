<template>
  <div @click="$router.push(`/category/${cat_slug}/${subcat_slug}/${item_slug}`)" class="collection-item" >
    <p class="collection-item-name">{{collection_name}}</p>
    <div class="collection-item__img" >
       <el-image  :src="image" lazy>
         <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
       </el-image>

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

}
</script>



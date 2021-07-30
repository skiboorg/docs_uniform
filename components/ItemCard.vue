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
     <div class="item-card-colors">
       <p class="" v-for="color in colors" :key="color">
       <span v-if="image.find(x=>x.color.id===color).color.bg_color"
                               :style="'background:  ' + image.find(x=>x.color.id===color).color.bg_color  " class="item-info__color"></span>
      <span v-if="image.find(x=>x.color.id===color).color.image"
            class="item-info__color image"
            :style="'background:  url(' + image.find(x=>x.color.id===color).color.image +')'  "></span>
    </p>
    </div>
    <p class="collection-item__name">{{item_name}}</p>
    <div v-if="!discount>0">
      <p class="collection-item__price">{{item_price}} ₽</p>
    </div>
    <div v-else style="display: flex;">
      <p style="color: red;margin-right: 10px" class="collection-item__price">{{item_price}} ₽</p>
       <p style="color: grey;text-decoration: line-through" class="collection-item__price">{{item_old_price}} ₽</p>
    </div>







  </div>
</template>

<script>
export default {
  props:['collection_name','image','item_name','item_price','discount','cat_slug','subcat_slug','item_slug','item_old_price'],
  data() {
    return {
      colors:[]
    }
  },
  mounted() {
    for(let i of this.image){
      !this.colors.includes(i.color.id) ? this.colors.push(i.color.id) : null
    }
    //console.log(this.colors)
    for(let i of this.colors){
      console.log(this.image.find(x=>x.color.id===i))

    }
  },
  filters:{
    get_preview(val){
      let img = val.find(x=>x.is_preview===true)
      return img ? img.image_thumb : val[0].image_thumb
    }
  }

}
</script>



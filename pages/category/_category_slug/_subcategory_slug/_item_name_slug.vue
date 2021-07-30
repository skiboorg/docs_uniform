<template>
  <div class="">
    <div class="container mb-50">
      <p class="back-link"><svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#519999"/>
      </svg>
        <a class="link" href="#" @click.prevent="$router.back()">НАЗАД</a>
      </p>
    </div>

    <section id="item" class="item">
      <div class="container">

        <div class="item-wrapper">

          <div class="item-images">

            <el-image style="cursor: pointer"  v-for="(image,index) in thumbList" :key="index"
                      :src="image"
                      @click="openImage(index)"
            >

              <div slot="placeholder" class="image-slot">
                Загрузка<span class="dot">...</span>
              </div>
            </el-image>


            <!--                        <img :src="base_url+image.image" alt="" v-for="image in item.colors_data[selectedColor].images" :key="image.id">-->

          </div>

          <div class="item-info">
            <h1 class="section-header">{{ item.name }}</h1>

            <div v-if="item.discount > 0" class="item-price-w-discount">
              <p class="item-info__price new_price">{{ item.price }} ₽</p>
              <p class="item-info__price old-price">{{ item.old_price }} ₽</p>
            </div>
            <p v-else class="item-info__price">{{ item.price }} ₽</p>

            <p class="item-info__description">{{ item.short_description }}</p>
            <p class="item-info__subtitle">цвет</p>
            <div class="item-info__colors">
              <div class="" v-for="(color,index) in colors" :key="color.id">
                <span v-if="color.bg_color" @click="selectColor(index)" :class="{'selected':selectedColor===index}"
                               :style="'background:  ' + color.bg_color  " class="item-info__color"></span>
                <span v-if="color.image" @click="selectColor(index)"
                      class="item-info__color image"
                      :class="{'selected':selectedColor===index}"
                      :style="'background:  url(' + color.image +')'  "></span>
              </div>


<!--                        <span @click="selectColor(index)" :class="{'selected':selectedColor===index}"-->
<!--                              v-for="(color,index) in colors" :style="'background:  ' + color.bg_color  " class="item-info__color "></span>-->
            </div>
            <div class="item-info__params">

              <div v-if="sizes.length>1" class="item-info__param">
                <p  class="item-info__subtitle">размер</p>
                <!--                @change="selectedHeight=null"-->
                <el-select  v-model="selectedSize" placeholder="Select" >
                  <el-option
                    v-for="size in sizes"
                    :key="size.id"
                    :label="size.name"
                    :value="size.id">
                  </el-option>
                </el-select>
              </div>
              <div v-if="heights.length>1" class="item-info__param">
                <p class="item-info__subtitle">рост</p>
                <el-select v-model="selectedHeight" placeholder="Выберите рост">
                  <el-option
                    v-for="height in heights"
                    :key="height.id"
                    :label="height.name"
                    :value="height.id">
                  </el-option>
                </el-select>
              </div>

            </div>
            <div class="item-info__params">
              <div v-if="materials.length>1" class="item-info__param">
                <p  class="item-info__subtitle">ткань</p>
                <el-select v-model="selectedMaterial" placeholder="Select" >
                  <el-option
                    v-for="material in materials"
                    :key="material.id"
                    :label="material.name"
                    :value="material.id">
                  </el-option>
                </el-select>
              </div>
              <div v-if="mods.length>1" class="item-info__param">
                <p class="item-info__subtitle">модификация</p>
                <el-select v-model="selectedMod" placeholder="Выберите рост">
                  <el-option
                    v-for="mod in mods"
                    :key="mod.id"
                    :label="mod.name"
                    :value="mod.id">
                  </el-option>
                </el-select>
              </div>

            </div>

            <p id="myBtn" class="item-info__table" @click="sizesDialogVisible=!sizesDialogVisible">Таблица размеров</p>

            <div @click="addToCart" class="btn" :class="{'btnDisabled':btnDisabled}" >
              <p>{{buttonCaption}}</p>
            </div>
            <div class="item-info__features">
              <div class="item-info__feature">
                <div class="item-info__feature--img">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10.4462C50 4.68636 45.3136 0 39.5538 0C36.673 0 33.9504 1.18637 31.9942 3.23677C30.5241 2.64931 28.9452 2.34299 27.3499 2.34299C24.5853 2.34299 21.965 3.228 19.7723 4.90227C18.0286 6.2336 16.655 8.02345 15.8127 10.0361C10.1681 10.6991 5.77393 15.5121 5.77393 21.3318C5.77393 24.0292 6.73943 26.6327 8.46176 28.6732C7.97806 29.8538 7.72667 31.1234 7.72667 32.4127C7.72667 34.4269 8.33397 36.3014 9.37462 37.8639L0 47.2385L2.76146 50L12.1361 40.6254C13.6986 41.666 15.5731 42.2733 17.5873 42.2733C18.6924 42.2733 19.7933 42.0853 20.8336 41.7233C23.1277 43.7626 26.1078 44.9093 29.2049 44.9093C36.1496 44.9093 41.7992 39.2597 41.7992 32.3154C41.7992 32.1938 41.7973 32.0717 41.7938 31.9496C43.7599 31.1695 45.5151 29.8786 46.8464 28.2124C48.5653 26.0616 49.5117 23.3582 49.5117 20.5997C49.5117 18.9461 49.1741 17.3073 48.5283 15.7967C49.4946 14.185 50 12.3577 50 10.4462ZM29.2049 41.0042C26.7368 41.0042 24.3763 39.9483 22.7283 38.1069L21.7106 36.9698L20.3617 37.6823C19.4996 38.1374 18.5661 38.3682 17.5873 38.3682C14.3032 38.3682 11.6318 35.6968 11.6318 32.4127C11.6318 32.0423 11.6669 31.675 11.734 31.3148C13.4129 32.169 15.3507 32.589 17.5873 32.589V28.6835C15.4743 28.6835 13.8306 28.2051 12.4935 27.1935L12.1342 26.8677C10.574 25.4536 9.67941 23.436 9.67941 21.3318C9.67941 17.2138 13.0299 13.8634 17.1425 13.8634L18.684 13.876L19.0948 12.4527C20.1485 8.79974 23.5432 6.24809 27.3499 6.24809C28.8326 6.24809 30.2937 6.63185 31.5754 7.35779L33.1367 8.24165L34.1492 6.76079C35.3718 4.97246 37.392 3.90511 39.5538 3.90511C43.1606 3.90511 46.0949 6.83937 46.0949 10.4462C46.0949 11.9068 45.6238 13.2881 44.733 14.4409L43.9472 15.4579L44.5709 16.5821C45.2484 17.804 45.6066 19.1933 45.6066 20.5997C45.6066 22.5613 44.9291 24.3828 43.7714 25.8179L43.7378 25.79C42.2398 27.5791 40.0391 28.6053 37.6987 28.6053C35.3054 28.6053 33.0563 27.5467 31.5281 25.7008L28.5198 28.191C30.7926 30.9361 34.1381 32.5104 37.6987 32.5104C37.7632 32.5104 37.8273 32.5089 37.8914 32.5077C37.7888 37.2105 33.9317 41.0042 29.2049 41.0042ZM27.2179 19.8326L24.4564 17.0712C27.8824 13.6452 33.4568 13.6452 36.8824 17.0712L34.1213 19.8326C32.2178 17.9295 29.121 17.9295 27.2179 19.8326Z" fill="#519999"/>
                  </svg>
                </div>
                <p>Мягкая ткань</p>
              </div>
              <div class="item-info__feature">
                <div class="item-info__feature--img">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.7223 50H14.2658C11.0389 50 8.41406 47.3713 8.41406 44.1407L5.41406 31.7382L8.41406 19.3358H3.15513L0 5.89907L1.48201 5.24438C1.83334 5.08892 10.1566 1.43046 16.3929 0.322761L18.2106 0L18.6325 1.79982C19.3294 4.77456 22.005 6.93343 24.9942 6.93343C28.0448 6.93343 30.6609 4.86242 31.3556 1.8976L31.8 0.00152786L33.6948 0.440788C40.5246 2.0248 48.1296 5.09083 48.4496 5.22032L49.9999 5.84827L46.8329 19.3358H41.574L44.574 31.7382L41.574 44.1407C41.574 47.3713 38.9487 50 35.7223 50ZM6.24541 15.4295H12.315L9.31496 31.7877L12.315 44.1407C12.315 45.2174 13.1901 46.0936 14.2658 46.0936H35.7223C36.7976 46.0936 37.6727 45.2174 37.6727 44.1407L40.6727 31.7877L37.6727 15.4295H43.7423L45.431 8.23746C43.1701 7.37918 38.7794 5.78792 34.5168 4.66838C33.8424 6.1695 32.8151 7.50752 31.5208 8.54647C29.6787 10.0254 27.3609 10.8398 24.9938 10.8398C22.6276 10.8398 20.3041 10.0037 18.4517 8.48536C17.1463 7.41547 16.1129 6.04231 15.4407 4.50948C11.454 5.44911 6.85576 7.23977 4.54558 8.18971L6.24541 15.4295Z" fill="#519999"/>
                  </svg>
                </div>
                <p>Тянется</p>
              </div>
              <div class="item-info__feature">
                <div class="item-info__feature--img">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path d="M44.939 4.33846C43.166 2.92168 41.0522 1.90239 38.826 1.39046C37.043 0.980377 35.2695 0.638199 33.5541 0.373077L31.7707 0.0976563L31.3583 1.85471C30.6633 4.8172 28.0483 6.88667 25 6.88667C21.9513 6.88667 19.3367 4.8172 18.6413 1.85471L18.2293 0.0976562L16.4455 0.373077C14.7305 0.638199 12.9566 0.980377 11.174 1.39046C8.94775 1.90239 6.83365 2.92168 5.06058 4.33846L0 8.3828L3.34625 22.0654L7.0694 20.6551C7.49779 20.4929 7.8331 20.6558 7.99484 20.7676C8.15697 20.8794 8.42819 21.1353 8.42819 21.5935V49.8756H41.5718V21.5935C41.5718 21.1353 41.843 20.8794 42.0052 20.7676C42.1669 20.6558 42.5022 20.4929 42.9306 20.6551L46.6537 22.0654L50 8.3828L44.939 4.33846ZM43.9087 16.8755C42.5098 16.4799 40.9977 16.7248 39.7892 17.5591C38.464 18.4746 37.6724 19.9825 37.6724 21.5935V45.9763H12.3276V42.1745H33.7734V38.2755H12.3276V21.5935C12.3276 19.9825 11.536 18.4746 10.2108 17.5591C9.0023 16.7248 7.49016 16.4799 6.09131 16.8755L4.37889 9.87473L7.49512 7.38449C8.81386 6.33049 10.3882 5.57213 12.0476 5.19028C13.1836 4.92935 14.315 4.69704 15.427 4.49715C16.0995 6.04553 17.1471 7.42722 18.4753 8.49342C20.3175 9.97162 22.6345 10.7857 25 10.7857C27.3655 10.7857 29.6825 9.97162 31.5243 8.49342C32.8529 7.42722 33.9005 6.04553 34.573 4.49715C35.685 4.69742 36.8164 4.92935 37.9524 5.19028C39.6118 5.57213 41.1861 6.33049 42.5049 7.38449L45.6211 9.87473L43.9087 16.8755Z" fill="#519999"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="50" height="50" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                </div>
                <p>Эргономичные детали</p>
              </div>
            </div>

            <button class="accordion">Детали</button>
            <div class="panel">
              <br><div v-html="item.description"></div><br>
            </div>
            <button class="accordion">Состав и уход</button>
            <div class="panel">
              <br><div v-html="item.carry"></div><br>
            </div>
            <button class="accordion">Срок доставки</button>
            <div class="panel">
              <br><div v-html="item.delivery"></div><br>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section>


      <div v-if="recommended_items.length > 0" class="container ">
        <h3 class="section-header mb-40">Рекомендуемые товары</h3>
        <div class="collection-wrapper">
          <ItemCard v-for="item in recommended_items" :key="item.id"
                    :collection_name="item.subcategory.name"
                    :item_name="item.name"
                    :item_price="item.price"
                    :item_old_price="item.old_price"
                    :discount="item.diccount"
                    :item_slug="item.name_slug"
                    :cat_slug="$route.params.category_slug"
                    :subcat_slug="$route.params.subcategory_slug"
                    :image="item.images"/>
        </div>


      </div>
    </section>
    <el-dialog class="sizesDialog" :visible.sync="sizesDialogVisible">
      <el-image :src="sizes_img"></el-image>
    </el-dialog>
    <el-dialog class="sizesDialog" :visible.sync="imageModal">
      <el-image :src="cur_image"></el-image>
    </el-dialog>
  </div>

</template>

<script>
export default {



  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios,params,error}){
    console.log(params.item_name_slug)
    try{

      const responce_data = await $axios.get(`/api/get_item?base_item_slug=${params.item_name_slug}`)
      const recommended_data = await $axios.get(`/api/get_recomended_items?base_item_slug=${params.item_name_slug}`)
      const item = responce_data.data
      const recommended_items = recommended_data.data
      console.log(item)

      return {item,recommended_items}
    }catch (e){
      return error({ statusCode: 404 })
    }

  },
  data() {
    return {
      imageModal:false,
      cur_image:"",
      title:'',
      colors:[],
      heights:[],
      sizes:[],
      materials:[],
      mods:[],
      btnDisabled:true,
      sizesDialogVisible:false,
      selectedColor:0,
      buttonCaption:'В КОРЗИНУ',
      selectedSize:null,
      base_url:process.env.img_url,
      selectedHeight:null,
      selectedMaterial:null,
      selectedMod:null,
      previewList:[],
      thumbList:[],


    }
  },
  head() {
    return {
      title: `Купить ${this.item.name} в интернет-магазине DOC’S`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Покупайте ${this.item.name} в интернет-магазин DOC’S ✅ Новые коллекции, быстрая доставка по России и СНГ ☝️ Заходите!`
        }
      ]
    }
  },
  mounted() {
    this.$fb.track('ViewContent',{
      content_name:this.item.name,
      content_type:'product',
      content_ids: this.item.id,
    });
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    for(let i of this.item.types){

      if (i.is_active){
        !this.colors.find(x=>x.id === i.color.id) ? this.colors.push(i.color) : null
        // !this.sizes.find(x=>x.id === i.size.id) ? this.sizes.push(i.size) : null
        // !this.heights.find(x=>x.id === i.height.id) ? this.heights.push(i.height) : null
        // !this.materials.find(x=>x.id === i.material.id) ? this.materials.push(i.material) : null
        // !this.mods.find(x=>x.id === i.modification.id) ? this.mods.push(i.modification) : null
      }

    }
//     this.sizes = _.orderBy(this.sizes,'order_num' )
//
//     this.selectedHeight = this.heights[0].id
//     this.selectedMaterial = this.materials[0].id
//     this.selectedMod = this.mods[0].id
// console.log('11')
//     if (this.is_male){
//       this.sizes.length >= 2 ? this.selectedSize = this.sizes[1].id : this.selectedSize = this.sizes[0].id
//     }else{
//       this.sizes.length > 3 ? this.selectedSize = this.sizes[3].id : this.selectedSize = this.sizes[0].id
//     }


    this.selectColor(0)
    // for (let i of this.item.images.filter(x=>x.color===this.colors[0].id)){
    //   this.thumbList.push(i.image_thumb)
    //   this.previewList.push(i.image)
    // }
  },
  watch:{
    selectedColor(val){
      this.checkItem()
    },
    selectedSize(val){
      this.checkItem()
    },
    selectedHeight(val){
      this.checkItem()
    },
    selectedMaterial(val){
      this.checkItem()
    },
    selectedMod(val){
      this.checkItem()
    },
  },
  computed:{
    is_male (){
      return this.$store.getters['categories/getCategories']
        .find(x => x.name_slug === this.$route.params.category_slug).is_for_man
    },
    sizes_img (){
      return this.is_male ? '/man.jpg' : '/woman.jpg'
    }
  },

  methods: {
    openImage(i){
      console.log(this.previewList[i])
      this.cur_image=this.previewList[i]
      this.imageModal=true
    },
    notify(title,message,type){
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    checkItem() {
      let filtered_types = this.item.types.filter(x=>x.color.id===this.colors[this.selectedColor].id)
      for (let i of filtered_types) {
        if (i.color.id === this.colors[this.selectedColor].id &&
          i.size.id === this.selectedSize &&
          i.height.id === this.selectedHeight &&
          i.material.id === this.selectedMaterial &&
          i.modification.id === this.selectedMod) {
          if (i.quantity > 0) {

            this.buttonCaption = 'В корзину'
            this.btnDisabled = false
            return i
          } else {

            this.buttonCaption = 'К сожалению, закончилось :('
            //this.selectNextMod()
          }
        } else {

          this.buttonCaption = 'К сожалению, закончилось <:('
          //this.selectNextMod()
        }
      }
      this.btnDisabled = true
    },
    selectNextMaterial(){
      console.log('next mat')
      console.log(this.materials)

      let currMatIndex = this.materials.findIndex(x=>x.id===this.selectedMaterial)
      console.log(currMatIndex)
      if (!currMatIndex+1 > this.materials.length-1){
        this.selectedMaterial = this.materials[currMatIndex+1].id
      }
    },
    selectNextMod(){
      if (this.mods.length>1){
        let currModIndex = this.mods.findIndex(x=>x.id===this.selectedMod)
        if (!currModIndex+1 > this.mods.length-1){
          this.selectedMod = this.mods[currModIndex+1].id
        }
      }
    },
    selectColor(index) {
      this.previewList = []
      this.thumbList = []
      this.selectedColor = index
      console.log('dd')
      for (let i of this.item.images.filter(x => x.color.id === this.colors[this.selectedColor].id)) {
        console.log(i)
        this.thumbList.push(i.image_thumb)
        this.previewList.push(i.image)
      }
      let filtered_types = this.item.types.filter(x=>x.color.id===this.colors[this.selectedColor].id)
      this.sizes = []
      this.heights = []
      this.materials = []
      this.mods = []
      for(let i of filtered_types){
        !this.sizes.find(x=>x.id === i.size.id) ? this.sizes.push(i.size) : null
        !this.heights.find(x=>x.id === i.height.id) ? this.heights.push(i.height) : null
        !this.materials.find(x=>x.id === i.material.id) ? this.materials.push(i.material) : null
        !this.mods.find(x=>x.id === i.modification.id) ? this.mods.push(i.modification) : null
      }
      this.selectedSize = this.sizes[0].id
      this.selectedHeight = this.heights[0].id
      this.selectedMaterial = this.materials[0].id
      this.selectedMod = this.mods[0].id

      if (this.is_male){
        this.sizes.length >= 2 ? this.selectedSize = this.sizes[1].id : this.selectedSize = this.sizes[0].id
      }else{
        this.sizes.length > 3 ? this.selectedSize = this.sizes[3].id : this.selectedSize = this.sizes[0].id
      }
      this.checkItem()


    },
    async addToCart() {

      let session_id = this.$auth.$storage.getCookie('session_id')
      let item = this.checkItem()
      if (item.quantity > 0) {
        await this.$axios.post('/api/add_to_cart',
          {
            //session_id генерируется в header.vue
            session_id: session_id,
            item_id: item.id

          })
        await this.$store.dispatch('cart/fetchCart')
        this.notify('Товар добавлен','','success')
        this.buttonCaption = 'В корзине'

        this.$fb.track('AddToCart',{
          value: this.item.price,
          currency: 'RUB',
          content_name:this.item.name,
          contents: [
            {
              id: this.item.id,
              quantity: 1
            }
          ],
          content_type:'product',
          content_ids: this.item.id,
        });

      }
    }
  }


}
</script>



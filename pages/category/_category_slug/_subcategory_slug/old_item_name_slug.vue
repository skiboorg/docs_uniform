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
                  <el-image v-for="(image,index) in item.colors_data[selectedColor].images" :key="index"


                  :src="base_url+image.image_thumb"
                  :preview-src-list="previewList">

                </el-image>


<!--                        <img :src="base_url+image.image" alt="" v-for="image in item.colors_data[selectedColor].images" :key="image.id">-->

                </div>

                <div class="item-info">
                    <h1 class="section-header">{{ item.item_data.name }}</h1>

                        <div v-if="item.discount > 0" class="item-price-w-discount">
                            <p class="item-info__price new_price">{{ item.item_data.price }} ₽</p>
                            <p class="item-info__price old-price">{{ item.item_data.discount }} ₽</p>
                        </div>
                        <p v v-else class="item-info__price">{{ item.item_data.price }} ₽</p>

                    <p class="item-info__description">{{ item.item_data.short_description }}</p>
                    <p class="item-info__subtitle">цвет</p>
                    <div class="item-info__colors">
                        <span @click="selectColor(index)" :class="{'selected':selectedColor===index}" v-for="(color,index) in item.colors_data" :style="'background:  ' + color.color_hex  " class="item-info__color "></span>
                    </div>
                    <div class="item-info__params">
                        <div class="item-info__param">
                            <p  class="item-info__subtitle">1. размер</p>
                          <el-select v-model="selectedSize" placeholder="Select" @change="selectedHeight=null">
                              <el-option
                                v-for="(size,index) in item.colors_data[selectedColor].sizes"
                                :key="size.size_id"
                                :label="size.size_name"
                                :value="index">
                              </el-option>
                            </el-select>
                        </div>
                        <div class="item-info__param">
                            <p class="item-info__subtitle">2. рост</p>
                           <el-select v-model="selectedHeight" placeholder="Выберите рост">
                              <el-option
                                v-for="height in item.colors_data[selectedColor].sizes[selectedSize].heights"
                                :key="height.height_id"
                                :label="height.height_name"
                                :value="height.height_id">
                              </el-option>
                            </el-select>
                        </div>

                    </div>
                    <p id="myBtn" class="item-info__table">Таблица размеров</p>
                    <div @click="addToCart" class="btn">
                        <p>В корзину</p>
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
                                    <path d="M40.2344 0H30.1758V3.90625H40.2344C43.4652 3.90625 46.0938 6.53477 46.0938 9.76562V32.4269C44.4604 31.198 42.4311 30.4688 40.2344 30.4688H5.85938C5.17471 30.4688 4.51758 30.5879 3.90625 30.8047V5.85938C3.90625 4.78242 4.78242 3.90625 5.85938 3.90625H17.7734V0H5.85938C2.62852 0 0 2.62852 0 5.85938V36.7188H0.0144531C0.103516 38.0645 0.647461 39.2879 1.49561 40.2344C0.566016 41.2718 0 42.6413 0 44.1406C0 47.3715 2.62852 50 5.85938 50H40.2344C45.5212 50 49.8397 45.7771 49.9952 40.5273H50V9.76562C50 4.38086 45.6192 0 40.2344 0ZM40.2344 46.0938H5.85938C4.78242 46.0938 3.90625 45.2176 3.90625 44.1406C3.90625 43.0637 4.78242 42.1875 5.85938 42.1875H40.2344V38.2812H5.85938C4.78242 38.2812 3.90625 37.4051 3.90625 36.3281C3.90625 35.2512 4.78242 34.375 5.85938 34.375H40.2344C43.4652 34.375 46.0938 37.0035 46.0938 40.2344C46.0938 43.4652 43.4652 46.0938 40.2344 46.0938ZM14.2578 8.1207V11.4105L15.764 11.7646C20.1878 12.8045 21.698 14.2553 21.979 17.7354L22.124 19.5312H25.9229L26.0679 17.7354C26.3489 14.2554 27.8591 12.8045 32.2829 11.7646L33.7891 11.4105V8.1207L32.2829 7.7667C27.8591 6.72676 26.3489 5.27598 26.0679 1.7959L25.9229 0H22.124L21.979 1.7959C21.698 5.27588 20.1878 6.72676 15.764 7.7667L14.2578 8.1207ZM23.0813 8.56435C23.4277 8.23848 23.7416 7.88818 24.0234 7.5124C24.3054 7.88818 24.6192 8.23848 24.9655 8.56435C25.4385 9.00928 25.9653 9.40723 26.562 9.76562C25.9654 10.124 25.4385 10.522 24.9655 10.9669C24.6191 11.2928 24.3053 11.6431 24.0234 12.0188C23.7415 11.6431 23.4276 11.2928 23.0813 10.9669C22.6084 10.522 22.0815 10.124 21.4849 9.76562C22.0814 9.40723 22.6084 9.00928 23.0813 8.56435ZM32.6172 20.006L34.1576 19.6729C35.2843 19.4294 35.3141 19.0911 35.3591 18.579L35.5157 16.7968H39.2891L39.4457 18.579C39.4907 19.0911 39.5205 19.4294 40.6472 19.6729L42.1876 20.006V23.3533L40.6472 23.6863C39.5205 23.9299 39.4907 24.2682 39.4457 24.7803L39.289 26.5625H35.5156L35.359 24.7803C35.314 24.2682 35.2842 23.9299 34.1575 23.6863L32.6172 23.3534V20.006Z" fill="#519999"/>
                                </svg>

                            </div>
                            <p>Антибактериальная обработка</p>
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
                         <br><p v-html="item.item_data.description"></p><br>
                    </div>
                    <button class="accordion">Состав и уход</button>
                    <div class="panel">
                          <br><p v-html="item.item_data.carry"></p><br>
                    </div>
                    <button class="accordion">Срок доставки</button>
                    <div class="panel">
                       <br><p v-html="item.item_data.delivery"></p><br>
                    </div>
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
  },
  async asyncData({$axios,params}){
    const responce_data = await $axios.get(`/api/get_item?base_item_slug=${params.item_name_slug}`)
    const item = responce_data.data
    console.log(item)
    return {item}
  },
  data() {
    return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      selectedColor:0,
      selectedSize:0,
      base_url:process.env.img_url,
      selectedHeight:null,
      selectedMod:null,
      previewList:[],


    }
  },
  mounted() {
       let acc = document.getElementsByClassName("accordion");

        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
        for(let i of this.item.colors_data[this.selectedColor].images){
         this.previewList.push(this.base_url+i.image)
       }

  },
  methods:{
     selectColor(index){
       this.previewList=[]
       this.selectedColor = index
       this.selectedSize = 0
       this.selectedHeight = null
       for(let i of this.item.colors_data[this.selectedColor].images){
         this.previewList.push(this.base_url+i.image)
       }

     },
     async addToCart(){
        console.log(document.cookie)
       await this.$axios.post('/api/add_to_cart',
         {
           //session_id генерируется в header.vue
           session_id: document.cookie.replace(/(?:(?:^|.*;\s*)session_id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
           base_item_id:this.item.item_data.id,
           color_id:this.item.colors_data[this.selectedColor].color_id,
           size_id:this.item.colors_data[this.selectedColor].sizes[this.selectedSize].size_id,
           height_id:this.selectedHeight,
         })
     }
  }


}
</script>



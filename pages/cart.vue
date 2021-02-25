<template>
  <div v-if="this.$store.getters['cart/getCart'].items.length>0" class="container">
    <h1 class="section-header">Ваша корзина</h1>
    <div class="cart-wrapper">

      <div class="cart-left">
        <div v-loading="loading"  element-loading-spinner="el-icon-loading" class="cart-items">
          <div class="cart-item" v-for="(item,index) in cart.items" :key="item.id">
            <div class="cart-item__img">
              <img :src="base_url+item.item_type.image" alt="">
            </div>
            <div class="cart-item__info">
              <p class="cart-item__info__art">{{item.item_type.article}}</p>
              <p class="cart-item__info__name">{{item.item_type.name}}<br>
                <span style="font-size: 12px;opacity: .5;">
                  {{item.item_type.color.name}}
                  {{item.item_type.size.name}}
                  {{item.item_type.height.name}}
                </span>
              </p>


            </div>
            <div class="cart-item__quantity">

              <p @click="delQt(item.id)" class="cart-item__quantity--minus"><i class="el-icon-minus"></i></p>
              <p  class="cart-item__quantity--num">{{item.quantity}}</p>
              <p @click="addQt(item.id)" class="cart-item__quantity--plus"><i class="el-icon-plus"></i></p>
            </div>
            <div class="cart-item__price">{{item.price}} ₽</div>
            <div @click="deleteItem(item.id)" class="cart-item__delete">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16L16 1" stroke="#E0E0E0"/>
                <path d="M16 16L0.999999 1" stroke="#E0E0E0"/>
              </svg>

            </div>
          </div>

        </div>

        <h3 class="section-header b-bottom ">Оформление заказа</h3>

        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>1/3 данные</p></div>
          <div class="cart-grid-form">
            <el-input class="mb-10" type="text" name="phone"  placeholder="Телефон" v-model="orderData.phone"></el-input>
            <el-input class="mb-10" type="text" name="email" placeholder="Электронная почта" v-model="orderData.email"></el-input>
            <el-input type="text" name="fio" placeholder="ФИО" v-model="orderData.fio"></el-input>
          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>2/3 данные</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ доставки</p>

<!--            <label @click="orderData.delivery_type=0" class="cart-radio" for="d-0">-->
<!--              <input type="radio" name="delivery" checked id="d-0" v-model="orderData.delivery_type" value="0">-->
<!--              <p class="cart-radio__p1">Самовывоз</p>-->
<!--              <p class="cart-radio__p2">бесплатно<br>по адресу 1234</p>-->
<!--              <span class="checkmark"></span>-->
<!--            :class="{'cart-radio-disabled':cart_weight > 3000}"-->
<!--            </label>-->

            <label @click="is_self_delivery=delivery.is_self_delivery"
                   class="cart-radio" :for="`d-${delivery.id}`" v-for="(delivery,index) in delivery_types" :key="delivery.id">
              <input type="radio" name="delivery"  :id="`d-${delivery.id}`"  v-model="orderData.delivery_type" :value="delivery.id">
              <p class="cart-radio__p1">{{delivery.name}}</p>
              <p v-if="!delivery.is_self_delivery" class="cart-radio__p2">{{delivery.time}}<br>от {{delivery.price}}</p>
              <span class="checkmark"></span>
            </label>


            <div v-if="!is_self_delivery">
              <el-select class="city-select mb-10" filterable v-model="orderData.delivery_city"  placeholder="Выберите город">
                <el-option
                  v-for="city in cities"
                  :key="city.id"
                  :label="city.name"
                  :value="city.id">
                </el-option>
              </el-select>


              <el-input class="mb-10" type="text" v-model="orderData.street" placeholder="Улица"></el-input>
              <div class="cart-grid-form__group mb-10">
                <el-input type="text" v-model="orderData.house" placeholder="Дом"></el-input>
                <el-input type="text" v-model="orderData.flat" placeholder="Квартира/офис"></el-input>
              </div>
              <p class="cart-total__text text-grey">Вашего города нет в списке доставки? Выберите пункт "самовывоз",
                а в комментарии к заказу укажите информацию куда вам доставить ваш заказ.
                Наш менеджер с вами свяжется и поможет оформить доставку!</p>
            </div>

          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>3/3 оплата</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ оплаты</p>
            <label class="cart-radio" :for="`p-${payment.id}`" v-for="payment in payments" :key="payment.id">
              <input type="radio" :id="`p-${payment.id}`" v-model="orderData.pay_type" :value="payment.value">
              <p class="cart-radio__p1">{{payment.name}}</p>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="cart-grid ">
          <div class="cart-grid-step"><p>дополнительно</p></div>
          <div class="cart-grid-form">
            <textarea class="mb-15" name="comment" id="" cols="30" rows="10" placeholder="Комментарий курьеру"></textarea>
          </div>
        </div>
      </div>
      <div class="cart-right">
        <div style="position: sticky;top: 20px"  class="cart-total">
          <p class="cart-total__info">Доставка <span class="color-green"
                                                     v-loading="loading"  element-loading-spinner="el-icon-loading">{{deliveryPrice}} ₽
          </span></p>
          <p class="cart-total__info">сумма заказа <span class="color-green" v-loading="loading"  element-loading-spinner="el-icon-loading">
            {{cart.raw_price}} ₽ </span></p>
          <div v-if="cart.promo_code">
            <p v-if="cart.promo_code.summ" class="cart-total__info">Промо код <span class="color-green">-{{cart.promo_code.summ}} ₽ </span></p>
         <p v-if="cart.promo_code.discount" class="cart-total__info">Промо код <span class="color-green">-{{cart.promo_code.discount}} % </span></p>
          </div>
          <p  class="cart-total__summ">итого <span class="color-green" v-loading="loading"  element-loading-spinner="el-icon-loading">
            {{deliveryPrice + cart.total_price}} ₽</span> </p>
          <p v-if="!cart.promo_code"  class="cart-total__promo ">
            <input v-model="promoCode" placeholder="Промокод (если есть)">
            <span @click="applyPromo" class="color-green" :class="{'btnDisabled':promoSent}">АКТИВИРОВАТЬ</span>
          </p>
          <p v-else class="cart-total__promo ">Промокод активирован</p>


          <el-button :loading="loading" type="submit" class="btn" @click="createOrder">оформить заказ</el-button>
          <p class="cart-total__text mb-10">Нажимая на кнопку «оплатить заказ», я принимаю условия <a href="">публичной оферты</a> и <a
            href="">политики конфиденциальности</a></p>
           <p class="cart-total__link "><nuxt-link to="/delivery">условия доставки и оплаты</nuxt-link> </p>
        </div>

      </div>

    </div>
  </div>
  <div v-else style="height: 70vh" class="container">
    <h1 class="section-header">Ваша корзина пуста</h1>
    <el-button class="btn" @click="$router.push('/')">На главную</el-button>
  </div>
</template>

<script>

export default {
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  async asyncData({$axios}){
    const get_delivery = await $axios.get(`/api/get_delivery`)
    const delivery_types = get_delivery.data
    return {delivery_types}
  },  data() {
    return {
      loading:false,
      promoSent:false,
      base_url:process.env.img_url,
      promoCode:null,
      deliveryPrice:0,
      city_code:null,
      is_self_delivery:true,

      cities:[],
      orderData:{
        phone:null,
        email:null,
        fio:null,
        street:null,
        house:null,
        flat:null,
        delivery_type:0,
        delivery_city:null,
        pay_type:'online',
        comment:null,

      },
      payments:[
        {id:1,name:'Картой онлайн, Apple Pay, Google Pay',value:'online'},
        {id:2,name:'Курьером',value:'cash'},

      ]
    }
  },
  mounted() {
    for (let i of this.delivery_types){
      i.is_self_delivery ? this.orderData.delivery_type=i.id : null
    }
  },
  methods:{
    notify(title,message,type){
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    async cityChange () {
      console.log('change')
      //const response = await this.$axios.get(`/api/calculate_delivery`)
    },
    async createOrder () {
      let session_id = this.$auth.$storage.getCookie('session_id')
      const response = await this.$axios.post(`/api/create_order`,
        {
          session_id:session_id,
          order:this.orderData
        })
      await this.$store.dispatch('cart/fetchCart')
    },
    async applyPromo () {
      this.promoSent= true
      let session_id = this.$auth.$storage.getCookie('session_id')
      const response = await this.$axios.post(`/api/apply_promo`,
        {
          code:this.promoCode,
          session_id:session_id
        })
      console.log(response.data)
      if (response.data.status){
         this.notify('Промокод активирован','','success')
        await this.$store.dispatch('cart/fetchCart')
      }else {
         this.notify('Промокод не найден','','error')
      }
      this.promoSent= false
    },

    async calculateDelivery () {
      if(this.city_code){
          const response = await this.$axios.get(`/api/calculate_delivery?city_code=${this.city_code}&weight=${this.cart_weight}`)
          this.deliveryPrice = response.data.delivery_price
      }
     this.loading = false
    },
    async addQt (id) {
      this.loading = true
      await this.$axios.post(`/api/plus_quantity`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
      await this.calculateDelivery()

    },
    async delQt (id) {
      this.loading = true
      await this.$axios.post(`/api/minus_quantity`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
      await this.calculateDelivery()

    },
    async deleteItem (id) {
      this.loading = true
      await this.$axios.post(`/api/delete_item`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
      await this.calculateDelivery()


    },
  },
  watch:{
      'orderData.delivery_type'(val) {
        this.orderData.delivery_city = null
        this.deliveryPrice = 0
        console.log(val)
        if (val > 0) {
          console.log(this.delivery_types.find(x => x.id === this.orderData.delivery_type).cities)
          this.cities = this.delivery_types.find(x => x.id === this.orderData.delivery_type).cities
        }
      },
    async 'orderData.delivery_city'(val){
      if (val>0){
      //this.deliveryPrice = this.cities.find(x=>x.id===val).price
        this.loading = true
        this.city_code = this.cities.find(x=>x.id===val).code
        await this.calculateDelivery()

      }else{
        this.city_code=null
      }
    }
    // cart_weight(val){
    //   if (val > 3000){
    //     this.selectedDelivery = 0
    //     this.delivery_city = null
    //     this.deliveryPrice = 0
    //   }
    // }
  },
  computed:{
    cart (){
      return this.$store.getters['cart/getCart']
    },
    cart_weight(){
      return this.$store.getters['cart/getCart'].weight
    }
  }


}
</script>



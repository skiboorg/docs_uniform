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
          <div class="cart-grid-step"><p>1/4 данные</p></div>
          <div class="cart-grid-form">

            <el-input class="mb-10 " ref="phone" v-mask="'+7##########'" @input="validatePhone" type="text" name="phone"  placeholder="Телефон *" v-model="orderData.phone"></el-input>
            <el-input class="mb-10" ref="email" @input="validateEmail"  type="text" name="email" placeholder="Электронная почта *" v-model="orderData.email"></el-input>
            <el-input type="text" ref="fio" name="fio" placeholder="ФИО *" v-model="orderData.fio"></el-input>

          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>2/4 данные</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ доставки</p>
            <label @click="is_self_delivery=delivery.is_self_delivery,is_office_cdek=delivery.is_office_cdek"
                   class="cart-radio" :for="`d-${delivery.id}`"
                   v-for="(delivery,index) in delivery_types"
                   v-if="delivery.is_active"
                   :key="delivery.id">
              <input type="radio" name="delivery"
                     :id="`d-${delivery.id}`"
                     v-model="orderData.delivery_type"
                     :value="delivery.id">
              <p class="cart-radio__p1">{{delivery.name}}</p>
              <p v-if="!delivery.is_self_delivery" class="cart-radio__p2">{{delivery.time}}<br>от {{delivery.price}}</p>
              <span class="checkmark"></span>
            </label>
            <div v-if="!is_self_delivery">
              <el-select class="city-select mb-10"  :class="{'fieldError':!orderData.delivery_city}" filterable v-model="orderData.delivery_city"
                         @change="orderData.delivery_office=null" placeholder="Выберите город *">
                <el-option
                  v-for="city in cities"
                  :key="city.id"
                  :label="city.name"
                  :value="city.id">
                </el-option>
              </el-select>

              <el-select v-if="city && this.is_office_cdek" class="city-select mb-10" filterable v-model="orderData.delivery_office"  placeholder="Выберите офис *">
                <el-option
                  v-for="office in city.offices"
                  :key="office.id"
                  :label="office.address"
                  :value="office.id">
                </el-option>
              </el-select>
              <div v-if="!this.is_office_cdek">
                <el-input class="mb-10" type="text" :class="{'fieldError':!orderData.street}" v-model="orderData.street" placeholder="Улица *"></el-input>
                <div class="cart-grid-form__group mb-10">
                  <el-input type="text" :class="{'fieldError':!orderData.house}" v-model="orderData.house" placeholder="Дом *"></el-input>
                  <el-input type="text" :class="{'fieldError':!orderData.flat}" v-model="orderData.flat" placeholder="Квартира/офис *"></el-input>
                </div>
                <p class="cart-total__text text-grey">Вашего города нет в списке доставки? Выберите пункт "самовывоз",
                  а в комментарии к заказу укажите информацию куда вам доставить ваш заказ.
                  Наш менеджер с вами свяжется и поможет оформить доставку!</p>
              </div>
              <div v-else>
                <p class="cart-total__text text-grey">
                  Выберите на карте <a href="https://www.cdek.ru/ru/office">подходящий вам офис</a>,
                  а затем выберите его адрес на сайте!
                </p>
              </div>


            </div>
          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>3/4 оплата</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ оплаты</p>
            <label class="cart-radio" :for="`p-${payment.id}`" v-for="payment in payments" :key="payment.id">
              <input type="radio" :id="`p-${payment.id}`" v-model="orderData.pay_type" :value="payment.value">
              <p class="cart-radio__p1">{{payment.name}}</p>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>4/4 упаковка</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите упаковку</p>
            <label class="cart-radio" :for="`pack-${pack.id}`" v-for="pack in pack_types" :key="pack.id">
              <input type="radio" :id="`pack-${pack.id}`" v-model="orderData.pack_type" :value="pack.value">
              <p class="cart-radio__p1">{{pack.name}}</p>
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
        <div style="position: sticky;top: 100px"  class="cart-total">
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
            {{deliveryPrice + cart.total_price + pack_price}} ₽</span> </p>
          <p v-if="!cart.promo_code"  class="cart-total__promo ">
            <input v-model="promoCode" placeholder="Промокод (если есть)">
            <span @click="applyPromo" class="color-green" :class="{'btnDisabled':promoSent}">АКТИВИРОВАТЬ</span>
          </p>
          <p v-else class="cart-total__promo ">Промокод активирован</p>
          <!--:disabled="!is_data_ok"-->
          <el-checkbox v-if="!$auth.loggedIn" class="mb-10" v-model="orderData.need_register">Автоматически меня зарегистрировать</el-checkbox>
          <el-button  :loading="loading || orderSend" type="submit" class="btn" @click="createOrder">оформить заказ</el-button>
          <p class="cart-total__text mb-10">Нажимая на кнопку «оплатить заказ», я принимаю условия
            <a href="/offer.docx" target="_blank">публичной оферты</a>
            и
            <a href="/policy.docx" target="_blank">политики конфиденциальности</a>
          </p>
          <p  v-if="orderData.need_register" class="cart-total__text mb-10">Ваш пароль для личного кабинета по-умолчанию 0000 (четыре нуля). Пароль можно изменить в разделе настроек после входа в личный кабинет</p>
          <p class="cart-total__link "><nuxt-link to="/delivery">условия доставки и оплаты</nuxt-link> </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="height: 70vh" class="container">
    <h1 class="section-header">Ваша корзина пуста</h1>
    <el-button style="width: 220px" class="btn" @click="$router.push('/')">На главную</el-button>
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
  },
  head() {
    return {
      title: `Ваша корзина`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Покупайте стильную, современную одежду для врачей, удобную медицинскую униформу в интернет-магазине DOC’S :white_check_mark: Новые коллекции, быстрая доставка по России и СНГ :point_up: Заходите!`
        }
      ]
    }
  },
  data() {
    return {
      loading:false,
      promoSent:false,
      orderSend:false,
      base_url:process.env.img_url,
      promoCode:null,
      deliveryPrice:0,
      pack_price:0,
      city_code:null,
      is_self_delivery:true,
      is_email_valid:false,
      is_phone_valid:false,
      is_office_cdek:false,
      cities:[],
      orderData:{
        phone:this.$auth.loggedIn ? this.$auth.user.phone : this.$auth.$storage.getCookie('phone'),
        email:this.$auth.loggedIn ? this.$auth.user.email : this.$auth.$storage.getCookie('email'),
        fio:this.$auth.loggedIn ? this.$auth.user.fio : this.$auth.$storage.getCookie('fio'),
        street:null,
        house:null,
        flat:null,
        delivery_type:0,
        delivery_city:null,
        delivery_office:null,
        pay_type:'online',
        comment:null,
        need_register:false,
        pack_type:'not pack'

      },
      payments:[
        {id:1,name:'Картой онлайн, Apple Pay, Google Pay',value:'online'},
        // {id:2,name:'Курьером',value:'cash'},

      ],
      pack_types:[
        {id:1,name:'Нет упаковки',value:'not pack'},
        {id:2,name:'Есть упаковка (+300 руб. к заказу)',value:'pack'},


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
    validateEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(String(this.orderData.email))){
        this.is_email_valid = true
      }else{
        this.is_email_valid = false
      }
    },
    validatePhone() {
      console.log(this.orderData.phone)
      const re = /^(\+7|)?[\s\-]?[489][0-9]{2}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      if(re.test(String(this.orderData.phone))){
        console.log('gg')
        this.is_phone_valid = true
      }else{
        console.log('nn')
        this.is_phone_valid = false
      }
    },
    async cityChange () {
      console.log('change')
      //const response = await this.$axios.get(`/api/calculate_delivery`)
    },
    async createOrder () {
      this.validateEmail()
      this.validatePhone()
      this.is_phone_valid ?  this.$refs.phone.$el.classList.remove('fieldError'):this.$refs.phone.$el.classList.add('fieldError')
      this.orderData.email && this.is_email_valid ? this.$refs.email.$el.classList.remove('fieldError') :this.$refs.email.$el.classList.add('fieldError')
      this.orderData.fio ? this.$refs.fio.$el.classList.remove('fieldError'): this.$refs.fio.$el.classList.add('fieldError')

      if(!this.is_data_ok){
        this.$notify.error({
          title: 'Поля, отмеченные * обязательны для заполнения'
        });
        return
      }

      this.$auth.$storage.setCookie('phone',this.orderData.phone)
      this.$auth.$storage.setCookie('fio',this.orderData.fio)
      this.$auth.$storage.setCookie('email',this.orderData.email)


      this.orderSend = true
      let session_id = this.$auth.$storage.getCookie('session_id')
      const response = await this.$axios.post(`/api/create_order`,
        {
          session_id:session_id,
          order:this.orderData,
          delivery_price:this.deliveryPrice
        })
      if (response.data.email_error){
          this.$notify.error({
          title: 'Аккаунт с таких email уже зарегистрирован!',
            message: 'Вы можете зайти в свой профиль в меню сайта или оформить заказ без автоматической регистрации - мы поймем что это вы!'
        });
        this.orderSend = false
      }else{
        this.$fb.track('Purchase',{
          value: this.deliveryPrice + this.cart.total_price + this.pack_price,
          currency: 'RUB'
        });

        console.log(response.data)
        await this.$store.dispatch('cart/fetchCart')
        if (response.data.pay_url){
          window.location.href = response.data.pay_url
        }
      }



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
        this.notify('Промокод не найден или был использован ранее','','error')
      }
      this.promoSent= false
    },

    async calculateDelivery () {
      console.log('calc del')
      if(this.city_code && !this.is_office_cdek){
        const response = await this.$axios.get(`/api/calculate_delivery?cdek_type=not_office&city_code=${this.city_code}&weight=${this.cart_weight}`)
        this.deliveryPrice = response.data.delivery_price
      }
      if(this.city_code && this.orderData.delivery_office){
        const response = await this.$axios.get(`/api/calculate_delivery?cdek_type=office&city_code=${this.city_code}&weight=${this.cart_weight}`)
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
    'orderData.pack_type'(val) {
      if (val==='pack'){
        this.pack_price = 300
      }else{
        this.pack_price = 0
      }
    },
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
        console.log('this.city_code',this.city_code)
        await this.calculateDelivery()

      }else{
        this.city_code=null
      }
    },
    async 'orderData.delivery_office'(val){
      console.log(val)
      //if (val){
      //this.deliveryPrice = this.cities.find(x=>x.id===val).price
      this.deliveryPrice = 0
      this.loading = true
      await this.calculateDelivery()
      //}else{
      //  this.city_code=null
      //}
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
    is_data_ok(){
      let userData = this.orderData.fio && this.orderData.email && this.orderData.phone && this.is_email_valid && this.is_phone_valid
      let deliveryData = this.orderData.house && this.orderData.street && this.orderData.flat && this.orderData.delivery_city
      if (this.is_self_delivery){
        return userData
      }
      if (!this.is_office_cdek){
        return userData && deliveryData
      }else {
        return userData && this.orderData.delivery_office
      }


    },
    cart (){
      return this.$store.getters['cart/getCart']
    },
    cart_weight(){
      return this.$store.getters['cart/getCart'].weight
    },
    city () {
      return this.cities.find(x => x.id === this.orderData.delivery_city)
    }


  }


}
</script>



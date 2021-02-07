<template>
  <div class="container">
    <h1 class="section-header">Ваша корзина</h1>
    <div class="cart-wrapper">

      <div class="cart-left">
        <div class="cart-items">
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
            <el-input class="mb-10" type="text" name="phone"  placeholder="Телефон" value=""></el-input>
            <el-input class="mb-10" type="text" name="email" placeholder="Электронная почта" value=""></el-input>
            <el-input type="text" name="fio" placeholder="ФИО" value=""></el-input>
          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>2/3 данные</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ доставки</p>

            <label @click="deliveryPrice=0" class="cart-radio" for="d-0">
              <input type="radio" name="delivery" checked id="d-0" v-model="selectedDelivery" value="0">
              <p class="cart-radio__p1">Самовывоз</p>
              <p class="cart-radio__p2">бесплатно<br>по адресу 1234</p>
              <span class="checkmark"></span>
            </label>

            <label :class="{'cart-radio-disabled':cart_weight > 3000}" class="cart-radio" :for="`d-${delivery.id}`" v-for="delivery in delivery_types" :key="delivery.id">
              <input type="radio" name="delivery"  :id="`d-${delivery.id}`" v-model="selectedDelivery" :value="delivery.id">
              <p class="cart-radio__p1">{{delivery.name}}</p>
              <p class="cart-radio__p2">{{delivery.time}}<br>от {{delivery.price}}</p>
              <span class="checkmark"></span>
            </label>


            <div v-if="selectedDelivery>0">
              <el-select class="city-select mb-10" filterable v-model="selectedCity" placeholder="Выберите город">
                <el-option
                  v-for="city in cities"
                  :key="city.id"
                  :label="city.name"
                  :value="city.id">
                </el-option>
              </el-select>



              <el-input class="mb-10" type="text" name="street" placeholder="Улица"></el-input>
              <div class="cart-grid-form__group">
                <el-input type="text" name="num" placeholder="Дом"></el-input>
                <el-input type="text" name="num1" placeholder="Квартира/офис"></el-input>
              </div>
            </div>

          </div>
        </div>
        <div class="cart-grid b-bottom">
          <div class="cart-grid-step"><p>3/3 оплата</p></div>
          <div class="cart-grid-form">
            <p class="mb-15">Выберите способ оплаты</p>
            <label class="cart-radio" for="d-11">
              <input type="radio" name="pay" id="d-11" value="Картой">
              <p class="cart-radio__p1">Картой онлайн, Apple Pay, Google Pay</p>

              <span class="checkmark"></span>
            </label>
            <label class="cart-radio" for="d-21">
              <input type="radio" name="pay" id="d-21" value="Курьером">
              <p class="cart-radio__p1">Курьером</p>

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

          <p class="cart-total__info">Доставка <span class="color-green">{{deliveryPrice}} ₽ </span></p>
          <p class="cart-total__info">сумма заказа <span class="color-green">{{cart.raw_price}} ₽ </span></p>
          <div v-if="cart.promo_code">
            <p v-if="cart.promo_code.summ" class="cart-total__info">Промо код <span class="color-green">-{{cart.promo_code.summ}} ₽ </span></p>
         <p v-if="cart.promo_code.discount" class="cart-total__info">Промо код <span class="color-green">-{{cart.promo_code.discount}} % </span></p>
          </div>

          <p  class="cart-total__summ">итого <span class="color-green">{{deliveryPrice + cart.total_price}} ₽</span> </p>




          <p v-if="!cart.promo_code"  class="cart-total__promo ">
            <input v-model="promoCode" placeholder="Промокод (если есть)">
            <span @click="applyPromo" class="color-green">АКТИВИРОВАТЬ</span>
          </p>
          <p v-else class="cart-total__promo ">Промокод активирован</p>


          <button type="submit" class="btn">оформить заказ</button>
          <p class="cart-total__text">Нажимая на кнопку «оплатить заказ», я принимаю условия <a href="">публичной оферты</a> и <a
            href="">политики конфиденциальности</a></p>
        </div>
        <p class="cart-total__link hide-mob-600"><nuxt-link to="/delivery">условия доставки и оплаты</nuxt-link> </p>
      </div>

    </div>
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
      base_url:process.env.img_url,
      selectedDelivery:0,
      selectedCity:null,
      promoCode:null,
      deliveryPrice:0,
      cities:[]
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
    async applyPromo () {
      let session_id = this.$auth.$storage.getCookie('session_id')
      const response = await this.$axios.post(`/api/apply_promo`,
        {
          code:this.promoCode,
          session_id:session_id
        })
      console.log(response.data)
      if (response.data.status){
         this.notify('Успешно','Промокод активирован','success')
        await this.$store.dispatch('cart/fetchCart')
      }else {
         this.notify('Ошибка','Промокод не найден','error')
      }
    },
    async addQt (id) {
      await this.$axios.post(`/api/plus_quantity`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
    },
    async delQt (id) {
      await this.$axios.post(`/api/minus_quantity`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
    },
    async deleteItem (id) {
      await this.$axios.post(`/api/delete_item`,{item_id:id})
      await this.$store.dispatch('cart/fetchCart')
    },
  },
  watch:{
    selectedDelivery(val){
      this.selectedCity = null
      this.deliveryPrice = 0
      if (val>0){
        console.log(this.delivery_types.find(x=>x.id===this.selectedDelivery).cities)
        this.cities = this.delivery_types.find(x=>x.id===this.selectedDelivery).cities
      }
    },
    selectedCity(val){
      if (val>0){
      this.deliveryPrice = this.cities.find(x=>x.id===val).price
      }
    },
    cart_weight(val){
      if (val > 3000){
        this.selectedDelivery = 0
        this.selectedCity = null
        this.deliveryPrice = 0
      }
    }
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



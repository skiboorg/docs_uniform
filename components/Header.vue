<template>
  <div class="">
    <div :class="{'header-w-line' : is_index_page}" >
      <header class="header">
        <div v-if="is_index_page" class="header-line">
          <p class="text-center">Подпишись и получи скидку 15%</p>
        </div>
        <div class="header-wrapper">
          <div class="header-nav">
            <div class="header-nav__button hide-mob-600 with-submenu"
                 v-if="category.is_at_menu"
                 v-for="category in this.$store.getters['categories/getCategories']" :key="category.id">
              <nuxt-link class="header-nav__link link-button" :to="`/category/${category.name_slug}`">{{category.name}}</nuxt-link>
              <div class="header-nav__button-submenu">
                <nuxt-link class="header-nav__button-submenu__item" :to="`/category/${category.name_slug}/${subcategory.name_slug}`"
                           v-for="subcategory in category.subcategories" :key="subcategory.id">{{subcategory.name}}</nuxt-link>
              </div>
            </div>

            <div class="header-nav__button mobile-menu show-mob-600">
              <svg @click="mobileMenuActive=!mobileMenuActive" v-if="!mobileMenuActive" width="35" height="7" viewBox="0 0 35 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H35" stroke="#519999"/>
                <path d="M0 1H35" stroke="#519999"/>
              </svg>
              <svg @click="mobileMenuActive=!mobileMenuActive" v-else width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 36L36 1" stroke="#519999"/>
                <path d="M1 1L36 36" stroke="#519999"/>
              </svg>
            </div>
          </div>
          <div class="header-middle">
            <div @click="$router.push('/')" class="header-middle__logo">
              <img src="/logo.svg" alt="" >
            </div>
            <div class="header-middle__links hide-mob-600">
              <div class="header-middle__link">
                <nuxt-link to="/">Блог</nuxt-link>
              </div>
              <div class="header-middle__link">
                <nuxt-link to="/category/sertifikatyi/sertifikatyi">Сертификаты</nuxt-link>
              </div>

              <div class="header-middle__link">
                <nuxt-link to="/contact">Контакты</nuxt-link>
              </div>
              <div class="header-middle__link">
                <el-select v-model="curLang" placeholder="RU" class="langSelect">
                  <el-option :label="'RU'" :value="'RU'">  </el-option>
                  <el-option :label="'EN'" :value="'EN'">  </el-option>
                </el-select>
              </div>


            </div>

          </div>
          <div class="header-icons">
            <a class="hide-mob-600" href="#" @click.prevent="$auth.loggedIn ? $router.push('/lk') : authModal=true">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3389 16.1611C19.9774 14.7997 18.3569 13.7918 16.5888 13.1817C18.4825 11.8775 19.7266 9.69473 19.7266 7.22656C19.7266 3.24185 16.4847 0 12.5 0C8.51528 0 5.27344 3.24185 5.27344 7.22656C5.27344 9.69473 6.51753 11.8775 8.41123 13.1817C6.64316 13.7918 5.02266 14.7997 3.66118 16.1611C1.30024 18.5221 0 21.6611 0 25H1.95312C1.95312 19.1844 6.68442 14.4531 12.5 14.4531C18.3156 14.4531 23.0469 19.1844 23.0469 25H25C25 21.6611 23.6998 18.5221 21.3389 16.1611ZM12.5 12.5C9.59224 12.5 7.22656 10.1344 7.22656 7.22656C7.22656 4.31875 9.59224 1.95312 12.5 1.95312C15.4078 1.95312 17.7734 4.31875 17.7734 7.22656C17.7734 10.1344 15.4078 12.5 12.5 12.5Z" fill="#519999"/>
              </svg>
            </a>

            <div  class="header-icons__cart" @mouseover="headerCartShow=true" @click="headerCartShow=!headerCartShow">
              <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3828 6.39648V1.54858L13.8342 0H7.16576L5.61719 1.54858V6.39648H0.0507812V22.0703C0.0507812 23.6858 1.36494 25 2.98047 25H18.0195C19.6351 25 20.9492 23.6858 20.9492 22.0703V6.39648H15.3828ZM18.9961 22.0703C18.9961 22.6088 18.558 23.0469 18.0195 23.0469H2.98047C2.44202 23.0469 2.00391 22.6088 2.00391 22.0703V8.34961H5.61719V11.8652H7.57031V2.35767L7.97486 1.95312H13.0251L13.4297 2.35767V6.39648H9.57227V8.34961H13.4297V11.8652H15.3828V8.34961H18.9961V22.0703Z" fill="#519999"/>
              </svg>
              <p v-if="cart.items.length > 0" class="header-icons__cart--number">{{cart.items.length}}</p>

            </div>

          </div>

          <div @mouseleave="headerCartShow=false" class="header-cart" :class="{'headerCartActive':headerCartShow}">
            <div @click="headerCartShow=false" class="header-cart__close"><span>&#10005;</span></div>
            <div class="header-cart__item" v-for="(item,index) in cart.items" :key="item.id">
              <img :src="base_url+item.item_type.image" alt="">
              <p><span class="color-green">{{index+1}}.</span>{{item.item_type.name}}<br>
                <span style="font-size: 12px;opacity: .5;">
              {{item.item_type.color.name}}
              {{item.item_type.size.name}}
              {{item.item_type.height.name}}
              x {{item.quantity}}шт</span>
              </p>
            </div>

            <a v-if="cart.items.length > 0" class="btn" href="#" @click.prevent="$router.push('/cart')">В корзину</a>
            <p style="border: 1px solid #e0e0e0;text-align: center;padding: 20px;color: #519999;font-weight: 600;text-transform: uppercase;" v-else>Корзина пуста</p>
          </div>
        </div>

        <div :class="{'mobileMenuActive':mobileMenuActive}" class="header-mobile-menu">
          <div class="header-mobile-menu__wrapper">
            <div class="header-mobile-menu__item" :class="{'mobileSubmenuActive':curMobileMenuIndex===index}"
                 v-for="(category,index) in this.$store.getters['categories/getCategories']" :key="category.id">
              <p><a href="#" @click.prevent="curMobileMenuIndex=index" class="header-mobile-menu__item--link" :to="category.name_slug">{{category.name}}</a></p>
              <div class="header-mobile-menu__item mobile-submenu">
                <nuxt-link :to="`/category/${category.name_slug}/${subcategory.name_slug}`" v-for="subcategory in category.subcategories"
                           :key="subcategory.id">{{subcategory.name}}</nuxt-link>
              </div>


            </div>

            <div class="header-mobile-menu__item mobile-links">

              <nuxt-link class="mobile-links__link" to="/">Блог</nuxt-link>
              <nuxt-link class="mobile-links__link" to="/category/sertifikatyi/sertifikatyi">Сертификаты</nuxt-link>
              <nuxt-link class="mobile-links__link" to="/delivery">Доставка и оплата</nuxt-link>
              <nuxt-link class="mobile-links__link" to="/about">О нас</nuxt-link>
              <nuxt-link class="mobile-links__link" to="/contact">Контакты</nuxt-link>

              <a class="mobile-links__phone" href="tel:+7 (495) 205-93-94">+7 (495) 205-93-94</a>
              <div class="mobile-links__social">
                <a href="https://www.instagram.com/docsuniform/" target="_blank" style="display: inline-block; margin-right: 10px">
                  <img src="/inst_icon.png" alt="" >
                </a>
                <a href="viber://chat?number=74952059394" target="_blank" style="display: inline-block; margin-right: 10px">
                  <img src="/viber_icon.png" alt="" >
                </a>
                <a href="https://wa.me/74952059394" target="_blank">
                  <img src="/whatsapp_icon.png" alt="" >
                </a>
              </div>

            </div>

          </div>

        </div>
      </header>
    </div>
    <el-dialog class="authModal"  :visible.sync="authModal" @closed="authModalClosed">
      <div class="login-form">
        <h1 class="login-form__title">{{authModalTitle}}</h1>
        <el-form v-if="authMode==='login'" :model="loginData" status-icon :rules="loginRules" ref="loginForm">
          <el-form-item prop="email">
            <el-input  prefix-icon="el-icon-message" v-model="loginData.email"  placeholder="Введите почту"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="mb-40">
            <el-input   prefix-icon="el-icon-key" show-password v-model="loginData.password"  placeholder="Пароль"></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="submitLoginForm">Войти</el-button>
          <p style="margin-top: 20px;color: red;text-align: center"></p>
          <p style="text-align: center; opacity: .5">Нет аккаунта? <a style="text-decoration: underline" href="#" @click.prevent="authMode='register'">Регистрация</a></p>
          <p style="text-align: center; opacity: .5">Забыли пароль? <a style="text-decoration: underline" href="№" @click.prevent="authMode='recover'">Восстановить</a></p>
        </el-form>
         <el-form v-if="authMode==='register'" :model="registerData" status-icon :rules="registerRules" ref="registerForm">
          <el-form-item prop="email">
            <el-input  prefix-icon="el-icon-message" v-model="registerData.email"  placeholder="Введите почту"></el-input>
          </el-form-item>
           <el-form-item prop="phone">
            <el-input  prefix-icon="el-icon-phone" v-model="registerData.phone"  placeholder="Введите телефон"></el-input>
          </el-form-item>
           <el-form-item prop="fio">
            <el-input  prefix-icon="el-icon-user" v-model="registerData.fio"  placeholder="Введите ФИО"></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input   prefix-icon="el-icon-key" show-password v-model="registerData.password1"  placeholder="Пароль"></el-input>
          </el-form-item>
           <el-form-item prop="password2" class="mb-40">
            <el-input   prefix-icon="el-icon-key" show-password v-model="registerData.password2"  placeholder="Повторите пароль"></el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="submitRegisterForm">Регистрация</el-button>
          <p style="margin-top: 20px;color: red;text-align: center"></p>
          <p style="text-align: center; opacity: .5">Есть аккаунт? <a style="text-decoration: underline" href="#" @click.prevent="authMode='login'">Вход</a></p>
          <p style="text-align: center; opacity: .5">Забыли пароль? <a style="text-decoration: underline" href="№" @click.prevent="authMode='recover'">Восстановить</a></p>
        </el-form>
        <el-form v-if="authMode==='recover'" :model="recoverData" status-icon :rules="recoverRules" ref="recoverForm">
          <el-form-item prop="email">
            <el-input  prefix-icon="el-icon-message" v-model="recoverData.email"  placeholder="Введите почту"></el-input>
          </el-form-item>

          <el-button type="primary" class="btn" @click="submitRecoverForm">Сбросить пароль</el-button>
          <p style="margin-top: 20px;color: red;text-align: center"></p>
          <p style="text-align: center; opacity: .5">Нет аккаунта? <a style="text-decoration: underline" href="#" @click.prevent="authMode='register'">Регистрация</a></p>
          <p style="text-align: center; opacity: .5">Есть аккаунт? <a style="text-decoration: underline" href="#" @click.prevent="authMode='login'">Вход</a></p>
        </el-form>
      </div>

    </el-dialog>
  </div>


</template>
<script>
export default {

  data() {
     var validatePass = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('Повторите пароль'));
        } else if (value !== this.registerData.password1) {
          callback(new Error('Пароли не совпадают'));
        } else {
          callback();
        }
    };
    return {
      loginData:{
        email:null,
        password:null,
      },
      recoverData:{
        email:null,
      },
      registerData:{
        email:null,
        phone:'',
        fio:null,
        password1:null,
        password2:null,
      },
      authModal:false,
      authMode:'login',
      mobileMenuActive:false,
      curLang:'RU',
      curMobileMenuIndex:null,
      headerCartShow:false,
      is_index_page:null,
      base_url:process.env.img_url,
      recoverRules:{
        email:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          { type: 'email', message: 'Введите корректный E-Mail адрес', trigger: ['blur', 'change'] }
        ],
      },
      loginRules: {
        email:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          { type: 'email', message: 'Введите корректный E-Mail адрес', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
        ],
      },
       registerRules: {
        password1: [
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          { min: 8, max: 20, message: 'Не менее 8 символов', trigger: ['blur', 'change'] }
        ],
        email:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          { type: 'email', message: 'Введите корректный E-Mail адрес', trigger: ['blur', 'change'] }
        ],
         fio:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          {  message: 'Введите ФИО', trigger: ['blur', 'change'] }
        ],
         phone:[
          { required: true, message: 'Это обязательное поле', trigger: ['blur', 'change'] },
          {  message: 'Введите телефон', trigger: ['blur', 'change'] }
        ],
        password2: [
          { validator: validatePass, trigger: ['blur', 'change']  }
        ]

      },
    }
  },
  watch: {
    '$route.path': function(val) {
      val === '/' ? this.is_index_page = true : this.is_index_page = false
      this.mobileMenuActive=false

    }
  },
  async mounted() {

    this.$route.path === '/' ? this.is_index_page = true : this.is_index_page = false
    if (!this.$auth.$storage.getCookie('session_id')){
      this.$auth.$storage.setCookie('session_id', this.uuidv4())
      console.log('create session_id')
    }else {
      console.log('session_id exists')
    }



  },
  methods: {
    authModalClosed(){
      this.authMode = 'login'
    },
    notify(title,message,type){
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    async userLogin() {

      try {
        let response = await this.$auth.loginWith('local', { data: this.loginData })
        await this.$store.dispatch('cart/fetchCart')
        this.authModal=false
      } catch (error) {
        this.notify('Ошибка','Проверьте введеные данные','error')
      }
    },

    async userRegister(){
      try{
        let response =  this.$axios.post('/auth/users/', {
          email:this.registerData.email,
          password:this.registerData.password2,
          fio:this.registerData.fio,
          phone:this.registerData.phone,
        })
        console.log(await response)
        this.notify('Успешно','Аккаунт создан','success')
        this.authModal='loginTab'
      }catch (e) {
        this.notify('Ошибка','Проверьте введеные данные','error')
      }
    },
    submitRecoverForm() {

      this.$refs.recoverForm.validate((valid) => {
        if (valid) {
           console.log('recover')
        } else {

          return false;
        }
      });
    },
    submitLoginForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.userLogin()
        } else {

          return false;
        }
      });
    },
    submitRegisterForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.userRegister()
        } else {

          return false;
        }
      });
    },


  },
  computed:{

    cart (){
      return this.$store.getters['cart/getCart']
    },
    authModalTitle () {
      if (this.authMode === 'login'){
        return 'Вход'
      }
      if (this.authMode === 'register'){
        return 'Регистрация'
      }
      if (this.authMode === 'recover'){
        return 'Восстановление пароля'
      }
    }

  }

}
</script>



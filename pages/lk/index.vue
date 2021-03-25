<template>

  <div  class="lk-tab">
    <h1 class="lk-tab__title b-bottom">Мой профиль</h1>
    <div class="lk-tab-grid b-bottom">
      <div class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Личные данные</p>
        <el-input class="mb-10" v-mask="'+7(###)###-##-##'" type="text" placeholder="Телефон" v-model="userData.phone"></el-input>
        <el-input  type="text" placeholder="ФИО"  v-model="userData.fio"></el-input>
      </div>
      <div style="display: none" class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Способ оплаты</p>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>
          </div>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="12" rx="2" />
            <circle cx="7" cy="6" r="3" fill="#24363A"/>
            <circle cx="11" cy="6" r="3" fill="#519999"/>
          </svg>
          <p>Карта **0000</p>
        </div>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>

          </div>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="12" rx="2" />
            <circle cx="7" cy="6" r="3" fill="#24363A"/>
            <circle cx="11" cy="6" r="3" fill="#519999"/>
          </svg>
          <p>Карта **0000</p>
        </div>
        <a href="" class="link">+ ДОБАВИТЬ</a>
      </div>
      <div style="display: none" class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Адрес доставки</p>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg style="margin-right: 0" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>

          </div>

          <p>г. Уфа, ул. Проезд Лесной 8, кв 266</p>
        </div>
        <a href="" class="link">+ ДОБАВИТЬ</a>

      </div>
    </div>
    <div class="lk-tab-grid b-bottom">
      <div style="display: none" class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Размеры и рост</p>
        <div class="lk-tab-grid__item--group">
          <div class="">
            <p class="item-info__subtitle">размер</p>
            <el-select v-model="userData.size" placeholder="">
              <el-option
                v-for="item in sizes"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class=""> <p class="item-info__subtitle">рост</p>
            <el-select v-model="userData.height" placeholder="">
              <el-option
                v-for="item in heights"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Дата рождения</p>
        <el-date-picker
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="userData.birthday"
          type="date"
          placeholder="Выберите дату">
        </el-date-picker>
      </div>
    </div>
    <div class="lk-tab-grid ">
      <div class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Настройки</p>
        <el-input class="mb-10" type="text" placeholder="Старый пароль"  v-model="userData.old_pass"></el-input>
        <el-input class="mb-10" type="text" placeholder="Новый пароль"  v-model="userData.pass"></el-input>
        <el-checkbox v-model="mail_ok">Подписаться на рассылку</el-checkbox>

      </div>
      <div style="display: none" class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Способ оплаты</p>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>
          </div>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="12" rx="2" />
            <circle cx="7" cy="6" r="3" fill="#24363A"/>
            <circle cx="11" cy="6" r="3" fill="#519999"/>
          </svg>
          <p>Карта **0000</p>
        </div>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>

          </div>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="12" rx="2" />
            <circle cx="7" cy="6" r="3" fill="#24363A"/>
            <circle cx="11" cy="6" r="3" fill="#519999"/>
          </svg>
          <p>Карта **0000</p>
        </div>
        <a href="" class="link">+ ДОБАВИТЬ</a>
      </div>
      <div style="display: none" class="lk-tab-grid__item">
        <p  class="lk-tab-grid__item--title">Адрес доставки</p>
        <div class="lk-tab__removeItem">
          <div class="lk-tab__removeItem--btn">
            <svg style="margin-right: 0" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14L14 1" stroke="#E0E0E0"/>
              <path d="M14 14L1 1" stroke="#E0E0E0"/>
            </svg>

          </div>

          <p>г. Уфа, ул. Проезд Лесной 8, кв 266</p>
        </div>
        <a href="" class="link">+ ДОБАВИТЬ</a>

      </div>
    </div>
    <button style="width: 300px" type="submit" @click="updateUser" class="btn">сохранить все изменения</button>

  </div><!--TabProfile-->

</template>

<script>

export default {
  layout: 'lk',
  scrollToTop: false,
  auth: true,
  async fetch({store}){
    await store.dispatch('categories/fetchCategories')
    await store.dispatch('cart/fetchCart')
  },
  data() {
    return {
      userData:{
        old_pass:null,
        pass:null,
        mail_ok:null,
        phone:this.$auth.user.phone,
        fio:this.$auth.user.fio,
        height:this.$auth.user.height,
        size:this.$auth.user.size,
        birthday:this.$auth.user.birthday,
      },
      sizes: [
        {value: '46'},
        {value: '47'},
        {value: '48'},

      ],
      heights: [
        {value: '150'},
        {value: '151'},
        {value: '152'},

      ],

    }
  },
  methods:{
    async updateUser(){

      let formData = new FormData()
      formData.set('userData', JSON.stringify(this.userData))

      await this.$axios({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/user/update',
        data: formData
      }).then((response) => {
        this.roleChange = false
        this.$notify({
          title: 'Успешно',
          message: 'Ваши данные обновлены',
          type: 'success'
        });
        this.$auth.fetchUser()
        this.editProfileModal = false


      })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  }



}
</script>



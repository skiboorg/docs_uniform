<template>

  <div  class="lk-tab">
                <h1 class="lk-tab__title b-bottom">Мой профиль</h1>

                <div class="lk-tab-grid b-bottom">
                    <div class="lk-tab-grid__item">
                        <p  class="lk-tab-grid__item--title"> Как вас зовут?</p>
                      <el-input class="mb-10" type="text" placeholder="Телефон" name="phone" value=""></el-input>
                            <el-input  type="text" placeholder="ФИО" name="fio" value=""></el-input>
                    </div>
                    <div class="lk-tab-grid__item">
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
                    <div class="lk-tab-grid__item">
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
                <div class="lk-tab-grid ">
                    <div class="lk-tab-grid__item">
                        <p  class="lk-tab-grid__item--title">Размеры и рост</p>
                        <div class="lk-tab-grid__item--group">
                            <div class="">
                                <p class="item-info__subtitle">размер</p>

                            </div>
                            <div class=""> <p class="item-info__subtitle">рост</p>

                            </div>


                        </div>


                    </div>
                    <div class="lk-tab-grid__item">
                        <p  class="lk-tab-grid__item--title">Дата рождения</p>
                        <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Выберите дату">
    </el-date-picker>

                    </div>

                </div>
                <button style="width: 300px" type="submit" class="btn">сохранить все изменения</button>

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

    }
  },



}
</script>



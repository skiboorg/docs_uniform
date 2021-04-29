<template>
  <div  class="container">
    <div style="height: 50vh; display: flex; flex-direction:column; align-items: center;justify-content: center">
      <p style="font-size: 60px;margin-bottom: 40px">Страница не найдена</p>
      <el-button style="padding: 10px 20px" class="btn" @click="$router.push('/')">На главную</el-button>
    </div>

  </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'error_layout' // you can set a custom layout for the error page
  }
</script>

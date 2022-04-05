<template>
  <div class="home">
    <HelloWorld msg="Welcome to Land Aquisition Blockchain"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.home{
  background: url('../../public/hero_1.jpg') center fixed no-repeat;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

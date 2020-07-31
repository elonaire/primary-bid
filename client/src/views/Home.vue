<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" />
    <HelloWorld msg="Welcome to Your Url shortening App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
img {
  width: 30%;
  height: auto;
}
</style>

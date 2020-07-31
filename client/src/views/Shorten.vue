<template>
  <div class="shorten">
    <ShortenURL msg="Type or paste your URL in the input field and submit" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShortenURL from '@/components/ShortenURL.vue';

export default {
  name: 'Shorten',
  components: {
    ShortenURL
  },
};
</script>

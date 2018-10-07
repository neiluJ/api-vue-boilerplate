<template>
  <div id="app">
    <router-view/>
    <error-modal v-if="!isProd"></error-modal>
  </div>
</template>

<script>
import ErrorModal from './components/Utils/ErrorModal';

export default {
  name: 'App',
  components: {
      ErrorModal
  },
  data: function() {
    return {}
  },
  computed: {
    isProd() {
      return process.env.NODE_ENV === 'production'
    }
  }
}
</script>

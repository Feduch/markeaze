<template>
  <div>
    <div class="header">
      <span>{{user.name}}</span>
      <span><a @click="logout()">Logout</a></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Header",
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      });
    }
  }
}
</script>

<style scoped>
.header {
  text-align: right;
  padding-right: 10px;
}

.header span {
  padding-left: 10px;
  font-size: 20px;
}

.header span a {
  cursor: pointer;
}
</style>

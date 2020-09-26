<template>
  <div>
    <Header />
    <table>
      <tr>
        <td colspan="2"><h1>Profile</h1></td>
      </tr>
      <tr>
        <td>Name: {{user.name}}</td>
        <td></td>
      </tr>
      <tr>
        <td>Login: {{user.login}}</td>
        <td></td>
      </tr>
      <tr>
        <td>E-mail: {{user.email}}</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2"><router-link to="/profile/edit">Edit profile</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'

export default {
  name: "Profile",
  components: {
    Header
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  }
}
</script>

<style scoped>
table {
  width: 300px;
  margin: 0 auto;
}
</style>

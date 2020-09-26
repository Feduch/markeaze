<template>
  <div>
    <Header />
    <form @submit.prevent="updateCurrentUser">
      <table>
        <tr>
          <td colspan="2"><h1>Profile</h1></td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>
            <input type="text" v-model="profile.name" @change="$v.profile.name.$touch()" />
            <div class="error" v-if="$v.profile.name.$error">
              The name field is required
            </div>
          </td>
        </tr>
        <tr>
          <td>E-mail:</td>
          <td>
            <input type="text" v-model="profile.email" @change="$v.profile.email.$touch()" />
            <div class="error" v-if="$v.profile.email.$error">
              Enter valid email
            </div>
          </td>
        </tr>
        <tr>
          <td><router-link to="/profile">Show profile</router-link></td>
          <td align="right"><input type="submit" value="save"></td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
// Обновление данных происходит после сохранения их на бэке,
// в ответе приходят новые значения name и email
// В данном случае на стороне пользователя отображаются актуальные данные.

import Header from "@/components/Header";
import {required, email} from "vuelidate/lib/validators";

export default {
  name: "Profile",
  components: {
    Header
  },
  data () {
    return {
      // Так как в мутации передаюся только name и email,
      // то таким образом получает их значения из хранилища
      profile: {
        name: this.$store.getters.user.name,
        email: this.$store.getters.user.email
      }
    }
  },
  validations: {
    profile: {
      name: {
        required,
      },
      email: {
        required,
        email
      },
    }
  },
  methods: {
    updateCurrentUser: function () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.$store.dispatch('updateCurrentUser', this.profile)
      }
    }
  }
}
</script>

<style scoped>
form {
  width: 300px;
  margin: 0 auto;
}

.error {
  color: red;
  font-size: 12px;
}
</style>

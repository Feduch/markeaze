<template>
  <div>
    <form @submit.prevent="singInUser">
      <table>
        <tr>
          <td colspan="2"><h1>Sing In</h1></td>
        </tr>
        <tr>
          <td>Login:</td>
          <td>
            <input type="text" v-model="auth.login" @change="$v.auth.login.$touch()" />
            <div class="error" v-if="$v.auth.login.$error">
              The login field is required
            </div>
          </td>
        </tr>
        <tr>
          <td>Password:</td>
          <td>
            <input type="password" v-model="auth.password" @change="$v.auth.password.$touch()" />
            <div class="error" v-if="$v.auth.password.$error">
              The password field is required
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td><input type="submit" value="SingIn"></td>
        </tr>
        <tr v-if="singInError">
          <td colspan="2" class="error">Wrong login or password</td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Маленький размер пакета и задачи решает
import { required } from 'vuelidate/lib/validators'

export default {
  name: "SingInPage",
  computed: {
    ...mapGetters([
      'authStatus',
    ])
  },
  data () {
    return {
      auth: {
        login: '',
        password: ''
      },
      singInError: false
    }
  },
  validations: {
    auth: {
      login: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    singInUser: function () {
      this.singInError = false

      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.$store.dispatch('singIn', this.auth)
            .then(() => {
              this.$router.push('/profile')
            })
            .catch(() => {
              this.singInError = true
            })
      }
    }
  },
  created() {
    // Тут сделал пернаправление на страницу профайла,
    // другой вариант, эту задачу можно повесить на навигационный хук beforeEach в route
    if (this.authStatus) {
      this.$router.push('/profile')
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

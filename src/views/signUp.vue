<template>
  <div class="sign-up">
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col md="10">
          <v-card shaped min-height="400" ref="signUp">
            <v-card-title primary-title>
              <h3 class="headline red--text sign-up-title">Sign Up</h3>
              <v-alert
                dense
                @input="closeAlert()"
                text
                border="right"
                dismissible
                transition="slide-x-transition"
                type="error"
                v-if="error.length"
              >{{ error }}</v-alert>
            </v-card-title>
            <v-card-text>
              <v-form ref="signup">
                <v-text-field
                  :rules="rules.name"
                  prepend-inner-icon="mdi-account-circle-outline"
                  dense
                  outlined
                  rounded
                  v-model="user.name"
                  label="Name"
                  type="text"
                ></v-text-field>

                <v-text-field
                  :rules="rules.email"
                  prepend-inner-icon="mdi-email-outline"
                  dense
                  outlined
                  rounded
                  v-model="user.email"
                  label="E-mail"
                  type="email"
                ></v-text-field>

                <v-text-field
                  :rules="rules.password"
                  clearable
                  prepend-inner-icon="mdi-account-key-outline"
                  dense
                  outlined
                  rounded
                  v-model="user.password"
                  label="Password"
                  type="password"
                ></v-text-field>

                <v-btn @click="register()" small rounded block color="#9b32a8" dark>
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      },
      rules: {
        name: [
          v => !!v || "Name is required",
          v => (v && v.length >= 5) || "Name must be 	greater than 5 characters"
        ],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v || "Password is required",
          v =>
            (v && v.length > 6) || "Password must be 	greater than 6 characters"
        ],
        confirmPassword: [
          v => !!v || "Confirm password is required",
          v =>
            (v && v.length > 6) ||
            "Confirm password must be 	greater than 6 characters"
        ]
      }
    };
  },
  mounted() {
    this.closeAlert();
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    closeAlert() {
      this.$store.commit("setError", "");
    },
    register() {
      let signUp = this.$refs.signup.validate();
      if (signUp)
        this.$store.dispatch("add", { type: "user", user: this.user });
    }
  }
};
</script>

<style scoped lang="scss">
.sign-up ::v-deep {
  .v-card {
    background: url("../assets/img/auth-back.jpg") !important;
    background-repeat: no-repeat;
    background-size: 100% 100% !important;
  }
  .v-card__text,
  .v-card__title,
  .v-card__actions {
    width: 400px !important;
    margin-left: auto !important;
  }
  .sign-up-title {
    margin: auto;
  }
}
</style>
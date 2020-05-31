<template>
  <div class="sign-up">
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col md="10">
          <v-card shaped min-height="440" ref="signUp">
            <v-card-title primary-title>
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
              <v-avatar width="140" height="120">
                <img src="@/assets/img/avatar.jpg" alt="signup" />
              </v-avatar>
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

                <v-btn @click="register()" small rounded width="200" color="#991ada" dark class="btn-sign-up">
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
import { mapState } from "vuex";
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
    ...mapState(["error"])
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
  @media (min-width: 520px) {
    .v-card {
      box-shadow: none !important;
      background: url("../assets/img/auth-back.jpg");
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
    .v-avatar {
      margin: auto;
    }
  }
  @media (max-width: 520px) {
    .v-card {
      box-shadow: none !important;
      background: none !important;
      width: 100%;
    }
    .v-card__text,
    .v-card__title,
    .v-card__actions {
      display: block;
      text-align: center;
    }
    .btn-sign-up{
      width: 100% !important;
    }
  }
}
</style>
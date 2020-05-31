<template>
  <div class="sign-in">
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col md="10" sm="12">
          <v-card shaped min-height="440">
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
              <v-form ref="signin">
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
                  prepend-inner-icon="mdi-account-key-outline"
                  dense
                  outlined
                  rounded
                  v-model="user.password"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-btn @click="login()" small rounded width="200" color="#991ada" dark class="btn-sign-in">
                  <v-icon>mdi-key-outline</v-icon>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      rules: {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v || "Password is required",
          v =>
            (v && v.length > 6) || "Password must be 	greater than 6 characters"
        ]
      }
    };
  },
  mounted() {
    this.closeAlert();
  },
  computed: {
    ...mapGetters({ error: "getError" })
  },
  methods: {
    closeAlert() {
      this.$store.commit("setError", "");
    },
    login() {
      let signIn = this.$refs.signin.validate();
      if (signIn) this.$store.dispatch("login", this.user);
    }
  }
};
</script>

<style scoped lang="scss">
.sign-in ::v-deep {
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
    .sign-in-title {
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
      width: 100% !important;
    }
    .v-card__text,
    .v-card__title,
    .v-card__actions {
      text-align: center;
      display: block;
    }
    .btn-sign-in{
      width: 100% !important;
    }
  }
}
</style>
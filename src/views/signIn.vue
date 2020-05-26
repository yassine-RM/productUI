<template>
  <div class="sign-in">
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col md="10">
          <v-card shaped min-height="400">
            <v-card-title primary-title>
              <h3 class="headline red--text sign-in-title">Sign In</h3>
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
                <v-btn @click="login()" small rounded block color="#991ada" dark>
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
  methods: {
    login() {
      let signIn=this.$refs.signin.validate()
      if(signIn)
      this.$store.dispatch("login", this.user);
    }
  }
};
</script>

<style scoped lang="scss">
.sign-in ::v-deep {
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
  .sign-in-title {
    margin: auto;
  }
}
</style>
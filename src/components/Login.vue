<template>
  <main>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12 mt-12">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 orange--text text--accent-3">Log In Sojin Hotels</h1>
                        <h4 class="text-center mt-4">Login untuk melanjutkan</h4>
                        <v-form v-model="valid" ref="form">
                          <v-text-field label="E-mail" v-model="email" :rules="emailRules" required prepend-icon="mdi-email" color="orange"/>
                          <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock" :type="show ? 'text' : 'password'" color="orange"
                              @click:append="show = !show" :rules="passwordRules" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"/>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-6 mb-12">
                        <v-btn rounded color="orange" dark @click="submit">LOG IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="orange accent-4">
                      <img src="@/assets/sojinHotels.png" height="150px">
                      <v-card-text class="white--text mt-n8">
                        <h1 class="text-center display-1">Selamat Datang!</h1>
                        <h5 class="text-center" >Belum punya akun? Yuk daftar dulu!</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="changePage">REGISTER</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    <v-snackbar v-model="success" color="green" timeout="2000" bottom> Verifikasi Email Berhasil </v-snackbar>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      load: false,
      snackbar: false,
      success: false,
      show: false,
      error_message: "",
      color: "",
      password: "",
      passwordRules: [
        (v) => !!v || 'Password tidak boleh kosong',
      ],
      email: "",
      emailRules: [
        (v) => !!v || 'E-mail tidak boleh kosong',
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yg terkirim
        this.load = true;
        this.$http
          .post(this.$api + '/login', {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            //simpan data id user yang diinput
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('noTelp', response.data.user.noTelp);
            localStorage.setItem('email', response.data.user.email);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: 'Dashboard',
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem('token');
            this.load = false;
          });
      }
    },

    clear() {
      this.$refs.form.reset();
    },

    changePage(){
      this.$router.push({
        name: 'Register',
      });
    },

    showVerified(){
      if(this.$route.query.verified == 'success'){
        this.success = true;
        this.router.push(
          '/login'
        );
      }
    },
  },
  mounted(){
    this.showVerified();
  }
};
</script>
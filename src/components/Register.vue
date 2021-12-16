<template>
  <main>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12 mt-12">
              <v-window>
                <v-window-item>
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="orange accent-4">
                        <img class="mt-12" src="@/assets/sojinHotels.png" height="150px">
                        <v-card-text class="white--text mt-n4">
                          <h1 class="text-center display-1">Kuy Daftar!</h1>
                          <h5 class="text-center">Sudah punya akun? Login disini!</h5>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="changePage">Log in</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 orange--text text--accent-3">Buat Akun</h1>
                          <h4 class="text-center mt-4">Daftarkan akun dengan email anda</h4>
                          <v-form v-model="valid" ref="form">
                            <v-text-field label="Nama" v-model="name" :rules="nameRules" prepend-icon="mdi-account" color="orange" required></v-text-field>
                            <v-text-field label="Nomor Telepon" v-model="notelp" :rules="notelpRules" prepend-icon="mdi-phone" color="orange" required></v-text-field>
                            <v-text-field label="E-Mail" v-model="email" :rules="emailRules" prepend-icon="mdi-email" color="orange" required></v-text-field>
                            <v-text-field 
                              label="Password" 
                              v-model="password"
                              :rules="passwordRules" 
                              min="8" 
                              :type="show ? 'text' : 'password'" 
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                              prepend-icon="mdi-lock"
                              color="orange"
                              @click:append="show = !show"
                              required></v-text-field>
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-6 mb-12">
                          <v-btn rounded color="orange" dark @click="submit">REGISTER</v-btn>
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
  </main>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      load: false,
      snackbar: false,
      show: false,
      error_message: "",
      color: "",
      name: "",
      nameRules: [
          (v) => !!v || 'Nama tidak boleh kosong',
      ],
      notelp: "",
      notelpRules: [
          (v) => !!v || 'Nomor telepon tidak boleh kosong',
      ],
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
        this.$http.post(this.$api + '/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            noTelp: this.notelp,
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: 'Login',
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },

    clear() {
      this.$refs.form.reset();
    },

    changePage(){
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
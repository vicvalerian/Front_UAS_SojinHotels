<template>
  <v-main>
    <h1 class="mt-n12 custom1--text">Dashboard</h1>

    <v-container v-if="userActive != 'vickysojinhotels@gmail.com'">
      <h1 class="mb-4 custom2--text">Selamat datang di Sojin Hotels</h1>
      <v-row align="center">
        <v-item-group v-model="window" class="shrink mr-6" mandatory tag="v-flex" >
          <v-item v-for="n in length" :key="n" v-slot="{ active, toggle }" >
            <div>
              <v-btn :input-value="active" icon @click="toggle">
                <v-icon color="orange">mdi-record</v-icon>
              </v-btn>
            </div>
          </v-item>
        </v-item-group>
        <v-col>
          <v-window v-model="window" class="elevation-1" vertical>
            <v-window-item v-for="n in length" :key="n" >
              <v-card flat>
                <v-card-text>
                  <v-row class="mb-4" align="center" >
                    <v-avatar color="orange" class="mr-4" ></v-avatar>
                    <strong class="text-h6" v-if="n == 1">Reservasi Kamar</strong>
                    <strong class="text-h6" v-if="n == 2">Review Hotel</strong>
                    <strong class="text-h6" v-if="n == 3">Tambah Fasilitas Kamar</strong>
                    <v-spacer></v-spacer>
                  </v-row>
                  <p v-if="n == 1">
                    Butuh kamar untuk beristirahat? Bisa reservasi kamar disinii.
                  </p>
                  <p v-if="n == 2">
                    Ingin memberi kritik dan saran tentang hotel kami? Bisa memberi review juga.
                  </p>
                  <p v-if="n == 3">
                    Fasilitas hotel dikamar anda kurang? Bisa tambah fasilitas.
                  </p>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="userActive == 'vickysojinhotels@gmail.com'">
      <v-card class="mx-auto">
        <v-card-title class="justify-center">
          <h2 class="mt-4">Data Seluruh Akun</h2>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-subtitle>
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:[`item.email_verified_at`]="{ item }">
            <v-chip v-if="item.email_verified_at == null" color="red" outlined>Belum Verif</v-chip>
            <v-chip v-if="item.email_verified_at != null" color="green" outlined>Sudah Verif</v-chip>
          </template>
        </v-data-table>
      </v-card>
      <div class="row mt-8">
        <v-card class="col">
          <p>TOTAL KAMAR</p>
          <p>{{ totalKamar.length }}</p>
        </v-card>
        <v-card class="col">
          <p>TOTAL REVIEW</p>
          <p>{{ totalReview.length }}</p>
        </v-card>
        <v-card class="col">
          <p>TOTAL FASILITAS</p>
          <p>{{ totalFasilitas.length }}</p>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Sansita:wght@700&family=Satisfy&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

  .custom1--text{
        font-family: Satisfy;
        font-size: 52px;
    }
    
  .custom2--text{
      font-family: Sansita;
  }
</style>

<script>
  export default {
    data () {
      return {
        length: 3,
        window: 0,
        userActive: '',
        search: null,
        totalUser: [],
        totalKamar: [],
        totalReview: [],
        totalFasilitas: [],
        users: [],
        items: [
          { src: require('../assets/picture1.jpg'), },
          { src: require('../assets/picture2.jpg'), },
          { src: require('../assets/picture3.jpg'), },
        ],
        headers: [
          { text: "Nama", align: "start", sortable: true, value: "name", },
          { text: "Email", value: 'email' },
          { text: "Nomor Telepon", value: 'noTelp' },
          { text: "Detail Verif Email", value: 'email_verified_at' },
        ],
      }
    },
    methods: {
      //Read Data User
      readDataUser() {
        var url = this.$api + '/user';
        this.$http.get(url, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            this.users = response.data.data;
          });
      },

      //Read Data Kamar
      readDataKamar() {
        var url = this.$api + '/kamar';
        this.$http.get(url, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            this.totalKamar = response.data.data;
          });
      },

      //Read Data Review
      readDataReview() {
        var url = this.$api + '/review';
        this.$http.get(url, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            this.totalReview = response.data.data;
          });
      },

      //Read Data Fasilitas
      readDataFasilitas() {
        var url = this.$api + '/fasilitas';
        this.$http.get(url, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            this.totalFasilitas = response.data.data;
          });
      },
    },
    mounted() {
      this.readDataUser();
      this.readDataKamar();
      this.readDataReview();
      this.readDataFasilitas();
      this.userActive = localStorage.getItem('email');
    },
  }
</script>
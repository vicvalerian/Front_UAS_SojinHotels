<template>
  <v-main class="list">
    <h1 class="mt-n12 custom1--text">Kamar</h1>

    <v-container cols="4" sm="4">
      <div class="row">
        <div class="col">
          <v-card class="mx-auto mb-8" max-width="344" >
            <img src="@/assets/standardroom.jpg" height="200px" width="100%">
            <v-card-title>Standard Room </v-card-title>
            <v-card-subtitle> 300k per night </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="show1 = !show1" >
                <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show1">
                <v-divider></v-divider>
                <v-card-text>
                  Rasakan sensasi beristirahat serasa kamar sendiri dan dapatkan kualitas istirahat yang top markotopp.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>

        <div class="col">
          <v-card class="mx-auto mb-8" max-width="344" >
            <img src="@/assets/deluxeroom.jpg" height="200px" width="100%">
            <v-card-title>Deluxe Room </v-card-title>
            <v-card-subtitle> 400k per night </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="show2 = !show2" >
                <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show2">
                <v-divider></v-divider>
                <v-card-text>
                  Kamar dengan fasilitas yang luar biasa dan nuansa damai akan menjamin waktu istirahat anda akan tercukupi.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>

        <div class="col">
          <v-card class="mx-auto mb-8" max-width="344" >
            <img src="@/assets/presidentialroom.jpg" height="200px" width="100%">
            <v-card-title>Presidential Room </v-card-title>
            <v-card-subtitle> 500k per night </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="show3 = !show3" >
                <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show3">
                <v-divider></v-divider>
                <v-card-text>
                  Rebahan serasa di kerajaan yang sangat nyaman dan empuk tentu saja akan membuat anda tidak ingin beranjak
                  dari tempat tidur.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
    </v-container>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>

        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="kamars" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon dense color="green" @click="editHandler(item)">mdi-pencil</v-icon>
          <v-icon dense color="red" @click="deleteHandler(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Kamar</span>
        </v-card-title>
        <v-card-text>
            <v-container v-if="inputType == 'Tambah'">
                <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
                <v-text-field v-model="form.nik" label="NIK" required></v-text-field>
                <v-text-field v-model="form.noTelp" label="Nomor Telepon" required></v-text-field>
                <v-select @change="getBiaya" v-model="form.tipeKamar" :items="tipe" label="Tipe Kamar" required></v-select>
                <v-text-field  v-model="form.biayaKamar" label="Biaya Kamar" disabled required></v-text-field>
                <v-text-field v-model="form.email" label="Email" disabled required></v-text-field>
            </v-container>
            <v-container v-else>
                <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
                <v-text-field v-model="form.nik" label="NIK" required></v-text-field>
                <v-text-field v-model="form.noTelp" label="Nomor Telepon" required></v-text-field>
                <v-select @change="getBiaya" v-model="form.tipeKamar" :items="tipe" label="Tipe Kamar" required></v-select>
                <v-text-field  v-model="form.biayaKamar" label="Biaya Kamar" disabled required></v-text-field>
            </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus kamar ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
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
  name: "List",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama", align: "start", sortable: true, value: "nama", },
        { text: "NIK", value: 'nik' },
        { text: "Nomor Telepon", value: 'noTelp' },
        { text: "Tipe Kamar", value: 'tipeKamar' },
        { text: "Biaya Kamar", value: 'biayaKamar' },
        { text: "Actions", value: 'actions' },
      ],
      kamar: new FormData(),
      kamars: [],
      form: {
        nama: '',
        nik: '',
        noTelp: '',
        tipeKamar: '',
        biayaKamar: '',
        email: localStorage.getItem('email'),
      },
      deleteId: '',
      editId: '',
      tipe: [ 'Standard Room', 'Deluxe Room', 'Presidential Room' ],
    };
  },
  methods: {
    setForm() {
      if (this.inputType !== 'Tambah') {
        this.update();
      } else {
        this.save();
      }
    },

    //Read Data Kamar
    readData() {
      var url = this.$api + '/kamar/' + localStorage.getItem('email');
      this.$http.get(url, {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.kamars = response.data.data;
        });
    },

    //Simpan Data Kamar
    save() {
      this.kamar.append('nama', this.form.nama);
      this.kamar.append('nik', this.form.nik);
      this.kamar.append('noTelp', this.form.noTelp);
      this.kamar.append('tipeKamar', this.form.tipeKamar);
      this.kamar.append('biayaKamar', this.form.biayaKamar);
      this.kamar.append('email', this.form.email);
      //email diambil dari email user yg login

      var url = this.$api + '/kamar';
      this.load = true;
      this.$http.post(url, this.kamar, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.readData();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //Ubah Data Kamar
    update() {
      let newData = {
        nama: this.form.nama,
        nik: this.form.nik,
        noTelp: this.form.noTelp,
        tipeKamar: this.form.tipeKamar,
        biayaKamar: this.form.biayaKamar,
      };
      
      var url = this.$api + '/kamar/' + this.editId;
      this.load = true;
      this.$http.put(url, newData, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = 'green';
          this.snackbar = true;
          this.load = true;
          this.close();
          this.readData();
          this.resetForm();
          this.inputType = 'Tambah';
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //Hapus Data Kamar
    deleteData() {
      //menghapus data
      var url = this.$api + "/kamar/" + this.deleteId;
      this.load = true;
      this.$http.delete(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    editHandler(item) {
      this.inputType = 'Ubah';
      this.editId = item.id;
      this.form.nama = item.nama;
      this.form.nik = item.nik;
      this.form.noTelp = item.noTelp;
      this.form.tipeKamar = item.tipeKamar;
      this.form.biayaKamar = item.biayaKamar;
      this.dialog = true;
    },

    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },

    close() {
      this.dialog = false;
      this.inputType = 'Tambah';
      this.dialogConfirm = false;
      this.readData();
    },

    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = 'Tambah';
    },

    resetForm() {
      this.form = {
        nama: null,
        nik: null,
        noTelp: null,
        tipeKamar: null,
        biayaKamar: null,
        email: localStorage.getItem('email'),
      };
    },

    getBiaya(){
      if(this.form.tipeKamar === 'Standard Room'){
        this.form.biayaKamar = 300000;
      }
      else if(this.form.tipeKamar === 'Deluxe Room'){
        this.form.biayaKamar = 400000;
      }
      else if(this.form.tipeKamar === 'Presidential Room'){
        this.form.biayaKamar = 500000;
      }
      else{
        this.form.biayaKamar = 0;
      }
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
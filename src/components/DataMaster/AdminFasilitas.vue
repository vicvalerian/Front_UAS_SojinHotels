<template>
  <v-main class="list">
    <h1 class="mt-n12 custom1--text">Fasilitas</h1>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>

        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="fasilitasi" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon dense color="green" @click="editHandler(item)">mdi-pencil</v-icon>
          <v-icon dense color="red" @click="deleteHandler(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Fasilitas</span>
        </v-card-title>
        <v-card-text>
            <v-container v-if="inputType == 'Tambah'">
                <v-select @change="getBiaya" v-model="form.barang" :items="tipe" label="Barang" append-outer-icon="mdi-bed" required></v-select>
                <v-text-field @change="getBiaya" v-model="form.jmlBarang" label="Jumlah" append-outer-icon="mdi-numeric-positive-1" required></v-text-field>
                <v-text-field v-model="form.biayaBarang" label="Biaya" append-outer-icon="mdi-cash-multiple" disabled required></v-text-field>
                <v-text-field v-model="form.email" label="Email" append-outer-icon="mdi-email" required></v-text-field>
            </v-container>
            <v-container v-else>
                <v-select @change="getBiaya" v-model="form.barang" :items="tipe" label="Barang" append-outer-icon="mdi-bed" required></v-select>
                <v-text-field @change="getBiaya" v-model="form.jmlBarang" label="Jumlah" append-outer-icon="mdi-numeric-positive-1" required></v-text-field>
                <v-text-field v-model="form.biayaBarang" label="Biaya" append-outer-icon="mdi-cash-multiple" disabled required></v-text-field>
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
        <v-card-text>Anda Yakin ingin menghapus fasilitas ini?</v-card-text>
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
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama", align: "start", sortable: true, value: "barang", },
        { text: "Jumlah", value: 'jmlBarang' },
        { text: "Biaya", value: 'biayaBarang' },
        { text: "Email", value: 'email' },
        { text: "Actions", value: 'actions' },
      ],
      fasilitas: new FormData(),
      fasilitasi: [],
      form: {
        barang: '',
        jmlBarang: '',
        biayaBarang: '',
        email: '',
      },
      deleteId: '',
      editId: '',
      tipe: [ 'Kasur', 'Selimut', 'Bantal' ],
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

    //Read Data Fasilitas
    readData() {
      var url = this.$api + '/fasilitas';
      this.$http.get(url, {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.fasilitasi = response.data.data;
        });
    },

    //Simpan Data Fasilitas
    save() {
      this.fasilitas.append('barang', this.form.barang);
      this.fasilitas.append('jmlBarang', this.form.jmlBarang);
      this.fasilitas.append('biayaBarang', this.form.biayaBarang);
      this.fasilitas.append('email', this.form.email);
      //email diambil dari email user yg login

      var url = this.$api + '/fasilitas';
      this.load = true;
      this.$http.post(url, this.fasilitas, {
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

    //Ubah Data Fasilitas
    update() {
      let newData = {
        barang: this.form.barang,
        jmlBarang: this.form.jmlBarang,
        biayaBarang: this.form.biayaBarang,
      };
      
      var url = this.$api + '/fasilitas/' + this.editId;
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

    //Hapus Data Fasilitas
    deleteData() {
      //menghapus data
      var url = this.$api + "/fasilitas/" + this.deleteId;
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
      this.form.barang = item.barang;
      this.form.jmlBarang = item.jmlBarang;
      this.form.biayaBarang = item.biayaBarang;
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
        barang: null,
        jmlBarang: null,
        biayaBarang: null,
        email: null,
      };
    },

    getBiaya(){
      if(this.form.barang === 'Kasur'){
        this.form.biayaBarang = 215000 * this.form.jmlBarang;
      }
      else if(this.form.barang === 'Selimut'){
        this.form.biayaBarang = 50000 * this.form.jmlBarang;
      }
      else if(this.form.barang === 'Bantal'){
        this.form.biayaBarang = 35000 * this.form.jmlBarang;
      }
      else{
        this.form.biayaBarang = 0;
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
<template>
  <v-main class="list">
    <h1 class="mt-n12 custom1--text">Review Pengguna</h1>

    <v-col v-for="(item, index) in reviews" :key="index" cols="12" sm="12">
      <v-card class="mb-6" data-aos="fade-down">
        <div class="row">
          <div class="col">
            <v-card-title>{{ item.namaReview }} - {{ (item.email) }} 
              <v-rating v-model="item.jmlBintang" background-color="orange lighten-3" color="orange" label="Bintang" dense readonly></v-rating>
            </v-card-title>
          </div>
          <div class="col">
            <div v-if="user==item.email" class="text-right mr-6 mt-4">
              <v-icon medium color="green" @click="editHandler(item)">mdi-pencil</v-icon>
              <v-icon medium color="red" @click="deleteHandler(item.id)">mdi-delete</v-icon>
            </div>
          </div>
        </div>
        <v-card-subtitle class="text-left mt-n8">{{ item.isiReview }}</v-card-subtitle>
      </v-card>
    </v-col>
    <v-btn color="success" dark @click="dialog = true"> Tambah Review</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Review</span>
        </v-card-title>
        <v-card-text>
            <v-container v-if="inputType == 'Tambah'">
                <v-text-field v-model="form.namaReview" label="Nama" append-outer-icon="mdi-account" required></v-text-field>
                <v-textarea v-model="form.isiReview" label="Isi" append-outer-icon="mdi-clipboard-text" required></v-textarea>
                <v-rating v-model="form.jmlBintang" background-color="orange lighten-3" color="orange" label="Bintang" medium required ></v-rating>
                <v-text-field v-model="form.email" label="Email" append-outer-icon="mdi-email" disabled required></v-text-field>
            </v-container>
            <v-container v-else>
                <v-text-field v-model="form.namaReview" label="Nama" append-outer-icon="mdi-account" required></v-text-field>
                <v-textarea v-model="form.isiReview" label="Isi" append-outer-icon="mdi-clipboard-text" required></v-textarea>
                <v-rating v-model="form.jmlBintang" background-color="orange lighten-3" color="orange" label="Bintang" medium required ></v-rating>
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
        <v-card-text>Anda Yakin ingin menghapus review ini?</v-card-text>
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
      user: '',
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama Review", align: "start", sortable: true, value: "namaReview", },
        { text: "Isi Review", value: 'isiReview' },
        { text: "Bintang", value: 'jmlBintang' },
        { text: "Actions", value: 'actions' },
      ],
      review: new FormData(),
      reviews: [],
      form: {
        namaReview: '',
        isiReview: '',
        jmlBintang: '',
        email: localStorage.getItem('email'),
      },
      deleteId: '',
      editId: '',
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

    //Read Data Review
    readData() {
      var url = this.$api + '/review';
      this.$http.get(url, {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.reviews = response.data.data;
        });
    },

    //Simpan Data Review
    save() {
      this.review.append('namaReview', this.form.namaReview);
      this.review.append('isiReview', this.form.isiReview);
      this.review.append('jmlBintang', this.form.jmlBintang);
      this.review.append('email', this.form.email);
      //email diambil dari email user yg login

      var url = this.$api + '/review';
      this.load = true;
      this.$http.post(url, this.review, {
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

    //Ubah Data Review
    update() {
      let newData = {
        namaReview: this.form.namaReview,
        isiReview: this.form.isiReview,
        jmlBintang: this.form.jmlBintang,
      };
      
      var url = this.$api + '/review/' + this.editId;
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

    //Hapus Data Review
    deleteData() {
      //menghapus data
      var url = this.$api + "/review/" + this.deleteId;
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
      this.form.namaReview = item.namaReview;
      this.form.isiReview = item.isiReview;
      this.form.jmlBintang = item.jmlBintang;
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
        namaReview: null,
        isiReview: null,
        jmlBintang: null,
        email: localStorage.getItem('email'),
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.$http.get(this.$api + '/review/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        this.reviews = response.data.data
    })
    .catch(error => {
        console.log(error)
    })
    this.readData();
    this.user = localStorage.getItem('email');
  },
};
</script>
<template>
    <v-main>
        <h1 class="custom1--text mb-5 mt-n12">Selamat Datang, {{ name }}</h1>
        <v-card class="mx-auto mt-8" max-width="500" outlined elevation="3">
            <v-list-item three-line>
            <v-list-item-content class="mt-8">
                <v-text-field label="Nama Pengguna" v-model="name" readonly outlined></v-text-field>
                <v-text-field label="Nomor Telepon" v-model="noTelp" readonly outlined></v-text-field>
                <v-text-field label="Email" v-model="email" readonly outlined></v-text-field>
            </v-list-item-content>
            </v-list-item>
            <template>
                <v-btn color="green" dark @click="editProfil" > Edit Profil </v-btn>
            </template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px" >
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.name" label="Nama" :rules="nameRules" required ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.noTelp" label="Nomor Telepon" :rules="noTelpRules" required ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="dialog = false" > Close </v-btn>
                            <v-btn  color="green darken-1" text @click="update" > Edit </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
        </v-card>
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
    name: "Profil",
    data(){
        return{
            dialog: false,
            snackbar: false,
            color: '',
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            noTelp: localStorage.getItem('noTelp'),
            userId: localStorage.getItem('id'),
            form: { name:null, noTelp: null },
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong :(',
            ],
            noTelpRules: [
                (v) => !!v || 'Nomor telepon tidak boleh kosong :(',
            ],
        };
    },
    methods: {
        editProfil(){
            this.form.name = this.name;
            this.form.noTelp = this.noTelp;
            this.dialog = true;
        },

        update(){
            let newData = {
                name: this.form.name,
                noTelp: this.form.noTelp,
            };
        
            var url = this.$api + '/user/' + this.userId;
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
                this.resetForm();
            })
            .catch((error) => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        close(){
            this.readUserActive();
            this.setUserLocalActive();
            this.dialog = false;
        },

        readUserActive(){
            this.name = this.form.name;
            this.noTelp = this.form.noTelp;
        },

        setUserLocalActive(){
            localStorage.setItem('name', this.name);
            localStorage.setItem('noTelp', this.noTelp);
        },

        resetForm() {
            this.form = {
                name: null,
                noTelp: null,
            };
        },
    }
}
</script>
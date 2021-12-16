<template>
    <v-main class="mainV">
        <v-app-bar hide-on-scroll app height="75px" color="deep-orange accent-1" dark>
            <v-toolbar-title class="ml-8 custom2--text"><strong>SOJIN HOTELS</strong></v-toolbar-title>
            <VSpacer/>
            <v-toolbar-items>
                <v-btn color="deep-orange lighten-5" @click="login" text router><b>LOGIN</b></v-btn>
                <v-btn color="deep-orange lighten-5" @click="register" text router><b>REGISTER</b></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        
        <v-carousel height="600px">
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
        </v-carousel>
        
        <v-container class="mt-8 mb-4">
            <h1 class="custom1--text" color="red--text">WELCOME</h1>
            <h2 class="custom1--text">Comfortable hotel of your dream</h2>
            <h4 class="mt-6 custom2--text">
                SOJIN HOTELS merupakan hotel premium yang terletak di kota-kota besar di Indonesia. Hotel ini memiliki nuansa simpel namun 
                <br> elegan yang sangat memanjakan mata tamu. Selain itu, hotel ini mudah dijangkau karena memiliki letak yang strategis 
                <br> dan terletak di tengah kota, oleh karena itu SOJIN HOTELS menjadi pilihan eksklusif bagi tamu yang akan berliburan.
            </h4>
        </v-container>
        <v-divider></v-divider>
        <v-container class="mb-6">
            <h1 class="custom1--text mb-5 mt-5">OUR LOCATION</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0924022562554!2d110.41269006582098!3d-7.780026946429756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5788a7536bf3%3A0x2ad64bfe394b9c11!2sSahid%20Jaya%20Hotel%20%26%20Convention%20Yogyakarta!5e0!3m2!1sid!2sid!4v1638334810094!5m2!1sid!2sid" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </v-container>
        <v-divider></v-divider>
        <h1 class="custom1--text mt-8">OUR HOTELS</h1>
        <div class="row mb-8">
            <div class="col">
                <v-card class="mx-auto" max-width="374" >
                    <v-img height="250">
                        <img height="250" src="@/assets/sojinKendari.jpg" alt="Sojin Kendari">
                    </v-img>
                    <v-card-title>Sojin Hotels Kendari</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4"> 4.5 (413) </div>
                        </v-row>
                        <div class="my-4 text-subtitle-1"> Kendari, Sulawesi Tenggara </div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title>Hotels Benefit</v-card-title>
                    <v-card-text>
                        <v-chip-group column>
                            <v-chip>Free Breakfast</v-chip>
                            <v-chip>Swimming Pool</v-chip>
                            <v-chip>Smoking Room</v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </div>
            <div class="col">
                <v-card class="mx-auto" max-width="374" >
                    <v-img height="250">
                        <img height="250" src="@/assets/sojinJogja.jpg" alt="Sojin Jogja">
                    </v-img>
                    <v-card-title>Sojin Hotels Jogja</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value="4" color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4"> 4 (211) </div>
                        </v-row>
                        <div class="my-4 text-subtitle-1"> Yogyakarta, Daerah Istimewa Yogyakarta </div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title>Hotels Benefit</v-card-title>
                    <v-card-text>
                        <v-chip-group column>
                            <v-chip>Free Breakfast</v-chip>
                            <v-chip>Swimming Pool</v-chip>
                            <v-chip>Smoking Room</v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </div>
            <div class="col">
                <v-card class="mx-auto" max-width="374" >
                    <v-img height="250">
                        <img height="250" src="@/assets/sojinBali.jpg" alt="Sojin Bali">
                    </v-img>
                    <v-card-title>Sojin Hotels Bali</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value="5" color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4"> 5 (674) </div>
                        </v-row>
                        <div class="my-4 text-subtitle-1"> Denpasar, Bali </div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title>Hotels Benefit</v-card-title>
                    <v-card-text>
                        <v-chip-group column>
                            <v-chip>Free Breakfast</v-chip>
                            <v-chip>Swimming Pool</v-chip>
                            <v-chip>Smoking Room</v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        <v-divider></v-divider>
        <h1 class="custom1--text mt-8">OUR TEAM</h1>
        <div class="text-center mt-4 mb-8">
            <v-bottom-sheet v-model="sheet" persistent >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="teal lighten-2" dark v-bind="attrs" v-on="on"> Click Me </v-btn>
                </template>
                <v-sheet class="text-center" width="100vh" height="250px">
                    <v-btn class="mt-6" text color="error" @click="sheet = !sheet"> close </v-btn>
                    <div class="py-3 row">
                        <div class="col">
                            <v-avatar class="customAvatar">
                                <img src="@/assets/indra.jpg" alt="Vicky" >
                            </v-avatar>
                            <h3 class="custom1--text">Indra Wiranatha Palimbong</h3>
                            <h3 class="custom1--text">180709664</h3>
                        </div>
                        <div class="col">
                            <v-avatar class="customAvatar">
                                <img src="@/assets/vicky.jpg" alt="Vicky">
                            </v-avatar>
                            <h3 class="custom1--text">Vicky Valerian Sende</h3>
                            <h3 class="custom1--text">190710079</h3>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>

        <v-footer padless height="75px">
            <v-col class="text-center" cols="12">
                Kelompok 1 — <strong>TUBES PW A</strong>
            </v-col>
        </v-footer>
    </v-main>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Sansita:wght@700&family=Satisfy&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

    .mainV{
        padding: 0 !important;
    }

    .custom1--text{
        font-family: Satisfy;
    }
    
    .custom2--text{
        font-family: Sansita;
    }

    .customAvatar{
        height: 100px !important;
        width: 100px !important;
    }
</style>

<script>
export default {
    data () {
      return {
        sheet: false,
        items: [
          { src: require('../assets/picture1.jpg'), },
          { src: require('../assets/picture2.jpg'), },
          { src: require('../assets/picture3.jpg'), },
        ],
      }
    },
    methods: {
        login(){
            this.$router.push({
                name: 'Login',
            });
        },
        register(){
            this.$router.push({
                name: 'Register',
            });
        }
    }
}
</script>
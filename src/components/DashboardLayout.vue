<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="mx-auto" height="100%" width="200" app>
      <v-list-item v-if="loggedIn && loggedInAdmin">
        <v-list-item-content>
          <v-list-item-title class="title"> 
            <v-avatar color="orange"> <v-icon dark>mdi-account-circle</v-icon></v-avatar>
          </v-list-item-title>
          <v-list-item-title class="mt-2"> {{ userActive }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="loggedIn && !loggedInAdmin">
        <v-list-item-content>
          <v-list-item-title class="title"> 
            <v-avatar color="orange"> <v-icon dark>mdi-account-circle</v-icon></v-avatar>
          </v-list-item-title>
          <v-list-item-title class="mt-2"> {{ userActive }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav v-if="loggedIn && loggedInAdmin">
        <v-list-item v-for="item in items" :key="item.title" link tag="router-link" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav v-if="loggedIn && !loggedInAdmin">
        <v-list-item v-for="item in users" :key="item.title" link tag="router-link" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed height="100">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="loggedIn && !loggedInAdmin"><b>Selamat datang, anda masuk sebagai Pengunjung</b></v-toolbar-title>
      <v-toolbar-title v-else-if="loggedIn && loggedInAdmin"><b>Selamat datang, anda masuk sebagai Admin</b></v-toolbar-title>
      <VSpacer />
      <v-toolbar-items>
        <v-btn @click="profile" text router><v-icon medium color="orange">mdi-account</v-icon></v-btn>
        <v-btn @click="logout" text router><v-icon medium color="red">mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      userActive: localStorage.getItem('name'),
      selectedItem: 0,
      drawer: true,
      users: [
        { title: "Dashboard", to: '/dashboard', icon: 'mdi-home' },
        { title: "Kamar", to: '/kamar', icon: 'mdi-bed' },
        { title: "Review", to: '/review', icon: 'mdi-star' },
        { title: "Fasilitas", to: '/fasilitas', icon: 'mdi-bag-suitcase' },
      ],
      items: [
        { title: "Dashboard", to: '/dashboard', icon: 'mdi-home' },
        { title: "Admin Kamar", to: '/adminkamar', icon: 'mdi-bed' },
        { title: "Admin Review", to: '/adminreview', icon: 'mdi-star' },
        { title: "Admin Fasilitas", to: '/adminfasilitas', icon: 'mdi-bag-suitcase' },
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('noTelp');
      localStorage.removeItem('email');
      location.reload();
    },
    profile(){
      this.$router.push({
        name: 'Profil',
      });
    }
  },
  computed: {
    loggedIn(){
      return localStorage.getItem('token') != null;
    },
    loggedInAdmin(){
      return localStorage.getItem('email') == "vickysojinhotels@gmail.com";
    }
  }
};
</script>

<style scoped>
  .fullheight {
    min-height: 100vh !important;
  }

  .router {
    text-decoration: none;
    color: black;
  }
</style>
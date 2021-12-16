import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        //Index
        {
            path: '/',
            name: 'Index',
            meta: { title: 'Index' },
            component: importComponent('Index'),
        },
        {
            path: "",
            // meta: { requiresAuth: true },
            component: importComponent('DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard', requireAuth: true },
                    component: importComponent('Dashboard'),
                },
                //Profil
                {
                    path: '/profil',
                    name: 'Profil',
                    meta: { title: 'Profil', requireAuth: true },
                    component: importComponent('DataMaster/Profil'),
                },
                //Kamar
                {
                    path: '/kamar',
                    name: 'Kamar',
                    meta: { title: 'Kamar', requireAuth: true },
                    component: importComponent('DataMaster/Kamar'),
                },
                //Review
                {
                    path: '/review',
                    name: 'Review',
                    meta: { title: 'Review', requireAuth: true },
                    component: importComponent('DataMaster/Review'),
                },
                //Fasilitas
                {
                    path: '/fasilitas',
                    name: 'Fasilitas',
                    meta: { title: 'Fasilitas', requireAuth: true },
                    component: importComponent('DataMaster/Fasilitas'),
                },
                //Admin Kamar
                {
                    path: '/adminkamar',
                    name: 'AdminKamar',
                    meta: { title: 'AdminKamar', requireAuth: true },
                    component: importComponent('DataMaster/AdminKamar'),
                },
                //Admin Review
                {
                    path: '/adminreview',
                    name: 'AdminReview',
                    meta: { title: 'AdminReview', requireAuth: true },
                    component: importComponent('DataMaster/AdminReview'),
                },
                //Admin Fasilitas
                {
                    path: '/adminfasilitas',
                    name: 'AdminFasilitas',
                    meta: { title: 'Fasilitas', requireAuth: true },
                    component: importComponent('DataMaster/AdminFasilitas'),
                },
            ],
        },
        //Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent('Login'),
        },
        //Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register' },
            component: importComponent('Register'),
        },
        {
            path: '*',
            redirect : '/'
        },
    ],
});

//Set Judul
router.beforeEach((to, from, next) => {
    if(to.name == "Dashboard" && localStorage.getItem("token") == null){
        next({ name: "Login" })
        document.to.meta.title = "Login"
    }

    //User Biasa
   if(to.name == "Kamar" && localStorage.getItem("email") == "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null ||
        to.name == "Review" && localStorage.getItem("email") == "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null ||
        to.name == "Fasilitas" && localStorage.getItem("email") == "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null){
            next({ name: "Login" })
            document.to.meta.title = "Login"
    }

   //Admin
   if(to.name == "AdminKamar" && localStorage.getItem("email") != "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null ||
        to.name == "AdminReview" && localStorage.getItem("email") != "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null ||
        to.name == "AdminFasilitas" && localStorage.getItem("email") != "vickysojinhotels@gmail.com" && localStorage.getItem("token") != null){
       next({ name: "Login" })
       document.to.meta.title = "Login"
    }

    //Jika sudah Login atau Register tidak bisa kesana lagi
    if(to.name == "Login" && localStorage.getItem("token") != null ||
        to.name == "Register" &&  localStorage.getItem("token") != null ){
       next({ name: "Dashboard" })
       document.to.meta.title = "Dashboard"
    }

    //Jika sudah Login langsung ke dashboard tidak perlu ke index
    if(to.name == "Index" && localStorage.getItem('token') != null){
        next({ name: "Dashboard" })
        document.to.meta.title = "Dashboard"
    }

    //Jika sudah Logout tidak bisa membuka page lain
    if(to.name == "Kamar" && localStorage.getItem('token') == null ||
        to.name == "Review" && localStorage.getItem('token') == null ||
        to.name == "Fasilitas" && localStorage.getItem('token') == null ||
        to.name == "AdminKamar" && localStorage.getItem('token') == null ||
        to.name == "AdminReview" && localStorage.getItem('token') == null ||
        to.name == "AdminFasilitas" && localStorage.getItem('token') == null ||
        to.name == "Dashboard" && localStorage.getItem('token') == null ||
        to.name == "Profil" && localStorage.getItem('token') == null){
        next({ name: "Login" })
        document.to.meta.title = "Login"
    }

   document.title = to.meta.title;

   next();
});

export default router;
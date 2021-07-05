/* create router adl suatu fungsi dmn kita akan mendefinikasi uri
atau path utk mengakses sebuah component
createwebhistory adl mengaktifkan mode history */

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        //import hal index
        path: '/',
        name: 'transaction.index',
        component: () => import("../views/transaction/Index.vue")
    },
    {
        //import hal create
        path: '/create',
        name: 'transaction.create',
        component: () => import("../views/transaction/Create.vue")
    },
    {
        //import hal edit
        path: '/edit/:id',
        name: 'transaction.edit',
        component: () => import("../views/transaction/Edit.vue")
    },
];

//buat fungsi createrouter, dikumpulkan dgn const router
const router = createRouter({
    history: createWebHistory(),
    routes //variabel routes yg diatas
});

// utk bisa import di main.js, maka router perlu diexport
export default router;


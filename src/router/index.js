import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateWallet from '../views/CreateWallet.vue';
import AccessWallet from '../views/AccessWallet.vue';
import Dashboard from '../views/Dashboard.vue';
import Transaction from '../views/Transaction.vue';
import BlockChain from '../views/BlockChain.vue';
import CertificateIssue from '../views/CertificateIssue.vue';
import Wallet from '../views/Wallet.vue';
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/createwallet',
        name: 'CreateWallet',
        component: CreateWallet
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/accesswallet',
        name: 'AccessWallet',
        component: AccessWallet
    },
    {
        path: '/transaction',
        name: 'Transaction',
        component: Transaction
    },
    {
        path: '/blockchain',
        name: 'BlockChain',
        component: BlockChain
    },
    {
        path: '/createCertificate',
        name: 'CertificateIssue',
        component: CertificateIssue
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
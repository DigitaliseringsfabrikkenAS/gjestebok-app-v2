import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth/index'

Vue.use(Router)

const lang = localStorage.selectedLanguage || 'no'

export const routes = [
    {
        path: '/',
        redirect: `/${lang}`
    },
    {
        path: '/password/reset/:token',
        redirect: `/${lang}/password/reset/:token`
    },
    {
        path: '/:lang',
        component: () => import(/* webpackChunkName: "layout-default" */ '../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                meta: {requiresAuth: true},
                component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN']},
                component: () => import(/* webpackChunkName: "dashboard" */ '../pages/home/HomeAdmin')
            },
            {
                path: 'users',
                name: 'Users',
                meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN']},
                component: () => import(/* webpackChunkName: "users" */ '../pages/users/Users')
            },
            {
                path: 'clients',
                name: 'Clients',
                meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN']},
                component: () => import(/* webpackChunkName: "clients" */ '../pages/clients/Clients')
            },
            {
                path: 'workplaces',
                component: () => import(/* webpackChunkName: "layout-default" */ '../layouts/EmptyLayout.vue'),
                children: [{
                    path: '',
                    name: 'Workplaces',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "workplaces" */ '../pages/workplaces/WorkplacesLanding')
                }, {
                    path: 'locations',
                    name: 'Locations',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "locations" */ '../pages/workplaces/WorkplacesLayout')
                }, {
                    path: 'companies',
                    name: 'Companies',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "companies" */ '../pages/workplaces/WorkplacesLayout')
                }, {
                    path: 'employees',
                    name: 'Employees',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "employees" */ '../pages/workplaces/WorkplacesLayout')
                }]
            },
            {
                path: 'devices',
                name: 'Devices',
                meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                component: () => import(/* webpackChunkName: "devices" */ '../pages/devices/Devices')
            },
            {
                path: 'guests',
                component: () => import(/* webpackChunkName: "layout-default" */ '../layouts/EmptyLayout.vue'),
                children: [{
                    path: '',
                    name: 'Guests',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "guests" */ '../pages/guests/GuestsLanding')
                }, {
                    path: 'invites',
                    name: 'Invites',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "invites" */ '../pages/guests/GuestsLayout')
                }, {
                    path: 'visitors',
                    name: 'Visitors',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "visitors" */ '../pages/guests/GuestsLayout')
                }]
            },
            {
                path: 'settings',
                component: () => import(/* webpackChunkName: "layout-default" */ '../layouts/EmptyLayout.vue'),
                children: [{
                    path: '',
                    name: 'Settings',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "settings" */ '../pages/settings/SettingsLanding')
                }, {
                    path: 'location',
                    name: 'LocationsSettings',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "locations-settings" */ '../pages/settings/SettingsLayout')
                }, {
                    path: 'company',
                    name: 'CompanySettings',
                    meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                    component: () => import(/* webpackChunkName: "devices-settings" */ '../pages/settings/SettingsLayout')
                }]
            },
            {
                path: 'alarms',
                name: 'Alarms',
                meta: {requiresAuth: true, roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']},
                component: () => import(/* webpackChunkName: "devices" */ '../pages/alarms/Alarms')
            },
            {
                path: 'login',
                name: 'Login',
                meta: {requiresAuth: false},
                component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                meta: {requiresAuth: false},
                component: () => import(/* webpackChunkName: "forgot-password" */ '../pages/login/ForgotPassword')
            },
            {
                path: 'password/reset/:token',
                name: 'ResetPassword',
                meta: {requiresAuth: false},
                component: () => import(/* webpackChunkName: "reset-password" */ '../pages/login/ResetPassword')
            },
        ]
    }]

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes
})

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!auth.isLoggedIn()) {
            return next({
                name: 'Login',
                params: {lang},
                query: {redirect: to.fullPath}
            })
        } else {
            if (to.meta.roles && !auth.userHasRole(to.meta.roles)) {
                return next({
                    name: 'Home',
                    params: {lang}
                })
            }
            return next()
        }
    } else {
        return next()
    }
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router

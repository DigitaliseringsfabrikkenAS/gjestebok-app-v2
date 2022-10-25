<template>
    <v-layout>
        <v-app-bar color="white" clipped-left app v-if="notProtectedRoute()">
            <img src="/assets/logo.png" alt="logo">
            <v-spacer/>
            <div>
                <v-select flat solo dense v-model="selectedLang" :items="langs"
                          :menu-props="{ bottom: true, offsetY: true, nudgeBottom: 4 }"
                          style="z-index: 10000"
                          hide-details
                          class="mr-4"
                />
            </div>
            <div v-if="userData && userData.id && userData.roles.includes('ROLE_SUPER_ADMIN')"
                 class="d-flex  align-center align-content-center">
                <v-select flat solo return-object dense hide-details v-model="selectedClient" :items="savedClients"
                          :menu-props="{ bottom: true, offsetY: true, nudgeBottom: 4 }"
                          item-value="id" item-text="name" @change="selectClient(selectedClient)">\
                    <template v-slot:item="{ item }">
                        <div class="d-flex align-center align-content-center">
                            <p class="client-name-text" style="margin-top: 4px">{{ item.name }}</p>
                            <img v-if="item.thumbnail_link" :src="item.thumbnail_link" height="24" alt="logo"
                                 class="pl-3">
                        </div>
                    </template>
                    <template v-slot:selection="{ item }">
                        <div class="d-flex align-center align-content-center">
                            <p class="client-name-text" style="margin-top: 4px">{{ item.name }}</p>
                            <img v-if="item.thumbnail_link" :src="item.thumbnail_link" height="24" alt="logo"
                                 class="pl-3">
                        </div>
                    </template>
                    <template v-slot:no-data>
                        <p class="client-name-text pl-4" style="margin-top: 4px">{{ $lang.labels.noClientData }}</p>
                    </template>
                </v-select>
            </div>
            <div v-else-if="userData && userData.id && userData.client_id && clientData && clientData.id"
                 class="d-flex align-center align-content-center">
                <p class="client-name-text" style="margin-top: 4px">{{ clientData.name }}</p>
                <img v-if="clientData.thumbnail_link" :src="clientData.thumbnail_link" height="32" alt="logo"
                     class="pl-3">
            </div>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="mini"
            permanent
            clipped
            app
            floating
            v-if="notProtectedRoute()"
            :style="`width: ${ mini ? 88 : 256 }px`"
        >
            <div class="expand-toggle">
                <v-btn
                    fab
                    small
                    elevation="0"
                    absolute
                    color="white"
                    @click="mini = !mini"
                    style="right: -10px;"
                >
                    <v-icon color="primary">{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
                </v-btn>
            </div>

            <v-list-item :class="{ 'pt-6': true, 'px-4': !mini }">
                <div v-if="!mini" style="width: 100%; background-color: #F5F7FA; border-radius: 4px"
                     class="d-inline-flex px-2 py-1">
                    <v-list-item-avatar style="height: 42px; min-width: 42px; width: 42px;">
                        <v-img :src="userData.thumbnail_link || '/assets/logo.png'"/>
                    </v-list-item-avatar>

                    <v-list-item-title>
                        <p class="name-title mb-0">{{ $lang.header.hi }}, {{ userData.name.split(' ')[0] }}</p>
                        <p class="role-title mb-0">{{ userData.friendlyRoleName }}</p>
                    </v-list-item-title>

                    <v-btn
                        icon
                        color="white"
                        style="padding-top: 22px"
                        @click="logoutFunct()"
                    >
                        <v-icon color="primary">mdi-logout</v-icon>
                    </v-btn>

                </div>

                <v-list-item-avatar v-else :class="{'py-1': true,  'ml-0': !mini, 'ml-2': mini}"
                                    style="height: 42px; min-width: 42px; width: 42px; margin-right: 12px">
                    <v-img :src="userData.thumbnail_link || '/assets/logo.png'"/>
                </v-list-item-avatar>

            </v-list-item>

            <!-- Navigation menu -->
            <main-menu :menu="filteredMenu" :mini="mini" class="mt-2"/>

        </v-navigation-drawer>

        <v-main v-if="!loggedIn() || userData && userData.id"
                :style="`background-color: ${!notProtectedRoute() ? '' : '#F5F7FA'}`">
            <router-view v-if="!notProtectedRoute()" :key="$route.fullPath"></router-view>
            <v-container v-else class="px-10 pt-6">
                <router-view @refreshClients="refreshClients" :key="$route.fullPath"></router-view>
            </v-container>
            <v-snackbar
                v-model="snackBarObj.snackbar"
                :color="snackBarObj.snackColor"
                text
                top
            >
                {{ snackBarObj.message }}
            </v-snackbar>
        </v-main>
        <v-main v-else :style="`background-color: ${!notProtectedRoute() ? '' : '#F5F7FA'}`">
            <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                <v-progress-circular indeterminate color="primary" size="300"/>
            </div>
        </v-main>
    </v-layout>
</template>
<script>
import {mapGetters} from "vuex";
import {getLogout, whoAmI} from "../services/login";
import MainMenu from '../components/navigation/MainMenu'
import {getClient} from "../services/clients";
import {superAdminSelectClient} from "../services/users";
import auth from '../auth/index'

export default {
    components: {
        MainMenu,
    },
    data() {
        return {
            drawer: true,
            mini: false,
            selectedClient: '',
            savedClients: [],
            menu: [],
            langs: [
                {
                    text: this.$lang.global.eng,
                    value: 'en'
                },
                {
                    text: this.$lang.global.no,
                    value: 'no'
                }],
            selectedLang: 'no'
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            snackBarObj: 'snackBarObj',
            clientData: 'clientData',
        }),
        filteredMenu() {
            this.menu = []
            this.menu.push({
                text: '',
                items: [
                    {
                        icon: 'mdi-home',
                        key: 'menu.home',
                        text: this.$lang.routes.home,
                        link: 'Home',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION'],
                    },
                    {
                        icon: 'mdi-chart-box-outline',
                        key: 'menu.dashboard',
                        text: this.$lang.routes.dashboard,
                        link: 'Dashboard',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN'],
                    },
                    {
                        icon: 'mdi-account-multiple',
                        key: 'menu.users',
                        text: this.$lang.routes.users,
                        link: 'Users',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']
                    },
                    {
                        icon: 'mdi-account-group',
                        key: 'menu.clients',
                        text: this.$lang.routes.clients,
                        link: 'Clients',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN']
                    },
                    {
                        icon: 'mdi-domain', key: 'menu.workplaces', text: this.$lang.routes.workplaces,
                        link: 'Workplaces',
                        regex: 'workplaces',
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION'],
                        items: [
                            {
                                icon: '',
                                key: 'menu.companies',
                                text: this.$lang.routes.companies,
                                link: 'Companies',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                            },
                            {
                                icon: '',
                                key: 'menu.locations',
                                text: this.$lang.routes.locations,
                                link: 'Locations',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                            },
                            {
                                icon: '',
                                key: 'menu.employees',
                                text: this.$lang.routes.employees,
                                link: 'Employees',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION'],
                            }
                        ]
                    },
                    {
                        icon: 'mdi-tablet-android',
                        key: 'menu.devices',
                        text: this.$lang.routes.devices,
                        link: 'Devices',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                    },
                    {
                        icon: 'mdi-card-account-details', key: 'menu.guests', text: this.$lang.routes.guests,
                        link: 'Guests',
                        regex: 'guests',
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION', 'ROLE_EMPLOYEE'],
                        items: [
                            {
                                icon: '',
                                key: 'menu.invites',
                                text: this.$lang.routes.invites,
                                link: 'Invites',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION', 'ROLE_EMPLOYEE'],
                            },
                            {
                                icon: '',
                                key: 'menu.visitors',
                                text: this.$lang.routes.visitors,
                                link: 'Visitors',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION', 'ROLE_EMPLOYEE'],
                            }
                        ]
                    },
                    {
                        icon: 'mdi-cog', key: 'menu.settings', text: this.$lang.routes.settings,
                        link: 'Settings',
                        regex: 'settings',
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                        items: [
                            {
                                icon: '',
                                key: 'menu.locationsSettings',
                                text: this.$lang.routes.locations,
                                link: 'LocationsSettings',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                            },
                            {
                                icon: '',
                                key: 'menu.companiesSettings',
                                text: this.$lang.routes.companies,
                                link: 'CompanySettings',
                                exact: true,
                                roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
                            }
                        ]
                    },
                    {
                        icon: 'mdi-bell-alert',
                        key: 'menu.alarms',
                        text: this.$lang.routes.alarms,
                        link: 'Alarms',
                        exact: true,
                        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_RECEPTION', 'ROLE_EMPLOYEE'],
                    },
                ]
            })
            return this.menu.map((item) => this.isShowForRole(item) ? item : null)
                .filter(x => x !== null);
        }
    },
    watch: {
        clientData: {
            handler(val) {
                this.selectedClient = val
            }
        },
        selectedLang: {
            handler(val) {
                this.changeLang(val)
            }
        },
    },
    mounted() {
        const currentVersion = localStorage.getItem('version');
        const newVersion = '0.5.0';

        if (currentVersion !== newVersion) {
            localStorage.setItem('version', newVersion);
            window.location.reload(true);
        }
    },
    created() {
        const lang = localStorage.selectedLanguage ? localStorage.selectedLanguage : 'no'

        this.$lang.setLang(this.$route.params.lang || lang)

        localStorage.setItem('selectedLanguage', this.$route.params.lang || lang)

        this.selectedLang = this.$route.params.lang || lang

        whoAmI().then((res2) => {
            localStorage.userData = JSON.stringify(res2.data.data)
            const friendlyRoleName = res2.data.data.roles.includes('ROLE_SUPER_ADMIN') ? this.$lang.labels.superadmin : this.$lang.labels.admin
            if (res2.data.data.roles.includes('ROLE_SUPER_ADMIN')) localStorage.superAdminClientId = res2.data.data.client_id
            this.$store.dispatch('userData', {...res2.data.data, friendlyRoleName});
            if (res2.data.data.client_id) {
                getClient(res2.data.data.client_id)
                    .then((res3) => {
                        this.$store.dispatch('clientData', res3.data.data);
                        localStorage.superAdminClientId = res3.data.data.id
                        this.saveClientSelection(res3.data.data, true)
                        this.savedClients = localStorage.savedClients ? JSON.parse(localStorage.savedClients).map(x => {
                            x.isSelected = x.id === Number(localStorage.superAdminClientId)
                            return x
                        }) : []
                    })
                    .catch(() => {
                    })
            }

            if (this.$route.name === 'Login') this.$router.push({name: 'Home', params: {lang: this.$lang.current_lang}})
        })
            .catch(() => {
                if (this.notProtectedRoute()) this.$router.push({
                    name: 'Login',
                    params: {lang: this.$lang.current_lang}
                })
            })
    },
    methods: {
        refreshClients() {
            this.savedClients = localStorage.savedClients ? JSON.parse(localStorage.savedClients).map(x => {
                x.isSelected = x.id === Number(localStorage.superAdminClientId)
                return x
            }) : []
        },
        changeLang(lang) {
            const currentLang = this.$lang.current_lang
            this.$lang.setLang(lang)
            localStorage.setItem('selectedLanguage', lang)
            if (currentLang !== lang) this.$router.push({
                name: this.$route.name,
                params: {lang},
                query: this.$route.query
            })
        },
        loggedIn() {
            return auth.isLoggedIn()
        },
        saveClientSelection(client, noReload = false) {
            const savedClients = localStorage.savedClients ? JSON.parse(localStorage.savedClients) : []
            const isFound = savedClients.find(x => x.id === client.id)
            if (isFound) {
                savedClients.sort(function (x, y) {
                    return x === isFound ? -1 : y === isFound ? 1 : 0;
                })
            } else {
                if (savedClients.length > 5) {
                    savedClients.pop()
                    savedClients.push(client)
                } else {
                    savedClients.push(client)
                }
            }
            const mappedClients = savedClients.map(x => {
                x.isSelected = x.id === client.id
                return x
            })
            localStorage.savedClients = JSON.stringify(mappedClients)
            if (!noReload) window.location.reload(true)
        },
        selectClient(client) {
            superAdminSelectClient(client.id)
                .then((res) => {
                    if (res && res.response && res.response.status !== 200) {
                        this.$store.dispatch('snackBarObj', {
                            snackbar: true,
                            snackColor: 'error',
                            message: 'Error',
                        })
                        return
                    }
                    localStorage.superAdminClientId = client.id
                    this.saveClientSelection(client)
                })
                .catch(() => {
                    this.$store.dispatch('snackBarObj', {
                        snackbar: true,
                        snackColor: 'error',
                        message: 'Error',
                    })
                })
        },
        isShowForRole(item) {
            return !(item.role && this.userData && !this.userData.roles.some(r => item.roles.includes(r)));
        },
        notProtectedRoute() {
            return !['ForgotPassword', 'Login', 'ResetPassword'].includes(this.$route.name)
        },
        logoutFunct() {
            localStorage.removeItem('userData')
            getLogout()
                .then(() => {
                    this.$router.push({name: 'Login', params: {lang: this.$lang.current_lang}})
                })
                .catch((err) => {
                    console.log(err)
                    this.$router.push({name: 'Login', params: {lang: this.$lang.current_lang}})
                })
        }
    }
}
</script>
<style lang="scss">
.name-title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #1560BD;
}

.role-title {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #97ACCB;
}

.v-avatar {
    border-radius: 8px !important;
}

.v-navigation-drawer--mini-variant, .v-navigation-drawer {
    overflow: visible !important;

}

.expand-toggle {
    position: absolute;
    height: 3rem;
    z-index: 1;
    right: -14px;
    top: 35px;
    bottom: 0;
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0px 2px 4px -1px rgba(0, 48, 96, 0.1), 0px 5px 4px rgba(0, 48, 96, 0.04), 0px 1px 10px rgba(0, 48, 96, 0.02);
}

.client-name-text {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #003060;
}

.transition-switch {
    transition: width 0.5s ease-out;
}

.action-text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
}

.image-upload {
    display: flex;
    align-items: center;
    padding: 36px 93px 32px;
    gap: 20px;

    position: relative;
    width: 180px;
    height: 116px;

    &-empty {
        background: #FAFCFE;
        border: 1px dashed #97ACCB;
        border-radius: 4px;
    }
}

.image-exists {
    position: relative;
    background: #FAFCFE;
    border: 1px solid #97ACCB;
    border-radius: 4px;
}

.drop-image {
    position: absolute;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #1252A1;
    left: 24px;
    top: 36px;
}

.or-click {
    position: absolute;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    color: #97ACCB;
    left: 74px;
    top: 66px;
}
</style>

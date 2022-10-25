import Vuex from 'vuex';

export default () =>
    new Vuex.Store({
        state: {
            dark: '1234',
            userData: {
                client_id: null,
                email: '',
                id: null,
                is_active: null,
                is_intercom: null,
                name: '',
                roles: [],
                friendlyRoleName: '',
                profile_image_link: '',
                thumbnail_link: '',
                profile_image: ''
            },
            clientData: {
                id: null,
                name: "",
                email: "",
                address: "",
                homepage: "",
                logo: null,
                logo_link: null,
                thumbnail_link: null,
                sms_count: 0,
                created_at: "",
                companies_count: 0,
                guests_count: 0
            },
            snackBarObj: {
                snackbar: false,
                snackColor: '',
                message: '',
            },
            rowsPerPageItemsGlobal: [10, 100, 250, 500],
            langs: ['en', 'no'],
        },
        mutations: {
            dark(state, data) {
                // eslint-disable-next-line
                state.dark = data;
            },
            userData(state, data) {
                // eslint-disable-next-line
                state.userData = data;
            },
            clientData(state, data) {
                // eslint-disable-next-line
                state.clientData = data;
            },
            snackBarObj(state, data) {
                // eslint-disable-next-line
                state.snackBarObj = data;
            },
        },
        getters: {
            dark(state) {
                return state.dark;
            },
            userData(state) {
                return state.userData;
            },
            clientData(state) {
                return state.clientData;
            },
            rowsPerPageItemsGlobal(state) {
                return state.rowsPerPageItemsGlobal
            },
            snackBarObj(state) {
                return state.snackBarObj
            },
            langs(state) {
                return state.langs
            },
        },
        actions: {
            dark({commit}, data) {
                commit('dark', data);
            },
            userData({commit}, data) {
                commit('userData', data);
            },
            clientData({commit}, data) {
                commit('clientData', data);
            },
            snackBarObj({commit}, data) {
                commit('snackBarObj', data);
            },
        },
    });

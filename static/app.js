const App = {
    data() {
        return {
        }
    },

    methods: {

    },

    components: {
        'test_component': { template: `<h1>Hello this is app</h1>` },
    },

    mounted() {
    }
}

const app = Vue.createApp(App);
// app.mount('#app')
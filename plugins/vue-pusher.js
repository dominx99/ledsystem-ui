import Vue from 'vue'

Vue.use(require('vue-pusher'), {
    api_key: process.env.pusherApiKey,
    options: {
        cluster: process.env.pusherCluster,
        encrypted: true,
    }
});

import Vue from 'vue';
import Router from 'vue-router';
import DataList from '@/views/DataList.vue';   // DataList
import DataDetails from '@/views/DataDetails.vue';     // DataDetails

Vue.use(Router);

export default new Router({
    mode: 'history', // 깔끔한 URL을 위해 history 모드 사용
    routes: [
        {
            path: '/',
            name: 'DataList',
            component: DataList,
        },
        {
            path: '/details/:id',
            name: 'DataDetails',
            component: DataDetails,
        },
    ],
});

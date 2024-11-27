import Vue from 'vue';
import Router from 'vue-router';
// import DataList from '@/views/DataList.vue';   // DataList
// import DataDetails from '@/views/DataDetails.vue';     // DataDetails
// import DataEdit from '@/views/DataEdit.vue';     // DataEdit
// import DataCreate from '@/views/DataCreate.vue';     // DataCreate

Vue.use(Router);

export default new Router({
    mode: 'history', // 깔끔한 URL을 위해 history 모드 사용
    routes: [
        // 지연 로딩을 통해 해당 라우트가 처음 요청될 때만 컴포넌트를 로드하게 하여 초기 로딩시간 단축
        {
            path: '/',
            name: 'DataList',
            // component: DataList,
            component: () => import('@/views/DataList.vue'), // DataList를 동적 로딩
        },
        {
            path: '/details/:id',
            name: 'DataDetails',
            // component: DataDetails,
            component: () => import('@/views/DataDetails.vue'), // DataDetails를 동적 로딩
        },
        {
            path: '/edit/:id',
            name: 'DataEdit',
            // component: DataEdit,
            component: () => import('@/views/DataEdit.vue'), // DataEdit을 동적 로딩
        },
        {
            path: '/create',
            name: 'DataCreate',
            // component: DataCreate,
            component: () => import('@/views/DataCreate.vue'), // DataCreate를 동적 로딩
        },
    ],
});

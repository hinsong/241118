**list 아이템을 클릭**했을 때 해당 **id 값에 해당하는 세부 정보(id, title, body, userId)**를 보여주는 **DataDetails** 컴포넌트를 만드는 과정을 설명하겠습니다. 이미 **Vue Router 설정**이 되어 있다고 하셨으니, 필요한 단계는 다음과 같습니다.

1. **DataDetails 컴포넌트 생성**: 클릭된 항목의 세부 정보를 표시하는 컴포넌트를 만듭니다.
2. **라우터 설정에서 경로 설정**: DataDetails 컴포넌트가 특정 경로에서 렌더링되도록 추가합니다.
3. **클릭 이벤트 설정**: 리스트 아이템을 클릭했을 때 상세 페이지로 이동하도록 클릭 이벤트를 추가합니다.
4. **DataDetails에서 로컬 스토리지 혹은 API 사용해 데이터 불러오기**: 필요한 데이터를 불러와서 렌더링합니다.

### Step 1: `DataDetails` 컴포넌트 생성
먼저, **`DataDetails.vue`** 파일을 생성하여 데이터를 보여주는 컴포넌트를 작성합니다.

**`src/components/DataDetails.vue`**:
```vue
<template>
  <div>
    <h2>Data Details</h2>
    <p><strong>ID:</strong> {{ item.id }}</p>
    <p><strong>Title:</strong> {{ item.title }}</p>
    <p><strong>Body:</strong> {{ item.body }}</p>
    <p><strong>User ID:</strong> {{ item.userId }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {}, // 클릭한 항목의 세부 데이터를 저장할 객체
    };
  },
  created() {
    // 로컬 스토리지에서 데이터를 가져옴
    const itemData = localStorage.getItem('selectedItem');
    if (itemData) {
      this.item = JSON.parse(itemData);
    } else {
      // 로컬 스토리지에 데이터가 없는 경우, 직접 fetch를 통해 가져오는 로직 추가 가능
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      try {
        const itemId = this.$route.params.id;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`);
        if (response.ok) {
          this.item = await response.json();
        } else {
          console.error('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
p {
  margin: 5px 0;
}
</style>
```
- **`item`** 데이터 객체는 세부 정보를 저장합니다.
- **`created()`** 훅에서 로컬 스토리지에 저장된 데이터(`selectedItem`)를 가져옵니다.
- **`fetchData()`**: 만약 로컬 스토리지에 데이터가 없다면 API 호출을 통해 데이터를 가져옵니다.

### Step 2: 라우터 설정 업데이트
**라우터 설정**에 `DataDetails` 컴포넌트를 **경로(route)**로 연결해줍니다. 보통 라우터 설정은 **`router/index.js`** 파일에 있습니다.

**`src/router/index.js`**:
```javascript
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import DataDetails from '@/components/DataDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/details/:id', // 동적 라우트 매칭
      name: 'DataDetails',
      component: DataDetails,
    },
  ],
});
```
- **`path: '/details/:id'`**: **`/details/1`**과 같이 동적으로 **ID**를 경로에서 받아올 수 있도록 설정합니다.
- **`params.id`**를 통해 **클릭된 항목의 ID**를 사용할 수 있습니다.

### Step 3: 리스트 클릭 이벤트 추가
기존 템플릿에서 **리스트 아이템**을 클릭하면 **상세 페이지로 이동**하도록 설정해야 합니다.

**기존 컴포넌트 수정** (`src/components/YourComponent.vue`):
```vue
<template>
  <div>
    <div>
      <input class="get-data-input" placeholder="가져올 데이터 개수 입력">
      <button class="get-data-button" type="button">데이터 가져오기</button>
    </div>
    <div class="list-container">
      <!-- 데이터 목록 -->
      <div 
        class="list-item" 
        v-for="item in paginatedData" 
        :key="item.id"
        @click="showDetails(item)"
      >
        <td><a class="item-id">{{ item.id }}</a></td>
        <td><a class="item-title">{{ item.title }}</a></td>
      </div>

      <!-- 페이지네이션 컴포넌트 -->
      <pagination v-model="currentPage" :records="items.length" :per-page="itemsPerPage" @paginate="updatePage">
      </pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      items: [], // 전체 데이터를 저장할 배열
      currentPage: 1, // 현재 페이지
      itemsPerPage: 10, // 페이지당 항목 수
    };
  },
  computed: {
    // 현재 페이지에 표시할 데이터
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  mounted() {
    this.getlist();
  },

  methods: {
    // 페이지네이션 변경 처리
    updatePage(page) {
      this.currentPage = page;
    },
    async getlist() {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=100`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then(json => this.items = json)
        console.log(this.items)
      } catch (e) {
        console.error(e)
      }
    },
    // 클릭 시 로컬 스토리지에 저장하고 상세 페이지로 이동
    showDetails(item) {
      localStorage.setItem('selectedItem', JSON.stringify(item));
      this.$router.push({ name: 'DataDetails', params: { id: item.id } });
    },
  },
};
</script>
```
- **`@click="showDetails(item)"`**: 리스트 아이템 클릭 시 `showDetails` 메서드를 호출합니다.
- **`showDetails(item)`**:
  - 로컬 스토리지에 클릭된 **아이템의 데이터를 저장**합니다 (`selectedItem`).
  - **Vue Router**를 사용하여 **상세 페이지**로 이동합니다 (`/details/:id`).

### Step 4: `DataDetails` 컴포넌트에서 데이터 표시
이제 사용자가 **리스트 아이템을 클릭**하면 **DataDetails** 컴포넌트로 이동하여 해당 아이템의 **상세 정보**를 볼 수 있습니다. `DataDetails` 컴포넌트는 **로컬 스토리지**나 **API**를 통해 데이터를 불러와 렌더링합니다.

### 요약
1. **DataDetails 컴포넌트**를 생성하여 클릭된 데이터의 세부 정보를 표시합니다.
2. **라우터 설정**을 업데이트하여 `DataDetails`로 이동하는 경로를 추가합니다.
3. **리스트 아이템 클릭 이벤트**를 추가하여, 데이터를 로컬 스토리지에 저장하고 상세 페이지로 이동합니다.
4. **DataDetails**에서 **로컬 스토리지 또는 API**를 통해 데이터를 불러와 화면에 표시합니다.

이 과정에 따라 리스트 아이템을 클릭했을 때 해당 아이템의 **세부 정보 페이지**로 이동하는 기능을 완성할 수 있습니다. 추가적인 도움이 필요하면 언제든지 말씀해 주세요!

**Q1:** 로컬 스토리지를 사용하지 않고, 클릭 시마다 **API**에서 데이터를 가져오는 방식으로 구현한다면 어떤 장단점이 있을까요?

**Q2:** `DataDetails` 컴포넌트에서 **로컬 스토리지** 대신 **Vuex** 스토어를 사용하여 상태 관리를 하는 경우, 어떤 장점이 있을까요?

**Q3:** 상세 페이지로 이동할 때 이전 페이지의 스크롤 위치를 기억하게 하고 다시 돌아올 때 유지하려면 어떻게 해야 할까요?
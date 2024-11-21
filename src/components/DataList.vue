<template>
  <div>
    <div>
      <!--
      * 고도화 방안
      1. 가져올 데이터 수를 입력한다.
      2. v-model을 통해 바인딩
      -->
      <input class="get-data-input" placeholder="가져올 데이터 개수 입력">
      <button class="get-data-button" type="button">데이터 가져오기</button>
    </div>
    <div class="list-container">
      <!-- 데이터 목록 -->
      <div class="list-item" @click="showDetails(item)" v-for="item in paginatedData" :key="item.id">
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
  created() {
    // 예제 데이터 생성
    // this.items = Array.from({ length: 50 }, (_, i) => ({
    //   id: i + 1,
    //   name: `Item ${i + 1}`,
    // }));
  },
};
</script>

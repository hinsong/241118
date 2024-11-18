<template>
  <div>
    <!-- 데이터 목록 -->
    <ul>
      <li v-for="item in paginatedData" :key="item.id">
        <a>{{ item.id }} {{ item.title }}</a>
      </li>
    </ul>

    <!-- 페이지네이션 컴포넌트 -->
    <pagination
      v-model="currentPage"
      :records="items.length"
      :per-page="itemsPerPage"
      @paginate="updatePage"
    ></pagination>
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

    // plusPage() {
    //   this.currentPage += 1
    // },

    // minusPage() {
    //   this.currentPage -= 1
    // },
    // 데이터 총개수는 100개 -> ?
    // 데이터는 10개씩 로드하기 -> ? 
    async getlist() {
      try {

      await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=100', {
        method: 'GET',
      })
      .then(response => response.json())
      .then(json => this.items = json)
      console.log(this.items)
      
      } catch(e) {
        console.error(e)
      }

    }


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

<style>
/* .pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
} */

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
  background: #007bff;
  color: white;
}
</style>
<template>
  <div class="list-container">
    <!-- 데이터 목록 -->
      <div class="list-item" v-for="item in paginatedData" :key="item.id">
        <td ><a class="item-id">{{ item.id }}</a></td>
        <td ><a class="item-title">{{ item.title }}</a></td>
      </div>


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
.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 리스트 항목 사이의 간격 */
  padding: 1rem;
  max-width: 800px;
  margin: auto; /* 가운데 정렬 */
}

.list-item {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: #fff;
}

.list-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.item-id {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  text-align: left;
}

.item-title {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  text-align: right;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

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
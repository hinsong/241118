<template>
  <div>
    <!-- 데이터 목록 -->
    <ul>
      <li v-for="item in paginatedData" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <!-- 페이지네이션 컴포넌트 -->
    <pagination
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
      itemsPerPage: 5, // 페이지당 항목 수
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
  methods: {
    // 페이지네이션 변경 처리
    updatePage(page) {
      this.currentPage = page;
    },
  },
  created() {
  },
};
</script>
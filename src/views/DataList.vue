<!--
불러온 데이터를 보여주는 메인페이지 DataList
리스트 요소 클릭을 통해 상세정보 페이지(DataDetails)로 이동 가능
등록하기 버튼을 통해 새 데이터를 만드는 DataCreate로 이동 가능
-->
<template>
  <div>
    <div>
      <!-- 데이터를 등록하는 페이지인 DataCreate로 이동하는 버튼 -->
      <button type="button" @click="$router.push({ name: 'DataCreate' })">등록하기</button>
    </div>
    <div class="list-container">
      <!-- 
      * 데이터 목록
      - 각 리스트를 클릭하면 해당 item의 detail을 보여주는 페이지로 이동
      -->
      <div class="list-item" @click="showDetails(item)" v-for="item in paginatedData" :key="item.id">
        <span class="item-id">{{ item.id }}</span> - <span class="item-title">{{ item.title }}</span>
      </div>


      <!-- 페이지네이션 컴포넌트 -->
      <pagination v-model="currentPage" :records="items.length" :per-page="itemsPerPage" @paginate="updatePage">
      </pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";  // 페이지네이션 가져오기
import axios from "axios";  // axios 가져오기

export default {
  components: {
    Pagination, // 페이지네이션 컴포넌트 가져오기
  },

  // 데이터 입력
  data() {
    return {
      items: [], // 전체 데이터를 저장할 배열
      currentPage: 1, // 현재 페이지
      itemsPerPage: 10, // 페이지당 항목 수
    };
  },

  // computed: 반응형 데이터를 계산할 때 사용된다.
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage; // 현재 페이지에서 보여줄 데이터의 시작 인덱스
      const end = start + this.itemsPerPage; // 현재 페이지에 표시될 데이터의 끝 인덱스
      return this.items.slice(start, end); // 전체 데이터 배열에서 start 부터 end 까지 잘라냄
    },
  },

  // 컴포넌트가 DOM에 연결된 직후 호출
  mounted() {
    this.getlist();
  },

  // 컴포넌트에서의 메서드를 정의
  methods: {
    // 페이지네이션 변경 처리
    updatePage(page) {
      this.currentPage = page;
    },

    // fetch 사용하여 데이터 나열
    // async getlist() {
    //   try {
    //     await fetch(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas`, {
    //       method: 'GET',
    //     })
    //       .then(response => response.json())
    //       .then(json => this.items = json)
    //     console.log(this.items)

    //   } catch (e) {
    //     console.error(e)
    //   }
    // },

    // axios 사용하여 데이터 나열
    async getlist() {
      try {
        const response = await axios // 서버로부터 온 전체 HTTP 응답 객체(data, status, statusText, headers, config)를 resopnse 변수에 저장 
          .get(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas`)  // mockingapi 사용하여 저장된 데이터를 불러옴
          // await 사용하기 때문에 .then 메서드는 사용할 필요 없음

        const data = response.data; // data 변수에 mockingapi에서 불러온 response객체 중 data 저장

        if (data) { // 데이터가 data 변수에 들어와 있다면
          this.items = data;  // items에 data를 입력
        }
        else {  // 데이터가 data 변수에 들어와 있지 않다면
          throw new Error('undefined data');  // 에러 발생
        }
      } catch (e) {
        console.error(e)
      }
    },

    // 클릭 시 로컬 스토리지에 저장하고 상세 페이지로 이동
    showDetails(item) {
      localStorage.setItem('selectedItem', JSON.stringify(item)); // 로컬 스토리지에  JavaScript 객체인 item을 JSON 문자열로 변환하여 입력
      this.$router.push({ name: 'DataDetails', params: { id: item.id } });  // 이후 데이터 상세보기 페이지로 이동
    },
  },
};
</script>

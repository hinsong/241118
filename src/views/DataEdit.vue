<!-- 선택한 데이터의 정보를 수정하는 DataEdit 페이지 -->

<template>
  <div>
    <div>
      <h2>~데이터 수정하기~</h2>
      <!-- input 창에 입력한 데이터를 item 데이터에 양방향 바인딩 -->
      <p><strong>Id:</strong></p><input v-model="item.id" class="get-data-input" readonly disabled>
      <p><strong>Title:</strong></p><input v-model="item.title" class="get-data-input" placeholder="제목을 입력하세요">
      <p><strong>Body:</strong></p><input v-model="item.body" class="get-data-input" placeholder="내용을 입력하세요">
      <p><strong>User ID:</strong></p><input v-model="item.userId" class="get-data-input" placeholder="유저 아이디를 입력하세요">
    </div>
    <div>
      <button @click="edit" type="button" style="margin-top: 5px;">수정하기</button> <!-- 수정하기 버튼 클릭 시 edit 함수 실행-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';  // axios 임포트, 전역으로 가져오면 좋을 듯 함.

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
      this.item = JSON.parse(itemData); // item에 로컬스토리지의 데이터를 JSON형식으로 가져옴
    } else {
      // 로컬 스토리지에 데이터가 없는 경우, 데이터가 존재하지 않는다는 모달과 에러 생성
      alert('데이터가 존재하지 않습니다.')
      throw new Error('Data not found')
    }
  },
  methods: {
    // 데이터 수정하는 함수
    async edit() {
      const params = {  // 수정할 데이터를 params객체에 저장
        title: this.item.title,
        body: this.item.body,
        userId: this.item.userId,
      }
      try {
        const itemId = this.item.id;  // item에서 id값 가져옴
        // const itemId = this.$route.params.id;  // url에서 id값 파싱
        const response = await axios
          .put(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas/${itemId}`, params)  // 해당 id값과 params에 대응되는 데이터를 수정 요청

        console.log(response);
        const data = response.data;
        
        if (data) { // data가 존재한다면
          alert('데이터가 성공적으로 수정되었습니다.')  // 데이터가 성공적으로 수정되었음을 알리는 모달
          return this.$router.push({ name: 'DataList' })  // 데이터 수정이 성공한 후 DataList 페이지로 이동
        }
        else {
          alert('데이터를 수정하는 중 문제가 발생했습니다.')
          throw new Error('Failed editing data')
        }
      } catch(e) {
        console.log(e)
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

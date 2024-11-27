<!-- 데이터를 등록할 수 있는 DataCreate 페이지 -->

<template>
  <div>
    <div>
      <h2>~데이터 등록하기~</h2>
      <!-- input 창에 입력한 데이터를 item 데이터에 양방향 바인딩 -->
      <p><strong>Title:</strong></p><input v-model="item.title" class="get-data-input" placeholder="제목을 입력하세요">
      <p><strong>Body:</strong></p><input v-model="item.body" class="get-data-input" placeholder="내용을 입력하세요">
      <p><strong>User ID:</strong></p><input v-model="item.userId" class="get-data-input" placeholder="유저 아이디를 입력하세요">
    </div>
    <div>
      <button @click="postData" type="button" style="margin-top: 5px;">등록하기</button>  <!-- 등록하기 버튼 클릭 시 postData 함수 실행-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // item: 클릭한 항목의 세부 데이터를 저장할 객체
      // input 창에서 입력한 데이터 바인딩
      item: {
        title: null,
        body: null,
        userId: null,
      }, 
    };
  },

  created() {
  },

  methods: {
    // 입력된 데이터 등록하는 함수
    async postData() {
      const params = {  // 서버에 post할 데이터를 params객체에 저장
        title: this.item.title,
        body: this.item.body,
        userId: this.item.userId,
      }
      try {
        const response = await axios
          .post(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas`, params) // 해당 url에 params 객체 post 처리

        if (response.status === 201) {  // 201: 데이터 생성(POST)이 성공했을 때
          const data = response.data; // data 변수에 post한 값 입력
          console.log('등록된 데이터: ', data);
          alert('데이터가 성공적으로 등록되었습니다.'); // 데이터가 성공적으로 등록되었음을 알리는 모달
          this.$router.push({ name: 'DataList' }); // 데이터 등록이 성공한 후 DataList 페이지로 이동
        }
        else {  // 데이터 생성이 실패했을 때
          console.error('데이터 등록에 실패했습니다.'); // 데이터 등록이 실패했음을 알리는 모달
          throw new Error('Failed posting data')  // 에러 던짐
        }
      } catch(error) {
        console.log(error)
      }
    }
  }
};
</script>

<style>

</style>

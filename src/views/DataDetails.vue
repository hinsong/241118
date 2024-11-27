<!-- 선택한 데이터의 세부정보를 보여주는 DataDetails 페이지 -->

<template>
  <div>
    <button type="button" @click="$router.push({ name: 'DataEdit' })">수정하기</button> <!-- 수정하기를 클릭하면 DataEdit 페이지로 이동 -->
    <button type="button" @click="deleteData">삭제하기</button> <!-- 삭제하기를 클릭하면 deleteData 함수 실행 -->
    <h2>데이터 세부정보</h2>
    <!-- 로컬스토리지에서 item에 받은 데이터를 바인딩 -->
    <p><strong>ID:</strong> {{ item.id }}</p>
    <p><strong>Title:</strong> {{ item.title }}</p>
    <p><strong>Body:</strong> {{ item.body }}</p>
    <p><strong>User ID:</strong> {{ item.userId }}</p>

  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      item: {}, // 클릭한 항목의 세부 데이터를 저장할 객체
    };
  },

  created() {
    // 페이지가 로드될 때 로컬 스토리지에서 데이터를 가져와 초기화
    const itemData = localStorage.getItem('selectedItem');  // itmeData 변수에 로컬스토리지에 저장된 데이터 저장
    if (itemData) { // 로컬스토리지에 저장된 데이터가 존재하면
      this.item = JSON.parse(itemData); // item 변수에 JSON 형식으로 itemData 데이터 저장
    } else {  // 데이터가 없으면
      throw new Error('Not found data') // 에러 던지기
    }
  },

  methods: {
    // 로컬 데이터 삭제와 서버의 데이터 삭제 요청을 처리하는 함수
    async deleteData() {
      try {
        const response = await axios // 마찬가지로 response에 HTTP 응답 객체 할당(data, status, statusText, headers, config)
          .delete(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas/${this.item.id}`) // axios 사용하여 데이터 삭제 요청 보내기

        if (response.status === 200 || response.status === 204) { // 200 : 요청이 성공했을 때 || 204 : 삭제가 성공적으로 완료되었고, 반환할 콘텐츠가 없을 때
          localStorage.removeItem('selectedItem') // 서버에서 데이터 삭제가 성공적으로 이루어진 후에 로컬 스토리지에서 데이터를 지우게 함
          alert('해당 데이터가 삭제되었습니다.')  // 데이터가 삭제되었음을 알리는 모달
          this.$router.push({ name: 'DataList' }) // 데이터 삭제 후 DataList 페이지로 이동
        }
        else {
          alert('삭제 요청이 실패했습니다. 다시 시도해 주세요.')  // 데이터 삭제에 실패했음을 알리는 모달
          throw new Error('삭제 요청이 실패했습니다.'); // 삭제 요청 실패 시 에러 던짐
        }
      } catch (e) {
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

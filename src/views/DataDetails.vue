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
    // 로컬 스토리지에서 데이터를 가져옴
    const itemData = localStorage.getItem('selectedItem');  // itmeData 변수에 로컬스토리지에 저장된 데이터 저장
    if (itemData) { // 로컬스토리지에 저장된 데이터가 존재하면
      this.item = JSON.parse(itemData); // item 변수에 JSON 형식으로 itemData 데이터 저장
    } else {  // 데이터가 없으면
      throw new Error('Not found data') // 에러 던지기
    }
  },
  methods: {
    async deleteData() {
      try {
        const data = await axios
          .delete(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas/${this.item.id}`)
          .then((response) => response.data);

        if (data) {
          localStorage.removeItem('selectedItem')
          alert('해당 데이터가 삭제되었습니다.')
          return this.$router.push({ name: 'DataList' })
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

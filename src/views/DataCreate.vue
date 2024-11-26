<template>
  <div>
    <div>
      <h2>~데이터 등록하기~</h2>
      <p><strong>Title:</strong></p><input v-model="item.title" class="get-data-input" placeholder="제목을 입력하세요">
      <p><strong>Body:</strong></p><input v-model="item.body" class="get-data-input" placeholder="내용을 입력하세요">
      <p><strong>User ID:</strong></p><input v-model="item.userId" class="get-data-input" placeholder="유저 아이디를 입력하세요">
    </div>
    <div>
      <button @click="postData" type="button" style="margin-top: 5px;">등록하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        title: null,
        body: null,
        userId: null,
      }, // 클릭한 항목의 세부 데이터를 저장할 객체
    };
  },
  created() {
  },
  methods: {
    async postData() {
      try {
        const response = await fetch(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // JSON 형식임을 명시
          },
          body: JSON.stringify(this.item), // item 객체를 JSON 문자열로 변환
        });
        if (response.ok) {
          const data = await response.json();
          console.log('등록 성공:', data);
          alert('데이터가 성공적으로 등록되었습니다.');
          return this.$router.push({ name: 'DataList' })
        } else {
          console.error('데이터 등록에 실패했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }
  },
};
</script>

<style>

</style>

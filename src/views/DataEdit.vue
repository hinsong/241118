<template>
  <div>
    <div>
      <h2>~데이터 수정하기~</h2>
      <p><strong>Id:</strong></p><input v-model="item.id" class="get-data-input" readonly disabled>
      <p><strong>Title:</strong></p><input v-model="item.title" class="get-data-input" placeholder="제목을 입력하세요">
      <p><strong>Body:</strong></p><input v-model="item.body" class="get-data-input" placeholder="내용을 입력하세요">
      <p><strong>User ID:</strong></p><input v-model="item.userId" class="get-data-input" placeholder="유저 아이디를 입력하세요">
    </div>
    <div>
      <button @click="edit" type="button" style="margin-top: 5px;">수정하기</button>
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
      this.item = JSON.parse(itemData);
    } else {
      // 로컬 스토리지에 데이터가 없는 경우, 직접 fetch를 통해 가져오는 로직 추가 가능
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      try {
        const itemId = this.$route.params.id;
        const response = await fetch(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas/${itemId}`);
        if (response.ok) {
          this.item = await response.json();
        } else {
          console.error('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    },

    // 데이터 수정하기
    async edit() {
      const params = {
        title: this.item.title,
        body: this.item.body,
        userId: this.item.userId,
      }
      try {
        const itemId = this.$route.params.id;
        const data = await axios
          .put(`https://67460bfc512ddbd807faa73a.mockapi.io/api/v1/datas/${itemId}`, params)
          .then((response) => response.data)

        if (data) {
          alert('데이터가 성공적으로 수정되었습니다.')
          return this.$router.push({ name: 'DataList' })
        }
        else {
          alert('데이터를 수정하는 중 문제가 발생했습니다.')
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

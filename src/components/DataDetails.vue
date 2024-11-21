<template>
  <div>
    <h2>Data Details</h2>
    <p><strong>ID:</strong> {{ item.id }}</p>
    <p><strong>Title:</strong> {{ item.title }}</p>
    <p><strong>Body:</strong> {{ item.body }}</p>
    <p><strong>User ID:</strong> {{ item.userId }}</p>
  </div>
</template>

<script>
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
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`);
        if (response.ok) {
          this.item = await response.json();
        } else {
          console.error('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
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

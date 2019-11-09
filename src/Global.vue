<template>
    <div></div>
</template>

<script>
export default {
  name: 'Global',
  user: {
    id: '',
    name: '',
    password: '',
    departmentId: '',
    telphone: '',
    sex: '',
    grade: '',
    integral: ''
  },
  data: function () {
    return {
      user: {
        id: '',
        name: '',
        password: '',
        departmentId: '',
        telphone: '',
        sex: '',
        grade: '',
        integral: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 6,
        startRow: 1,
        endRow: 1,
        total: 1,
        pages: 1,
        prePage: 0,
        nextPage: 2,
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: true,
        lastPage: 1,
        firstPage: 1
      }
    }
  }
}
</script>

<style scoped>

</style>

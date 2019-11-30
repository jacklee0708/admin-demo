<template>
  <el-pagination
    @size-change="limitChange"
    @current-change="pageChange"
    :current-page="query.page"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="query.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
  export default {
    name: "UserPagination",
    props: {
      query: {
        type: Object,
        default() {
          return {}
        }
      },
      total: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      limitChange(limit) {
        this.$bus.$emit("limitChange", limit)
      },
      pageChange(page) {
        this.$bus.$emit("pageChange", page)
      }
    }
  }
</script>

<style scoped>

</style>
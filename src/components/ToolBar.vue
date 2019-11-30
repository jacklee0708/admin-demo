<template>
  <el-row :gutter="10">
    <el-col :span="8" v-if="needSearch">
      <el-input placeholder="请输入内容" v-model="searchVal" clearable @clear="inputClear"
                @keyup.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" icon="el-icon-plus" @click="add"/>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "ToolBar",
    props:{
      needSearch:{
        type:Boolean,
        default(){
          return true
        }
      }
    },
    data() {
      return {
        searchVal: ""
      }
    },
    methods: {
      inputClear() {
        this.$bus.$emit("inputClear")
      },
      search() {
        this.$bus.$emit("search", this.searchVal)
      },
      add() {
        this.$bus.$emit("add")
      }
    }
  }
</script>

<style scoped>

</style>
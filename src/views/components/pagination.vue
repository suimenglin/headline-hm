<template>
  <el-pagination
    background
    :page-size="materialListObj.per_page"
    layout="prev, pager, next, jumper"
    :total="materialListObj.total_count"
  ></el-pagination>
</template>

<script>
export default {}
</script>

<style>
</style>

<template>
  <div class="flightListTitle">
    <el-row type="flex" justify="space-between">
      <el-col :span="6" class="flights-content">航空信息</el-col>
      <el-col :span="6" class="flights-content">起飞时间</el-col>
      <el-col :span="6" class="flights-content">到达时间</el-col>
      <el-col :span="6" class="flights-content">价格</el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.flightListTitle {
  padding: 0 15px;
  border: 1px #ddd solid;
  background: #f6f6f6;
  height: 38px;
  line-height: 38px;
  color: #666;
  margin-bottom: 10px;
  font-size: 12px;
  .flights-content {
    text-align: center;
  }
}
</style>
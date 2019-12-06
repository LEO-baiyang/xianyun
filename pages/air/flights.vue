<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 主体  -->
      <el-col class="flightsList" :span="18">
        <!-- 过滤筛选 -->
        <div></div>
        <!-- 列表头部 -->
        <FlightsListHeader />
        <!-- 列表内容 -->
        <div></div>
      </el-col>
      <!-- 侧边 -->
      <el-col class="aside" :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
// 引入列表头部部分
import FlightsListHeader from "@/components/air/flightsListHeader.vue";
export default {
  components: {
    FlightsListHeader
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .flightsList {
    // width: 745px;
    font-size: 14px;
    // background-color: orange;
    margin-right: 15px;
  }
  .aside {
    // width: 240px;  
    height: 300px;
    background-color: pink;
  }
}
</style>
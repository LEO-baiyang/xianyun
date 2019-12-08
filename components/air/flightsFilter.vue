<template>
  <div class="flightsFilter">
    <el-row type="flex" justify="space-between" class="filter-top" align="middle">
      <!-- 标题 -->
      <el-col :span="8">
        单程：广州 - 上海
        /
        2019-12-07
      </el-col>
      <!-- 起飞机场 -->
      <el-col :span="4">
        <el-select v-model="airPort" placeholder="起飞机场" size="mini">
          <el-option
            v-for="(item,index) in flightsInfo.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
      <el-col :span="4">
        <el-select v-model="airTime" placeholder="起飞时间" size="mini">
          <el-option
            v-for="(item,index) in flightsInfo.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select v-model="airCompany" placeholder="航空公司" size="mini">
          <el-option
            v-for="(item,index) in flightsInfo.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 机型 -->
      <el-col :span="4">
        <el-select v-model="airType" placeholder="机型" size="mini">
          <el-option
            v-for="(item,index) in flightsSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 按钮 -->
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flightsInfo"],
  data() {
    return {
      airPort: "", // 起飞机场
      airTime: "", // 起飞时间
      airCompany: "", //航空公司
      airType: "", // 机型
      flightsSize: [
        //   每一个对象都是一个尺寸,包括了 label 跟 value
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  methods: {
    handleFiltersCancel() {}
  }
};
</script>

<style lang="less" scoped>
.flightsFilter {
  margin-bottom: 20px;
  .filter-top {
    > div {
      /deep/ .el-select {
        margin-left: 10px;
      }
    }
  }
  .filter-cancel {
    margin-top: 10px;
  }
}
</style>
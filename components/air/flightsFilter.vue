<template>
  <div class="flightsFilter">
    <el-row type="flex" justify="space-between" class="filter-top" align="middle">
      <!-- 标题 -->
      <el-col :span="8">
        {{flightsData.info.departCity}} - {{flightsData.info.destCity}}
        /
        {{flightsData.info.departDate}}
      </el-col>
      <!-- 起飞机场 -->
      <el-col :span="4">
        <el-select
          v-model="airPort"
          placeholder="起飞机场"
          size="mini"
          @change="runFilters"
          :clearable="true"
        >
          <el-option
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
      <el-col :span="4">
        <el-select
          v-model="airTime"
          placeholder="起飞时间"
          size="mini"
          @change="runFilters"
          :clearable="true"
        >
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select
          v-model="airCompany"
          placeholder="航空公司"
          size="mini"
          :clearable="true"
          @change="runFilters"
        >
          <el-option
            v-for="(item,index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 机型 -->
      <el-col :span="4">
        <el-select
          v-model="airType"
          placeholder="机型"
          size="mini"
          :clearable="true"
          @change="runFilters"
        >
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
  // 从父组件传递过来的数据，永远都是满数据，需要在父组件中定义两个变量，这两个变量，一个里面存储的永远都是满数据，这个变量也是传递到子组件的数据，一个是根据条件来渲染页面的数据
  props: ["flightsData"], // 这个数据是从父组件的缓存数据传递过来的
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
    // 过滤
    runFilters() {
      // console.log(123);
      // 先将原始数据存储到变量中
      let newFlightsList = this.flightsData.flights;
      // 修改起飞机场筛选条件
      if (this.airport) {
        newFlightsList = this.handleAirport(newFlightsList);
      }
      // 修改时间筛选条件
      if (this.airTime) {
        newFlightsList = this.handleAirTime(newFlightsList);
      }
      // 修改航空公司筛选条件
      if (this.airCompany) {
        newFlightsList = this.handleAirCompany(newFlightsList);
      }
      // 修改机型少选条件
      if (this.airType) {
        newFlightsList = this.handleAirType(newFlightsList);
      }
      this.$emit("setFlightsData", newFlightsList);
    },
    // 时间筛选
    handleAirTime(oldFlightsList) {
      // console.log(oldFlightsList);
      var newFlightsList = oldFlightsList.filter(element => {
        // 先获取飞机起飞时间的小时数据
        var depTimeHour = +element.dep_time.split(":")[0];
        // console.log(depTimeHour);
        // this.flightTimes 是一个字符串 "6,12"
        // 先切割成一个数组
        var before = +this.airTime.split(",")[0];
        var after = +this.airTime.split(",")[1];
        // 数据量少的时候可以写死一个小范围进行测试
        // var before = 21;
        // var after = 22;
        return depTimeHour >= before && depTimeHour < after;
      });
      return newFlightsList;
    },
    // 机场筛选
    handleAirport(oldFlightsList) {
      let newFlightsList = oldFlightsList.filter(element => {
        // 筛选条件，将所有起飞机场符合条件的存到新数组中
        return element.org_airport_name == this.airport;
      });
      return newFlightsList;
    },
    // 航空公司筛选
    handleAirCompany(oldFlightsList) {
      let newFlightsList = oldFlightsList.filter(element => {
        // 判断原始数据中是否有满足当前条件的，有的就将其存到新数组中
        return element.airline_name == this.airCompany;
      });
      return newFlightsList;
    },
    // 机型筛选
    handleAirType(oldFlightsList) {
      let newFlightsList = oldFlightsList.filter(
        element => element.plane_size == this.airType
      );
      return newFlightsList;
    },
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
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
        <FlightsList
          v-for="(item,index) in dataList"
          :key="index"
          :index="index"
          :allIndex="allIndex"
          :data="item"
          @showRec="getRecIndex"
        />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightList.length"
          v-if="dataList.length>0"
          class="page-size"
        ></el-pagination>
        <div v-else-if="!loading">本页暂无数据</div>
      </el-col>

      <!-- 侧边 -->
      <el-col class="aside" :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
// 引入列表头部部分
import FlightsListHeader from "@/components/air/flightsListHeader.vue";
import FlightsList from "@/components/air/flightsList.vue";
export default {
  data() {
    return {
      loading: false,
      flightsData: {}, // 航班总数据
      flightList: [], // 航班列表数据，用于循环生成列表内容部分
      allIndex: 0, // 列表项所有的index
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的条数
      dataList: [] // 这个数组里面存储的是每一页的数据
    };
  },
  components: {
    FlightsListHeader,
    FlightsList
  },
  mounted() {
    // 页面一加载就需要生成列表数据
    this.$axios({
      url: "/airs",
      // 向服务器传递的数据是通过url地址栏获取的，一共有五个参数
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      // 如果请求发送成功
      this.flightData = res.data;
      this.flightList = this.flightData.flights;
      console.log(this.flightList);
      this.setDataList();
      this.loading = false;
    });
  },
  methods: {
    getRecIndex(index) {
      console.log(index);
      // 父组件监听子组件的点击事件，获取子组件传递过来的index
      this.allIndex = index;
      console.log(this.allIndex);
    },
    // 处理页码大小的函数,每页显示条数
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.setDataList();
    },
    // 当前页变化时的函数
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.setDataList();
    },
    // 将需要渲染的数据存储到一个数组中
    setDataList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      // 数组 slice 方法接受两个参数, 第一个是切割的开始(包括当前index), 第二个是切割的结束(不包过当前 index),
      this.dataList = this.flightList.slice(start, end);
      console.log(this.dataList);
    }
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
    .page-size {
      width: 100%;
      text-align: center;
    }
  }
  .aside {
    // width: 240px;
    height: 300px;
    background-color: pink;
  }
}
</style>
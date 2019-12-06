<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 第一部分：搜索和banner -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索 -->
      <SearchForm></SearchForm>

      <!-- banner -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>

    <!-- 第二部分：售后项目 -->
    <el-row type="flex" justify="space-between" class="sale-pro">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="chuxing">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 第三部分：特价机票 -->
    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>
    <div class="sale-list">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col v-for="(value,index) in sales" :key="index" :span="6">
          <nuxt-link
            :to="`/air/flights?departCity=${value.departCity}&departCode=${value.departCity}&destCity=${value.destCity}&destCode=${value.destCode}&departDate=${value.departDate}`"
          >
            <img :src="value.cover" alt />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{value.departCity}}-{{value.destCity}}</span>
              <span>￥699</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import SearchForm from "@/components/air/airsearch";
export default {
  data() {
    return {
      sales: []
    };
  },
  components: {
    SearchForm
  },
  mounted() {
    // 发送请求获取推荐机票列表
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      // 如果请求发送成功，获取数据渲染页面
      console.log(res);
      const { data } = res.data;
      this.sales = data;
    });
  }
};
</script>

<style lang="less" scoped>
* {
  vertical-align: middle;
}
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: orange;
    span {
      font-size: 20px;
    }
  }
}
.sale-pro {
  height: 58px;
  border: 1px solid #ddd;
  margin: 15px 0;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .iconfont {
    font-size: 30px;
  }
  span {
    font-size: 16px;
  }
  .chuxing {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
}
.air-sale-title {
  margin: 15px 0;
  font-size: 20px;
  font-weight: normal;
  color: #409eff;
  span {
    font-size: 20px;
  }
}
.sale-list {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 50px;
  .air-sale-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
      }
      .layer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
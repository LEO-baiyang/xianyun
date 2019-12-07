<template>
  <div class="flights-List">
    <!-- 显示的机票详情 -->
    <div @click="showRecommends">
      <el-row type="flex" align="middle" class="flight-info">
        <!-- 航空信息 -->
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <!-- 航班信息 -->
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <!-- 起飞时间 -->
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}</span>
            </el-col>
            <!-- 历时 -->
            <el-col :span="8" class="flight-time">
              <span>{{duration}}</span>
            </el-col>
            <!-- 到达机场 -->
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <!-- 价格 -->
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>
    <!-- 隐藏的座位信息 -->
    <div class="flight-recommend" v-if="showRecommend">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    // 接收从父组件传递过来的数据
    // 父组件发送ajax请求获取列表内容，在子组件进行渲染，在父组件引用子组件的部分循环生成列表
    // 父组件接收整个列表所有项的index，用于在点击事件触发的时候判断当前的index
    "data", // 列表内容
    "index", //  列表中被点击的项的index
    "allIndex" //  父组件中传递过来的所有的index
  ],
  data() {
    // console.log(this.allIndex);
    return {
      // 定义一个变量用于隐藏或展示座位信息
      showRecommend: false
    };
  },
  computed: {
    // 在这里计算时间差，即航班航行时间
    // 根据服务器返回的数据，获取到达时间和起飞时间，将其转换成时间戳的形式进行计算，然后再将结果转换成正常的格式渲染
    // 时间戳 = date.getTime()  getTime()返回数值的单位是毫秒。
    // 时间戳定义为从格林威治时间1970年01月01日00时00分00秒起至现在的总秒数
    duration() {
      var arr_timestamp = new Date(this.data.arr_datetime).getTime();
      var dep_timestamp = new Date(this.data.dep_datetime).getTime();
      // 计算差值
      var duration = arr_timestamp - dep_timestamp;
      // 如果插值小于0，意味着跨过了凌晨，需要在到达时间上加上24小时
      if (duration < 0) {
        var msOfDay = 24 * 60 * 60 * 1000;
        duration = arr_timestamp + msOfDay - dep_timestamp;
      }
      // console.log(duration); // 计算完成后的差值是8400000毫秒
      // 秒
      var durationMins = duration / 1000 / 60;
      // console.log(durationMins); // 转换成分钟数就是 140 分钟
      // 小时的转换
      var hours = Math.floor(durationMins / 60);
      // console.log(hours); //  140分钟转换成小时数就是 2 小时
      // 分钟的转换
      var minutes = durationMins % 60;
      // console.log(minutes); //140分钟转换成小时数后剩下的就是分钟数20 分钟
      return hours + "小时" + minutes + "分";
    }
  },
  watch: {
    allIndex() {
      // 监听index，如果当前点击项的index在父组件中列表项中的是不匹配的，那么就不显示
      if (this.index != this.allIndex) {
        this.showRecommend = false;
      }
    }
  },
  methods: {
    // 点击事件，点击当前项，显示当前的隐藏项，其他的不显示
    showRecommends() {
      // 触发点击事件，将当前被点击的项的index发送给父组件
      this.$emit("showRec", this.index);
      // 点击事件，改变当前点击项的状态
      this.showRecommend = !this.showRecommend;
    }
  }
};
</script>

<style lang="less" scoped>
.flights-List {
  border: 1px #ddd solid;
  margin-bottom: 10px;
  .flight-info {
    padding: 15px;
    cursor: pointer;
    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }
  .flight-info-center {
    padding: 0 30px;
    text-align: center;
    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }
    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }
  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
  .flight-recommend {
    background: #f6f6f6;
    border: 1px solid #eee;
    padding: 0 20px;
    .flight-sell {
      border-bottom: 1px #eee solid;
      padding: 10px 0;
      &:last-child {
        border-bottom: none;
      }
      .flight-sell-left {
        font-size: 12px;
        span {
          color: green;
        }
      }
      .price {
        font-size: 20px;
        color: orange;
      }

      .choose-button {
        text-align: center;
        color: #666;
        button {
          display: block;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
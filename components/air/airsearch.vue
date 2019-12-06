<template>
  <!-- 搜索表单 -->
  <div class="searchForm">
    <!-- 切换tab -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in this.tabs"
        :key="index"
        :class="{active: index === currentTab}"
        @click="handleSearchTab(item, index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 表单 -->
    <el-form label-width="80px" class="search-form-content" ref="form">
      <!-- 出发城市 -->
      <el-form-item label="出发城市">
        <!-- fetch-suggestions:返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 -->
        <!-- trigger-on-focus:是否在输入框 focus 时显示建议列表 -->
        <!-- @select:点击选中建议项时触发 -->
        <el-autocomplete
          class="el-autocomplete"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          :trigger-on-focus="false"
          @select="handleDepartSelect"
          v-model="cityForm.departCity"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          :trigger-on-focus="false"
          @select="handleDestSelect"
          v-model="cityForm.destCity"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          style="width: 100%;"
          placeholder="请选择出发时间"
          @change="handleDate"
          v-model="cityForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <!-- 切换按钮 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      // cityList: [],
      cityForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // tab栏切换
    handleSearchTab(item, index) {
      // this.currentTab = index;
      if (index == 1) {
        this.$confirm("目前暂不支持往返，请使用单程搜索！", "提示", {
          confirmButtonText: "哦",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    // 出发城市获取焦点时触发
    // value 是关键字，cb是回调函数，接收要展示的列表
    async queryDepartSearch(value, callback) {
      // this.$axios({
      //   url: "/airs/city",
      //   params: {
      //     name: value
      //   }
      // }).then(res => {
      //   if (!value) {
      //     return [];
      //   }
      //   // console.log(res);
      //   const { data } = res.data;
      //   console.log(data);
      //   const cityList = data.map(res => {
      //     return {
      //       ...data,
      //       value: res.name.replace("市", "")
      //     };
      //   });
      //   console.log(cityList);
      //   if (cityList.length > 0) {
      //     this.cityForm.departCity = cityList[0].value;
      //     this.cityForm.departCode = cityList[0].sort;
      //   }
      //   callback(cityList);
      // });
      let arr = await this.querySearch(value);
      if (arr.length > 0) {
        // 不在下拉列表中选择，则默认选择第一项
        // this.cityForm.departCity = arr[0].value;
        this.cityForm.departCode = arr[0].sort;
      }
      callback(arr);
    },
    // 到达城市获取焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch(value, callback) {
      let arr = await this.querySearch(value);
      if (arr.length > 0) {
        // 不在下拉列表中选择，则默认选择第一项
        // this.cityForm.destCity = arr[0].value;
        this.cityForm.destCode = arr[0].sort;
      }
      callback(arr);
    },
    // 将获取城市列表封装函数
    // queryString是关键字
    querySearch(queryString) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: queryString
        }
      }).then(res => {
        if (!queryString) {
          return [];
        }
        // console.log(res);
        const { data } = res.data;
        // console.log(data);

        // 下拉提示列表必须要有value字段
        const citys = data.map(res => {
          return {
            ...res,
            value: res.name.replace("市", "")
          };
        });
        // 使用过滤器函数，将数组中所有没有sort的数据去掉
        // const cityList = citys.filter(element => {
        //   // 过滤器里面，所有合法的数据应该return true
        //   if (element.sort) {
        //     return true;
        //   }
        //   return element.sort;
        // });
        // 简写
        const cityList = citys.filter(element => element.sort);
        return cityList;
      });
    },
    // 出发城市下拉选择时触发
    // item代表当前选中项
    handleDepartSelect(item) {
      // console.log(item);
      this.cityForm.departCity = item.value;
      this.cityForm.departCode = item.sort;
    },
    // 到达城市下拉选择时触发
    // item代表当前选中项
    handleDestSelect(item) {
      // console.log(item);
      this.cityForm.destCity = item.value;
      this.cityForm.destCode = item.sort;
    },
    // 出发时间
    handleDate(value) {
      this.cityForm.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 搜索提交事件
    handleSubmit() {
      console.log(this.cityForm);

      // query 的参数都会作为 url location.search 参数待在最后以问号开头,& 分隔
      // params
      // 1. 如果我们的路由配置, path 里面有动态路由参数, 而且你传的 params 也是相同名称的属性,那么这个参数就会显示在url上
      // 2. 如果没有配置动态路由,参数一样可以传递,跳转之后的页面 可以通过 this.$route.params 接受,但是不会显示在 url,一旦刷新,这个传值就会丢失.
      this.$router.push({
        path: "/air/flights",
        query: this.cityForm
      });
    },
    // 切换出发和到达城市
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.cityForm;
      this.cityForm.departCity = destCity;
      this.cityForm.departCode = destCode;
      this.cityForm.destCity = departCity;
      this.cityForm.destCode = departCode;
    }
  }
};
</script>

<style lang="less" scoped>
.searchForm {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
  .search-tab {
    span {
      display: block;
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px #eee solid;
      background: #eee;
    }
    .active {
      border-top-color: orange;
      background: #fff;
    }
    i {
      margin-right: 5px;
      font-size: 18px;

      &:first-child {
        font-size: 16px;
      }
    }
  }
  .search-form-content {
    padding: 15px 50px 15px 15px;
    position: relative;
    .el-autocomplete {
      width: 100%;
    }
    .reverse {
      position: absolute;
      top: 35px;
      right: 15px;
      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: -35px;
        width: 25px;
        height: 1px;
        background: #ccc;
      }
      &:after {
        top: 0;
      }

      &:before {
        top: 60px;
      }
      span {
        display: block;
        position: absolute;
        top: 20px;
        right: 0;
        font-size: 12px;
        background: #999;
        color: #fff;
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;

        &:after,
        &:before {
          display: block;
          content: "";
          position: absolute;
          left: 10px;
          width: 1px;
          height: 20px;
          background: #ccc;
        }

        &:after {
          top: -20px;
        }

        &:before {
          top: 20px;
        }
      }
    }
  }
}
</style>
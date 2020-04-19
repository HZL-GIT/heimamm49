<template>
  <div class="chart">
    <el-card class="title_show">
      <ul class="father">
        <li class="item">
          <div class="circle color1">{{info.increment_users}}</div>
          <span>今日新增用户</span>
        </li>
        <li class="item">
          <div class="circle color1">{{info.total_users}}</div>
          <span>用户总量</span>
        </li>
        <li class="item">
          <div class="circle color2">{{info.increment_questions}}</div>
          <span>新增试题</span>
        </li>
        <li class="item">
          <div class="circle color2">{{info.total_questions}}</div>
          <span>总试题量</span>
        </li>
        <li class="item">
          <div class="circle color3">{{info.total_done_questions}}</div>
          <span>总刷题量</span>
        </li>
        <li class="item">
          <div class="circle color3">{{info.personal_questions}}</div>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="main3">
      <div class="echarts" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getChartData, getStatistics } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      info: []
    };
  },
  created() {
    getChartData().then(res => {
      console.log("图表数据", res);
      this.info = res.data;
    });
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.echarts);

    // 由于数据需要接口获取，然后才是渲染，所以将图表的配置项与数据放入接口返回处。
    getStatistics().then(res => {
      console.log("饼状图数据", res);
      /* 
      数组的map
      返回值=数组.map((item,index)=>{
        特点   return什么，它的返回值就是什么
      })
      */
      //  我们只需要数组中对象里的名字部分
      let legendData = res.data.map(item => {
        return item.name;
      });
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "整体数据",
          left: "50px"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "50px",
          data: legendData
          // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
            //  data: [
            //     {value: 335, name: '直接访问'},
            //     {value: 310, name: '邮件营销'},
            //     {value: 234, name: '联盟广告'},
            //     {value: 135, name: '视频广告'},
            //     {value: 1548, name: '搜索引擎'}
            // ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart {
  .title_show {
    .father {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .item {
        .circle {
          width: 99px;
          height: 99px;
          line-height: 99px;
          font-size: 30px;
          border-radius: 50%;
        }
        .color1 {
          border: 2px solid #0086fa;
          color: #0086fa;
        }
        .color2 {
          border: 2px solid #f76137;
          color: #f76137;
        }
        .color3 {
          border: 2px solid #55cd78;
          color: #55cd78;
        }
      }
    }
  }
  .main3 {
    margin-top: 20px;
  }
  .echarts {
    width: 100%;
    height: 300px;
  }
}
</style>
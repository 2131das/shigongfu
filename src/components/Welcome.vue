<style>
.qaq {
    margin: 0px;
}

.tabad {
    display: flex;
}

.middle {
    display: flex;
    width: 99.2%;
    height: 80%;
    margin-top: 20px;
    margin-right: 12px;

}

.tabeng {
    height: 400px;
    width: 98.5%;
    margin-left: 12px;
    margin-top: 20px;
    background: #fff;
}

.sheet {
    width: 100%;
    height: 50px;
    background: #fff;
}

.userend {
    height: 400px;
    width: 98.5%;
    margin-left: 12px;
    margin-top: 20px;
    display: flex;
}

#usertable {
    width: 60%;
    height: 100%;
    background: #fff;
}

#tableConsumption {
    width: 38.5%;
    margin-left: 2%;
    height: 100%;
    background: #fff;
}

.ivu-card {
    flex: 1;
    margin-left: 12px;
    width: 10%;
    height: 100%;
    /* background-color: aqua; */
    background: #fff;
}

.ivu-card:hover {
    transition: box-shadow 1s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
}

.first {
    width: 25%;
    height: 250px;
    margin-left: 12px;
    margin-right: 12px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
}

.firstitem {
    height: 60px;
    display: flex;
    border-bottom: 1px solid #e8eaec;
}

.third {
    display: flex;
}

.test {
    flex: 1;
}

.tests {
    align-self: flex-end;
    margin-bottom: 3%;
    margin-right: 4%;
}

.second {
    height: 120px;
    border-bottom: 1px solid #e8eaec;
}

#sheetEcharts {
    width: 100%;
    height: 80%;
}
</style>

<template>
<div>
    <!-- 第一行 -->
    <div class="tabad">
        <div class="first" v-for="item in 4" :key="item">
            <div>
                <div class="firstitem">
                    <h2 class="test" style="margin-left:3%;">销售额</h2>
                    <el-tag class="tests" type="success">昨日</el-tag>
                </div>
                <div class="second">
                    <h2 style="margin-left: 12px;">22</h2>
                    <span style="margin-left: 12px;">111</span>
                </div>
                <div class="third">
                    <h3 style="flex:1;margin-left: 4%;">总销售额</h3>
                    <h3 style="margin-right: 3%;">10086元</h3>
                </div>
            </div>
        </div>
    </div>

    <!-- 第二行 -->
    <div class="middle">
        <div class="ivu-card" v-for="item in 8" :key="item">
            <div class="ivu-card-body">
                <a href="" style="text-decoration: none;color: #000000;padding: 16px;">
                    <div style="text-align:center;">
                        <i class="el-icon-delete" style=" font-size: 32px;color: rgb(105, 192, 255);"></i>
                    </div>
                    <div style="text-align:center;">
                        <p style="margin-top: 8px;">用户管理</p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- 订单 -->
    <div class="tabeng">
        <div class="sheet">
            <i style="padding:18px" class="el-icon-s-data">数据可视化</i>
        </div>

        <el-divider class="qaq"></el-divider>
        <!-- 数据表 -->
        <div id="sheetEcharts">

        </div>
    </div>

    <!-- 用户 -->
    <div class="userend">
        <div id="usertable">

        </div>
        <div id="tableConsumption">

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        var echarts = require('echarts');

    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('sheetEcharts'));
            var usertablemyChart = echarts.init(document.getElementById('usertable'));
            var tableConsumptionmyChart = echarts.init(document.getElementById('tableConsumption'));
            tableConsumptionmyChart.setOption({
                backgroundColor: '#2c343c',

                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [{
                            value: 335,
                            name: '直接访问'
                        },
                        {
                            value: 310,
                            name: '邮件营销'
                        },
                        {
                            value: 274,
                            name: '联盟广告'
                        },
                        {
                            value: 235,
                            name: '视频广告'
                        },
                        {
                            value: 400,
                            name: '搜索引擎'
                        }
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }]
            })
            usertablemyChart.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            })
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '直接访问',
                        type: 'bar',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '广告',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'bar',
                        stack: '广告',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'bar',
                        stack: '广告',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '搜索引擎',
                        type: 'bar',
                        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                        markLine: {
                            lineStyle: {
                                type: 'dashed'
                            },
                            data: [
                                [{
                                    type: 'min'
                                }, {
                                    type: 'max'
                                }]
                            ]
                        }
                    },
                    {
                        name: '百度',
                        type: 'bar',
                        barWidth: 5,
                        stack: '搜索引擎',
                        data: [620, 732, 701, 734, 1090, 1130, 1120]
                    },
                    {
                        name: '谷歌',
                        type: 'bar',
                        stack: '搜索引擎',
                        data: [120, 132, 101, 134, 290, 230, 220]
                    },
                    {
                        name: '必应',
                        type: 'bar',
                        stack: '搜索引擎',
                        data: [60, 72, 71, 74, 190, 130, 110]
                    },
                    {
                        name: '其他',
                        type: 'bar',
                        stack: '搜索引擎',
                        data: [62, 82, 91, 84, 109, 110, 120]
                    }
                ]
            });
        }
    },

}
</script>

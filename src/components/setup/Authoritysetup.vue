<template>
<div class="absolute-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="navigationbar">
        <h3 style="padding:1% 0 0 2%;">{{tabPosition}}</h3>
    </div>
    <el-tabs type="border-card" v-model="tabPosition" @tab-click="tabclick()">
        <el-tab-pane label="基础配置" name="基础配置">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="input" clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="date"></el-table-column>
                <el-table-column label="邮箱" prop="date"></el-table-column>
                <el-table-column label="电话" prop="date"></el-table-column>
                <el-table-column label="角色" prop="date"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini">
                        </el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini">
                        </el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini">
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>

        <!--页面管理  -->
        <el-tab-pane label="页面管理" name="页面管理">

        </el-tab-pane>

        <!-- 账号管理 -->
        <el-tab-pane label="账号管理" name="账号管理">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="搜索用户或账号" v-model="userInput" clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加账号</el-button>
                </el-col>
            </el-row>

            <el-table :data="tableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="账号" prop="date"></el-table-column>
                <el-table-column label="密码" prop="date"></el-table-column>
                <el-table-column label="拥有者" prop="name"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini">
                        </el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini">
                        </el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini">
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name: 'AbsoluteContainer',
    props: {},
    data() {
        return {
            tabPosition: '基础配置',
            userInput: '',
            input: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted() {},
    methods: {
        tabclick() {
            console.log(this.tabPosition)
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>

<style scoped>
.navigationbar {

    width: 100%;
    height: 60px;
    background: #fff;
}
</style>

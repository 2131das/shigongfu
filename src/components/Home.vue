<template>
<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
        <div>
            <!-- <img src="../assets/heima.png" alt /> -->
            <span>HF+MES燧创</span>
        </div>
        <el-button type="info" @click="logout">{{username}}退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <!-- 侧边栏菜单区域 -->
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                <!-- 一级菜单 -->
                <el-menu-item index="/welcome">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">主页</span>
                </el-menu-item>
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                    <!-- 一级菜单的模板区域 -->
                    <template slot="title">
                        <!-- 图标 -->
                        <i :class="['iconfont',item.icon]"></i>
                        <!-- 文本 -->
                        <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{subItem.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
            <!-- 路由占位符 -->
            <!-- <Tab></Tab> -->

            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import {
    mapState
} from 'vuex'
import Tab from './Tab'
export default {
    components: {
        Tab
    },
    data() {
        return {
            // 左侧菜单数据
            menulist: [],
            // 是否折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: ''
        }
    },
    created() {
        // this.activePath = window.sessionStorage.getItem('activePath')
        this.activePath ='/welcome'
        this.menulist = this.rightList
        console.log(this.rightList)
    },
    methods: {
        logout() {
            localStorage.clear()
            window.location.reload()
            this.$router.push('/login')
        },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        // 保存链接的激活状态
        saveNavState(activePath) {
            this.$store.commit('addMenu', activePath)
            window.localStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    },
    computed: {
        ...mapState(['rightList', 'username'])
    },
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.el-aside {
    background-color: #333744;

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>

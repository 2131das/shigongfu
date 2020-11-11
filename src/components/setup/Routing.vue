<template>
<div>
    <!-- 编辑模态框 -->
    <el-dialog title="添加路由" :visible.sync="dialogFormVisible">
        <el-form style="display: flex;flex-wrap: wrap;">
            <el-form-item label="路由id*" class="formInput">
                <el-input v-model="inputId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由名称*" class="formInput">
                <el-input v-model="inputName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="path*" class="formInput">
                <el-input v-model="inputPath" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addQury()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>路由管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <!-- 添加角色按钮区域 -->
        <el-row>
            <el-col>
                <el-button type="primary" v-permission="{action:'add', effect:'disabled'}" @click="addRouter()">添加路由</el-button>
            </el-col>
        </el-row>

        <!-- 角色列表区域 -->
        <el-table :data="list" border stripe>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" v-permission="{action:'edit', effect:'disabled'}" icon="el-icon-edit" @click="tabledit()">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeById(scope.row.id)" v-permission="{action:'delete', effect:'disabled'}">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>

<script>

// import { initDynamicRoutes,  } from '../../router/index.js'
import router from '../../router/index.js'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            rolelist: [], // 所有角色列表数据
            list: [], // 全部路由数据
            dialogFormVisible: false,
            inputId: '',
            inputName: '',
            inputPath: ''
        }
    },
    computed: {
        ...mapState(['rightList'])
    },
    created() {
        this.getRolesList()
        this.init()
    },
    methods: {
        //模态框确定
        addQury() {
            this.dialogFormVisible = false
        },
        // 添加路由
        addRouter() {
            this.dialogFormVisible = true
            
        },
        //编辑路由
        tabledit() {
            const a = JSON.parse(localStorage.getItem('rightList'))
            const b = {
                id: '666',
                authName: '115',
                path: "namesw",
                rights: [
                    "view",
                    "edit",
                    "add",
                    "delete"
                ]
            }
            a[3].children.push(b)
            localStorage.setItem('rightList', JSON.stringify(a))
            location.reload()
        },
        init() {
            this.rightList.forEach(v => {
                if (v.children) {
                    v.children.forEach(f => {
                        this.list.push(f)
                    })
                }
            })
        },
        // 获取所有角色的列表
        async getRolesList() {
            const {
                data: res
            } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败！')
            }
            this.rolelist = res.data
        },
        async removeById(id) {
            const confirmResult = await this.$confirm(
                '此操作将永久删除该商品, 是否继续?',
                '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err)

            if (confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除！')
            }

            const {
                data: res
            } = await this.$http.delete(`roles/${id}`)

            if (res.meta.status !== 200) {
                return this.$message.error('删除失败！')
            }
            this.$message.success('删除成功！')
        }
    }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}

.el-input {
    width: 250px;

}

.formInput {
    margin-left: 65px;
}
</style>

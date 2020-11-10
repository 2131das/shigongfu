<template>
<div>
    <el-tag style="margin-bottom: 20px;" :key="tag.name" :type="tag.type" @click="handleClick(tag)" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag.name}}
    </el-tag>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        };
    },
    computed: {
        ...mapState(['tabList'])
    },
    methods: {
        handleClick(tag){
            const a = {
            '/users': '用户列表',
            '/roles': '角色管理',
            '/goods': '商品列表',
            '/categories': '商品分类'
            }
            Object.values(a).forEach((v,index) =>{
                if(tag.name == v){
                console.log(Object.keys(a)[index])
                this.$router.push(Object.keys(a)[index])
                }
            })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.$store.commit('selectMenu', tag)
        },
    },
    created () {
        this.dynamicTags = this.tabList
    }
}
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>

<template>
    <div>
        <div>
            <p>事件维护</p>
        </div>
        <el-row :gutter="30">
            <el-col :span="8">
                <div class="tree" style="margin-left: 20px">

                    <el-tree
                        :data="data"
                        @node-click="handleNodeClick"
                        node-key="id"
                        ref="tree"
                        :highlight-current="true"
                        default-expand-all
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10" >
                <el-button :icon="show? 'el-icon-check':'el-icon-edit'" @click="onEditClicked">{{
                        show ? "完成" : "编辑"
                    }}
                </el-button>
                <div class="node-info">
                    <div>
                        节点详情：
                    </div>
                    <div>
                        节点层级：请选择节点
                    </div>
                    <div class="node-info-item">
                        灾害类型：请选择节点
                    </div>
                    <div class="node-info-item">
                        灾害名称：请选择节点
                    </div>
                    <div class="node-info-item">
                        灾害等级：请选择节点
                    </div>
                    <div class="node-info-item">
                        灾害编号：请选择节点
                    </div>
                    <div class="node-info-item">
                        备注：请选择节点
                    </div>
                    <el-button icon="el-icon-delete" style="margin-top: 20px;width: 200px" type="danger">删除节点
                    </el-button>

                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
let id = 14;
export default {
    name: "Event",
    data() {
        return {
            // data: JSON.parse(JSON.stringify(d)),
            data: this.$store.getters.getEvents,
            show: false,
        }
    },
    methods: {
        append(data,label) {
            const newChild = {id: id++, label: label, children: []};
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);

        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        // eslint-disable-next-line no-unused-vars
        renderContent(h, {node, data, store}) {
            return (
                <div class="custom-tree-node">
                    <div>{node.label}</div>
                    <div>
                        {this.show ?
                            <div>
                                {node.level <= 3 ?
                                    <el-button size="mini" type="primary" icon="el-icon-plus" on-click={() => {
                                        this.$prompt('请输入邮箱', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                        }).then(({ value }) => {
                                            this.append(data,value);
                                            this.$message({
                                                type: 'success',
                                                message: '你的邮箱是: ' + value
                                            });
                                        });

                                    }} circle/> : null}
                                {node.level >1 ?
                                <el-button size="mini" type="danger" icon="el-icon-delete"
                                           on-click={() => {
                                               this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                                   confirmButtonText: '确定',
                                                   cancelButtonText: '取消',
                                                   type: 'warning'
                                               }).then(() => {
                                                   this.remove(node, data)
                                                   this.$message({
                                                       type: 'success',
                                                       message: '删除成功!'
                                                   });
                                               });

                                           }} circle/>:null}
                            </div>
                            : null
                        }
                    </div>

                </div>
            );
        },
        onEditClicked() {
            this.show = !this.show;
            console.log(this.show)
        },
        handleNodeClick(data) {
            console.log(data);
            console.log(this.$refs.tree.getNodePath(data.id))

        }

    }
}
</script>

<style lang="scss">
.node-info {
    border-radius: 10px;
    padding: 40px;

    display: flex;
    flex-direction: column;
    background-color: #edf2f7;
}

.node-info-item {
    margin-top: 10px;
    margin-left: 20px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
}

.el-tree-node__content {

    min-height: 35px;
}

</style>
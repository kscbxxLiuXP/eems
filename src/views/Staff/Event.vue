<template>
    <div>
        <div>
            <p>事件维护</p>
        </div>

        <el-row :gutter="30">
            <el-col :span="12">
                <div class="tree" style="margin-left: 20px">
                    <el-input
                        placeholder="输入关键字进行过滤"
                        style="margin-bottom: 20px"
                        v-model="filterText">

                    </el-input>
                    <el-tree
                        :data="data"
                        @node-click="handleNodeClick"
                        node-key="id"
                        ref="tree"
                        :filter-node-method="filterNode"
                        :highlight-current="true"
                        default-expand-all
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" :icon="show? 'el-icon-check':'el-icon-edit'" @click="onEditClicked">{{
                        show ? "完成" : "编辑"
                    }}
                </el-button>
                <div class="node-info">
                    <div style="font-size: 20px">
                        节点详情：
                    </div>
                    <div class="node-info-item">
                        节点层级：
                        <NodeTag :level="this.nodeDisplay.nodelevel"/>
                    </div>
                    <div class="node-info-item">
                        灾害类型：{{ this.nodeDisplay.category }}
                    </div>
                    <div class="node-info-item">
                        灾害名称：{{ this.nodeDisplay.name }}
                    </div>
                    <div class="node-info-item">
                        灾害等级：{{ this.nodeDisplay.level }}
                    </div>
                    <div class="node-info-item">
                        灾害编号：{{ this.nodeDisplay.id }}
                    </div>
                    <div class="node-info-item">
                        备注：{{ this.nodeDisplay.comment }}
                    </div>


                </div>
            </el-col>
        </el-row>
        <el-dialog
            :title="mode===1?'提示：编辑节点':'提示：新增节点'"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="600px"
        >
            <div style="font-size: 16px;padding-left: 30px;padding-right: 30px">
                <div v-if="mode===0" style="font-size: 16px">
                    您将要在节点 <span style="color: steelblue">{{ cnode.label }}</span> 下新增节点
                </div>
                <div style="font-size: 16px" v-if="mode===1">
                    您正在编辑节点 <span style="color: steelblue">{{ cnode.label }}</span>
                </div>

                <div style="margin-top: 20px;margin-left: 50px">
                    节点层级: <span v-bind:key="index" v-for="(it,index) in this.currentPath">{{ it.label }}></span>
                    <span v-if="mode===0">新增节点</span>
                </div>
                <div v-if="mode===0" style="margin-top: 10px;margin-left: 50px">
                    新增节点属于:
                    <NodeTag size="small" :level="cnode.level+1"/>
                </div>
                <div v-if="mode===1" style="margin-top: 10px;margin-left: 50px">
                    当前节点属于:
                    <NodeTag size="small" :level="cnode.level"/>
                </div>
                <div style="margin-top: 10px;margin-left: 50px">
                    节点名称：
                    <el-input style="margin-top: 5px" v-model="inputNodeName"/>
                </div>
                <div style="margin-top: 10px;margin-left: 50px">
                    备注：
                    <el-input v-if="mode===1" style="margin-top: 5px" v-model="inputComment" type="textarea"
                              :placeholder="cnode.level<4?'当前节点不能输入备注':'请输入备注'"
                              :disabled="cnode.level<4"/>
                    <el-input v-if="mode===0" style="margin-top: 5px" v-model="inputComment" type="textarea"
                              :placeholder="cnode.level<3?'当前节点不能输入备注':'请输入备注'"
                              :disabled="cnode.level<3"/>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
import NodeTag from "@/components/Common/NodeTag";


export default {
    name: "Event",
    components: {NodeTag},
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    data() {
        return {
            // data: JSON.parse(JSON.stringify(d)),
            filterText: '',
            data: this.$store.getters.getEvents,
            dialogVisible: false,
            show: false,
            currentPath: [],
            currentNode: {},
            id: this.$store.getters.getEventMaxID,
            nodeDisplay: {
                nodelevel: '暂无',
                category: '暂无',
                name: '暂无',
                level: "暂无",
                id: "暂无",
                comment: "暂无",
            },
            inputNodeName: '',
            inputComment: '',
            mode: 0,//0增加,1编辑
            cnode: {parent: {label: ""}, id: 1, level: 1,},
            cdata: {},
        }
    },
    methods: {
        handleClose(done) {
            this.cnode = {parent: {label: ""}, id: 1, level: 1,};

            done();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleConfirm() {
            this.dialogVisible = false

            if (this.mode === 0) {
                //增加
                this.append(this.cdata, this.inputNodeName);
                this.$message.success("节点增加成功！")
            } else {
                //
                this.cdata.label = this.inputNodeName
                if (this.cdata.level === 3) {
                    this.cdata.comment = this.inputComment
                }
                this.$message.success("节点修改成功！")
            }
            this.nodeDisplay = this.setDisplayNode()
            this.$store.dispatch("asyncUpdateEvents", this.data)

        },
        append(data, label) {
            this.id++
            this.$store.dispatch("asyncUpdateEventMaxID", this.id);
            var newChild = {id: this.id, label: label, level: data.level + 1, children: []};
            if (data.level === 2) {
                newChild = {id: this.id, label: label, comment: this.inputComment, level: data.level + 1, children: []};

            }
            console.log(data)
            console.log(newChild)
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
            console.log(this.data)
            console.log(this.$store.getters.getEvents)
            this.id--
            this.$store.dispatch("asyncUpdateEventMaxID", this.id);
            this.currentPath = [];

            this.nodeDisplay = {
                nodelevel: '暂无',
                category: '暂无',
                name: '暂无',
                level: "暂无",
                id: "暂无",
                comment: "暂无",
            }

        },
        setDisplayNode() {
            var nodelevel = this.currentPath.length;
            var category = this.currentPath[1] === undefined ? '暂无' : this.currentPath[1].label;
            var name = this.currentPath[2] === undefined ? '暂无' : this.currentPath[2].label;
            var level = this.currentPath[3] === undefined ? '暂无' : this.currentPath[3].label;
            var id = this.currentPath[nodelevel - 1].id === undefined ? '暂无' : this.currentPath[nodelevel - 1].id;
            var comment = this.currentPath[3] === undefined ? '暂无' : this.currentPath[3].comment;
            const nodeDisplay = {
                nodelevel,
                category,
                name,
                level,
                id,
                comment,
            }
            return nodeDisplay
        },
        // eslint-disable-next-line no-unused-vars
        renderContent(h, {node, data, store}) {
            function renderIcon(level) {
                if (level === 1)
                    return require("./../../assets/icons/shijian1.png")
                else if (level === 2)
                    return require("./../../assets/icons/zaihaileixing.png")
                else if (level === 3)
                    return require("./../../assets/icons/zaihai.png")
                else if (level === 4)
                    return require("./../../assets/icons/dengji.png")
            }

            return (
                <div class="custom-tree-node">
                    <div class="custom-tree-node-title"><img src={renderIcon(node.level)} style="margin-right:10px"
                                                             height="15"/> {node.label}</div>
                    <div>
                        {this.show ?
                            <div>
                                {node.level <= 3 ?

                                    <el-button size="mini" type="primary" icon="el-icon-plus" on-click={() => {
                                        this.inputNodeName = '';
                                        this.inputComment = ''
                                        this.cdata = data;
                                        this.cnode = node;
                                        this.mode = 0;
                                        this.dialogVisible = true
                                    }} circle/> : null}
                                {node.level > 1 ?
                                    <el-button size="mini" type="primary" icon="el-icon-edit" on-click={() => {
                                        this.inputNodeName = '';
                                        this.inputComment = ''
                                        this.cdata = data;
                                        this.cnode = node;
                                        console.log('data', data);
                                        console.log('node', node)
                                        this.inputNodeName = data.label
                                        if (data.level === 3)
                                            this.inputComment = data.comment
                                        this.mode = 1;
                                        this.dialogVisible = true
                                    }} circle/> : null}
                                {node.level > 1 ?
                                    <el-button size="mini" type="danger" icon="el-icon-delete"
                                               on-click={() => {
                                                   const h = this.$createElement;
                                                   this.$confirm(
                                                       h('p', null, [
                                                           h('span', null, '您确认要删除节点  '),
                                                           h('i', {style: 'color: teal'}, node.label),
                                                           h('span', {style: 'margin-left:10px'}, '(节点类型:'),
                                                           h('NodeTag', {
                                                               style: 'margin-left:10px',
                                                               props: {level: node.level, size: 'small'}
                                                           }),
                                                           h('span', {style: 'margin-left:10px'}, ')'),
                                                           h('span', {style: 'margin-left:10px'}, '吗'),
                                                       ]),
                                                       '提示',
                                                       {
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
                                               }}
                                               circle/>
                                    : null}
                            </div>
                            : null
                        }
                    </div>

                </div>
            );
        },
        onEditClicked() {
            this.show = !this.show;
            console.log(this.data)

        },
        handleNodeClick(data) {

            this.currentNode = data;
            this.currentPath = this.$refs.tree.getNodePath(data.id)
            this.nodeDisplay = this.setDisplayNode()

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
    background-color: #f3f9f1;
    margin-top: 10px;
}

.node-info-item {
    margin-top: 20px;
    margin-left: 80px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
    transition: all ease-in-out 300ms;
}

.custom-tree-node-title {
    display: flex;
    align-items: center;

}

.el-tree-node__content {
    min-height: 35px;
}

</style>
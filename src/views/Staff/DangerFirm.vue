<template>
    <div>
        <el-header>
            <div style="font-size: x-large; margin-bottom: 40px">风险企业管理</div>
        </el-header>
        <el-container>
            <el-header style="height: 100px">
                <el-form :inline="true" :model="formInline">

                    <el-form-item label="企业的ID">
                        <el-input v-model="formInline.id" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业名称">
                        <el-input v-model="formInline.name" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业地址">
                        <el-input v-model="formInline.address" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-left: 15px">
                        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-form :inline="true" :model="formInline">
                    <el-form-item label="企业法人">
                        <el-input v-model="formInline.person" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="法人电话">
                        <el-input v-model="formInline.phone" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业类型">
                        <el-select v-model="formInline.type" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="danger" icon="el-icon-refresh" @click="refreshInput">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        stripe
                        tooltip-effect="light"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="id"
                            label="ID"
                            width="100"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="name"
                            label="企业名称"
                            width="230">
                        </el-table-column>

                        <el-table-column
                            prop="address"
                            label="企业地址"
                            width="200"
                            show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                            label="企业位置"
                            width="100"
                        >
                            <template slot-scope="scope">
                                <el-popover
                                    placement="right"
                                    width="200px"
                                    trigger="hover"
                                >
                                    <p>企业: {{ " " + scope.row.name }}</p>
                                    <p>经度:  {{ " " + scope.row.location.lng }}</p>
                                    <p>纬度: {{ " " + scope.row.location.lat }}</p>
                                    <SmallMap :lat="getFirm(scope.row.id).location.lat"
                                              :lng="getFirm(scope.row.id).location.lng"/>

                                    <span slot="reference" class="name-wrapper">
                            <el-button
                                type="success" plain
                                icon="el-icon-location-outline"
                                slot="reference"
                                circle

                            ></el-button>
                        </span>

                                </el-popover>
                            </template>

                        </el-table-column>

                        <el-table-column
                            prop="person"
                            label="企业法人"
                            width="110"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="phone"
                            label="法人电话"
                            width="110"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="type"
                            label="企业类型"
                            width="110"
                            sortable>
                        </el-table-column>

                        <el-table-column label="操作"
                                         width="200"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    circle
                                    @click="editFirm(scope.row, scope.$index)"
                                ></el-button>
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="delFirm(scope.row, scope.$index)"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </el-main>
            <el-footer>
                <el-row :gutter="20" style="margin-top: 40px">
                    <el-col :span="10">
                        <div>
                            <el-button type="primary" icon="el-icon-plus" @click="addFirm"> 增加
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <el-pagination
                            @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="100">
                        </el-pagination>
                    </el-col>
                </el-row>

            </el-footer>


            <!--                 修改条目信息的对话框 -->
            <el-dialog
                title="编辑风险企业"
                :visible.sync="editFormVisible"
                width="600px"
                :before-close="handleClose"
            >
                <div>
                    <el-form ref="form" :model="editObj" :rules="firmRules" label-width="80px">

                        <el-form-item label="企业ID">
                            <el-input v-model="editObj.id" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="企业名称" prop="name">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="企业地址" prop="address">
                            <el-input v-model="editObj.address"></el-input>
                        </el-form-item>

                        <el-form-item label="企业位置">
                            <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="editObj.location"
                                       >
                                <bm-control>
                                    <el-autocomplete

                                        popper-class="my-autocomplete"
                                        v-model="editObj.address"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        @select="handleSelect">
                                        <i
                                            class="el-icon-search el-input__icon"
                                            slot="suffix"
                                            >
                                        </i>
                                        <template slot-scope="{ item }">
                                            <div class="name">{{ item.name }}</div>
                                            <span class="addr">{{ item.address }}</span>
                                        </template>
                                    </el-autocomplete>
                                </bm-control>
                                <bml-marker-clusterer :averageCenter="true">
                                    <bm-marker :position="position"></bm-marker>
                                </bml-marker-clusterer>
                            </baidu-map>
                        </el-form-item>

                        <el-form-item label="企业法人" prop="person">
                            <el-input v-model="editObj.person"></el-input>
                        </el-form-item>

                        <el-form-item label="企业电话" prop="phone">
                            <el-input v-model="editObj.phone"></el-input>
                        </el-form-item>

                        <el-form-item label="企业类型" prop="type">
                            <el-select
                                v-model="editObj.type"
                                placeholder="请选择类型"
                            >
                                <el-option label="software" value="software"></el-option>
                                <el-option label="hardware" value="hardware"></el-option>

                            </el-select>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确 定</el-button>
                    </span>
            </el-dialog>

            <!--                 增加条目的对话框 -->
            <el-dialog
                title="新增风险企业"
                :visible.sync="addFormVisible"
                width="600px"
                :before-close="handleCloseAdd"
            >
                <div>
                    <el-form ref="form" :model="editObj" :rules="firmRules" label-width="80px">

                        <el-form-item label="企业ID">
                            <el-input v-model="editObj.id" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="企业名称" prop="name">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="企业地址" prop="address">
                            <el-input v-model="editObj.address"></el-input>
                        </el-form-item>

                        <el-form-item label="企业位置">
                            <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="editObj.location"
                            >
                                <bm-control>
                                    <el-autocomplete

                                        popper-class="my-autocomplete"
                                        v-model="editObj.address"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        @select="handleSelect">
                                        <i
                                            class="el-icon-search el-input__icon"
                                            slot="suffix"
                                        >
                                        </i>
                                        <template slot-scope="{ item }">
                                            <div class="name">{{ item.name }}</div>
                                            <span class="addr">{{ item.address }}</span>
                                        </template>
                                    </el-autocomplete>
                                </bm-control>
                                <bml-marker-clusterer :averageCenter="true">
                                    <bm-marker :position="position"></bm-marker>
                                </bml-marker-clusterer>
                            </baidu-map>
                        </el-form-item>

                        <el-form-item label="企业法人" prop="person">
                            <el-input v-model="editObj.person"></el-input>
                        </el-form-item>

                        <el-form-item label="企业电话" prop="phone">
                            <el-input v-model="editObj.phone"></el-input>
                        </el-form-item>

                        <el-form-item label="企业类型" prop="type">
                            <el-select
                                v-model="editObj.type"
                                placeholder="请选择类型"
                            >
                                <el-option label="software" value="software"></el-option>
                                <el-option label="hardware" value="hardware"></el-option>

                            </el-select>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm('form')">确 定</el-button>
                    </span>
            </el-dialog>

        </el-container>
    </div>
</template>

<script>
// import SmallMap from "@/components/SmallMap";
import SmallMap from "@/components/SmallMap";
import jsonpAdapter from "axios-jsonp";

export default {
    name: "DangerFirm",
    components: {SmallMap},
    // components: {SmallMap},
    data() {
        return {
            //修改信息对话框的显示属性
            editFormVisible: false,
            itemIndex: 0,
            //分页的参数
            currentPage: 1,
            pageSize: 6,

            //增加的对话框
            addFormVisible: false,

            zoom: 15,

            editObj: {
                id: '',
                name: '',
                address: '',
                location: {
                    lat: 0,
                    lng: 0,
                },
                person: '',
                phone: '',
                type: '',
            },
            //查询表单
            formInline: {
                id: '',
                name: '',
                address: '',
                person: '',
                phone: '',
                type: '',
            },

            options: [
                {
                    value: 'software',
                    label: 'software'
                },
                {
                    value: 'hardware',
                    label: 'hardware'
                }
            ],

            firmRules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                ],
                address: [
                    {required: true, message: '请输入地址', trigger: 'blur'}
                ],
                person: [
                    {required: true, message: '请填写企业法人', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请填写法人电话', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择企业类型', trigger: 'change'}
                ],
            },
            //通过store获得firms的数据，放到表格中
            tableData: this.$store.getters.getFirms,
            multipleSelection: []
        }
    },
    methods: {
        getFirm(firmID) {
            const firm = this.$store.getters.getFirm(firmID)

            return firm
        },
        //查询按钮
        search() {
            let searchList = this.$store.getters.getFirms
            if (this.formInline.id !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.id.indexOf(this.formInline.id) !== -1
                })
            }
            if (this.formInline.name !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.name.indexOf(this.formInline.name) !== -1
                })
            }
            if (this.formInline.address !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.address === this.formInline.address
                })
            }
            if (this.formInline.person !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.person === this.formInline.person
                })
            }
            if (this.formInline.phone !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.phone === this.formInline.phone
                })
            }
            if (this.formInline.type !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.type === this.formInline.type
                })
            }
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
        //清空查询输入
        refreshInput() {
            this.formInline.id = ""
            this.formInline.name = ""
            this.formInline.address = ""
            this.formInline.location.lat = 0
            this.formInline.location.lng = 0
            this.formInline.person = ""
            this.formInline.phone = ""
            this.formInline.type = ""
            this.tableData = this.$store.getters.getFirms
        },

        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },

        //处理表格的多行选择
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //delete a item
        delFirm(item, idx) {
            // 就这一点儿就可以产生dialog确定
            this.$confirm('确认删除？')
                // eslint-disable-next-line no-unused-vars
                .then(_ => {

                    this.tableData.splice(idx, 0);
                    // eslint-disable-next-line no-unused-vars
                    let tmp = this.$store.getters.getFirms;
                    tmp = tmp.filter((obj) => {
                        return obj.id !== item.id
                    })
                    this.tableData = tmp;
                    this.$store.dispatch("asyncUpdateFirms", tmp);
                    this.$message.success("风险企业删除成功！");
                })
                // eslint-disable-next-line no-unused-vars
                .catch(_ => {
                });
        },

        //edit a firm
        editFirm(item, idx) {
            this.itemIndex = idx;
            this.editFormVisible = true;
            this.editObj = {
                id: item.id,
                name: item.name,
                address: item.address,
                location: {
                    lat: item.location.lat,
                    lng: item.location.lng,
                },
                person: item.person,
                phone: item.phone,
                type: item.type,
            };
        },
        //add a firm
        addFirm() {
            this.addFormVisible = true

            this.editObj = {
                id: parseInt(this.tableData[this.tableData.length - 1].id) + 1,
                name: '',
                address: '',
                location: {
                    lat: 41.659108,
                    lng: 123.430933,
                },
                person: '',
                phone: '',
                type: '',
            };
        },
        //关闭弹窗
        handleClose() {
            this.editFormVisible = false;
        },
        //关闭弹窗
        handleCloseAdd() {
            this.addFormVisible = false;
        },
        //确认编辑信息
        confirm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editFormVisible = false;
                    this.tableData.splice(this.itemIndex, 1, this.editObj);
                    this.$store.dispatch("asyncUpdateFirms", this.tableData);
                    this.$message.success("企业修改成功！");

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //确认添加的信息
        addConfirm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addFormVisible = false;
                    this.tableData.push(this.editObj);
                    this.$store.dispatch("asyncUpdateFirms", this.tableData);
                    this.$message.success("企业添加成功！");

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //查询搜索，从百度地图获取位置选项内容
        querySearch(queryString, cb) {
            this.$axios({
                url: 'http://api.map.baidu.com/place/v2/search?',
                params: {
                    query: queryString,
                    region: '全国',
                    output: "json",
                    ak: 'CeL3HySvYbvK9OuoeSXGVqCLPAtxEXaQ'
                },
                adapter: jsonpAdapter
            }).then((res) => {
                const re = res.data.results;
                re.forEach(i => {
                    i.value = i.name
                })
                cb(re);
            });
        },

        //对表单地图的输入框选项选择后进行处理
        handleSelect(item) {
            this.editObj.location = item.location

            this.editObj.name = item.name
            this.editObj.address = item.address
        },
    },


}
</script>

<style scoped lang="scss">

.map {
    height: 350px;
    width: 350px;
}


.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}

.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
<template>
    <div>
        <div style="font-size: x-large; margin-bottom: 40px">物资管理</div>

        <el-row :gutter="20" style="margin-bottom: 40px">
            <el-col :span="8">
                <div>物资名称：
                    <el-input v-model="goodsName" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>物资清点人：
                    <el-input v-model="goodsInventor" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>

        </el-row>

        <el-row :gutter="20" style="margin-bottom: 40px">
            <el-col :span="8">
                <div>物资编号：
                    <el-input v-model="goodsCode" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>物资类型：
                    <el-select v-model="goodsType" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8">
                <div>物资地址：
                    <el-input v-model="goodsAddress" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="3">
                <el-button type="danger" icon="el-icon-refresh" @click="refreshInput"> 重置</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search"> 查询</el-button>
            </el-col>
        </el-row>


        <div style="height: 300px">
            <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                style="width: 100%; margin-top: 80px"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="ID"
                    width="70">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资名称"
                    width="120">
                    <template slot-scope="scope">
                        <el-tag type="info">{{ scope.row.goodsName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资数量"
                    width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资类型"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsType }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资清点人"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsInventor }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资清点人电话"
                    width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.goodsInventorPhone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资编号"
                    width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsCode }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资清点时间"
                    width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span>{{ scope.row.goodsTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="物资地址"
                    width="220">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>门牌号: {{ " " + scope.row.goodsAddressDetail }}</p>
                            <p>经度: {{ " " + scope.row.goodsLongitude }}</p>
                            <p>纬度: {{ " " + scope.row.goodsLatitude }}</p>
                            <SmallMap :lat="parseFloat( scope.row.goodsLatitude) "
                                      :lng="parseFloat( scope.row.goodsLongitude) "/>
                            <span slot="reference" class="name-wrapper">
                                          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.goodsAddress }}</el-tag>
          </div>
                        </span>
                        </el-popover>
                    </template>

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            icon="el-icon-edit">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            icon="el-icon-delete-solid">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-row :gutter="20" style="margin-top: 40px">
            <el-col :span="17">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true"> 增加</el-button>
                </div>
            </el-col>
            <el-col :span="7">
                <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>


        <el-dialog title="新增物资" :visible.sync="addFormVisible" width="600px">
            <el-form :model="addForm" :rules="goodsRules" ref="addForm">
                <el-form-item label="物资名称" :label-width="formLabelWidth" prop="goodsName">
                    <el-input v-model="addForm.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资数量" :label-width="formLabelWidth" prop="goodsNum">
                    <el-input v-model="addForm.goodsNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点人" :label-width="formLabelWidth" prop="goodsInventor">
                    <el-input v-model="addForm.goodsInventor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点人电话" :label-width="formLabelWidth" prop="goodsInventorPhone">
                    <el-input v-model="addForm.goodsInventorPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点时间" prop="goodsTime" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="addForm.goodsTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="物资类型" prop="goodsType" :label-width="formLabelWidth">
                    <el-select v-model="addForm.goodsType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="物资地址" style="margin-left: 80px">
                    <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="position"
                               style="margin-left: 70px">
                        <bm-control>
                            <el-autocomplete

                                popper-class="my-autocomplete"
                                v-model="state"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect">
                                <i
                                    class="el-icon-search el-input__icon"
                                    slot="suffix"
                                    @click="handleIconClick">
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

            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddNewGoods">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑物资" :visible.sync="editFormVisible" width="600px">
            <el-form :model="editForm" :rules="goodsRules" ref="editForm">
                <el-form-item label="物资名称" :label-width="formLabelWidth" prop="goodsName">
                    <el-input v-model="editForm.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资数量" :label-width="formLabelWidth" prop="goodsNum">
                    <el-input v-model="editForm.goodsNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点人" :label-width="formLabelWidth" prop="goodsInventor">
                    <el-input v-model="editForm.goodsInventor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点人电话" :label-width="formLabelWidth" prop="goodsInventorPhone">
                    <el-input v-model="editForm.goodsInventorPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="物资清点时间" prop="goodsTime" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="editForm.goodsTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="物资类型" prop="goodsType" :label-width="formLabelWidth">
                    <el-select v-model="editForm.goodsType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="物资地址" style="margin-left: 80px">
                    <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="editPosition"
                               style="margin-left: 70px">
                        <bm-control>
                            <el-autocomplete

                                popper-class="my-autocomplete"
                                v-model="editForm.goodsAddress"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleEditSelect">
                                <i
                                    class="el-icon-search el-input__icon"
                                    slot="suffix"
                                    @click="handleIconClick">
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

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditGoods">取 消</el-button>
                <el-button type="primary" @click="editGoods">编 辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import jsonpAdapter from "axios-jsonp";
import SmallMap from "@/components/SmallMap";

export default {
    name: "goodsReport",
    components: {SmallMap},
    data() {
        return {
            goodsName: '',
            goodsInventor: '',
            goodsCode: '',
            goodsType: '',
            goodsAddress: '',
            options: [
                {
                    value: '生命救助',
                    label: '生命救助'
                },
                {
                    value: '器材工具',
                    label: '器材工具'
                },
            ],
            addForm: {
                goodsID: '',
                goodsName: '',
                goodsNum: '',
                goodsType: '',
                goodsInventor: '',
                goodsInventorPhone: '',
                goodsCode: '',
                goodsTime: '',
                goodsAddress: '',
                goodsAddressDetail: '',
                goodsLongitude: '',
                goodsLatitude: ''
            },
            editForm: {
                goodsID: '',
                goodsName: '',
                goodsNum: '',
                goodsType: '',
                goodsInventor: '',
                goodsInventorPhone: '',
                goodsCode: '',
                goodsTime: '',
                goodsAddress: '',
                goodsAddressDetail: '',
                goodsLongitude: '',
                goodsLatitude: ''
            },
            goodsRules: {
                goodsName: [
                    {required: true, message: '请输入物资名称', trigger: 'blur'},
                ],
                goodsNum: [
                    {required: true, message: '请输入物资数量', trigger: 'blur'}
                ],
                goodsInventor: [
                    {required: true, message: '请填写物资清点人', trigger: 'blur'}
                ],
                goodsInventorPhone: [
                    {required: true, message: '请填写物资清点人电话', trigger: 'blur'}
                ],
                goodsTime: [
                    {required: true, message: '请选择物资清点时间', trigger: 'change'}
                ],
                goodsType: [
                    {required: true, message: '请选择物资类型', trigger: 'change'}
                ],
                goodsAddress: [
                    {required: true, message: '请选择物资存放地址', trigger: 'change'}
                ],
            },
            multipleSelection: [],
            selectedUsers: [],
            currentPage: 1,
            pageSize: 5,
            addFormVisible: false,
            editFormVisible: false,
            tableData: this.$store.getters.getGoods,
            formLabelWidth: '150px',
            selectedIdEdit: '',
            addressDetail: '',
            addressLongitude: '',
            addressLatitude: '',
            // property for map
            state: '',
            timeout: null,
            zoom: 15,
            position: {
                lng: 116.404,
                lat: 39.915,
            },
            editPosition: {
                lng: 116.404,
                lat: 39.915,
            }

        }
    },
    methods: {
        refreshInput() {
            this.goodsName = ""
            this.goodsAddress = ""
            this.goodsType = ""
            this.goodsInventor = ""
            this.goodsCode = ""
            this.tableData = this.$store.getters.getGoods
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDelete(index, row) {
            this.$message.success("删除成功")
            this.tableData.splice(index, 1)
            let tmp = this.$store.getters.getGoods
            tmp = tmp.filter((obj) => {
                return obj.goodsID !== row.goodsID
            })
            this.$store.dispatch("asyncUpdateGoods", tmp)
        },
        // eslint-disable-next-line no-unused-vars
        handleEdit(index, row) {
            this.selectedIdEdit = row.goodsID
            this.editForm = JSON.parse(JSON.stringify(row))
            console.log(this.editForm)
            this.editPosition = {
                lng: row.goodsLongitude,
                lat: row.goodsLatitude
            }
            this.editForm.goodsAddressDetail = row.goodsAddressDetail
            this.editForm.goodsAddress = row.goodsAddress
            this.editFormVisible = true
        },
        search() {
            // eslint-disable-next-line no-unused-vars
            let searchList = this.$store.getters.getGoods
            if (this.goodsName !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.goodsName.indexOf(this.goodsName) !== -1
                })
            }
            if (this.goodsCode !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.goodsCode.indexOf(this.goodsCode) !== -1
                })
            }
            if (this.goodsType !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.goodsType === this.goodsType
                })
            }
            if (this.goodsAddress !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.goodsAddress.indexOf(this.goodsAddress) !== -1
                })
            }
            if (this.goodsInventor !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.goodsInventor === this.goodsInventor
                })
            }
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.add()
                } else {
                    return false;
                }
            });
        },
        add() {
            this.addFormVisible = false
            this.addForm.goodsID = "" + (Math.max.apply(Math, this.$store.getters.getGoods.map(function (o) {
                return parseInt(o.goodsID)
            })) + 1)
            this.addForm.goodsCode = "" + Math.round(Math.random() * 100000)
            let tmpform = JSON.parse(JSON.stringify(this.addForm)) // 深拷贝
            let tmp = this.$store.getters.getGoods
            tmp.push(tmpform)
            this.$store.dispatch("asyncUpdateGoods", tmp)
            this.$message.success("添加成功！")
            this.$refs['addForm'].resetFields();
        },
        closeAddNewGoods() {
            this.$refs['addForm'].resetFields();
            this.addFormVisible = false
        },
        editGoods() {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.edit()
                } else {
                    return false;
                }
            });
        },
        edit() {
            let tmp = this.$store.getters.getGoods
            tmp.forEach((goods) => {
                if (goods.goodsID === this.editForm.goodsID) {
                    for (let key in goods) {
                        goods[key] = this.editForm[key]
                    }
                }
            })
            this.$store.dispatch("asyncUpdateGoods", tmp)
            this.editFormVisible = false
            this.$message.success('编辑成功')
        },
        closeEditGoods() {
            this.$refs['editForm'].resetFields();
            this.editFormVisible = false
        },

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

        handleSelect(item) {
            this.position = item.location
            this.addForm.goodsLongitude = this.position.lng
            this.addForm.goodsLatitude = this.position.lat
            this.addForm.goodsAddress = item.name
            this.addForm.goodsAddressDetail = item.address
        },
        handleEditSelect(item) {
            this.editPosition = item.location
            this.editForm.goodsLongitude = this.editPosition.lng
            this.editForm.goodsLatitude = this.editPosition.lat
            this.editForm.goodsAddress = item.name
            this.editForm.goodsAddressDetail = item.address
        },
        // eslint-disable-next-line no-unused-vars
        handleIconClick(ev) {
            // console.log(ev);
        },
    }
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
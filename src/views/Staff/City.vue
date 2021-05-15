<template>
    <div>
        <div style="font-size: 20px">城市信息维护</div>
        <div style="margin-top: 20px;display: flex">
            <div>
                风险企业：
                <el-select v-model="firmValue" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in firmOptions"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="margin-left: 10px;display: flex;align-items: center"><span></span>
                目标物资：
                <el-input v-model="targetGoods" style="width: 200px" clearable placeholder="请选择"/>

            </div>
            <div style="margin-left: 10px">
                路况：
                <el-select v-model="roadStatus" clearable placeholder="请选择">
                    <el-option
                        key="1"
                        label="正常"
                        value="正常">
                    </el-option>
                    <el-option
                        key="2"
                        label="拥堵"
                        value="拥堵">
                    </el-option>
                    <el-option
                        key="3"
                        label="施工"
                        value="施工">
                    </el-option>
                </el-select>
            </div>
            <el-button style="margin-left: 10px" icon="el-icon-search">查询</el-button>
            <el-button>重置</el-button>

        </div>
        <el-button icon="el-icon-plus" style="margin-top: 10px;margin-bottom: 10px" type="primary"
                   @click="()=>{dialogVisible=true;editMode=1}">添加
        </el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="55">
            </el-table-column>
            <el-table-column
                label="风险企业"
                width="300">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <p>企业名称: {{ getFirm(scope.row.firmID).name }}</p>
                        <p>企业地址: {{ getFirm(scope.row.firmID).address }}</p>
                        <p>企业法人: {{ getFirm(scope.row.firmID).person }}</p>
                        <p>企业联系电话: {{ getFirm(scope.row.firmID).phone }}</p>
                        <SmallMap :lat="getFirm(scope.row.firmID).location.lat"
                                  :lng="getFirm(scope.row.firmID).location.lng"/>
                        <span slot="reference" class="name-wrapper">
                            <div>{{ getFirm(scope.row.firmID).name }}

                            </div>
                        </span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                label="目标物资"
                width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ getGoods(scope.row.targetGoodsID).goodsName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="目标物资点"
                width="150">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <SmallMap :lat="parseFloat(getGoods(scope.row.targetGoodsID).goodsLatitude) "
                                  :lng="parseFloat(getGoods(scope.row.targetGoodsID).goodsLongitude) "/>
                        <span slot="reference" class="name-wrapper">
                            <div>{{ getGoods(scope.row.targetGoodsID).goodsAddress }}

                            </div>
                        </span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="people"
                label="救援人数"
                width="55">
            </el-table-column>
            <el-table-column
                prop="car"
                label="救援车数"
                width="55">
            </el-table-column>
            <el-table-column

                label="路长"
                width="80">
                <template slot-scope="scope">

                    <span>{{ scope.row.length }}km</span>
                </template>
            </el-table-column>
            <el-table-column
                label="路况"
                width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state==='正常'" size="medium" type="success">{{ scope.row.state }}</el-tag>
                    <el-tag v-if="scope.row.state==='拥堵'" size="medium" type="warning">{{ scope.row.state }}</el-tag>
                    <el-tag v-if="scope.row.state==='施工'" size="medium" type="danger">{{ scope.row.state }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="comment"
                label="备注"
                width="55">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"
                        size="mini"
                        type="primary"
                        @click="()=>{
                          dialogVisible=true;
                          editMode=1;
                        handleEdit(scope.$index, scope.row)
                        }">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        icon="el-icon-delete"
                        type="danger"
                        @click="()=>{
                            handleDelete(scope.$index, scope.row)
                        }">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="editMode===1?'新增':'编辑'"
            :visible.sync="dialogVisible"
            width="35%"

        >
            <el-form :model="routeForm" :rules="rules" ref="routeForm" @submit.native.prevent>
                <el-form-item prop="id" label="ID:" label-width="100px">
                    <el-input style="width: 300px" v-model="routeForm.id"/>
                </el-form-item>
                <el-form-item prop="firmID" label="风险企业:" label-width="100px">
                    <el-select v-model="routeForm.firmID" clearable placeholder="请选择">
                        <el-option
                            v-for="item in firmOptions"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="targetGoodsID" label="目标物资:" label-width="100px">
                    <el-select v-model="routeForm.targetGoodsID" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in firmOptions"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="people" label="救援人数:" label-width="100px">
                    <el-input style="width: 300px" v-model="routeForm.people"/>
                </el-form-item>
                <el-form-item prop="car" label="救援车辆:" label-width="100px">
                    <el-input style="width: 300px" v-model="routeForm.car"/>
                </el-form-item>
                <el-form-item prop="length" label="路长:" label-width="100px">
                    <el-input style="width: 300px" v-model="routeForm.length"/>
                </el-form-item>
                <el-form-item prop="state" label="路况:" label-width="100px">
                    <el-select v-model="routeForm.state" clearable placeholder="请选择">
                        <el-option
                            key="1"
                            label="正常"
                            value="正常">
                        </el-option>
                        <el-option
                            key="2"
                            label="拥堵"
                            value="拥堵">
                        </el-option>
                        <el-option
                            key="3"
                            label="施工"
                            value="施工">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="comment" label="备注:" label-width="100px">
                    <el-input style="width: 300px" v-model="routeForm.comment"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import SmallMap from "@/components/SmallMap";

export default {
    name: "City",
    components: {SmallMap},
    data() {
        return {
            firmOptions: [
                {
                    id: 1,
                    value: '东软',
                },
                {
                    id: 2,
                    value: '东软睿道',
                },
                {
                    id: 3,
                    value: '中软',
                },
                {
                    id: 4,
                    value: '西软',
                },
            ],
            firmValue: '',
            roadStatus: '',
            targetGoods: '',
            tableData: this.$store.getters.getRoutes,
            dialogVisible: false,
            editMode: 1,
            routeForm: {
                id: 4,
                firmID: 1,
                targetGoodsID: 1,
                people: 0,
                car: 0,
                length: 0,
                state: '正常',
                comment: ""
            },
            rules: {
                id: [
                    {required: true, message: '请输入ID', trigger: 'change'}
                ],
                firmID: [
                    {required: true, message: '请选择风险企业', trigger: 'change'}
                ],
                targetGoodsID: [
                    {required: true, message: '请选择目标物资', trigger: 'change'}
                ],
                people: [
                    {required: true, message: '请输入救援人员数量', trigger: 'change'}
                ],
                car: [
                    {required: true, message: '请输入救援车辆数', trigger: 'change'}
                ],
                length: [
                    {required: true, message: '请输入路长', trigger: 'change'}
                ],
                state: [
                    {required: true, message: '请选择路况', trigger: 'change'}
                ],
                comment: [
                    {required: true, message: '请输入备注', trigger: 'change'}
                ],
            }
        }
    },
    methods: {
        getFirm(firmID) {
            const firm = this.$store.getters.getFirm(firmID)

            return firm
        },
        getGoods(goodsID) {
            const goods = this.$store.getters.getGood(goodsID)
            return goods
        },
        handleConfirm() {
            this.dialogVisible = false
            console.log(this.routeForm)
        },
        handleEdit(index, row) {
            console.log(index)
            console.log(row)
            this.routeForm = row
        }

    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
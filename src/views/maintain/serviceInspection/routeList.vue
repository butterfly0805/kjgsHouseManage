<template>
  <div class="app-container">
    <el-form
      :model="request.params"
      ref="queryForm"
      size="small"
      :inline="true"
    >
      <el-form-item label="巡检条目名称" prop="operIp">
        <el-input
          v-model="request.params.idNumber"
          placeholder="请输入巡检条目名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="query"
        />
      </el-form-item>
      <el-form-item label="巡检状类别" prop="title">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="query"
          >搜索</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="showAdd"
          >巡检条目</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetFunc"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-dropdown class="trigger-column">
      <el-button type="primary" size="mini">
        显示隐藏列<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-checkbox-group v-model="checkedTableColumns">
          <el-dropdown-item v-for="column in columns" :key="column.prop">
            <el-checkbox :label="column.prop">{{ column.label }} </el-checkbox>
          </el-dropdown-item>
        </el-checkbox-group>
      </el-dropdown-menu>
    </el-dropdown>
    <common-table
      ref="table"
      :pager="pager"
      :columns="bindTableColumns"
      :max-height="1200"
      :request="request"
      :data="tableData"
      size="medium"
    >
      <el-table-column slot="isMaintain" label="是否需要巡检">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.isMaintain == '1'">是</el-tag>
          <el-tag type="success" v-if="scope.row.isMaintain == '2'">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column slot="maintainStatus" label="状态">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.maintainStatus == '巡检中'">{{
            scope.row.maintainStatus
          }}</el-tag>
          <el-tag
            type="success"
            v-if="scope.row.maintainStatus == '巡检完成'"
            >{{ scope.row.maintainStatus }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        slot="table_oper"
        label="操作"
        min-width="120px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="addVisible = true"> 修改 </el-button>
          <el-button
            type="text"
            @click="addVisible = true"
            style="color: #ff0000"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </common-table>
    <el-dialog
      class="common-popup"
      :visible.sync="addVisible"
      title="新增巡检条目"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="巡检条目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="巡检条目类型">
          <el-select v-model="form.type" placeholder="请选择巡检条目类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检标准">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否需要拍照">
          <el-radio-group v-model="form.name">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="巡检内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseTableQuery } from "@/api/table";
export default {
  computed: {
    bindTableColumns() {
      return this.columns.filter((column) => column.show);
    },
    /* 这里使用了getter和setter，这样写的好处不用自己手动监听复选框的选中事件 */
    checkedTableColumns: {
      get() {
        // 返回选中的列名
        return this.bindTableColumns.map((column) => column.prop);
      },
      set(checked) {
        // 设置表格列的显示与隐藏
        this.columns.forEach((column, index) => {
          // 如果选中，则设置列显示
          if (checked.includes(column.prop)) {
            column.show = true;
          } else {
            // 如果未选中，则设置列隐藏
            column.show = false;
          }
        });
      },
    },
  },
  data() {
    return {
      value: "",
      pager: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 10, 20, 50],
        total: 0,
        type: 1,
      },
      request: {
        url: "/api/v1_1_0/scf/client/blockchain/infos/",
        params: {
          idNumber: "",
          houseAddress: "",
        },
      },
      columns: [
        { prop: "No", show: true },
        { prop: "number", label: "编号", show: true },
        { prop: "name", label: "巡检条目名称", show: true },
        { prop: "type", label: "巡检条目类型", show: true },
        { prop: "rules", label: "巡检标准", show: true },
        { prop: "isPic", label: "是否拍照", show: true },
        { prop: "content", label: "巡检内容", show: true },
      ],
      addColumn: [],
      tableData: [],
      evidenceList: [],
      dialogVisible: false,
      detailInfo: {},
      type: "",
      pk: 0,
      addVisible: false,
      statusList: [
        {
          value: "1",
          label: "巡检中",
        },
        {
          value: "2",
          label: "巡检完成",
        },
      ],
      form: {
        name: "",
        desc: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入巡检条目名称", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        desc: [{ max: 200, message: "长度在200个字符以内", trigger: "blur" }],
      },
    };
  },
  async mounted() {
    // this.query();
    this.pager.total = 2;
    this.tableData = [
      {
        number: "001",
        name: "巡检条目1",
        type: "type1",
        rules: "主体结构安全",
        isPic: "是",
        content: "巡检中巡检条目名称巡检条目名称巡检条目名称巡检条目名称",
      },
      {
        number: "002",
        name: "巡检条目2",
        type: "type2",
        rules: "无漏雨现象",
        isPic: "是",
        content: "巡检中巡检条目名称巡检条目名称巡检条目名称巡检条目名称",
      },
      {
        number: "002",
        name: "巡检条目2",
        type: "type3",
        rules: "主体结构安全",
        isPic: "是",
        content: "巡检中巡检条目名称巡检条目名称巡检条目名称巡检条目名称",
      },
    ];
    this.addColumn = [{ type: "selection", width: 70 }, ...this.columns];
  },
  methods: {
    async query() {
      const res = await baseTableQuery(this.pager, this.request);
      if (res.code === 200) {
        const resData = res.data;
        this.pager.total = resData.total;
        this.tableData = resData.list || [];
      }
    },
    searchFunc() {
      this.pager.pageNo = 1;
      this.query();
    },
    resetFunc() {
      this.pager.pageNo = 1;
      this.request.params = this.initFormData();
      this.query();
    },
    initFormData() {
      return {
        number: "",
        tx_hash: "",
        data_type: "",
        evidence_type_name: "",
      };
    },
    toDetail(row) {
      this.$router.push("/houseInfo/house-info/detail/" + row.number);
    },
    showAdd() {
      this.addVisible = true;
      console.log(this.tableData);
    },
    confirmAdd() {
      this.addVisible = false;
    },
    handleClose() {
      this.detailInfo = {};
      this.dialogVisible = false;
    },
  },
};
</script>

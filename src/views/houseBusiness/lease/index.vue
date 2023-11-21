<template>
  <div class="app-container">
    <el-form
      :model="request.params"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="出租人" prop="operIp">
        <el-input
          v-model="request.params.idNumber"
          placeholder="请输入出租人"
          clearable
          style="width: 240px"
          @keyup.enter.native="query"
        />
      </el-form-item>
      <el-form-item label="承租人" prop="title">
        <el-input
          v-model="request.params.houseAddress"
          placeholder="请输入承租人"
          clearable
          style="width: 240px"
          @keyup.enter.native="query"
        />
      </el-form-item>
      <el-form-item label="房屋地址" prop="title">
        <el-input
          v-model="request.params.houseAddress"
          placeholder="请输入房屋地址"
          clearable
          style="width: 240px"
          @keyup.enter.native="query"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="query"
          >搜索</el-button
        >
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="toAdd"
          >新增</el-button
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
      :tableRowClassName="tableRowClassName"
      size="medium"
    >
      <el-table-column slot="rentStatus" label="状态">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.rentStatus == 0">未出租</el-tag>
          <el-tag type="warning" v-else-if="scope.row.rentStatus == 1"
            >出租中</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.rentStatus == 2"
            >出租成功</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column min-width="140px" slot="contractStatus" label="合同状态">
        <template slot-scope="scope">
          <div>
            <el-tag type="danger" v-if="scope.row.rentStatus == 0">--</el-tag>
            <el-tag
              type="warning"
              v-else-if="
                scope.row.rentStatus != 0 && scope.row.contractStatus == 1
              "
              >合同即将到期</el-tag
            >
            <el-tag
              type="danger"
              v-else-if="
                scope.row.rentStatus != 0 && scope.row.contractStatus == 2
              "
              >合同已到期</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        slot="table_oper"
        label="操作"
        min-width="400px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-view"
            @click="toDetail(scope.row)"
          >
            查看详情
          </el-button>
          <el-button
            type="text"
            icon="el-icon-user"
            style="color: orange"
            @click="openLessee(scope.row)"
          >
            承租人管理
          </el-button>
          <el-button
            type="text"
            icon="el-icon-help"
            style="color: #13ce66"
            @click="rentConfirm"
            >租金确认</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="合同还有一个月到期，去合同管理处理吗？"
            @confirm="confirmToContract"
          >
            <el-button
              style="color: red; margin-left: 10px"
              icon="el-icon-warning-outline"
              type="text"
              slot="reference"
              >合同到期提醒</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </common-table>
    <el-dialog
      class="common-popup"
      :visible.sync="rentVisible"
      title="租金确认"
      width="500px"
    >
      <div>
        <el-form
          ref="rentform"
          :model="rentform"
          :rules="rentRules"
          label-width="60px"
        >
          <el-form-item label="租金" prop="amount">
            <el-input v-model="rentform.amount" placeholder="请输入租金金额" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="rentConfirmSubmit"
          >确认</el-button
        >
        <el-button size="mini" @click="rentCancel">取消</el-button>
      </div>
    </el-dialog>
    <leasee-manage
      ref="leaseeManage"
      :rentRelId="rentRelId"
      :dialogVisible="LeaseeVisible"
      @closeLeaseeDialog="closeLeaseeDialog"
      @confirmLeaseeDialog="confirmLeaseeDialog"
    />
    <contract-manage
      ref="contractManage"
      :rentRelId="rentRelId"
      :dialogVisible="contractVisible"
      @closeContractDialog="closeContractDialog"
      @confirmContractDialog="confirmContractDialog"
    />
  </div>
</template>

<script>
import { baseTableQuery } from "@/api/table";
import LeaseeManage from "./components/LeaseeManage";
import ContractManage from "./components/ContractManage";
export default {
  components: {
    LeaseeManage,
    ContractManage,
  },
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
      rentform: {
        amount: "",
      },
      rentRules: {
        amount: [{ required: true, message: "租金不能为空", trigger: "blur" }],
      },
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
        { prop: "name1", label: "出租人", show: true },
        {
          prop: "idNumber1",
          label: "出租人身份证号",
          minWidth: 200,
          show: true,
        },
        { prop: "name2", label: "承租人", show: true },
        {
          prop: "idNumber2",
          label: "承租人身份证号",
          minWidth: 200,
          show: true,
        },
        { prop: "rentStatus", label: "状态", show: true, slots: true },
        {
          prop: "contractStatus",
          label: "合同状态",
          show: true,
          minWidth: 200,
          slots: true,
        },
        { prop: "signAddr", label: "签订地点", show: true },
        { prop: "signTime", label: "签订时间", show: true },
        { prop: "rentLimit", label: "租赁期限", show: true },
        { prop: "number", label: "房屋编号", show: true },
        { prop: "houseAddress", label: "房屋地址", show: true },
        { prop: "houseBuildTime", label: "房屋修建时间", show: true },
        { prop: "houseArea", label: "房屋建筑面积", show: true },
        { prop: "rentAmount", label: "租金", show: true },
        { prop: "use", label: "租赁房屋的用途", show: true },
        { prop: "houseMaintain", label: "租赁房屋的维修", show: true },
      ],
      tableData: [],
      typeMap: {
        data: "数据",
        file: "文件",
      },
      rentVisible: false, // 输入租金弹窗是否显示
      LeaseeVisible: false, // 承租人弹窗是否显示
      rentRelId: null, // 承租关系id
      contractVisible: false, // 合同管理弹窗
    };
  },
  async mounted() {
    // this.query();
    console.log(this.columns.length);
    this.pager.total = 2;
    this.tableData = [
      {
        number: "001",
        name1: "张三",
        idNumber1: "140622199909081234",
        name2: "王三",
        idNumber2: "140622199909081234",
        signAddr: "天津和平区",
        signTime: "2023.10.3",
        rentLimit: "三年",
        use: "办公",
        houseBuildTime: "2013.10.3",
        houseArea: "500平方米",
        rentAmount: "50000元/月",
        houseMaintain: "",
        houseAddress: "天津河东区xxx",
        rentStatus: 0,
        contractStatus: 0, // 0:未到期，1:合同即将到期，2: 合同已到期
      },
      {
        number: "002",
        name1: "李四",
        idNumber1: "140622199709081234",
        name2: "赵四",
        idNumber2: "140622199709081234",
        signAddr: "天津和平区",
        signTime: "2023.10.3",
        rentLimit: "三年",
        use: "办公",
        houseBuildTime: "2013.10.3",
        houseArea: "500平方米",
        rentAmount: "50000元/月",
        houseMaintain: "",
        houseAddress: "天津河东区xxx",
        rentStatus: 1,
        contractStatus: 2,
      },
      {
        number: "002",
        name1: "李四",
        idNumber1: "140622199709081234",
        name2: "赵四",
        idNumber2: "140622199709081234",
        signAddr: "天津和平区",
        signTime: "2023.10.3",
        rentLimit: "三年",
        use: "办公",
        houseBuildTime: "2013.10.3",
        houseArea: "500平方米",
        rentAmount: "50000元/月",
        houseMaintain: "",
        houseAddress: "天津河东区xxx",
        rentStatus: 1,
        contractStatus: 1,
      },
    ];
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
    toAdd() {
      this.$router.push("/houseBusiness/lease/add");
    },
    rentConfirm() {
      this.rentVisible = true;
    },
    rentCancel() {
      this.rentVisible = false;
    },
    rentConfirmSubmit() {},
    // 打开承租人管理弹窗
    openLessee() {
      this.LeaseeVisible = true;
    },
    // 关闭承租人管理弹窗
    closeLeaseeDialog() {
      this.LeaseeVisible = false;
    },
    confirmLeaseeDialog() {
      this.LeaseeVisible = false;
    },
    // 合同到期查看
    confirmToContract() {
      console.log("confirm contract");
      this.contractVisible = true;
    },
    closeContractDialog() {
      this.contractVisible = false;
    },
    confirmContractDialog() {
      this.contractVisible = false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.contractStatus === 1) {
        return "warning-row";
      } else if (row.contractStatus === 2) {
        return "danger-row";
      }
      return "";
    },
  },
};
</script>

<style scoprd lang="scss">
// ::v-deep {
.el-button [class*="el-icon-"] + span {
  margin-left: 2px;
}
// }
</style>

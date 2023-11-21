<template>
  <div class="app-container">
    <el-form
      :model="request.params"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="租赁人" prop="operIp">
        <el-input
          v-model="request.params.idNumber"
          placeholder="请输入租赁人"
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
        <el-button
          type="success"
          icon="el-icon-refresh-right"
          size="mini"
          @click="syncData"
          >同步数据</el-button
        >
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="toAdd"
          >手动录入</el-button
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
        <!-- <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item> -->
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
      <el-table-column
        slot="table_oper"
        label="操作"
        min-width="120px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </common-table>
    <el-dialog
      class="common-popup"
      :visible.sync="syncVisible"
      title="同步房产数据"
    >
      <common-table
        ref="table"
        :pager="pager"
        :columns="addColumn"
        :max-height="1200"
        :request="request"
        :data="tableData"
        :showPager="false"
        size="medium"
      >
        <el-table-column
          slot="table_oper"
          label="操作"
          min-width="120px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </common-table>
      <div slot="footer" class="dialog-footer">
        <span style="margin-right: 30px">已勾选1条房产数据</span>
        <el-button type="text" @click="confirmAdd">确认新增</el-button>
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
        { prop: "number", label: "房屋编号", show: true },
        { prop: "name1", label: "租赁人", show: true },
        {
          prop: "idNumber1",
          label: "租赁人身份证号",
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
        { prop: "houseAddress", label: "房屋地址", show: true },
        { prop: "portion", label: "房屋修建时间", show: true },
        { prop: "use", label: "房屋面积", show: true },
        { prop: "houseSource", label: "租金", show: true },
        { prop: "property", label: "房屋所有权性质", show: true },
        { prop: "landUseSource", label: "土地使用权来源", show: true },
        { prop: "landUseProperty", label: "土地使用权性质", show: true },
      ],
      addColumn: [],
      tableData: [],
      typeMap: {
        data: "数据",
        file: "文件",
      },
      evidenceList: [],
      dialogVisible: false,
      detailInfo: {},
      type: "",
      pk: 0,
      syncVisible: false,
    };
  },
  async mounted() {
    // this.query();
    this.pager.total = 2;
    this.tableData = [
      {
        number: "001",
        name1: "张三",
        idNumber1: "140622199909081234",
        name2: "王三",
        idNumber2: "140622199909081234",
        country: "中国",
        houseSource: "2003年新建",
        use: "住宅",
        portion: "全部",
        property: "私有",
        landUseSource: "2002年受让",
        landUseProperty: "国有",
        houseAddress: "天津河东区xxx",
      },
      {
        number: "002",
        name1: "李四",
        idNumber1: "140622199709081234",
        name2: "赵四",
        idNumber2: "140622199709081234",
        country: "中国",
        houseSource: "2003年新建",
        use: "住宅",
        portion: "全部",
        property: "私有",
        landUseSource: "2002年受让",
        landUseProperty: "国有",
        houseAddress: "天津河西区xxx",
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
    toAdd() {
      this.$router.push("/houseBusiness/leaseManage/lease/add");
    },
    syncData() {
      this.syncVisible = true;
      console.log(this.tableData);
    },
    confirmAdd() {
      this.syncVisible = false;
    },
    handleClose() {
      this.detailInfo = {};
      this.dialogVisible = false;
    },
  },
};
</script>

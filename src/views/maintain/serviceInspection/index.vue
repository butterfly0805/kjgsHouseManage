<template>
  <div class="app-container">
    <el-form
      :model="request.params"
      ref="queryForm"
      size="small"
      :inline="true"
    >
      <el-form-item label="巡检计划名称" prop="operIp">
        <el-input
          v-model="request.params.idNumber"
          placeholder="请输入巡检计划名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="query"
        />
      </el-form-item>
      <el-form-item label="巡检状态" prop="title">
        <el-select v-model="request.params.status" placeholder="请选择">
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
          type="warning"
          icon="el-icon-notebook-2"
          size="mini"
          @click="toRouteItem"
          >巡检条目</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="addVisible = true"
          >新增巡检计划</el-button
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
          <!-- <el-button type="text" @click="toDetail(scope.row)">
            查看详情
          </el-button> -->
          <el-button type="text" @click="toEdit(scope.row)"> 修改 </el-button>
          <el-button
            type="text"
            @click="toPub(scope.row)"
            icon="el-icon-thumb"
            style="color: #ff0000"
          >
            派单
          </el-button>
        </template>
      </el-table-column>
    </common-table>
    <el-dialog
      class="common-popup"
      :visible.sync="addVisible"
      title="新增巡检计划"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="巡检计划名称">
          <el-input
            v-model="form.name"
            placeholder="请输入巡检计划名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="巡检房屋">
          <el-input
            v-model="form.addr"
            placeholder="请输入巡检房屋地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-select v-model="form.person" multiple placeholder="请选择巡检员">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检计划时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检条目">
          <el-select v-model="form.item" multiple placeholder="请选择巡检条目">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="common-popup"
      :visible.sync="sendVisible"
      title="派单"
      width="800px"
    >
      <el-form
        :model="sendForm"
        ref="sendForm"
        size="small"
        label-width="100px"
      >
        <el-form-item label="巡检单位">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            :model="sendForm.org"
            @check-change="handleCheckChange"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-select v-model="sendForm.person" placeholder="请选择">
            <el-option label="张三" value="1"></el-option>
            <el-option label="李四" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检时间">
          <el-date-picker
            v-model="sendForm.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendVisible = false">取 消</el-button>
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
          status: "",
        },
      },
      columns: [
        { prop: "No", show: true },
        { prop: "number", label: "房屋编号", show: true },
        { prop: "houseAddress", label: "巡检房产", show: true },
        { prop: "name", label: "房屋所属单位", show: true },
        { prop: "isMaintain", label: "是否需要巡检", show: true, slots: true },
        { prop: "maintainStatus", label: "巡检状态", show: true, slots: true },
        { prop: "maintainPerson", label: "巡检人员", show: true },
        { prop: "maintainItem", label: "巡检项目", show: true },
      ],
      addColumn: [],
      tableData: [],
      evidenceList: [],
      addVisible: false,
      detailInfo: {},
      type: "",
      pk: 0,
      routeVisible: false,
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
        addr: "",
        person: "",
        time: "",
        item: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入巡检条目名称", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        desc: [{ max: 200, message: "长度在200个字符以内", trigger: "blur" }],
      },
      options: [],
      props: {
        label: "name",
        children: "zones",
      },
      count: 1,
      sendForm: {},
      sendVisible: false,
    };
  },
  async mounted() {
    // this.query();
    this.pager.total = 2;
    this.tableData = [
      {
        number: "001",
        name: "张三",
        houseAddress: "天津河西区xxx",
        maintainStatus: "巡检中",
        maintainPerson: "李四",
        maintainItem: "地板",
        isMaintain: 1,
      },
      {
        number: "002",
        name: "张三2",
        houseAddress: "天津河北区xxx",
        maintainStatus: "巡检中",
        maintainPerson: "李四",
        maintainItem: "墙壁",
        isMaintain: 1,
      },
      {
        number: "003",
        name: "张三1",
        houseAddress: "天津河东区xxx",
        maintainStatus: "巡检完成",
        maintainPerson: "李四",
        maintainItem: "房顶",
        isMaintain: 2,
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
    toEdit(row) {
      this.addVisible = false;
    },
    toAdd() {
      this.$router.push("/maintain/maintain/add");
    },
    syncData() {
      this.routeVisible = true;
      console.log(this.tableData);
    },
    confirmAdd() {
      this.addVisible = false;
    },
    handleClose() {
      this.detailInfo = {};
      this.addVisible = false;
    },

    // 跳转到巡检条目
    toRouteItem() {
      this.$router.push(
        "/maintain/serviceInspection-item/inspectionrRouteList"
      );
    },

    toPub() {
      this.sendVisible = true;
      console.log(this.tableData);
    },
    confirmAdd() {
      this.sendVisible = false;
    },
    // 树
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "单位1" }, { name: "单位2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "单位1") {
        hasChild = true;
      } else if (node.data.name === "单位2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++,
            },
            {
              name: "zone" + this.count++,
            },
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select,
.el-date-editor {
  width: 100%;
}
</style>

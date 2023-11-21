<template>
  <div>
    <pub-table
      :tab-columns="tabColumns"
      :tab-datas="tabDatas"
      :operationNum="3"
      @rowSelectionChanged="rowSelected"
      :isShowOperate="isShowOperate"
      :multable="multable"
      :isShowIndex="isShowIndex"
    >
      <template slot="btnsArea">
        <el-button type="primary" class="addGreenBtn" icon="el-icon-plus"
          >添加</el-button
        >
        <el-button type="primary" class="greenBtn" icon="el-icon-delete"
          >删除</el-button
        >
      </template>

      <template slot="searchBtn">
        <input
          class="role-search-input"
          type="text"
          v-model="searchKw"
          placeholder="输入关键字搜索"
        />
        <span class="icon iconfont icon-search" v-on:click="searchRole"></span>
      </template>
      <template slot="name" slot-scope="scope">
        测试{{ scope.row.name }}
      </template>
      <template slot-scope="scope">
        <el-button @click="editRole(scope.row)" class="el-table-btn" type="text"
          >编辑</el-button
        >
        <el-button @click="readRole(scope.row)" class="el-table-btn" type="text"
          >查看</el-button
        >
        <el-button @click="relation(scope.row)" class="el-table-btn" type="text"
          >相关用户</el-button
        >
      </template>
    </pub-table>
  </div>
</template>

<script>
import MoveTable from "@/components/MoveTable/index";
export default {
  components: {
    MoveTable: MoveTable,
  },
  data() {
    return {
      tabColumns: [
        {
          attr: { prop: "code", label: "编码", sortable: true },
        },
        {
          attr: { prop: "name", label: "名称" },
          isShow: true,
          slot: true,
        },
      ],
      isShowOperate: true, //  是否显示操作列
      multable: true, // 是否显示多选列
      isShowIndex: true, // 是否显示序号列
    };
  },
  methods: {
    //监听选中的行
    rowSelected(rows) {
      this.checkedRows = rows;
      console.log(this.checkedRows);
    },
  },
};
</script>

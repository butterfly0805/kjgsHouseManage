<template>
  <div id="commonTable">
    <el-table
      :ref="name"
      :data="tableData"
      :max-height="maxHeight"
      tooltip-effect="dark"
      :header-cell-style="{
        color: '#262626',
        fontSize: '14px',
        height: '54px',
      }"
      :row-style="{
        height: '20px',
        padding: '0',
        overflow: 'auto',
        color: '#262626',
      }"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @select="select"
      @sort-change="sortChange"
    >
      <template slot="empty">
        <el-empty description="暂无数据" :image="noDataImg" :image-size="160" />
        <!-- <div class="empty">
          <svg-icon icon-class="nodata" class="empty__image" />
          <p class="empty__description">暂无数据</p>
        </div> -->
      </template>
      <template v-for="item in columns">
        <slot v-if="item.slots != undefined" :name="item.prop" />
        <!-- 序列号 -->
        <el-table-column
          v-if="item.prop === 'No' && item.show"
          :key="item.id"
          :label="item.label || '序号'"
          align="left"
          :width="item.width ? item.width : 80"
          type="index"
        >
          <template slot-scope="scope">
            <span>{{
              scope.$index + 1 + (pager.pageNo - 1) * pager.limit
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="
            item.show !== false && item.slots === undefined && item.prop != 'No'
          "
          :key="item.id"
          :show-overflow-tooltip="item.overflow"
          :type="item.type"
          :prop="item.prop"
          :label="item.label"
          :align="item.align ? item.align : 'left'"
          :width="item.width"
          :min-width="item.minWidth ? item.minWidth : 150"
          :formatter="item.formatter ? item.formatter : formatterValue"
        />
      </template>
      <slot name="table_oper" />
    </el-table>
    <slot name="bottom_menu" />
    <div class="block" style="text-align: right" v-if="showPager">
      <el-pagination
        background
        :current-page="pager.pageNo"
        :page-size="pager.limit"
        :page-sizes="pager.sizes"
        :total="pager.total"
        layout="slot,prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="total-show">
          <span style="margin-right: 16px">共{{ pager.total }}条记录</span>
          <span
            >第{{ pager.pageNo }}/{{
              Math.ceil(pager.total / pager.limit) === 0
                ? 1
                : Math.ceil(pager.total / pager.limit)
            }}页</span
          >
        </span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { baseTableQuery } from "@/api/table.js";
import { Message } from "element-ui";
import Sortable from "sortablejs";
import noDataImg from "@/assets/images/common/no_search_data.png";
export default {
  name: "CommonTable",
  props: {
    height: {
      type: Number,
      default: () => {
        return 500;
      },
    },
    request: Object,
    columns: Array,
    data: Array,
    name: { type: String },
    renderHeader: { type: String },
    pager: {
      type: Object,
      default: () => {
        return {
          pageNo: 1,
          limit: 20,
          sizes: [20, 50, 100],
          total: 0,
          type: 1,
        };
      },
    },
    showPager: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: [String, Number],
      default: 200,
    },
    tableRowClassName: {
      type: Function,
    },
  },
  data() {
    return {
      tableData: [],
      pageWidth: "",
      noDataImg: noDataImg,
    };
  },
  watch: {
    data(newValue, oldValue) {
      // 判断是前台分页还是后台分页
      if (this.pager.type === 0) {
        // 前台分页逻辑
        this.pager.total = newValue.length;
        const pageStart = (this.pager.pageNo - 1) * this.pager.limit;
        const pageEnd =
          this.pager.pageNo * this.pager.limit > this.pager.total
            ? this.pager.total
            : this.pager.pageNo * this.pager.limit;
        this.tableData = this.data.slice(pageStart, pageEnd);
      } else {
        this.tableData = this.data;
      }
    },
  },
  mounted() {
    // this._rowDrop();
    this._columnDrop();
  },
  methods: {
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return "warning-row";
    //   } else if (rowIndex === 3) {
    //     return "success-row";
    //   }
    //   return "";
    // },
    getRef() {
      return this.$refs.table.selection;
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    sortChange(val) {
      // 排序方法
      this.$emit("sortChange", val);
    },
    async handleSizeChange(val) {
      this.pager.limit = val;
      // this.$emit('handleSizeChange', val);
      if (this.pager.type === 0) {
        // 前台分页计算当前页数据渲染表格
        const val = this.pager.pageNo;
        const pageStart = (val - 1) * this.pager.limit;
        const pageEnd =
          val * this.pager.limit > this.pager.total
            ? this.pager.total
            : val * this.pager.limit;
        this.tableData = this.data.slice(pageStart, pageEnd);
      } else {
        const res = await baseTableQuery(this.pager, this.request);
        //这部分根据后台格式需要修改
        if (res.code === 200) {
          // 给表格data赋值
          this.tableData = res.data.list || [];
          this.pager.total = res.data.total;
        } else {
        }
        // 给分页pager赋值写在了data的watch方法里面了
      }
    },
    //add供外部调用
    async handleTableList(pageNo) {
      this.handleCurrentChange(pageNo);
    },
    async handleCurrentChange(val) {
      // this.$emit('handleCurrentChange', val);
      // 判断一下总页数
      // if (val > this.pager.total) {
      //   return;
      // }
      // 判断page里面的分页标志是前台分页还是后台分页
      this.pager.pageNo = val;
      if (this.pager.type === 0) {
        // 前台分页计算当前页数据渲染表格
        const pageStart = (val - 1) * this.pager.limit;
        const pageEnd =
          val * this.pager.limit > this.pager.total
            ? this.pager.total
            : val * this.pager.limit;
        this.tableData = this.data.slice(pageStart, pageEnd);
      } else {
        const res = await baseTableQuery(this.pager, this.request).catch(() => {
          let { pageNo } = this.pager;
          if (pageNo > 1) {
            pageNo -= 1;
            this.pager.pageNo = pageNo;
            this.handleCurrentChange();
          }
        });
        if (res.code === 200) {
          // 给表格data赋值
          this.tableData = res.data.list;
          this.pager.total = res.data.total;
          this.$emit("tableDatas", this.tableData);
        }
        // 给分页pager赋值写在了data的watch方法里面了
      }
    },
    formatterValue(row, column, cellValue) {
      return cellValue;
    },
    handleDblclick() {
      this.$parent.rowDblclick();
    },
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    init(res) {
      // 重置页码到首页 避免在第N页删除数据
      this.pager.pageNo = 1;
      if (this.pager.type === 1) {
        if (res && res.code === 0) {
          this.tableData = res.list;
          if (res.list === undefined) {
            this.pager.total = 0;
            this.pager.pageNo = 1;
          }
          if (this.pager.type === 1) {
            this.pager.total = res.pageInfo.total;
          } else {
            this.pager.total = this.tableData.length;
          }
        } else {
          this.$refs.table.tableData = [];
          Message.error({ message: res.message, duration: 1500 });
        }
      } else {
        this.tableData = res.list;
        // this.data = res.data;
        this.pager.total = res.list.length;
        this.tableData = res.list.slice(0, this.pager.limit);
      }
    },
    //列拖拽
    _columnDrop() {
      // if (!this.hasDraggable) {
      //   return;
      // }
      const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
      const _this = this;
      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: ({ newIndex, oldIndex }) => {
          newIndex -= 1;
          oldIndex -= 1;
          const oldItem = this.columns[oldIndex - 1];
          _this.columns.splice(oldIndex - 1, 1);
          _this.columns.splice(newIndex - 1, 0, oldItem);
        },
      });
    },
    // 行拖拽
    _rowDrop() {
      // if (!this.hasDraggable) {
      //   return;
      // }
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.dataSource.splice(oldIndex, 1)[0];
          _this.dataSource.splice(newIndex, 0, currRow);
        },
      });
    },
  },
};
</script>
<style lang="scss">
/*.el-table__row .cell {*/
/*  overflow-y: auto;*/
/*  max-height: 125px;*/
/*}*/
.block {
  margin-top: 20px;
  .el-pagination {
    position: relative;
  }
  .total-show {
    font-size: 13px;
    font-weight: 400;
    color: #8c8c8c;
    position: absolute;
    left: 0;
    top: 0;
  }
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .el-pager li {
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
  }

  .el-pagination .el-select .el-input .el-input__inner {
    border-radius: 4px;
  }
}
.el-pagination {
  padding-bottom: 16px;
}
#commonTable {
  .cell {
    .pass {
      color: #148456;
    }
    .reject {
      color: #dc413e;
    }
  }
  a {
    color: #3377ff;
  }
  .link-btn {
    color: #3377ff;
    cursor: pointer;
  }
}
.el-table {
  .cell {
    // padding-left: 24px;
    p {
      margin: 0;
    }
  }
  th {
    background: #fafafa !important;
    border-top: 1px solid #f0f0f0;
    & > .cell {
      padding-left: 24px;
      color: #262626;
    }
  }
  td {
    color: #262626;
    border-bottom-color: #f0f0f0;
  }
  tbody tr:hover > td {
    background: #fafafa !important;
  }
  // 修复当有固定行时背景颜色左右不一致问题
  .el-table__body .el-table__row.hover-row td {
    background-color: #fafafa;
  }
  // 固定右侧样式
  .el-table__fixed-right {
    z-index: 6;
  }
}
.empty {
  .empty__image {
    font-size: 355px !important;
    margin-top: 30px;
  }
  .empty__description {
    margin-top: -60px;
    margin-bottom: 50px;
    line-height: 22px;
    font-weight: 400;
    color: #8c8c8c;
  }
}
.el-pager li {
  line-height: 26px !important;
}
.el-pagination__editor.el-input {
  top: -1px;
}
</style>
<style scoped lang="scss">
::v-deep .el-input__inner {
  height: 28px !important;
}
::v-deep .el-pagination {
  .el-pagination__sizes {
    .el-select {
      top: -2px;
      .el-input {
        height: 28px;
      }
    }
    .el-input--mini .el-input__icon {
      line-height: 26px;
    }
  }
}
::v-deep {
  .el-empty__description {
    margin-top: 16px;
  }
  .el-table__empty-text {
    line-height: 22px;
  }
}
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
::v-deep {
  .trigger-column {
  }
}
::v-deep {
  .el-table .warning-row {
    background: #f5eddd;
  }

  .el-table .danger-row {
    background: #fadbdb;
  }
}
</style>

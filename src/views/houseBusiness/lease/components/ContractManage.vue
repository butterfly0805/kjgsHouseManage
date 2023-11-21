<template>
  <el-dialog
    title="合同管理"
    class="common-popup"
    width="800px"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="leaseeForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="承租人类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="C">企业</el-radio>
          <el-radio label="P">个人</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.type == 'P'">
        <el-form-item label="承租人姓名" prop="leaseeName">
          <el-input v-model="form.leaseeName" placeholder="请输入承租人姓名" />
        </el-form-item>
        <el-form-item label="承租人身份证号" prop="leaseeId">
          <el-input
            v-model="form.leaseeId"
            placeholder="请输入承租人身份证号"
          />
        </el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 120px"
          >查询个人信息
        </el-button>
      </template>
      <template v-if="form.type == 'C'">
        <el-form-item label="企业名称" prop="leaseeName">
          <el-input v-model="form.leaseeName" placeholder="请输入承租人姓名" />
        </el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left: 120px"
          >查询企业信息
        </el-button>
      </template>
    </el-form>
    <el-divider v-if="form.type"></el-divider>
    <div class="leasee-info" v-if="form.type == 'P'">
      <el-descriptions
        class="margin-top"
        title="承租人信息"
        :column="2"
        size="medium"
        border
      >
        <!-- <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template> -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            性别
          </template>
          <el-tag size="small">女</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="leasee-info" v-if="form.type == 'C'">
      <el-descriptions
        class="margin-top"
        title="企业信息"
        :column="2"
        size="medium"
        border
      >
        <!-- <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template> -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            统一社会信用代码
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            法人
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            企业类型
          </template>
          有限责任公司（法人独资）
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mouse"></i>
            注册资本
          </template>
          5000万元人民币
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            注册地址
          </template>
          北京市平谷区谷丰东路30号院5号楼1层101
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-aim"></i>
            官网
          </template>
          <el-tag size="small">http://www.zkyctec.com</el-tag>
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template slot="label">
            <i class="el-icon-tickets"></i>
            法律诉讼
          </template>
          暂时没有找到相关数据
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template slot="label">
            <i class="el-icon-bell"></i>
            经营风险
          </template>
          暂时没有找到相关数据
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template slot="label">
            <i class="el-icon-document-copy"></i>
            经营信息
          </template>
          暂时没有找到相关数据
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "ContractManage",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        type: "",
        leaseeName: "",
        leaseeId: "",
      },
      rules: {},
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeContractDialog");
    },
    handleConfirm() {
      this.$emit("confirmContractDialog");
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .el-descriptions__title {
    font-size: 14px;
    color: #606266;
    width: 107px;
    text-align: right;
  }
}
</style>

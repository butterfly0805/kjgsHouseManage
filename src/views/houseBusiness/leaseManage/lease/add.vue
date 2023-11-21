<template>
  <div class="app-container" style="width: 700px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="权属人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="房屋所有权来源" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="房屋用途" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择房屋用途">
          <el-option label="住宅" value="1"></el-option>
          <el-option label="商用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="占有房屋份额" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="房屋所有权性质" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择房屋用途">
          <el-option label="公有" value="1"></el-option>
          <el-option label="私有" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="土地使用权性质" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="层数" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="建基面积" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="其中住宅建筑面积" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="其中台内建筑面积 " prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="竣工时间" required>
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <!-- <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item> -->
      <!-- <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="房屋情况备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LeaseAdd",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.el-select {
  width: 100%;
}
</style>

<template>
  <div class="app-container" style="width: 90%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="15">
          <el-form-item label="房屋权属人" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="房屋编号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="房屋地址" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="维修人" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="维修项目" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择维修项目">
              <el-option label="墙壁" value="1"></el-option>
              <el-option label="地板" value="2"></el-option>
              <el-option label="屋顶" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="15">
          <el-form-item label="层数" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
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
        </el-col>
        <el-col :span="15">
          <el-form-item label="房屋情况备注" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="goback">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "MaintainAdd",
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
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.el-select {
  width: 100%;
}
</style>

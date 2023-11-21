<template>
  <div class="app-container">
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出租人" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出租人身份证号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承租人" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承租人身份证号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订地点" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订时间" prop="name">
                <el-date-picker
                  v-model="ruleForm.name"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁期限" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租金" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋用途" prop="region">
                <el-select
                  v-model="ruleForm.region"
                  placeholder="请选择房屋用途"
                >
                  <el-option label="住宅" value="1"></el-option>
                  <el-option label="商用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px; margin-bottom: 50px">
          <template #header>
            <div class="card-header">
              <span>房屋信息</span>
            </div>
          </template>
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋编号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋地址" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋修建时间" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋建筑面积" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋竣工时间" required>
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
            <el-col :span="12">
              <el-form-item label="房屋用途" prop="region">
                <el-select
                  v-model="ruleForm.region"
                  placeholder="请选择房屋用途"
                >
                  <el-option label="住宅" value="1"></el-option>
                  <el-option label="商用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁房屋的维修" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋情况备注" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
    <div class="fixed-bottom">
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button type="primary" plain @click="resetForm('ruleForm')"
        >重置</el-button
      >
      <el-button @click="goback">返回</el-button>
    </div>
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
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.el-select,
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  border-top: 1px solid #f0f0f0;
  padding: 10px 0;
}
</style>

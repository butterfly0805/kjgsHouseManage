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
        <el-col :span="12">
          <el-form-item label="房产名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房产名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="曾用名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入曾用名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理单位" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入管理单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权单位" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入产权单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权性质" prop="name">
            <el-select v-model="ruleForm.region" placeholder="请选择产权性质">
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证号" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房产证号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地证号" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入土地证号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产类型" prop="name">
            <el-select v-model="ruleForm.region" placeholder="请选择房产类型">
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产经度" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房产经度"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产纬度" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房产纬度"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋座数" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房屋座数"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋面积(平米)" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房屋面积"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地面积(平米)" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入土地面积"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建成年份" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入建成年份"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否需重要房产" prop="name">
            <el-radio-group v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否在联" prop="name">
            <el-radio-group v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否门脸" prop="name">
            <el-radio-group v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行政区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择行政区域">
              <el-option label="和平区" value="1"></el-option>
              <el-option label="河西区" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产状态" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择房产状态">
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权归属" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入产权归属"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属街道" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入所属街道"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋性质" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择房屋性质">
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用部门" prop="region">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入使用部门"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择房屋类型">
              <el-option label="公有" value="1"></el-option>
              <el-option label="私有" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地使用权性质" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入土地使用权性质"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="层数" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入层数"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item label="房产位置" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入房产位置"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋情况备注" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-left: 140px">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddHouse",
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
      radio: "",
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

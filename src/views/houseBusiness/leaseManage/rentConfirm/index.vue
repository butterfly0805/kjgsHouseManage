<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业" name="first">企业</el-tab-pane>
    <el-tab-pane label="个人" name="second">个人</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

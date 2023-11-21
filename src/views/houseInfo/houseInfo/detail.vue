<template>
  <el-card class="box-card">
    <!--<div slot="header" class="clearfix">
      <span>房产信息详情</span>
       <el-button style="float: right; padding: 3px 0" type="text"
        >操作按钮</el-button
      > 
    </div>-->
    <div style="margin: 20px">
      <el-descriptions
        style="margin-bottom: 40px"
        title="基本信息"
        border
        :column="2"
      >
        <el-descriptions-item label="权属人">张三</el-descriptions-item>
        <el-descriptions-item label="身份证号"
          >140622199909081234</el-descriptions-item
        >
        <el-descriptions-item label="国籍">中国</el-descriptions-item>
        <el-descriptions-item label="房屋所有权来源">
          <el-tag size="small">2003年新建</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="房屋用途">住宅</el-descriptions-item>
        <el-descriptions-item label="占有房屋份额">全部</el-descriptions-item>
        <el-descriptions-item label="房屋所有权性质">私有</el-descriptions-item>
        <el-descriptions-item label="土地使用权来源"
          >2002年受让</el-descriptions-item
        >
        <el-descriptions-item label="土地使用权性质">国有</el-descriptions-item>
        <el-descriptions-item label="房屋地址"
          >天津河东区xxx</el-descriptions-item
        >
      </el-descriptions>
      <el-divider></el-divider>
      <el-descriptions
        style="margin-top: 40px"
        title="房屋情况"
        border
        :column="2"
      >
        <el-descriptions-item label="层数">12</el-descriptions-item>
        <el-descriptions-item label="竣工日期">2003-12-13</el-descriptions-item>
        <el-descriptions-item label="建基面积"
          ><el-tag size="small">120平方米</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="建筑面积"
          ><el-tag size="small">120平方米</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="其中住宅建筑面积"
          ><el-tag size="small">120平方米</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="其中台内建筑面积">
          <el-tag size="small">120平方米</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="四墙归属" :span="2">
          <p>东墙：自墙</p>
          <p>南墙：自墙</p>
          <p>西墙：他墙</p>
          <p>北墙：自墙</p>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "houseDetail",
};
</script>

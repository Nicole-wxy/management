<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.show"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="120px"
      style="margin:10px;width:auto;"
      class="demo-ruleForm"
    >
      <el-form-item label="收支类型:" prop="type">
        <el-select v-model="formData.type" placeholder="收支类型">
          <el-option
            v-for="(formtype,index) in format_type_list"
            :key="index"
            :label="formtype"
            :value="formtype"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支描述:" prop="describe">
        <el-input type="describe" v-model="formData.describe"></el-input>
      </el-form-item>
      <el-form-item label="收入:" prop="income">
        <el-input type="income" v-model="formData.income"></el-input>
      </el-form-item>
      <el-form-item label="支出:" prop="expend">
        <el-input type="expend" v-model="formData.expend"></el-input>
      </el-form-item>
      <el-form-item label="现金:" prop="cash">
        <el-input type="cash" v-model="formData.cash"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="remark" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogfund",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      rules: {
        type: [{ required: true, message: "请选择类型", rigger: "blur" }],
        describe: [
          { required: true, message: "请输入收支描述", rigger: "blur" }
        ],
        income: [{ required: true, message: "请输入收入", rigger: "blur" }],
        expend: [{ required: true, message: "请输入支出", rigger: "blur" }],
        cash: [{ required: true, message: "请输入现金", rigger: "blur" }],
        remark: [{ rigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          //添加数据
          this.$axios.post(`/api/profiles/${url}`, this.formData).then(res => {
            if (url == "add") {
              this.$message({
                message: "数据添加成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "数据编辑成功",
                type: "success"
              });
            }
            //隐藏dialog
            this.dialog.show = false;
            //让父组件刷新
            this.$emit("update");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
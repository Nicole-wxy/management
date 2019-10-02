<template>
  <div class="container">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="date" placeholder="选择开始时间"></el-date-picker>&nbsp;--
          <el-date-picker v-model="search_data.endTime" type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            v-if="user.identity == 'administrator'"
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        max-height="515"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="140" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date.substring(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="140"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="140"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column
          prop="operation"
          v-if="user.identity == 'administrator'"
          align="center"
          label="操作"
          fixed="right"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <DialogFund :dialog="dialog" :formData="formData" @update="getProfiles"></DialogFund>
  </div>
</template>
<script>
import DialogFund from "../components/DialogFund.vue";
export default {
  name: "fundlist",
  data() {
    return {
      allTableData: [],
      tableData: [],
      filterData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      paginations: {
        //当前页
        page_index: 1,
        //总数
        total: 0,
        //一页多少条
        page_size: 8,
        //每页多少条
        page_sizes: [8, 16, 24, 32],
        //翻页属性
        layout: "total, sizes, prev, pager, next, jumper"
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.getProfiles();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    //获取表格数据
    getProfiles() {
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data.result.profiles;
          this.filterData = res.data.result.profiles;
          //设置分页
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 8;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({
          message: "删除成功!",
          type: "success"
        });
        this.getProfiles();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      //获取当前页的数量
      let index = this.paginations.page_size * (page - 1);
      //获取总数
      let num = this.paginations.page_size * page;
      //容器
      let tables = [];
      for (let i = index; i < num; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          message: "请选择时间区间",
          type: "warning"
        });
        this.getProfiles();
        return;
      }
      const sTime = this.search_data.startTime.getDate();
      const eTime = this.search_data.endTime.getDate();
      this.allTableData = this.filterData.filter(item => {
        let date = new Date(item.date);
        let time = date.getDate();
        return time >= sTime && time <= eTime;
      });
      this.setPaginations();
    }
  },
  components: {
    DialogFund
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination-container {
  text-align: right;
  padding-top: 20px;
}
</style>
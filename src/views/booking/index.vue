<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table v-loading="listLoading" :key="tableKey" :data="list" :row-class-name="tableRowClassName" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('table.id')" :min-width="40" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" :min-width="120" prop="name" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.code')" :min-width="100" prop="code" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.status')" :min-width="50" prop="status" sortable="custom" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="success">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
            <el-tag v-if="scope.row.status==2" type="info">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.createTime')" :min-width="100" prop="createTime" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0" size="mini" type="success" @click="handleBook(scope.row)">{{ $t('table.book') }}</el-button>
            <el-button v-if="scope.row.status!=0" size="mini" type="primary" @click="handleInfo(scope.row)">{{ $t('table.bookInfo') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    </div>

    <!-- dialog -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 200px; margin-left:50px;">
        <el-form-item :label="$t('table.bookTime')" prop="bookTime">
          <el-date-picker v-model="temp.bookTime" :start-placeholder="$t('table.startTime')" :end-placeholder="$t('table.endTime')" :range-separator="$t('table.to')" type="datetimerange" placeholder="Please pick a date"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '@/api/meetingroom'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'MeetingRoom',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        bookTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        book: 'Book',
        info: 'Info'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getInfo(this.listQuery).then(response => {
        console.log('response', response)
        console.log('response.data', response.data)
        this.list = response.data.items

        this.listLoading = false
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status === 0) {
        return 'success-row'
      } else if (row.status === 1) {
        return 'warning-row'
      } else if (row.status === 2) {
        return 'disabled-row'
      }
      return ''
    },
    getStatus(status) {
      return status === 0 ? 'available' : status === 1 ? 'reserved' : 'trimming'
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleBook({ row }) {
      this.resetTemp()
      this.dialogStatus = 'book'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInfo({ row }) {
      this.resetTemp()
      this.dialogStatus = 'info'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .disabled-row {
    background: rgb(235, 234, 232);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

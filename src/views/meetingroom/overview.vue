<template>
  <div class="app-container">
    <ul class="card-list">
      <li v-for="item in list" :key="item.id">
        <el-card :class="cardClass(item)" body-style="{ padding: '18px' }" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
            <el-button v-if="item.status==0" style="float: right; padding: 3px 0" size="medium" type="text" @click="handleBook(item)">{{ $t('table.book') }}</el-button>
            <el-button v-if="item.status!=0" style="float: right; padding: 3px 0" size="medium" type="text" @click="handleInfo(item)">{{ $t('table.bookInfo') }}</el-button>
          </div>
          <div v-if="item.bookInfo.length > 0" v-for="bookInfoItem in item.bookInfo" :key="bookInfoItem.id" class="text item">
            <span class="card-font">{{ bookInfoItem.startTime | parseTime('{m}-{d} {h}:{i}') }} {{ ' - ' }} {{ bookInfoItem.endTime | parseTime('{m}-{d} {h}:{i}') }}</span>
          </div>
        </el-card>
      </li>
    </ul>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- dialog for book room -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogBooking">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 200px; margin-left:50px;">
        <el-form-item :label="$t('table.bookTime')" prop="bookTime">
          <el-date-picker
            v-model="temp.bookTime"
            :start-placeholder="$t('table.startTime')"
            :end-placeholder="$t('table.endTime')"
            :range-separator="$t('table.to')"
            type="datetimerange"
            placeholder="Please pick a date"/>
        </el-form-item>

        <el-form-item :label="$t('table.People')" prop="peopleCount" style="width: 150%;">
          <el-input
            v-model="temp.peopleCount"
            :placeholder="$t('table.people')"
            suffix-icon="el-icon-edit"/>
        </el-form-item>

        <el-form-item :label="$t('table.ues')" prop="ues" style="width: 150%;">
          <el-select v-model="temp.ues" clearable placeholder="select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBooking = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='book-create'?createBook():updateBook()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- dialog for check info of a room -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogChecking" width="80%">
      <el-table v-loading="bookListLoading" :key="table2Key" :data="bookInfoList" :row-class-name="tableRowClassName" border fit highlight-current-row style="width: 100%">
        <el-table-column :label="$t('table.id')" :min-width="40" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.startTime')" :min-width="120" prop="startTime" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.endTime')" :min-width="120" prop="endTime" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" :min-width="120" prop="name" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="bookListQuery.page" :limit.sync="bookListQuery.limit" @pagination="getBookInfoList" />
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/meetingroom'
import { getBookInfoList, createBook } from '@/api/bookInfo'
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
    const checkBookTime = (rule, value, callback) => {
      if (!value[0]) {
        return callback(new Error('start time is required'))
      }
      if (!value[1]) {
        return callback(new Error('end time is required'))
      }
      callback()
    }
    const checkPeopleCount = (rule, value, callback) => {
      const regex = /^\d+$/
      if (!value) {
        return callback(new Error('People count is required'))
      }
      if (!regex.test(value) || value > this.capacity || value <= 0) {
        return callback(new Error('Should be in the range of 1 to ' + this.capacity))
      }
      callback()
    }
    return {
      tableKey: 0,
      table2Key: 1,
      capacity: 0,
      bookListLoading: false,
      bookInfoTotal: 0,
      bookInfoList: null,
      bookListQuery: {
        page: 1,
        limit: 8,
        sort: '+id'
      },
      listLoading: false,
      total: 0,
      list: null,
      listQuery: {
        page: 1,
        limit: 56,
        sort: '+id'
      },
      options: [{
        value: '1',
        label: 'normal'
      }, {
        value: '2',
        label: 'activity'
      }, {
        value: '3',
        label: 'talk'
      }, {
        value: '4',
        label: 'brain storm'
      }],
      temp: {
        id: undefined,
        bookTime: [new Date(2019, 10, 10, 10, 10), new Date(2019, 10, 11, 10, 10)],
        peopleCount: undefined,
        ues: ''
      },
      dialogBooking: false,
      dialogChecking: false,
      dialogStatus: '',
      textMap: {
        'book-create': 'Book',
        'book-info': 'Info'
      },
      rules: {
        bookTime: [{ validator: checkBookTime, trigger: 'blur', required: true }],
        peopleCount: [{ validator: checkPeopleCount, required: true, trigger: 'change' }],
        ues: [{ type: 'string', required: true, message: 'ues is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getBookInfoList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log('response', response)
        console.log('response.data', response.data)
        this.list = response.data.items
        this.total = response.data.total
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
    cardClass(item) {
      if (item.status === 0) {
        return 'card-box success-row'
      } else if (item.status === 1) {
        return 'card-box warning-row'
      } else if (item.status === 2) {
        return 'card-box disabled-row'
      }
      return ''
    },
    getStatus(status) {
      return status === 0 ? 'available' : status === 1 ? 'reserved' : 'trimming'
    },
    resetTemp() {
    },
    handleBook(row) {
      console.log('row', row)
      this.capacity = row.capacity
      this.resetTemp()
      this.dialogStatus = 'book-create'
      this.dialogBooking = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createBook() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          console.log('this.temp', this.temp)
          createBook(this.temp).then(() => {
            this.dialogBooking = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    getBookInfoList() {
      this.bookListLoading = true
      getBookInfoList(this.bookListQuery).then(response => {
        this.bookInfoList = response.data.items
        this.bookInfoTotal = response.data.total
        this.bookListLoading = false
      })
    },
    handleInfo({ row }) {
      this.resetTemp()
      this.dialogStatus = 'book-info'
      this.dialogChecking = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style lang="scss">
  .card-list {
    display: block;
    overflow: hidden;
    list-style: none;
    padding: 0;
  }
  .card-list li {
    float: left;
    list-style: none;
    width: 18%;
    height: 240px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border: 1px solid #eee;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .box-card {
    margin-bottom: 20px;
  }
  .card-font {
    font-size: 11px;
  }
  .warning-row {
    background: rgb(241, 162, 109);
  }

  .disabled-row {
    background: rgb(151, 151, 150);
  }

  .success-row {
    background: hsl(135, 43%, 56%);
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table v-loading='listLoading' :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" :row-class-name="tableRowClassName">
        <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" :min-width="40">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" prop="name" sortable="custom" align="center" :min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.code')" prop="code" sortable="custom" align="center" :min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.status')" prop="status" sortable="custom" align="center" :min-width="50">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="success">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
            <el-tag v-if="scope.row.status==2" type="info">{{ $t('table.'+getStatus(scope.row.status)) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.createTime')" prop="createTime" sortable="custom" align="center" :min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{ $t('table.book') }}</el-button>
          <el-button v-if="scope.row.status!=0" size="mini" type="primary" @click="handleModifyStatus(scope.row,'published')">{{ $t('table.bookInfo') }}</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/meetingroom'

export default {
  name: 'MeetingRoom',
  data() {
    return {
        tableKey: 0,
        list: null
      }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'info'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      this.listLoading = true
      getInfo(this.listQuery).then(response => {
        console.log('response', response)
        console.log('response.data', response.data)
        this.list = response.data.items

        this.listLoading = false
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (row.status === 0) {
        return 'success-row'
      } else if (row.status === 1){
        return 'warning-row'
      } else if (row.status === 2){
        return 'disabled-row'
      }
      return ''
    },
    getStatus(status){
      return status === 0? 'available' : status === 1 ? 'reserved' : 'trimming'
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

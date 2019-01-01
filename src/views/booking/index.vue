<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table v-loading='listLoading' :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" prop="name" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.code')" prop="code" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.status')" prop="status" sortable="custom" align="center" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.createTime')" prop="createTime" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
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
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
        <el-table-column>
          <template slot-scope="scope">
            <span/>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item :label="$t('table.type')" prop="type">
            <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
              <el-option
                v-for="item in calendarTypeOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('table.date')" prop="timestamp">
            <el-date-picker
              v-model="temp.timestamp"
              type="datetime"
              placeholder="Please pick a date"
            />
          </el-form-item>
          <el-form-item :label="$t('table.title')" prop="title">
            <el-input v-model="temp.title"/>
          </el-form-item>
          <el-form-item :label="$t('table.status')">
            <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('table.importance')">
            <el-rate
              v-model="temp.importance"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="3"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item :label="$t('table.remark')">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="temp.remark"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
          >{{ $t('table.confirm') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
        <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="key" label="Channel"/>
          <el-table-column prop="pv" label="Pv"/>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/meetingroom'

export default {
  name: 'MeetingRoom',
  created() {
    getInfo(this.listQuery).then(response => {
      console.log('response', response)
    })
  }
}
</script>

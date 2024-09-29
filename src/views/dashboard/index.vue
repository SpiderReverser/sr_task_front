<template>
  <div class="dashboard-container">

    <el-row :gutter="10" class="mt-5">

      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                通知公告
                <el-icon class="ml-1">
                  <Notification />
                </el-icon>
              </div>
              <el-link type="primary">
                <span class="text-xs">查看更多</span>
                <el-icon class="text-xs">
                  <ArrowRight />
                </el-icon>
              </el-link>
            </div>
          </template>

          <el-scrollbar height="400px">
            <div v-for="(item, index) in notices" :key="index" class="flex-y-center py-3">
              <el-tag :type="getNoticeLevelTag(item.level)" size="small">
                {{ getNoticeLabel(item.type) }}
              </el-tag>
              <el-text truncated class="!mx-2 flex-1 !text-xs !text-[var(--el-text-color-secondary)]">
                {{ item.title }}
              </el-text>
              <el-link>
                <el-icon class="text-sm">
                  <View />
                </el-icon>
              </el-link>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

import { NoticeTypeEnum, getNoticeLabel } from "@/enums/NoticeTypeEnum";


const date: Date = new Date();


// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);

const visitStatsLoading = ref(true);
const visitStatsList = ref<VisitStats[] | null>(Array(3).fill({}));
interface VisitStats {
  title: string;
  icon: string;
  tagType: "primary" | "success" | "warning";
  growthRate: number;
  /** 粒度 */
  granularity: string;
  /** 今日数量输出文档  */
  todayCount: number;
  totalCount: number;
}


/** 格式化增长率 */
const formatGrowthRate = (growthRate: number): string => {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
};

/** 获取增长率文本颜色类 */
const getGrowthRateClass = (growthRate: number): string => {
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};

/** 获取访问统计图标 */
const getVisitStatsIcon = (type: string) => {
  switch (type) {
    case "pv":
      return "pv";
    case "uv":
      return "uv";
    case "ip":
      return "ip";
    default:
      return "pv";
  }
};

const notices = ref([
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_UPGRADE,
    title: "v2.12.0 新增系统日志，访问趋势统计功能。",
  },
  {
    level: 0,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 7 月 1 日举办年中总结大会，请各部门做好准备。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "端午节假期从 6 月 12 日至 6 月 14 日放假，共 3 天。",
  },

  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
  },
  {
    level: 0,
    type: NoticeTypeEnum.OTHER,
    title: "公司新规章制度发布，请大家及时查阅。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "中秋节假期从 9 月 22 日至 9 月 24 日放假，共 3 天。",
  },
  {
    level: 1,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title:
      "请注意，近期有恶意软件通过即时通讯工具传播，请勿下载不明来源的文件。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于下周日凌晨 3 点进行升级，预计维护时间为 1 小时。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.OTHER,
    title: "公司年度体检通知已发布，请各位员工按时参加。",
  },
]);

const getNoticeLevelTag = (type: number) => {
  switch (type) {
    case 0:
      return "danger";
    case 1:
      return "warning";
    case 2:
      return "primary";
    default:
      return "success";
  }
};

onMounted(() => {

});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }
}
</style>

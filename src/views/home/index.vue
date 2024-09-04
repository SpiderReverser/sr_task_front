<template>
  <div class="wh-full layout-top">
    <!-- 公用侧边栏 -->
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 宣传画 -->
      <div class="poster">
      </div>
      <div class="footer">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";
import { LayoutEnum } from "@/enums/LayoutEnum";
// import { RouteVO } from "@/api/menu";

const permissionStore = usePermissionStore();
const settingsStore = useSettingsStore()
// const routeData: RouteVO[] = [
// ];

settingsStore.layout = LayoutEnum.TOP;
// permissionStore.setRoutes(routeData);
</script>
<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  background-color: $menu-background;
  transition: width 0.28s;

  :deep(.el-menu) {
    border: none;
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: $sidebar-width;
  overflow-y: auto;
  transition: margin-left 0.28s;

  .fixed-header {
    position: sticky;
    top: 0;
    z-index: 9;
    transition: width 0.28s;
  }
}

.layout-top {
  .sidebar-container {
    position: sticky;
    z-index: 999;
    display: flex;
    width: 100% !important;
    height: $navbar-height;

    :deep(.el-scrollbar) {
      flex: 1;
      height: $navbar-height;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title),
    :deep(.el-menu--horizontal) {
      height: $navbar-height;
      line-height: $navbar-height;
    }

    :deep(.el-menu--collapse) {
      width: 100%;
    }
  }

  .main-container {
    height: calc(100vh - $navbar-height);
    margin-left: 0;
  }
}

.hideSidebar {
  .main-container {
    margin-left: $sidebar-width-collapsed;
  }

  &.layout-top {
    .main-container {
      margin-left: 0;
    }
  }

  &.layout-mix {
    .sidebar-container {
      width: 100% !important;
    }

    .mix-container {
      .mix-container__left {
        width: $sidebar-width-collapsed;
      }
    }
  }
}

.mobile {
  .main-container {
    margin-left: 0;
  }

  &.layout-top {
    // 顶部模式全局变量修改
    --el-menu-item-height: $navbar-height;
  }
}

.poster {
  height: 1200px;
  background-color: white;

}

.footer {
  height: 400px;

}
</style>

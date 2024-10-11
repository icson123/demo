<!-- <template>
  <div class="tags">
    <el-tag v-for="tag in tags" :key="tag.name" :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleMenu" @close="handleClose">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAllDataStore } from '@/stores'
const store = useAllDataStore()
const route = useRoute()
const router = useRouter()
const tags = computed(() => store.state.tags)
const handleMenu = (tag) => {
  router.push(tag.name)
  store.selectMenu(tag)
}
const handleClose = (tag, index) => {
  // 通过pinia管理
  store.updateTags(tag)
  // 如果点击的关闭的tag  不是对应的当前页面
  if (tag.name !== route.name) return
  if (index === store.state.tags.length) {
    store.selectMenu(tags.value[index - 1])
    router.push(tags.value[index - 1].name)
  } else {
    store.selectMenu(tags.value[index])
    router.push(tags.value[index].name)
  }
}
</script> -->

<template>
  <div class="tags">
    <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleMenu(tag)" @close="handleClose(tag, index)"
      class="tag-item">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAllDataStore } from '@/stores'

const store = useAllDataStore()
const route = useRoute()
const router = useRouter()
const tags = computed(() => store.state.tags)

// 用于存储访问历史
const historyStack = []

const handleMenu = (tag) => {
  // 如果当前标签不在历史栈中，则添加
  if (!historyStack.includes(tag.name)) {
    historyStack.push(tag.name)
  }
  router.push(tag.name)
  store.selectMenu(tag)
}

const handleClose = (tag, index) => {
  // 从状态中移除标签
  store.updateTags(tag)

  // 如果关闭的标签是当前页面，跳转到上一个页面
  if (tag.name === route.name) {
    const lastPage = historyStack.pop(); // 获取并移除最后一个页面
    if (lastPage) {
      router.push(lastPage); // 跳转到上一个页面
    } else {
      router.push({ name: 'home' }); // 如果没有历史记录，跳转到首页
    }
  }
}
</script>



<style lang="less" scoped>
.tags {
  margin: 20px 0 0 20px;
}

.tag-item {
  cursor: pointer;
}

.el-tag {
  margin-right: 10px;
}
</style>
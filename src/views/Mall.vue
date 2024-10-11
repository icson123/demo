<template>
  <div class="product-management">
    <el-button type="primary" @click="showAddProductDialog">添加商品</el-button>

    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="editProduct(scope.row)" size="small">编辑</el-button>
          <el-button @click="deleteProduct(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加商品" v-model:visible="addProductDialogVisible">
      <template #footer>
        <el-button @click="addProductDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addProduct">确定</el-button>
      </template>
      <el-form :model="newProduct">
        <el-form-item label="商品名称" required>
          <el-input v-model="newProduct.name" />
        </el-form-item>
        <el-form-item label="价格" required>
          <el-input v-model.number="newProduct.price" type="number" />
        </el-form-item>
        <el-form-item label="库存" required>
          <el-input v-model.number="newProduct.stock" type="number" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([]); // 商品列表
const newProduct = ref({ name: '', price: 0, stock: 0 }) // 新增商品的模型
const addProductDialogVisible = ref(false) // 控制添加商品对话框的显示

const showAddProductDialog = () => {
  newProduct.value = { name: '', price: 0, stock: 0 }// 重置新增商品的模型
  addProductDialogVisible.value = true
}
</script>

<style scoped>
.product-management {
  padding: 20px;
}
</style>

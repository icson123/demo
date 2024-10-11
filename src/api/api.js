// 整个项目api的管理
import request from "./request"

export default {
  // 请求首页左侧的表格数据
  getTableData() {
    return request({
      url: "/api/home/getTableData",
      method: "get",
    })
  },
  // 请求首页右侧的统计数据
  getCountData() {
    return request({
      url: "/api/home/getCountData",
      method: "get",
    })
  },
  // 请求echarts图表
  getChartData() {
    return request({
      url: "/api/home/getChartData",
      method: "get",
    })
  },
  getUserData(data) {
    return request({
      url: "/api/home/getUserData",
      method: "get",
      data,
    })
  },
  deleteUser(data) {
    return request({
      url: "/api/user/deleteUser",
      method: "get",
      data
    })
  },
  addUser(data) {
    return request({
      url: "/api/user/addUser",
      method: "post",
      data
    })
  },
  editUser(data) {
    return request({
      url: "/api/user/editUser",
      method: "post",
      data
    })
  },
  getMenu(params) {
    return request({
      url: '/api/permission/getMenu',
      method: 'post',
      data: params
    })
  }
}

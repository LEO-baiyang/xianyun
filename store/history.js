// 将历史记录存储在这里
// 通过store来管理历史记录
export const state = () => ({
  list: []
})

// 修改vuex的store中的状态的唯一办法就是提交mutation
export const mutations = {
  addHistoryItem(state, data) {
    state.list.push(data);
    console.log(state);
  }
}
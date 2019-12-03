// 使用store管理数据，登录之后将数据通过store进行管理
export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// 每个mutation都有一个字符串的事件类型type和一个回调函数，这个回调函数就是实际进行状态更改的地方，state是它的第一个参数
// 不能直接调用mutation handler，需要以相应的type调用store.commit方法来唤醒
// mutations 是一个对象, 里面的每一个属性都是一个函数
// 可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
// commit方法唤醒mutation是同步函数，而且只能同步执行
export const mutations = {
  // commit将数据存储在store中，通过回调函数对数据进行状态更改
  setUserInfo(state, data) {
    // 修改用户数据
    state.userInfo = data
  },
  // 登出事件
  clearUserInfo(state) {
    state.userInfo = {}
    localStorage.removeItem('store')
  }
}

// action类似于mutation，不同在于
// 1.action提交的是mutation，而不是直接变更状态
// 2.action可以包含任意异步操作
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
// 可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
// Action 通过 store.dispatch 方法触发
// 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）

// 如果想要异步的处理mutation，就需要用到action，在action中提交mutation，可以包含任何的异步操作
// action通过将mutation里面处理数据的方法变成可异步的处理方法，但是最终还是需要mutation来操作，只有mutation可以改变store中的状态
export const actions = {
  // 将登录请求在这里实现
  login({ commit }, data) {
    // 发送请求，return以便组件将数据存储到store中
    // 这里的 return 是为了能够对外返回一个带数据的 promise 方便外面继续进行处理，即.then()，组件中调用action时的.then()，这个数据是在发送axios请求成功之后的数据，如果没有return，那么返回的promise对象和原来的是不一样的
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      // console.log(res)
      const data = res.data
      // 调用 context.commit提交一个mutation，将数据存储到store中,第一个参数是mutation的名字，第二个参数是要传递的数据
      commit('setUserInfo', data)
      return data
    })
  }
}
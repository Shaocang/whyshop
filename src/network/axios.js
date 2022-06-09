import originAxios from 'axios'

// 网络请求的封装
export default function axios(options) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const instance = originAxios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 3000
    })

    // 配置请求和响应拦截
    // 请求拦截

    instance.interceptors.request.use((config) => {
      // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

      // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

      // 3.对请求的参数进行序列化(看服务器是否需要序列化)
      // config.data = qs.stringify(config.data)
      // console.log(config);

      // 4.等等
      // console.log('来到了请求拦截界面')
      return config
    }, (error) => {
      // console.log('来到了请求错误界面')
      return error
    })

    // 响应拦截
    instance.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      // console.log('来到了response拦截success中')
      // console.log(response)
      // console.log(response.data)
      return response.data
    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      // console.log('来到了response拦截failure中')
      // console.log(error)
      return error
    })

    // 传入对象进行网络请求
    instance(options)
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
}

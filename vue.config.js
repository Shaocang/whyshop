const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      assets: '@/assets',
      common: '@/common',
      components: '@/components',
      network: '@network',
      views: '@/views',
    }
  }
})

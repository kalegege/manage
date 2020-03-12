import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import CopClass from '@/components/EnterPage'
import Index from '@/components/index'
import File from '@/components/file/file'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/enter/',
      name: 'CopName',
      component: CopClass
    },
    {
      path: '/index/',
      name: 'Index',
      component: Index
    },
    {
      path: '/file/',
      name: 'File',
      component: File
    }
  ]
})

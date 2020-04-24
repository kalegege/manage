import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import CopClass from '@/components/EnterPage'
import Index from '@/components/index'
import File from '@/components/manage/file'
import Comment from '@/components/manage/comment'
import Config from '@/components/manage/config'
import Task from '@/components/manage/task'
import Report from '@/components/manage/report'

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
    },
    {
      path: '/comment/',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/config/',
      name: 'Config',
      component: Config
    },
    {
      path: '/task/',
      name: 'Task',
      component: Task
    },
    {
      path: '/report/',
      name: 'Report',
      component: Report
    }
  ]
})

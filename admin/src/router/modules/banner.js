/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/banner',
  name: 'banner',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'banner',
      component: () => import('@/views/banner'),
      name: 'ComplexTable',
      meta: { title: 'Banner' }
    }
  ]
}
export default tableRouter

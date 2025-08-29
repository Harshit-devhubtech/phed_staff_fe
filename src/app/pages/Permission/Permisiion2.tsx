import React from 'react'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
// import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from '../../modules/apps/user-management/users-list/UsersList'
// import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Permission Management',
    path: '/permission',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

function Permisiion2() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='permissionList'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Permission list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/permission/permissionList' />} />
    </Routes>
  )
}

export default Permisiion2

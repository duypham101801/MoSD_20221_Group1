import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import routes from 'src/routes'
import _nav from 'src/containers/_nav'
import { useSelector } from 'react-redux'
import { getAllowedNav, getAllowedRoute } from 'src/services/auth'
import Login from 'src/views/pages/login/Login'
import { useNavigate, RedirectFunction } from 'react-router-dom'

const _ = require('lodash')
const DefaultLayout = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  let allowedRoutes = []
  let allowedNav = []

  if (user && !_.isEmpty(user.data)) {
    allowedRoutes = getAllowedRoute(routes, user.data.role)
    allowedNav = getAllowedNav(_nav, user.data.role)
  }
  // if (props.location.pathname === "/") {
  //   return <Page500></Page500>
  // }
  // return <Login />
  if (!window.localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)) {
    window.location.href = '/login'
  }

  return (
    // use min
    <>
      <AppSidebar navigation={allowedNav} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent routes={allowedRoutes} />
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default DefaultLayout

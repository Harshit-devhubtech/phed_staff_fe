import React, {Suspense} from 'react'
import logo from './logo.svg'
import './App.css'
import {I18nProvider} from './_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './_metronic/layout/core'
import {MasterInit} from './_metronic/layout/MasterInit'
import {AuthInit} from './app/modules/auth'
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export default App

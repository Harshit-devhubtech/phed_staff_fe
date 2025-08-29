import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import TestPage from '../pages/dashboard/TestPage'
import PermissionPage from '../pages/Permission/Permission'
import Permisiion2 from '../pages/Permission/Permisiion2'
import Role from '../pages/Role/Role'
import Rate from '../pages/Permission/Rate'
import Circle from '../pages/Permission/Circle'
import UsesrsList from '../pages/Permission/UsesrsList'
import Profile from '../pages/Permission/Profile'
import Vehicle from '../pages/Permission/Vehicle'
import Station from '../pages/Permission/Station'
import Vendor from '../pages/Permission/Vendor'
import Driver from '../pages/Permission/Driver'
import Staff from '../pages/Permission/Staff'
import VehicleDriverMap from '../pages/Permission/VehicleDriverMap'
import Destination from '../pages/Permission/Destination'
import Users from '../pages/Permission/Users'
import UserLogin from '../pages/Permission/UserLogin'
import Trip from '../pages/Permission/Trip'
import TripBook from '../pages/Permission/TripBook'
import TripAenBook from '../pages/Permission/TripAenBook'
import AllBookingList from '../pages/Permission/AllBookingList'
import Mcustomer from '../pages/Permission/Mcustomer'
import VEhicleVendorMap from '../pages/Permission/VEhicleVendorMap'
import CencilBooking from '../pages/Permission/CencilBooking'
import ComplateBooking from '../pages/Permission/CompaleteBooking'
import BookingFilter from '../pages/Permission/BookingFilter'

import Revenue from '../pages/Provisional/Revenue'
import HydrantWise from '../pages/Provisional/HydrantWise'
import VendorWise from '../pages/Provisional/VendorWise'
import VehicalWise from '../pages/Provisional/VehicalWise'
import ViewDetails from '../pages/ViewDetails'
import TripSchedul from '../pages/Permission/TripSchedul'
import TripbookSchedules from '../pages/Permission/TripbookSchedules'
import ScheduleBookings from '../pages/Permission/ScheduleBookings'
import Vef_Vehicle from '../pages/VerifiedProvisional/Vef_Vehicle'
import Vef_Vendor from '../pages/VerifiedProvisional/Vef_Vendor'
import Vef_Hydrant from '../pages/VerifiedProvisional/Vef_Hydrant'
import Vef_Disapproval from '../pages/VerifiedProvisional/Vef_Disapproval'
import Vef_Revenue from '../pages/VerifiedProvisional/Vef_Revenue'
import LiveTracking from '../components/LiveTracking'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}

        <Route path='provisional_report_vehicle_wise' element={<VehicalWise />} />
        <Route path='provisional_report_vendor_wise' element={<VendorWise />} />
        <Route path='provisional_report_hydrant_wise' element={<HydrantWise />} />
        <Route path='provisional_report_revenue' element={<Revenue />} />

        <Route path='view_details/:id/:status' element={<ViewDetails />} />

        <Route path='vef_vehicle_wise' element={<Vef_Vehicle />} />
        <Route path='vef_vendor_wise' element={<Vef_Vendor />} />
        <Route path='vef_hydrant_wise' element={<Vef_Hydrant />} />
        <Route path='vef_disapproval' element={<Vef_Disapproval />} />
        <Route path='vef_revenue' element={<Vef_Revenue />} />

        <Route path='dashboard' element={<TestPage />} />
        <Route path='permission' element={<PermissionPage />} />
        {/* <Route path='rate' element={<Rate />} /> */}
        <Route path='circle' element={<Circle />} />
        <Route path='department' element={<UsesrsList />} />
        <Route path='role' element={<Role />} />
        <Route path='profiles' element={<Profile />} />
        <Route path='vendor' element={<Vendor />} />
        <Route path='driver' element={<Driver />} />
        <Route path='staff' element={<Staff />} />
        <Route path='customer' element={<Users />} />
        <Route path='destination' element={<Destination />} />
        <Route path='user-login' element={<UserLogin />} />
        <Route path='trip' element={<Trip />} />
        <Route path='tripschedule' element={<TripSchedul />} />
        {/* <Route path='m-customer' element={<Mcustomer />} /> */}

        <Route path='all-booking' element={<AllBookingList />} />
        <Route path="/live-tracking/:driverId" element={<LiveTracking />} />

        <Route path='schedule-booking' element={<ScheduleBookings />} />
        <Route path='cancel-booking' element={<CencilBooking />} />
        <Route path='complete-booking' element={<ComplateBooking />} />

        <Route path='trip-aen-book' element={<TripAenBook />} />
        <Route path='trip-book/:id' element={<TripBook />} />
        <Route path='trip-books/:id' element={<TripbookSchedules />} />
        <Route path='booking-filter/:id' element={<BookingFilter />} />
        <Route path='vehicle-driver-map' element={<VehicleDriverMap />} />
        <Route path='vehicle-vendor-map' element={<VEhicleVendorMap />} />
        <Route path='hydrant-center' element={<Station />} />
        <Route path='vehicles' element={<Vehicle />} />
        {/* <Route path='permission/*' element={<Permisiion2 />} /> */}
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }

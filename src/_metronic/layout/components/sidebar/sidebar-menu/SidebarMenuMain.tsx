/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  const token: any = localStorage.getItem('kt-auth-react-v')

  // roledataUpdate

  const user = JSON.parse(token)

  const prfix = `${user?.data?.prefix}`
  console.log("prfix ==> ", prfix);

  // console.log(prfix)

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />

      {user?.data?.role_id < 8 && (
        <SidebarMenuItemWithSub
          to='/coustomer'
          title='User'
          icon='/media/icons/duotune/general/gen049.svg'
          fontIcon='bi-layers'
        >
          {user?.data?.role_id < 4 && (
            <SidebarMenuItem to='/department' title='Department' hasBullet={true} />
          )}

          {user?.data?.role_id <= 6 && (
            <SidebarMenuItem to='/staff' title='Staff' hasBullet={true} />
          )}
          <SidebarMenuItem to='/profiles' title='Profiles' hasBullet={true} />
        </SidebarMenuItemWithSub>
      )}

      <SidebarMenuItemWithSub
        to='/mastaer'
        title='Master'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen017.svg'
      >
        {user?.data?.role_id < 8 && (
          <SidebarMenuItem to='/customer' title='Customer' hasBullet={true} />
        )}
        {user?.data?.role_id < 8 && (
          <SidebarMenuItem to='/vendor' title='Vendor' hasBullet={true} />
        )}
        <SidebarMenuItem to='/vehicles' title='Vehicles' hasBullet={true} />
        <SidebarMenuItem to='/driver' title='Driver' hasBullet={true} />
        {/* <SidebarMenuItem to='/rate' title='Rate List' hasBullet={true} /> */}
        <SidebarMenuItem to='/hydrant-center' title='Hydrant Center' hasBullet={true} />
        <SidebarMenuItem to='/destination' title='Destination' hasBullet={true} />
        {prfix == 'cas' && <SidebarMenuItem to='/user-login' title='User login' hasBullet={true} />}
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/all-booking'
        title='Job'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen017.svg'
      >
        <SidebarMenuItem to='/all-booking' title='Current Job' hasBullet={true} />
        <SidebarMenuItem to='/cancel-booking' title='Cancel Job' hasBullet={true} />
        <SidebarMenuItem to='/complete-booking' title='Complete Booking' hasBullet={true} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/provisional_report_vehicle_wise'
        title='Provisional Reports'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen005.svg'
      >
        <SidebarMenuItem
          to='/provisional_report_vehicle_wise'
          title='Report Vehicle Wise'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/provisional_report_vendor_wise'
          title='Report Vendor Wise'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/provisional_report_hydrant_wise'
          title='Report Hydrant Wise'
          hasBullet={true}
        />
        <SidebarMenuItem to='/provisional_report_revenue' title='Revenue Report' hasBullet={true} />
      </SidebarMenuItemWithSub>

      {/* <SidebarMenuItem
        to='/all-booking'
        icon='/media/icons/duotune/general/gen051.svg'
        title='All Booking'
        fontIcon='bi-layers'
      /> */}
      {prfix == 'jens' && (
        <SidebarMenuItem
          to='/trip'
          icon='/media/icons/duotune/general/gen051.svg'
          title='Trip'
          fontIcon='bi-layers'
        />
      )}
      {prfix == 'jens' && (
        <SidebarMenuItem
          to='/tripschedule'
          icon='/media/icons/duotune/general/gen017.svg'
          title='Trip Schedule'
          fontIcon='bi-layers'
        />
      )}
      {prfix == 'jens' && (
        <SidebarMenuItem
          to='/schedule-booking'
          icon='/media/icons/duotune/general/gen017.svg'
          title=' Schedule Booking'
          fontIcon='bi-layers'
        />
      )}
      {/* {prfix == 'jens' && (
        <SidebarMenuItem
          to='/m-customer'
          icon='/media/icons/duotune/general/gen051.svg'
          title='Add Customer'
          fontIcon='bi-layers'
        />
      )} */}
      {prfix == 'aens' && (
        <SidebarMenuItem
          to='/trip-aen-book'
          icon='/media/icons/duotune/general/gen051.svg'
          title='Trip aen book'
          fontIcon='bi-layers'
        />
      )}

      <SidebarMenuItemWithSub
        to='/vehicle-driver-map'
        title='Table Mapping'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/gen017.svg'
      >
        <SidebarMenuItem to='/vehicle-driver-map' title='Vehicle driver map' hasBullet={true} />
        <SidebarMenuItem to='/vehicle-vendor-map' title='Vehicle vendor map' hasBullet={true} />
      </SidebarMenuItemWithSub>


      {/* Verified Booking Items */}
      {prfix == 'jens' && (
        <SidebarMenuItemWithSub
          to='/vef_vehicle_wise'
          title='Verified Booking Reports'
          fontIcon='bi-chat-left'
          icon='/media/icons/duotune/general/gen005.svg'
        >
          <SidebarMenuItem to='/vef_vehicle_wise' title='Trip Report Vehicle Wise' hasBullet={true} />
          <SidebarMenuItem to='/vef_vendor_wise' title='Trip Report Vendor Wise' hasBullet={true} />
          <SidebarMenuItem to='/vef_hydrant_wise' title='Trip Report Hydrant Wise' hasBullet={true} />
          <SidebarMenuItem to='/vef_disapproval' title='Disapproval Report' hasBullet={true} />
          <SidebarMenuItem to='/vef_revenue' title='Revenue Report' hasBullet={true} />
        </SidebarMenuItemWithSub>
      )}
    </>
  )
}

export { SidebarMenuMain }

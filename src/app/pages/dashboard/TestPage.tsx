import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {adminAction} from '../../../redux/common/action'

function TestPage() {
  const dispatch = useDispatch()

  const get_dashboard: any = useSelector((state: any) =>
    state.admin.get_dashboard ? state.admin.get_dashboard : {}
  )

  useEffect(() => {
    // dispatch(adminAction.getPermissionsList('dhsg'))
    dispatch(adminAction.dashboard(1))
    // dispatch(adminAction.getRoleList(''))
    // dispatch(adminAction.getgetAllCircles(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => {}
  }, [])
  // dashboard
  return (
    <div>
      <div className='row justify-content-between align-items-center'>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#7ABAEB'}}
          >
            <p>{get_dashboard?.pending ? get_dashboard?.pending : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Waiting For Driver</h6>
          </Link>
        </div>

        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className=' text-center nevBoxco'
            style={{backgroundColor: '#AFDDF4'}}
          >
            <p>{get_dashboard?.accepted ? get_dashboard?.accepted : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Driver Accepted</h6>
          </Link>
        </div>

        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#F4E778'}}
          >
            <p>{get_dashboard?.driver_assign ? get_dashboard?.accepted : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Going To Station</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#A995CD'}}
          >
            <p>{get_dashboard?.arrived_hydrent ? get_dashboard?.arrived_hydrent : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Reached Hydrent</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#E8B86D'}}
          >
            <p>{get_dashboard?.on_going ? get_dashboard?.on_going : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} On Going</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#A1D6B2'}}
          >
            <p>{get_dashboard?.water_supply_started ? get_dashboard?.water_supply_started : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Water Supply Start</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className=' text-center nevBoxco'
            style={{backgroundColor: '#BF2EF0'}}
          >
            <p>{get_dashboard?.driver_assign ? get_dashboard?.driver_assign : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Water Supply Stop</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#F6EACB'}}
          >
            <p>{get_dashboard?.otp_pending ? get_dashboard?.otp_pending : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Customer Otp Pending</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/complete-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#97BE5A'}}
          >
            <p>{get_dashboard?.completed ? get_dashboard?.completed : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Completed </h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/cancel-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#FFAAAA'}}
          >
            <p>{get_dashboard?.cancelled ? get_dashboard?.cancelled : 0}</p>
            <h6> Cancelled</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/vehicles'}
            className=' text-center nevBoxco'
            style={{backgroundColor: '#DAD3BE'}}
          >
            <p>{get_dashboard?.total_tanker ? get_dashboard?.total_tanker : 0}</p>
            <h6> Total Tanker</h6>
          </Link>
        </div>
        <div className='col-md-3 col-6'>
          <Link
            to={'/all-booking'}
            className='  text-center nevBoxco'
            style={{backgroundColor: '#36BA98'}}
          >
            <p>{get_dashboard?.total_booking ? get_dashboard?.total_booking : 0}</p>
            <h6> {moment(new Date()).format('ddd MMM DD')} Total Booking</h6>
          </Link>
        </div>
        {/* <div className='col-6'>
          <Link to={'/permission'} className='bg-primary text-center nevBoxco'>
            <h5 className='text-light'>Permission</h5>
          </Link>
        </div>
        <div className='col-6'>
          <Link to={'/circle'} className='bg-success text-center nevBoxco'>
            <h5 className='text-light'>Circle</h5>
          </Link>
        </div>
        <div className='col-6'>
          <Link to={'/rate'} className='bg-danger text-center nevBoxco'>
            <h5 className='text-light'>Rate</h5>
          </Link>
        </div>
        <div className='col-6'>
          <Link to={'/user-list'} className='bg-warning text-center nevBoxco'>
            <h5 className='text-light'>User List</h5>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default TestPage

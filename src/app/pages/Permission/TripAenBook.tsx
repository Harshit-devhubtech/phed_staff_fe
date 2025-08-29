import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {adminAction} from '../../../redux/common/action'
import {URL} from '../../../redux/common/url'
import {AsyncPaginate} from 'react-select-async-paginate'

import DatePicker from 'react-datepicker'

import geolib from 'geolib'
import {toast} from 'react-toastify'
import moment from 'moment'

interface Option {
  value: string
  label: string
}

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
}
function TripAenBook() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userId = useParams()
  const [startDate, setStartDate] = useState(new Date())

  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )

  //   useEffect(() => {
  //     dispatch(adminAction.getuserdetails(userId?.id))
  //     return () => {}
  //   }, [])

  //   console.log(get_users_details)

  const [seleceteMangerJenget, setseleceteMangerJenget] = useState<any>({})
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({})
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({})
  const [seleceteMangerUserlist, setseleceteMangerUserlist] = useState<any>({})
  const [seleceteMangerUser, setseleceteMangerUser] = useState<any>({})
  const [NewAddress, setNewAddress] = useState<any>('')
  const [destance, setdestance] = useState<any>('')
  const [bookingType, setbookingType] = useState<any>('NORMAL')

  console.log(seleceteMangerJen)
  console.log(seleceteMangerUser)
  console.log(destance)

  const hendleTocreateBooking = () => {

    const token: any =  localStorage.getItem('kt-auth-react-v')
    const jen_ID = JSON.parse(token)?.data?.id
    if (Object.keys(seleceteMangerJen).length == 0) {
      toast.error('please select Source ')
    } else if (Object.keys(seleceteMangerUserlist).length == 0) {
      toast.error('please select user ')
    } else if (Object.keys(seleceteMangerVehicle).length == 0) {
      toast.error('please select Vehivle ')
    } else if (Object.keys(seleceteMangerUser).length == 0) {
      toast.error('please select Destination  ')
    } else {
      dispatch(
        adminAction.create_booking(
          {
            user_id: seleceteMangerUserlist?.id,
            booking_type: bookingType,
            source_hydrant_center: seleceteMangerJen?.id,
            vehicle: seleceteMangerVehicle?.id,
            destination: seleceteMangerUser?.id,
            destination_new_name: NewAddress,
            total_distance: destance,
            creater_id: jen_ID,
            date: moment(startDate).format('YYYY/MM/DD hh:mm A'),
          },
          navigate
        )
      )
    }
  }

  //   const calculateDistance = () => {
  //     const startCoords = { latitude: 52.520008, longitude: 13.404954 };
  //     const endCoords = { latitude: 51.5074, longitude: -0.1278 };

  //     const distanceInMeters = geolib.getDistance(startCoords, endCoords);
  //     const distanceInKilometers = distanceInMeters / 1000;

  //     console.log(`Distance: ${distanceInKilometers} kilometers`);
  //   };
  const calculateDistance = () => {
    const startCoords = {
      latitude: seleceteMangerJen?.latitude,
      longitude: seleceteMangerJen?.longitude,
    }
    const endCoords = {
      latitude: seleceteMangerUser?.latitude,
      longitude: seleceteMangerUser?.longitude,
    }

    const R = 6371 // Radius of the Earth in kilometers
    const lat1 = toRadians(startCoords.latitude)
    const lon1 = toRadians(startCoords.longitude)
    const lat2 = toRadians(endCoords.latitude)
    const lon2 = toRadians(endCoords.longitude)

    const dLat = lat2 - lat1
    const dLon = lon2 - lon1

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    setdestance(distance?.toFixed(1))

    console.log(`Distance: ${distance} kilometers`)
  }

  const toRadians = (degrees: any) => {
    return (degrees * Math.PI) / 180
  }

  useEffect(() => {
    if (Object.keys(seleceteMangerJen).length > 0 && Object.keys(seleceteMangerUser).length > 0) {
      calculateDistance()
    }
  }, [seleceteMangerJen])
  useEffect(() => {
    if (Object.keys(seleceteMangerJen).length > 0 && Object.keys(seleceteMangerUser).length > 0) {
      calculateDistance()
      setNewAddress(seleceteMangerUser?.address)
    }
  }, [seleceteMangerUser])

  const loadOptionsgetManagerJenget = async (
    search: any,
    loadedOptions: any,
    {page}: {page: any}
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`

    const Aen_ID = JSON.parse(token)?.data?.id
    const cre_ID = JSON.parse(token)?.data?.circle_id
    const response = await fetch(
      URL.API_BASE_URL +
        prfix +
        `/get_department_child?search=${search}&page=${page}&id=${Aen_ID}&circle_id=${cre_ID}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.name

      return data
    })

    return {
      options: options,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    }
  }

  const loadOptionsgetManagerJen = async (search: any, loadedOptions: any, {page}: {page: any}) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL +
        prfix +
        `/getSource?search=${search}&page=${page}&jen_id=${seleceteMangerJenget?.id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.station_name

      return data
    })

    return {
      options: options,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    }
  }

  const loadOptionsgetManagerVehicle = async (
    search: any,
    loadedOptions: any,
    {page}: {page: any}
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL +
        prfix +
        `/all_vehicle_jen?search=${search}&page=${page}&jen_id=${seleceteMangerJenget?.id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.registration_number

      return data
    })

    return {
      options: options,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    }
  }

  const loadOptionsgetManagerUserlist = async (
    search: any,
    loadedOptions: any,
    {page}: {page: any}
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL +
        prfix +
        `/getAllUserJen?search=${search}&page=${page}&jen_id=${seleceteMangerJenget?.id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.mobile

      return data
    })

    return {
      options: options,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    }
  }
  const loadOptionsgetManagerUser = async (
    search: any,
    loadedOptions: any,
    {page}: {page: any}
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL +
        prfix +
        `/user_destinations?search=${search}&page=${page}&user_id=${seleceteMangerUserlist?.id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.address

      return data
    })

    return {
      options: options,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    }
  }

  const [managerKey, setManagerKey] = useState<any>(0)
  const [managerKeyVehicle, setManagerKeyVehicle] = useState<any>(0)
  const [managerKeyUserlist, setManagerKeyUserlist] = useState<any>(0)
  const [managerKeyDestination, setManagerKeyDestination] = useState<any>(0)

  useEffect(() => {
    if (seleceteMangerJenget?.id) {
      // Call the loadOptionsRole function here
      // loadOptionsgetManagerXen('', [], {page: 1})
      loadOptionsgetManagerJen('', [], {page: 1})
      loadOptionsgetManagerVehicle('', [], {page: 1})
      loadOptionsgetManagerUserlist('', [], {page: 1})
      loadOptionsgetManagerUser('', [], {page: 1})
      // setManagerKey((prevKey: any) => prevKey + 1)
      setManagerKey((prevKey: any) => prevKey + 1)
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      setManagerKeyUserlist((prevKey: any) => prevKey + 1)
      setManagerKeyDestination((prevKey: any) => prevKey + 1)
      // setseleceteMangerXen({})
      setseleceteMangerJen({})
      setseleceteMangerVehicle({})
      setseleceteMangerUserlist({})
      setseleceteMangerUser({})
    }
  }, [seleceteMangerJenget])

  useEffect(() => {
    if (seleceteMangerUserlist?.id) {
      // Call the loadOptionsRole function here
      // loadOptionsgetManagerXen('', [], {page: 1})
      // loadOptionsgetManagerJen('', [], {page: 1})
      // loadOptionsgetManagerVehicle('', [], {page: 1})
      // loadOptionsgetManagerUserlist('', [], {page: 1})
      loadOptionsgetManagerUser('', [], {page: 1})
      // setManagerKey((prevKey: any) => prevKey + 1)
      // setManagerKey((prevKey: any) => prevKey + 1)
      // setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      // setManagerKeyUserlist((prevKey: any) => prevKey + 1)
      setManagerKeyDestination((prevKey: any) => prevKey + 1)
      // setseleceteMangerXen({})
      // setseleceteMangerJen({})
      // setseleceteMangerVehicle({})
      // setseleceteMangerUserlist({})
      setseleceteMangerUser({})
    }
  }, [seleceteMangerUserlist])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Set the maxDate to the next day
  const nextDay = new Date(today)
  nextDay.setDate(nextDay.getDate() + 1)

  const handleStartDateChange = (date: any) => {
    setStartDate(date)
  }

  return (
    <div>
      <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
        {/* <!--begin::Title-->  */}
        <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
         Booking 
        </h1>
        {/* <!--end::Title-->  */}
        {/* <!--begin::Breadcrumb-->  */}
        <ul className='my-0 breadcrumb-separatorless pt-1 fw-semibold breadcrumb fs-7'>
          {/* <!--begin::Item-->  */}
          <li className='breadcrumb-item text-muted'>
            {/* <a href='../../demo1/dist/index.html' className='text-hover-primary text-muted'>
                    Home
                  </a> */}
            <Link to={'/'} className='text-hover-primary text-muted'>
              Home
            </Link>

            {/* <Button variant='primary' onClick={() => setShowView(true)}>
                    Custom Width Modal
                  </Button> */}
          </li>
          {/* <!--end::Item-->  */}
          {/* <!--begin::Item-->  */}
          <li className='breadcrumb-item'>
            <span className='bg-gray-400 w-5px h-2px bullet'></span>
          </li>
          {/* <!--end::Item-->  */}
          {/* <!--begin::Item-->  */}
          <li className='breadcrumb-item text-muted'> Booking</li>
          {/* <!--end::Item-->  */}
        </ul>
        {/* <!--end::Breadcrumb-->  */}
      </div>

      {/* <div id='kt_app_content' className='flex-column-fluid app-content'>
         
        <div id='kt_app_content_container' className='app-container container-xxl'>
          <div className='card card-flush'>
            <div className='mt-6 card-header'>
              <div className='card-title'>
                <div className='position-relative d-flex align-items-center my-1 me-5'></div>
                <div className='position-relative d-flex align-items-center my-1 me-5'></div>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                {' '}
                <div className='p-5'>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}

                    value={get_users_details?.mobile}
                  />
                </div>
              </div>
              <div className='col-6'>
                {' '}
                <div className='p-5'>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}
                    value={get_users_details?.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div id='kt_app_content' className='flex-column-fluid app-content'>
        {/* <!--begin::Content container-->  */}
        <div id='kt_app_content_container' className='app-container container-xxl'>
          <div className='card card-flush'>
            <div className='row'>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'> Jen </span>
                  </label>

                  <AsyncPaginate<any, any, any>
                    // key={managerKey}
                    value={seleceteMangerJenget}
                    loadOptions={loadOptionsgetManagerJenget}
                    onChange={setseleceteMangerJenget}
                    additional={{
                      page: 1,
                    }}
                  />
                </div>
              </div>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'> Booking Type </span>
                  </label>
                  <select
                    className='bg-transparent form-control'
                    aria-label='Select example'
                    name='circle_id'
                    onChange={(e) => {
                      setbookingType(e?.target?.value)
                    }}
                  >
                    <option value={'NORMAL'}>NORMAL</option>
                    <option value={'EMERAGENCY'}>EMERAGENCY</option>
                  </select>
                </div>
              </div>

              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Pickup Date: </span>
                  </label>
                  {/* <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}
                    value={get_users_details?.name}
                  /> */}

                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    minDate={today}
                    maxDate={nextDay}
                    showTimeSelect
                    className='bg-transparent form-control'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    placeholderText='Select today or next day'
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Source </span>
                  </label>

                  <AsyncPaginate<any, any, any>
                    key={managerKey}
                    value={seleceteMangerJen}
                    loadOptions={loadOptionsgetManagerJen}
                    onChange={setseleceteMangerJen}
                    additional={{
                      page: 1,
                    }}
                  />

                  {/* <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}

                    value={get_users_details?.mobile}
                  /> */}
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Vehicle </span>
                  </label>
                  <AsyncPaginate<any, any, any>
                    key={managerKeyVehicle}
                    value={seleceteMangerVehicle}
                    loadOptions={loadOptionsgetManagerVehicle}
                    onChange={setseleceteMangerVehicle}
                    additional={{
                      page: 1,
                    }}
                  />

                  {/* <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}
                    value={get_users_details?.name}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='kt_app_content' className='flex-column-fluid app-content'>
        {/* <!--begin::Content container-->  */}
        <div id='kt_app_content_container' className='app-container container-xxl'>
          <div className='card card-flush'>
            <div className='row'>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Customer A Mobile </span>
                  </label>

                  <AsyncPaginate<any, any, any>
                    key={managerKeyUserlist}
                    value={seleceteMangerUserlist}
                    loadOptions={loadOptionsgetManagerUserlist}
                    onChange={setseleceteMangerUserlist}
                    additional={{
                      page: 1,
                    }}
                  />
                  {/* <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}

                    value={get_users_details?.mobile}
                  /> */}
                </div>
              </div>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Destination </span>
                  </label>

                  <AsyncPaginate<any, any, any>
                    key={managerKeyDestination}
                    value={seleceteMangerUser}
                    loadOptions={loadOptionsgetManagerUser}
                    onChange={setseleceteMangerUser}
                    additional={{
                      page: 1,
                    }}
                  />
                  {/* <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}

                    value={get_users_details?.mobile}
                  /> */}
                </div>
              </div>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>latitude </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}
                    value={seleceteMangerUser?.latitude}
                  />
                </div>
              </div>
              <div className='col-3'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>longitude </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}

                    value={seleceteMangerUser?.longitude}
                  />
                </div>
              </div>
              <div className='col-8'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Edit Destination Name </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    onChange={(e) => {
                      setNewAddress(e.target.value)
                    }}
                    value={NewAddress}
                  />
                </div>
              </div>
              <div className='col-4'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Total Distance: </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter mobile number'
                    // onChange={(e) => {
                    //   hendleTocheck(e.target.value)
                    // }}
                    value={destance}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          hendleTocreateBooking()
        }}
        className='d-block btn btn-primary'
      >
        New Booking{' '}
      </button>
    </div>
  )
}

export default TripAenBook

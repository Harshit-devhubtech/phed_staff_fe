import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminAction } from '../../../redux/common/action'
import { URL } from '../../../redux/common/url'
import { AsyncPaginate } from 'react-select-async-paginate'

import DatePicker from 'react-datepicker'

import geolib from 'geolib'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Loader } from '@googlemaps/js-api-loader'

interface Option {
  value: string
  label: string
}

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
}
function TripbookSchedules() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userId = useParams()
  const [startDate, setStartDate] = useState(new Date())

  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )

  useEffect(() => {
    dispatch(adminAction.getuserdetails(userId?.id))
    return () => { }
  }, [])

  console.log(get_users_details)

  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({})
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({})
  const [seleceteMangerUser, setseleceteMangerUser] = useState<any>({})
  const [NewAddress, setNewAddress] = useState<any>('')
  const [destance, setdestance] = useState<any>('')
  const [bookingType, setbookingType] = useState<any>('NORMAL')
  const [days, setdays] = useState<any>({})
  console.log(days)

  const hendleToChangeDay = (e: any) => {
    setdays({ ...days, [e?.target?.name]: e?.target?.value })
  }

  console.log(seleceteMangerJen)
  console.log(seleceteMangerUser)
  console.log(destance)
  const token: any = localStorage.getItem('kt-auth-react-v')
  const jen_ID = JSON.parse(token)?.data?.id

  const hendleTocreateBooking = () => {
    if (Object.keys(seleceteMangerJen).length == 0) {
      toast.error('please select Source ')
    } else if (Object.keys(seleceteMangerVehicle).length == 0) {
      toast.error('please select Vehivle ')
    } else if (Object.keys(seleceteMangerUser).length == 0) {
      toast.error('please select Destination  ')
    } else {
      if (!days?.sunday) {
        toast?.error('please enter sunday')
        return
      }
      if (!days?.monday) {
        toast?.error('please enter monday')
        return
      }
      if (!days?.tuesday) {
        toast?.error('please enter tuesday')
        return
      }
      if (!days?.wednesday) {
        toast?.error('please enter wednesday')
        return
      }
      if (!days?.thursday) {
        toast?.error('please enter thursday')
        return
      }
      if (!days?.wednesday) {
        toast?.error('please enter wednesday')
        return
      }
      if (!days?.friday) {
        toast?.error('please enter friday')
        return
      }
      if (!days?.saturday) {
        toast?.error('please enter saturday')
        return
      }
      dispatch(
        adminAction.createScheduleBooking(
          {
            user_id: userId?.id,
            booking_type: bookingType,
            source_hydrant_center: seleceteMangerJen?.id,
            vehicle: seleceteMangerVehicle?.id,
            destination: seleceteMangerUser?.id,
            sunday: days?.sunday,
            monday: days?.monday,
            tuesday: days?.tuesday,
            wednesday: days?.wednesday,
            thursday: days?.thursday,
            friday: days?.friday,
            saturday: days?.saturday,
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

  useEffect(() => {
    if (Object.keys(seleceteMangerJen).length > 0 &&
      Object.keys(seleceteMangerUser).length > 0) {
      calculateRouteDistance();
      setNewAddress(seleceteMangerUser?.address);
    }
  }, [seleceteMangerJen, seleceteMangerUser]);
  
  // Add this inside your component
  const calculateRouteDistance = () => {
    if (!seleceteMangerJen?.latitude || !seleceteMangerUser?.latitude) return;
    const googleApiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

    const loader = new Loader({
      apiKey: googleApiKey, // Replace with your actual API key
      version: 'weekly',
      libraries: ['routes']
    });

    loader.load()
      .then(() => {
       // const directionsService = new (window as any).google.maps.DirectionsService();
       const directionsService = new google.maps.DistanceMatrixService();


        const origin = new (window as any).google.maps.LatLng(
          seleceteMangerJen.latitude,
          seleceteMangerJen.longitude
        );

        const destination = new (window as any).google.maps.LatLng(
          seleceteMangerUser.latitude,
          seleceteMangerUser.longitude
        );

        directionsService.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: (window as any).google.maps.TravelMode.DRIVING,
            //optimizeWaypoints: true,
            unitSystem: google.maps.UnitSystem.METRIC, // Changed to METRIC

          },
          (response: any, status: any) => {
            if (status === 'OK' && response) {
              const distance = response.rows[0]?.elements[0]?.distance?.value / 1000;
              setdestance(distance.toFixed(1));
            } else {
              console.error('Directions request failed due to ' + status);
              toast.error('Failed to calculate route distance: ' + status);
              // calculateHaversineDistance();
            }
          }
        );
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
        toast.error('Error loading Google Maps API. Please try again later.');
        //calculateHaversineDistance(); // Fallback
      });
  };

  const loadOptionsgetManagerJen = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL + prfix + `/getSource?search=${search}&page=${page}&jen_id=${jen_ID}`,
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
    { page }: { page: any }
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL + prfix + `/all_vehicle_jen?search=${search}&page=${page}&jen_id=${jen_ID}`,
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
  const loadOptionsgetManagerUser = async (
    search: any,
    loadedOptions: any,
    { page }: { page: any }
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const jen_ID = JSON.parse(token)?.data?.id
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/user_destinations?search=${search}&page=${page}&user_id=${userId?.id}`,
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
          <li className='breadcrumb-item text-muted'> dddd</li>
          {/* <!--end::Item-->  */}
        </ul>
        {/* <!--end::Breadcrumb-->  */}
      </div>

      <div id='kt_app_content' className='flex-column-fluid app-content'>
        {/* <!--begin::Content container-->  */}
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
                    <option value={'EMERGENCY'}>EMERGENCY</option>
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
                    // key={managerKey}
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
                    // key={managerKey}
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
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Sunday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter sunday'
                    name='sunday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.sunday}
                  />
                </div>
              </div>

              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Monday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter monday'
                    name='monday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.monday}
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Tuesday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter Tuesday'
                    name='tuesday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.tuesday}
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Wednesday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter Wednesday'
                    name='wednesday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.wednesday}
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Thursday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter Thursday'
                    name='thursday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.thursday}
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Friday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter friday'
                    name='friday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.friday}
                  />
                </div>
              </div>
              <div className='col-3'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Saturday </span>
                  </label>
                  <input
                    className='bg-transparent form-control'
                    placeholder='Enter Saturday'
                    name='saturday'
                    onChange={(e) => {
                      hendleToChangeDay(e)
                    }}
                    value={days?.saturday}
                  />
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
              <div className='col-8'>
                {' '}
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Destination </span>
                  </label>

                  <AsyncPaginate<any, any, any>
                    // key={managerKey}
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
              <div className='col-2'>
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
              <div className='col-2'>
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
                    value={destance && destance + ' km'}
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

export default TripbookSchedules

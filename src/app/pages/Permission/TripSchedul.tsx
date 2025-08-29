import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { adminAction } from '../../../redux/common/action'
import Api from '../../../redux/common/api'
import { URL } from '../../../redux/common/url'
import { AsyncPaginate } from 'react-select-async-paginate'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker'
interface Option {
  value: string
  label: string
}

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
}

function TripSchedul() {
  const [status, setstatus] = useState<any>(false)
  const [number, setNumber] = useState<any>(false)
  const [userData, setUserData] = useState<any>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // user create

  const get_role_listss: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
  const get_all_cricle: any[] = useSelector((state: any) =>
    state.admin.get_all_cricle ? state.admin.get_all_cricle : []
  )
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')
  const [get_product_list, setget_product_list] = useState<any>({})

  // const get_product_list: any = useSelector((state: any) =>
  //   state.admin.get_all_booking ? state.admin.get_all_booking : {}
  // )
  const [pageNo, setpageNo] = useState<any>(1)
  const [totalItems, setTotalItems] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(1)

  const [itemsPerPage, setitemsPerPage] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState({ field: '', order: '' })
  useEffect(() => {
    // dispatch(adminAction.getPermissionsList('dhsg'))
    // dispatch(adminAction.getuser(1))

    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  const hendleTocheck = async (e: any) => {
    try {
      // cheack_user

      const token: any = await localStorage.getItem('kt-auth-react-v')

      // console.log(typeof token);
      // console.log(JSON.parse(token));
      setNumber(e)
      const config = {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).api_token,
        },
      }
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const role_id = `${JSON.parse(token)?.data?.circle_id}`

      const response: any = await Api.post(`${prfix + URL.cheack_user}`, { mobile: e }, config)

      console.log(response?.data)

      setstatus(response?.data?.status)

      if (response?.data?.status) {
        setUserData(response?.data?.data)

        // getAllBookingsuserview

        const response2: any = await dispatch(
          adminAction.getAllBookingsuserview({ page: 1, user_id: response?.data?.data?.id })
        )

        setget_product_list(response2?.data)
        console.log(response2)
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const chnageDriverUp = (e: any) => {
  //   console.log(e)
  //   setbookingdata(e)
  //   if (e?.driver) {
  //     console.log('yes')
  //     const vehilveData = e?.driver
  //     vehilveData.value = vehilveData?.id
  //     vehilveData.label = vehilveData?.name
  //     setseleceteMangerDriver(vehilveData)
  //   } else {
  //     setseleceteMangerDriver({})
  //     console.log('no')
  //   }

  //   setShowUpdate2(true)
  // }
  const [oldbookingid, setoldbookingid] = useState('')
  const [showUpdate2, setShowUpdate2] = useState(false)
  const handleCloseUpdate2 = () => setShowUpdate2(false)

  const hendletonewbooking = (e: any) => {
    setoldbookingid(e)
    setShowUpdate2(true)
  }

  const [startDate, setStartDate] = useState(new Date())
  const hendletochangeDriver = async () => {
    setShowUpdate2(false)
    // updateBooking
    const response: any = await dispatch(
      adminAction.repeatBooking({
        user_id: userData?.id,
        booking_id: oldbookingid,
        date: moment(startDate).format('YYYY/MM/DD hh:mm A'),
      })
    )

    console.log(response)

    if (response?.data?.status) {
      const response2: any = await dispatch(
        adminAction.getAllBookingsuserview({ page: 1, user_id: userData?.id })
      )

      setget_product_list(response2?.data)
    }
    // const data = new FormData()

    // data.append('booking_id', bookingdata?.id)
    // data.append('driver_id', seleceteMangerDriver?.id)
    // data.append('driver_status', 'Pending')
    // data.append('status', 'Pending')

    // // data.append('total_distance', destance)

    // dispatch(adminAction.updateBooking(data, pageNo))
  }

  const [seleceteMangerXen, setseleceteMangerXen] = useState<any>({})
  const [seleceteMangerAen, setseleceteMangerAen] = useState<any>({})
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({})
  const [criId, setcriId] = useState<any>('')

  const loadOptionsgetManagerXen = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`

    const response = await fetch(
      URL.API_BASE_URL + prfix + `/get_all_xen?search=${search}&page=${page}&circle_id=${criId}`,
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
  const loadOptionsgetManagerAen = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/get_department_child?search=${search}&page=${page}&id=${seleceteMangerXen?.id}&circle_id=${criId}`,
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
  const loadOptionsgetManagerJen = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/get_department_child?search=${search}&page=${page}&id=${seleceteMangerAen?.id}&circle_id=${criId}`,
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

  const [managerKey, setManagerKey] = useState<any>(0)
  const [managerKeyAen, setManagerKeyAen] = useState<any>(0)
  const [managerKeyJen, setManagerKeyJen] = useState<any>(0)

  useEffect(() => {
    // Only load options if a role ID is selected
    if (criId) {
      // Call the loadOptionsRole function here
      loadOptionsgetManagerXen('', [], { page: 1 })
      loadOptionsgetManagerAen('', [], { page: 1 })
      loadOptionsgetManagerJen('', [], { page: 1 })
      setManagerKey((prevKey: any) => prevKey + 1)
      setManagerKeyAen((prevKey: any) => prevKey + 1)
      setManagerKeyJen((prevKey: any) => prevKey + 1)
      setseleceteMangerXen({})
      setseleceteMangerAen({})
      setseleceteMangerJen({})
    }
  }, [criId])

  useEffect(() => {
    // Only load options if a role ID is selected
    if (seleceteMangerXen?.id) {
      // Call the loadOptionsRole function here
      // loadOptionsgetManagerXen('', [], {page: 1})
      loadOptionsgetManagerAen('', [], { page: 1 })
      loadOptionsgetManagerJen('', [], { page: 1 })
      // setManagerKey((prevKey: any) => prevKey + 1)
      setManagerKeyAen((prevKey: any) => prevKey + 1)
      setManagerKeyJen((prevKey: any) => prevKey + 1)
      // setseleceteMangerXen({})
      setseleceteMangerAen({})
      setseleceteMangerJen({})
    }
  }, [seleceteMangerXen])

  useEffect(() => {
    // Only load options if a role ID is selected
    if (seleceteMangerAen?.id) {
      loadOptionsgetManagerJen('', [], { page: 1 })

      setManagerKeyJen((prevKey: any) => prevKey + 1)

      setseleceteMangerJen({})
    }
  }, [seleceteMangerAen])

  const [roledata, setroledata] = useState<any>({
    role_name: '',
    role_description: '',
    meta_title: '',
    meta_description: '',
  })

  const ITEMS_PER_PAGE = 10
  const hendleChangerole = (e: any) => {
    const { name, value } = e.target
    setroledata({ ...roledata, [name]: value })
  }
  const headers = [
    { name: 'S.No.', field: '_id', sortable: false },
    { name: 'Book New', field: 'booknew', sortable: false },
    { name: 'Customer Name', field: 'customer', sortable: false },
    { name: 'Number', field: 'number', sortable: false },
    { name: 'Vehicle', field: 'vehicle', sortable: false },
    { name: 'Pickup Date Time', field: 'time', sortable: false },
    { name: 'Pickup Location', field: 'location', sortable: false },
    { name: 'Drop Location', field: 'drop', sortable: false },
    { name: 'Booked By/Date Time', field: 'booked', sortable: false },
    { name: 'Reason', field: 'reason', sortable: false },
    { name: 'Driver', field: 'driver', sortable: false },
    { name: 'Driver status', field: 'driver_status', sortable: false },
    // {name: 'Pin code', field: 'pin_code', sortable: false},
    // {name: 'remark', field: 'remark', sortable: true},
    // {name: 'Remark', field: 'remark', sortable: false},
    // {name: 'Document', field: 'document', sortable: false},
    // {name: 'user_type', field: 'user_type', sortable: true},
    // {name: 'active', field: 'active', sortable: true},
    // {name: 'price', field: 'price', sortable: false},
    // {name: 'effective Date', field: 'effectiveDate', sortable: false},
    // {name: 'Parent Id ', field: 'parentId', sortable: false},
    // {name: 'Status', field: 'is_status', sortable: false},
    // {name: 'Deleted', field: 'delete', sortable: false},
    { name: 'Status', field: 'status', sortable: false },
  ]
  const comments = get_product_list?.data ? get_product_list?.data : []
  const commentsData = useMemo(() => {
    let computedComments = comments

    // if (search) {
    //     computedComments = computedComments.filter(
    //         comment =>
    //             comment.name.toLowerCase().includes(search.toLowerCase()) ||
    //             comment.role_name.toLowerCase().includes(search.toLowerCase())
    //     );
    // }

    // setTotalItems(computedComments.length)

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1
      computedComments = computedComments.sort(
        (a: any, b: any) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      )
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [comments, currentPage, search, sorting])
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setPageCount(Math.ceil(get_product_list?.total / itemsPerPage))
  }, [itemOffset, itemsPerPage, comments])
  const onSortingChange = (field: any) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

    setSortingField(field)
    setSortingOrder(order)
    setSorting({ field, order })
  }

  const user = JSON.parse(localStorage.getItem('access_admin_token')!).data

  console.log(user.circle_id);
  

  const hendleTocreateuser = () => {
    const data = new FormData()

    if (!roledata?.name) {
      toast.error('please enter name')
    } 
    // else if (!roledata?.email) {
    //   toast.error('please enter email')
    // }
     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(roledata?.email)) {
      toast.error('invalid email')
    } 
    // else if (!roledata?.password) {
    //   toast.error('please enter password')
    // } else if (!roledata?.remark) {
    //   toast.error('please enter remark')
    // }
    // else if (!criId) {
    //   toast.error('please select circle ')
    // }
    else if (!number) {
      toast.error('please enter mobile')
    } else if (!roledata?.latitude) {
      toast.error('please enter latitude')
    } else if (!roledata?.longitude) {
      toast.error('please enter longitude')
    } else if (!roledata?.address) {
      toast.error('please enter address')
    } else {
      data.append('name', roledata?.name)
      data.append('role_id', '10')
      data.append('xen_id', '0');
      data.append('aen_id', '0');
      data.append('jen_id', '0');
      data.append('circle_id', user.circle_id);
      
      data.append('email', roledata?.email)
      data.append('password', roledata?.password)
      data.append('remark', roledata?.remark)
      
      data.append('mobile', number)
      data.append('latitude', roledata?.latitude)
      data.append('longitude', roledata?.longitude)
      data.append('address', roledata?.address)

      dispatch(adminAction.createuserByJens(data, navigate))

      setseleceteMangerXen(null)
      setseleceteMangerAen(null)
      setseleceteMangerJen(null)

      setcriId('')
    }
  }

  const handlePageClick = (event: any) => {
    // const newOffset = event.selected % (comments.length / 2);
    // setCurrentPage(newOffset + 1);
    // setItemOffset(newOffset * itemsPerPage);

    const data = event?.selected + 1

    setpageNo(data)

    // if (!userSearch) {
    dispatch(adminAction.getAllBookings(data))

    return () => { }
    // } else {
    //   dispatch(
    //     ShoetoggelAction.searchUser({ pageNumber: data, key: userSearch })
    //   );

    //   return () => {};
    // }
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

        <Modal show={showUpdate2} onHide={handleCloseUpdate2}>
          <Modal.Header closeButton>
            <Modal.Title>Book now </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Woohoo, you're reading this text in a modal! */}
            {/* <form
                  id='kt_modal_update_permission_form'
                  className='form'
                  action='#'
                  onSubmit={formik.handleSubmit}
                  noValidate
                > */}

            <div className='row'>
              <div className='mb-7 fv-row col-12'>
                <div className='p-5'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>Select date </span>

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
                  </label>
                </div>
              </div>
            </div>

            <div className='pt-15 text-center'>
              <button
                type='reset'
                className='me-3 btn btn-light'
                data-kt-permissions-modal-action='cancel'
                onClick={handleCloseUpdate2}
              >
                Discard
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-kt-permissions-modal-action='submit'
                onClick={() => {
                  hendletochangeDriver()
                }}
              // disabled={formik.isSubmitting || !formik.isValid}
              >
                <span className='indicator-label'>Submit</span>
              </button>
            </div>
            {/* </form> */}
          </Modal.Body>
          {/* <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
        </Modal>
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

      <div id='kt_app_content' className='flex-column-fluid app-content'>
        {/* <!--begin::Content container-->  */}
        <div id='kt_app_content_container' className='app-container container-xxl'>
          {/* <!--begin::Card-->  */}
          <div className='card card-flush'>
            {/* <!--begin::Card header-->  */}
            <div className='mt-6 card-header'>
              {/* <!--begin::Card title-->  */}
              <div className='card-title'>
                {/* <!--begin::Search-->  */}
                <div className='position-relative d-flex align-items-center my-1 me-5'></div>
                <div className='position-relative d-flex align-items-center my-1 me-5'></div>
                {/* <!--end::Search-->  */}
              </div>
              {/* <!--end::Card title-->  */}
              {/* <!--begin::Card toolbar-->  */}

              {/* <!--end::Card toolbar-->  */}
            </div>
            <div className='p-5'>
              <input
                type='text'
                className='bg-transparent form-control'
                placeholder='Enter mobile number'
                maxLength={10}
                onChange={(e) => {
                  if(e.target.value.length === 10){
                    hendleTocheck(e.target.value)
                  }
                
                }}
               
              />
            </div>

            {status && number?.length == '10' ? (
              <div className='p-5'>
                <Link to={'/trip-books/' + userData?.id} className='d-block btn btn-primary'>
                  New Booking{' '}
                </Link>

                <p></p>
              </div>
            ) : number?.length == '10' ? (
              <div className='p-5'>
                <div className='row'>


                  {/* <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Circle </span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select example'
                      name='circle_id'
                      onChange={(e) => {
                        setcriId(e?.target?.value)
                      }}
                    >
                      <option value={''}>Select Circle</option> */}
                  {/* <option value={''}>All</option> */}
                  {/* <option>Admin</option>
                      <option>Sub Admin</option> */}
                  {/* <option>Select Role</option> */}
                  {/* {get_all_cricle &&
                        get_all_cricle?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.name}
                            </option>
                          )
                        })}
                    </select>
                  </div> */}

                  {/* <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Xen</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <AsyncPaginate<any, any, any>
                      key={managerKey}
                      value={seleceteMangerXen}
                      loadOptions={loadOptionsgetManagerXen}
                      onChange={setseleceteMangerXen}
                      additional={{
                        page: 1,
                      }}
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Aen</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <AsyncPaginate<any, any, any>
                      key={managerKey}
                      value={seleceteMangerAen}
                      loadOptions={loadOptionsgetManagerAen}
                      onChange={setseleceteMangerAen}
                      additional={{
                        page: 1,
                      }}
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Jen</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
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
                  </div> */}

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter a  name'
                      name='name'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_name')}
                      className='bg-transparent form-control'
                    />
                  </div>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>email</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter email'
                      name='email'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>password</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter password'
                      name='password'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>mobile</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter mobile'
                      name='mobile'
                      type={'number'}
                      value={number}
                      // onChange={(e: any) => {
                      //   hendleChangerole(e)
                      // }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>remark</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter remark'
                      name='remark'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>latitude</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter latitude'
                      name='latitude'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>longitude</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter longitude'
                      name='longitude'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>address</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter address'
                      name='address'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className='bg-transparent form-control'
                    />
                  </div>

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>User type</span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select example'
                      name='user_type'
                      onChange={(e) => {
                        hendleChangerole(e)
                      }}
                    >
                      <option value={''}>Select Role</option>
                      <option value={'gov'}>Goverment</option>
                      <option value={'normal'}>Normal</option>

                      {/* {get_role_list &&
                        get_role_list?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.fullname}
                            </option>
                          )
                        })} */}
                    </select>
                  </div>
                </div>

                <a
                  /* to={'/trip-book/' + userData?.id} */ onClick={() => {
                    hendleTocreateuser()
                  }}
                  className='d-block btn btn-primary'
                >
                  Create User
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* <!--end::Modal - Update permissions-->  */}
          {/* <!--end::Modals-->  */}

          <div className='card card-flush'>
            {/* <!--begin::Card header-->  */}
            <div className='mt-6 card-header'>
              {/* <!--begin::Card title-->  */}
              <div className='card-title'>
                {/* <!--begin::Search-->  */}
                <div className='position-relative d-flex align-items-center my-1 me-5'>
                  {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->  */}
                  {/* <span className='position-absolute ms-6 svg-icon svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          opacity='0.5'
                          x='17.0365'
                          y='15.1223'
                          width='8.15546'
                          height='2'
                          rx='1'
                          transform='rotate(45 17.0365 15.1223)'
                          fill='currentColor'
                        />
                        <path
                          d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                
                    <input
                      type='text'
                      data-kt-permissions-table-filter='search'
                      className='form-control form-control-solid ps-15 w-250px'
                      placeholder='Search Category'
                    /> */}
                </div>
                <div className='position-relative d-flex align-items-center my-1 me-5'>
                  {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->  */}
                  {/* <span className='position-absolute ms-6 svg-icon svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          opacity='0.5'
                          x='17.0365'
                          y='15.1223'
                          width='8.15546'
                          height='2'
                          rx='1'
                          transform='rotate(45 17.0365 15.1223)'
                          fill='currentColor'
                        />
                        <path
                          d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span> */}
                  {/* <!--end::Svg Icon-->  */}
                  {/* <input
                      type='text'
                      data-kt-permissions-table-filter='search'
                      className='form-control form-control-solid ps-15 w-250px'
                      placeholder='Search Category'
                    /> */}

                  {/* <select
                      className='form-select mt-3 form-select-white'
                      aria-label='Select example'
                      name='role_id'
                      onChange={(e) => {
                        hendlerolewise(e.target.value)
                      }}
                    >
                      <option value={''}>Select Role</option>
                      <option value={''}>All</option>
                    
                      {get_role_list &&
                        get_role_list?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.fullname}
                            </option>
                          )
                        })}
                     
                    </select> */}
                </div>
                {/* <!--end::Search-->  */}
              </div>
              {/* <!--end::Card title-->  */}
              {/* <!--begin::Card toolbar-->  */}
              <div className='card-toolbar'>
                {/* <button
                    type='button'
                    className='btn btn-light-primary'
                    // data-bs-toggle='modal'
                    // data-bs-target='#kt_modal_add_permission'
                    onClick={handleShow}
                  >
                 <span className='svg-icon svg-icon-3'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          opacity='0.3'
                          x='2'
                          y='2'
                          width='20'
                          height='20'
                          rx='5'
                          fill='currentColor'
                        />
                        <rect
                          x='10.8891'
                          y='17.8033'
                          width='12'
                          height='2'
                          rx='1'
                          transform='rotate(-90 10.8891 17.8033)'
                          fill='currentColor'
                        />
                        <rect
                          x='6.01041'
                          y='10.9247'
                          width='12'
                          height='2'
                          rx='1'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                    Add Destination
                  </button> */}
                {/* <!--end::Button-->  */}
                {/* <Button variant='primary' onClick={handleShow}>
                  Launch demo modal
                </Button> */}
              </div>
              {/* <!--end::Card toolbar-->  */}
            </div>
            {/* <!--end::Card header-->  */}
            {/* <!--begin::Card body-->  */}
            <div className='pt-0 card-body'>
              {/* <!--begin::Table-->  */}
              <table
                className='table table-row-dashed mb-0 align-middle fs-6 gy-5'
                id='kt_permissions_table'
              >
                {/* <!--begin::Table head-->  */}
                <thead>
                  {/* <!--begin::Table row-->  */}
                  {/* <tr className='fw-bold text-gray-400 text-start text-uppercase fs-7 gs-0'>
                    <th className='min-w-125px'>Name</th>
                    <th className='min-w-250px'>Assigned to</th>
                    <th className='min-w-125px'>Created Date</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr> */}

                  <tr>
                    {headers.map((data: any, i: any) => (
                      <th
                        key={i}
                        onClick={() => (data?.sortable ? onSortingChange(data?.field) : null)}
                      >
                        {data?.name}

                        {sortingField &&
                          sortingField === data?.field &&
                          (sortingOrder === 'asc' ? (
                            //   <FontAwesomeIcon icon='fa-solid fa-arrow-down' />
                            <i className='fa-arrow-down fa-solid'></i>
                          ) : (
                            <i className='fa-arrow-alt-up fas'></i>
                          ))}
                      </th>
                    ))}
                  </tr>

                  {/* <TableHeader
                    headers={headers}
                    onSorting={(field: any, order: any) => setSorting({field, order})}
                  /> */}
                  {/* <!--end::Table row-->  */}
                </thead>
                {/* <!--end::Table head-->  */}
                {/* <!--begin::Table body-->  */}
                <tbody className='fw-semibold text-gray-600'>
                  {commentsData?.map((data: any, i: any) => {
                    const So = 1 + i
                    const pgt1 = pageNo - 1
                    const pgt = pgt1 * 10
                    const soNo = pgt + So

                    return (
                      <tr key={i}>
                        {/* <!--begin::Name=-->  */}
                        {/* <td>User Management</td> */}
                        {/* <!--end::Name=-->  */}
                        {/* <!--begin::Assigned to=-->  */}
                        <td>
                          {soNo}
                          {/* <a
                            href='../../demo1/dist/apps/user-management/roles/view.html'
                            className='m-1 badge badge-light-primary fs-7'
                          >
                            Administrator
                          </a> */}
                        </td>
                        {/* <!--end::Assigned to=-->  */}
                        {/* <!--begin::Created Date-->  */}
                        <td>
                          {' '}
                          <button
                            data-id='2209'
                            onClick={() => {
                              hendletonewbooking(data?.id)
                            }}
                            className='ms-3 btn btn-sm btn-danger'
                          >
                            Book
                          </button>
                        </td>
                        <td>{data?.user?.name}</td>
                        <td>{data?.user?.mobile}</td>
                        <td>
                          {data?.vehicle?.registration_number}
                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                chnageVehivleUp(data)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              change
                         
                            </button> */}
                        </td>
                        <td>{moment(data?.date).format('DD-MM-yyyy hh:mm:ss A')} </td>
                        <td>
                          {data?.source_hydrant_center?.address}

                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                chnageSourceUp(data)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              change
                            
                            </button> */}
                        </td>
                        <td>{data?.destination?.address}</td>
                        <td>{moment(data?.created_at).format('DD-MM-yyyy hh:mm:ss A')}</td>
                        <td>{data?.reject_reason}</td>
                        <td>
                          {data?.driver?.name}
                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                chnageDriverUp(data)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              change
                            
                            </button> */}
                        </td>
                        {/* <td>{data?.pin_code}</td> */}
                        {/* <td>{data?.remark}</td> */}
                        {/* <td>{data?.document == null ? 'Pending' : 'Complete'}</td> */}

                        {/* <td>{data?.active}</td> */}
                        {/* <td>{data?.price}</td>
                          <td>{data?.effectiveDate}</td> */}
                        {/* <td>{data?.parentId}</td> */}
                        {/* <td>
                          
                            <button
                              data-id='2209'
                              onClick={() => {
                                const statusValue =
                                  data?.is_status == 'Active' ? 'Inactive' : 'Active'
                                hendleStatusUpdate(data?._id, statusValue)
                              }}
                              className={
                                data?.is_status == 'Active'
                                  ? 'btn btn-sm btn-success viewItem'
                                  : 'btn btn-sm btn-danger viewItem'
                              }
                            >
                              {data?.is_status}
                            </button>
                          </td> */}
                        {/* <td>{data?.delete ? 'Yes' : 'No'}</td> */}
                        {/* <!--end::Created Date-->  */}
                        {/* <!--begin::Action=-->  */}
                        <td>
                          <p>{data?.driver_status}</p>

                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleuserView(data)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-eye'></i>
                            </button>
                            <button
                              data-id='2209'
                              onClick={() => {
                                hendleModalShow(data?.id)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              <i className='fa-trash-alt fas'></i>
                            </button> */}
                        </td>
                        <td>
                          <p>{data?.status}</p>

                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleuserView(data)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-eye'></i>
                            </button>
                            <button
                              data-id='2209'
                              onClick={() => {
                                hendleModalShow(data?.id)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              <i className='fa-trash-alt fas'></i>
                            </button> */}
                        </td>
                        {/* <!--end::Action=-->  */}
                      </tr>
                    )
                  })}
                </tbody>
                {get_product_list?.totalDocs == '0' && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '400px',
                    }}
                  >
                    <h3>Record Not found</h3>
                  </div>
                )}

                {/* <!--end::Table body-->  */}
              </table>
              {/* <div className='col-md-6'> */}
              <ReactPaginate
                breakLabel='...'
                nextLabel='next'
                className='dataTables_paginate paging_simple_numbers category'
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel='previous'
              // renderOnZeroPageCount={null}
              />
              {/* </div> */}
              {/* <!--end::Table-->  */}
            </div>

            {/* <!--end::Card body-->  */}
          </div>
        </div>
        {/* <!--end::Content container-->  */}
      </div>
    </div>
  )
}

export default TripSchedul

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

function Trip() {
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

  const [itemsPerPage, setitemsPerPage] = useState(10);

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
  }, []);

  const hendleTocheck = async (e: any) => {
    console.log("hendleTocheck ==> ", hendleTocheck);
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
      };
    } catch (error) {
      console.log(error)
    };
  };

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
    setoldbookingid(e);
    setShowUpdate2(true);
  };

  const [startDate, setStartDate] = useState(new Date())
  const hendletochangeDriver = async () => {
    console.log("hendletochangeDriver ==> ", hendletochangeDriver);
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
  console.log("comments ==> ", comments);
  const commentsData = useMemo(() => {
    let computedComments = comments

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
  }, [comments, currentPage, search, sorting]);

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

  console.log(user.circle_id)

  const hendleTocreateuser = () => {
    const data = new FormData()

    if (!roledata?.name) {
      toast.error('please enter name')
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(roledata?.email)) {
      toast.error('invalid email')
    }
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
      data.append('xen_id', '0')
      data.append('aen_id', '0')
      data.append('jen_id', '0')
      data.append('circle_id', user.circle_id)

      data.append('email', roledata?.email)
      data.append('password', roledata?.password)
      data.append('remark', roledata?.remark)

      data.append('mobile', number)
      data.append('latitude', roledata?.latitude)
      data.append('longitude', roledata?.longitude)
      data.append('address', roledata?.address)

      dispatch(adminAction.createuserByJen(data, navigate))

      setseleceteMangerXen(null)
      setseleceteMangerAen(null)
      setseleceteMangerJen(null)

      setcriId('')
    }
  }

  const handlePageClick = async (event: any) => {
    const data = event?.selected + 1

    setpageNo(data);

    const response2: any = await dispatch(
      adminAction.getAllBookingsuserview({ page: data, user_id: userData?.id })
    )
    setget_product_list(response2?.data);
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
      <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
        {/* <!--begin::Title-->  */}
        <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
          Booking
        </h1>

        <Modal show={showUpdate2} onHide={handleCloseUpdate2}>
          <Modal.Header closeButton>
            <Modal.Title>Book now </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='fv-row mb-7 col-12'>
                <div className='p-5'>
                  <label className='fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>Select date </span>

                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      minDate={today}
                      maxDate={nextDay}
                      showTimeSelect
                      className='form-control bg-transparent'
                      dateFormat='MMMM d, yyyy h:mm aa'
                      placeholderText='Select today or next day'
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='text-center pt-15'>
              <button
                type='reset'
                className='btn btn-light me-3'
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
        </Modal>
        <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
          <li className='breadcrumb-item text-muted'>
            <Link to={'/'} className='text-muted text-hover-primary'>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <span className='bullet bg-gray-400 w-5px h-2px'></span>
          </li>
          {/* <!--end::Item-->  */}
          {/* <!--begin::Item-->  */}
          <li className='breadcrumb-item text-muted'> Booking</li>
          {/* <!--end::Item-->  */}
        </ul>
        {/* <!--end::Breadcrumb-->  */}
      </div>

      <div id='kt_app_content' className='app-content flex-column-fluid'>
        {/* <!--begin::Content container-->  */}
        <div id='kt_app_content_container' className='app-container container-xxl'>
          {/* <!--begin::Card-->  */}
          <div className='card card-flush'>
            {/* <!--begin::Card header-->  */}
            <div className='card-header mt-6'>
              {/* <!--begin::Card title-->  */}
              <div className='card-title'>
                {/* <!--begin::Search-->  */}
                <div className='d-flex align-items-center position-relative my-1 me-5'></div>
                <div className='d-flex align-items-center position-relative my-1 me-5'></div>
                {/* <!--end::Search-->  */}
              </div>
            </div>
            <div className='p-5'>
              <input
                type='text'
                className='form-control bg-transparent'
                placeholder='Enter mobile number'
                maxLength={10}
                onChange={(e) => {
                  if (e.target.value.length === 10) {
                    hendleTocheck(e.target.value)
                  }
                }}
              />
            </div>

            {status && number?.length == '10' ? (
              <div className='p-5'>
                <Link to={'/trip-book/' + userData?.id} className='btn btn-primary d-block '>
                  New Booking{' '}
                </Link>

                <p></p>
              </div>
            ) : number?.length == '10' ? (
              <div className='p-5'>
                <div className='row'>
                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
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
                      className='form-control bg-transparent'
                    />
                  </div>
                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>email</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>
                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>password</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>

                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>mobile</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>
                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>remark</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>

                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>latitude</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>

                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>longitude</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>

                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>address</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
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
                      className='form-control bg-transparent'
                    />
                  </div>

                  <div className='fv-row mb-7 col-3'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>User type</span>
                    </label>
                    <select
                      className='form-control bg-transparent'
                      aria-label='Select example'
                      name='user_type'
                      onChange={(e) => {
                        hendleChangerole(e)
                      }}
                    >
                      <option value={''}>Select Role</option>
                      <option value={'gov'}>Goverment</option>
                      <option value={'normal'}>Normal</option>
                    </select>
                  </div>
                </div>

                <a
                  /* to={'/trip-book/' + userData?.id} */ onClick={() => {
                    hendleTocreateuser()
                  }}
                  className='btn btn-primary d-block '
                >
                  Create User
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className='card card-flush'>
            {/* <!--begin::Card header-->  */}
            <div className='card-header mt-6'>
              {/* <!--begin::Card title-->  */}
              <div className='card-title'>
                {/* <!--begin::Search-->  */}
                <div className='d-flex align-items-center position-relative my-1 me-5'>
                </div>
                <div className='d-flex align-items-center position-relative my-1 me-5'>
                </div>
                {/* <!--end::Search-->  */}
              </div>
              {/* <!--end::Card title-->  */}
              {/* <!--begin::Card toolbar-->  */}
              <div className='card-toolbar'>
              </div>
            </div>
            <div className='card-body pt-0'>
              {/* <!--begin::Table-->  */}
              <table
                className='table align-middle table-row-dashed fs-6 gy-5 mb-0'
                id='kt_permissions_table'
              >
                <thead>
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
                            <i className='fa-solid fa-arrow-down'></i>
                          ) : (
                            <i className='fas fa-arrow-alt-up'></i>
                          ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {commentsData?.map((data: any, i: any) => {
                    const So = 1 + i
                    const pgt1 = pageNo - 1
                    const pgt = pgt1 * 10
                    const soNo = pgt + So

                    return (
                      <tr key={i}>
                        <td>
                          {soNo}
                        </td>
                        <td>
                          {' '}
                          <button
                            data-id='2209'
                            onClick={() => {
                              hendletonewbooking(data?.id)
                            }}
                            className='btn btn-sm btn-danger ms-3'
                          >
                            Book
                          </button>
                        </td>
                        <td>{data?.user?.name}</td>
                        <td>{data?.user?.mobile}</td>
                        <td>
                          {data?.vehicle?.registration_number}
                        </td>
                        <td>{moment(data?.date).format('DD-MM-yyyy hh:mm:ss A')} </td>
                        <td>
                          {data?.source_hydrant_center?.address}
                        </td>
                        <td>{data?.destination?.address}</td>
                        <td>{moment(data?.created_at).format('DD-MM-yyyy hh:mm:ss A')}</td>
                        <td>{data?.reject_reason}</td>
                        <td>
                          {data?.driver?.name}
                        </td>
                        <td>
                          <p>{data?.driver_status}</p>
                        </td>
                        <td>
                          <p>{data?.status}</p>
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

export default Trip

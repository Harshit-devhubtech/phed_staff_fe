import React, { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { adminAction } from '../../../redux/common/action'
import { Pagination, TableHeader } from '../Table'
import PaginationComponent from '../Table/Pagination/Pagination'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from 'yup'
import Dropdown from 'react-bootstrap/Dropdown'

// modal
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { URL } from '../../../redux/common/url'
import { KTSVG } from '../../../_metronic/helpers'
import moment from 'moment'
import { Input } from 'antd'
import { AsyncPaginate } from 'react-select-async-paginate'

import DatePicker from 'react-datepicker'

// @ts-ignore

// import {CKEditor} from '@ckeditor/ckeditor5-react'

// @ts-ignore
// import Editor from 'ckeditor5-custom-build/build/ckeditor'

// image uploader
// import ImageUploading from 'react-images-uploading'
import { toast } from 'react-toastify'
import { getUserByToken, login } from '../../modules/auth/core/_requests'

import { useAuth } from '../../modules/auth/core/Auth'


const loginSchema = Yup.object().shape({
  role_name: Yup.string()
    // .role_name('Wrong role_name format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('product is required'),
  role_description: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('tegs is required'),
})

const initialValues = {
  role_name: '',
  role_description: '',
}

interface Option {
  value: string
  label: string
}

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
}

function UserLogin() {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')
  // const [comments, setComments] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(1)
  const navigate = useNavigate()


  const [itemsPerPage, setitemsPerPage] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState({ field: '', order: '' })

  // deta table  state end

  // modal

  const [show, setShow] = useState(false)

  const [addpermission, setaddpermission] = useState(false)
  const [showDelelt, setShowDelete] = useState(false)

  // date
  const [startDate, setStartDate] = useState(new Date())
  const [startDateup, setStartDateup] = useState(new Date())



  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleClose = () => setShow(false)

  const handleCloseaddpermission = () => setaddpermission(false)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShow = () => setShow(true)

  // modal end

  // api call

  const dispatch = useDispatch()
  const [roledata, setroledata] = useState<any>({
    role_name: '',
    role_description: '',
    meta_title: '',
    meta_description: '',
  })
  const [loading, setLoading] = useState(false)
  const [roleID, setroleID] = useState<any>('')
  const [productID, setproductID] = useState<any>('')
  const [pageNo, setpageNo] = useState<any>(1)

  // get api data

  // image uploder

  const [images, setImages] = React.useState<any>([])
  const maxNumber = 1



  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImages(imageList)
  }
  const [imagesss, setImagesss] = React.useState([])
  const maxNumberss = 8

  const onChangess = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesss(imageList)
  }



  const counsellor: any[] = useSelector((state: any) =>
    state.admin.get_per_list ? state.admin.get_per_list : []
  )
  const get_role_list: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
  const get_all_cricle: any[] = useSelector((state: any) =>
    state.admin.get_all_cricle ? state.admin.get_all_cricle : []
  )
  const get_product_list: any = useSelector((state: any) =>
    state.admin.get_user_for_login ? state.admin.get_user_for_login : {}
  )
  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )



  const ITEMS_PER_PAGE = 10

  const { saveAuth, setCurrentUser } = useAuth()

  const hendleToaddPer = async (e: any) => {
    setroleID(e)



    try {
      const { data: auth } = await login(e?.user_name, e?.password, e?.role_id)



      const responsedata = auth

      if (responsedata?.status) {
        saveAuth(auth)

        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
        navigate('/')
        window.location.reload()
      } else {
        toast.error(responsedata?.message)
      }
    } catch (error) {
      console.error(error)
      // saveAuth(undefined)
      // setStatus('The login details are incorrect')
      // setSubmitting(false)
      // setLoading(false)
    }

    // const {data: auth} = await login(e?.user_name, e?.password, e?.role_id)
    // saveAuth(auth)

    // const {data: user} = await getUserByToken(auth.api_token)
    // setCurrentUser(user)
    // window.location.reload()

    // setaddpermission(true)
  }

  const hendleModalShow = (e: any) => {
    setShowDelete(true)
    setproductID(e)
  }

  // useEffect(() => {
  //   const getData = () => {
  //     // showLoader();

  //     fetch('https://jsonplaceholder.typicode.com/comments')
  //       .then((response) => response.json())
  //       .then((json) => {
  //         // hideLoader();
  //         setComments(json)

  //       })
  //   }

  //   getData()
  // }, [])



  const comments = get_product_list?.data ? get_product_list?.data : []



  const headers = [
    { name: 'S.No.', field: '_id', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Profile Name', field: 'user_name', sortable: false },
    { name: 'Role', field: 'role', sortable: false },
    { name: 'User', field: 'user', sortable: false },
    // {name: 'remark', field: 'remark', sortable: true},
    // {name: 'uid', field: 'uid', sortable: true},
    // {name: 'user_type', field: 'user_type', sortable: true},
    // {name: 'active', field: 'active', sortable: true},
    // {name: 'price', field: 'price', sortable: false},
    // {name: 'effective Date', field: 'effectiveDate', sortable: false},
    // {name: 'Parent Id ', field: 'parentId', sortable: false},
    // {name: 'Status', field: 'is_status', sortable: false},
    // {name: 'Deleted', field: 'delete', sortable: false},
    // {name: 'Action', field: 'action', sortable: false},
  ]

  const commentsData = useMemo(() => {
    let computedComments = comments

    // if (search) {
    //     computedComments = computedComments.filter(
    //         comment =>
    //             comment.name.toLowerCase().includes(search.toLowerCase()) ||
    //             comment.role_name.toLowerCase().includes(search.toLowerCase())
    //     );
    // }
    if(computedComments.length === 0) {
      return computedComments
    }


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
  }, [comments, currentPage,sorting])

  // const handlePageClick = (event: any) => {
  //   const newOffset = event.selected % (comments.length / 2)
  //   setCurrentPage(newOffset + 1)
  //   setItemOffset(newOffset * itemsPerPage)
  // }

  const handlePageClick = (event: any) => {
    // const newOffset = event.selected % (comments.length / 2);
    // setCurrentPage(newOffset + 1);
    // setItemOffset(newOffset * itemsPerPage);

    const data = event?.selected + 1

    setpageNo(data)

    // if (!userSearch) {
    dispatch(adminAction.getUsersForLogin(data))

    return () => { }
    // } else {
    //   dispatch(
    //     ShoetoggelAction.searchUser({ pageNumber: data, key: userSearch })
    //   );

    //   return () => {};
    // }
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setPageCount(Math.ceil(get_product_list?.total / itemsPerPage))
  }, [itemOffset, itemsPerPage, comments])

  // Table shoorting Function

  const onSortingChange = (field: any) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

    setSortingField(field)
    setSortingOrder(order)
    setSorting({ field, order })
  }

  const hendleChangerole = (e: any) => {
    const { name, value } = e.target
    setroledata({ ...roledata, [name]: value })
  }

  const [seleceteRole, setseleceteRole] = useState<any>({})
  const hendleChangeroleSelect = (e: any) => {


    const myObject = get_role_list.find((obj) => obj.id == e)

    // get_role_list


    setseleceteRole(myObject)

    // const {name, value} = e.target
    // setroledata({...roledata, [name]: value})
  }


  const [aboutPage, setaboutPage] = useState<any>('')

  const hendleSubmitCreate = () => {
    // setLoading(true)
    try {
      // seleceteRole?.shortname == 'driver' ||
      // seleceteRole?.shortname == 'vendor' ||
      // seleceteRole?.shortname == 'user'

      const data = new FormData()
      if (!roledata?.name) {
        toast.error('please enter name')
      } else if (!seleceteRole?.id) {
        toast.error('please select role')
      } else if (!roledata?.user_name) {
        toast.error('please enter user name')
      } else if (!roledata?.password) {
        toast.error('please password ')
      } else {
        data.append('name', roledata?.name)
        data.append('role_id', seleceteRole?.id)

        data.append('user_name', roledata?.user_name)
        data.append('password', roledata?.password)
        // data.append('remark', roledata?.remark)
        // data.append('circle_id', roledata?.circle_id)
        // data.append('mobile', roledata?.mobile)
        // data.append('latitude', roledata?.latitude)
        // data.append('longitude', roledata?.longitude)
        // data.append('address', roledata?.address)



        dispatch(adminAction.createProfile(data))
        setShow(false)
        setLoading(false)
        dispatch(adminAction.getUsersForLogin({ page: pageNo, search }))
      }

      // const {data: auth} = await login(values.role_name, values.role_description)
      // saveAuth(auth)
      // const {data: user} = await getUserByToken(auth.api_token)
      // dispatch(adminAction.createRoles(values))

      // data.append("title", imageEditfor);

      // images

      // setCurrentUser(user)
    } catch (error) {
      // console.error(error)
      // saveAuth(undefined)
      // setStatus('The login details are incorrect')
      // setSubmitting(false)
      // setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,

    onSubmit: async (values, { setStatus, setSubmitting }) => {


      setLoading(true)
      try {
        // const {data: auth} = await login(values.role_name, values.role_description)
        // saveAuth(auth)
        // const {data: user} = await getUserByToken(auth.api_token)
        // dispatch(adminAction.createRoles(values))
        const data = new FormData()

        // data.append("title", imageEditfor);

        // images

        data.append('name', values?.role_name)
        data.append('description', values?.role_description)
        data.append('categoryName', 'test cate')
        data.append('parentId', '11')
        data.append('sellerId', '20')

        data.append('image', images[0]?.file)
        // imagesss?.forEach((file: any) => {

        //   data.append('images', file?.file)
        // })


        // dispatch(adminAction.createCategory(data))
        setShow(false)
        setLoading(false)
        // setCurrentUser(user)
      } catch (error) {
        // console.error(error)
        // saveAuth(undefined)
        // setStatus('The login details are incorrect')
        // setSubmitting(false)
        // setLoading(false)
      }
    },
  })

  useEffect(() => {
    // dispatch(adminAction.getPermissionsList('dhsg'))
    // dispatch(adminAction.getUsersForLogin(1))
    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])
  useEffect(() => {
    dispatch(adminAction.getUsersForLogin({ page: pageNo, search }))
  }, [pageNo, search])
  const hendlerolewise = (e: any) => {


    // if (e) {
    //   setpageNo(1)
    //   // page=${data?.page}&role_id=${data?.role_id}
    //   dispatch(adminAction.getuserRoleWise({ page: 1, role_id: e }))
    // } else {
    //   dispatch(adminAction.getuser(1))
    // }

    // getuserRoleWise
  }

  // create product

  // createProduct

  const hendleCreateProduct = () => {
    const data = new FormData()

    // data.append("title", imageEditfor);

    // images

    imagesss?.forEach((file) => {

    })

    //
  }

  const hendleDelete = () => {
    // deleteProduct
    setShowDelete(false)
    dispatch(adminAction.deleteuser({ id: productID, page: pageNo }))
    // dispatch(adminAction.getRoleList('dhsg'))
    dispatch(adminAction.getUsersForLogin({ page: pageNo, search }))
    return () => { }
  }

  const hendleStatusUpdate = (id: any, status: any) => {
    // statusProduct
    // dispatch(adminAction.statusCategory({productId: id, status: status}))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }

  const API_URl = URL.API_BASE_URL
  const UPLOAD_ENDPOINT = 'publicApi/productcon'

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file: any) => {
            body.append('upload', file)
            fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
              method: 'post',
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {

                resolve({ default: `${res.url}` })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }
  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
  }

  const [roledataUpdate, setroledataUpdate] = useState<any>({
    name: '',
    kmTo: '',
    effectiveDate: '',
    price: '',
    cate_id: '',
  })

  const hendleChangerole2 = (e: any) => {
    const { name, value } = e.target
    setroledataUpdate({ ...roledataUpdate, [name]: value })
  }

  const [categoryUpPage, setcategoryUpPage] = useState<any>('')
  const [Imagesfe, setImagesfe] = useState<any>('')
  const onChangefe = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesfe(imageList)
  }

  const [valueRole, setValueRole] = useState<any>(null)

  const hendleEditPage = (e: any) => {

    setShowUpdate(true)

    if (e?.user !== null) {
      const seriresDetatail = e?.user
      seriresDetatail.value = e?.user_id
      seriresDetatail.label = e?.user?.name

      setValueRole(seriresDetatail)
    }

    setroledataUpdate({
      user_name: e.user_name,
      role_id: e.role_id,
      pincode: e.pincode,
      page: pageNo,

      //   kmTo: e.kmTo,
      //   effectiveDate: e.effectiveDate,
      //   price: e.price,
      //   remark: e.remark,
      cate_id: e.id,
    })
    // setcategoryUpPage(e.description)
    // setImagesfe([{data_url: URL.API_BASE_URL + e.image}])
  }

  // updateperentCate

  const hendleSubmitupdateperentCate = () => {
    setLoading(true)
    try {
      // const {data: auth} = await login(values.role_name, values.role_description)
      // saveAuth(auth)
      // const {data: user} = await getUserByToken(auth.api_token)
      // dispatch(adminAction.createRoles(values))
      const data = new FormData()

      // data.append("title", imageEditfor);

      // images

      //   if (!roledataUpdate?.name) {
      //     toast.error('please enter  name')
      //   } else if (!roledataUpdate?.city) {
      //     toast.error('please enter city')
      //   } else if (!roledataUpdate?.pincode) {
      //     toast.error('please enter pincode')
      //   } else {
      data.append('user_id', valueRole?.id)
      // data.append('description', categoryUpPage)
      data.append('user_name', roledataUpdate?.user_name)
      // data.append('pincode', roledataUpdate?.pincode)
      // data.append('kmTo', roledataUpdate?.kmTo)
      // data.append('effectiveDate', moment(startDateup).format('DD/MM/yyyy'))
      // data.append('remark', roledataUpdate?.remark)
      // data.append('price', roledataUpdate?.price)
      // data.append('categoryName', 'test cate')
      // data.append('pageNo', pageNo)
      // data.append('parentId', '11')
      // data.append('sellerId', '20')


      // roledataUpdate.effectiveDate = moment(startDateup).format('yyyy/MM/DD')

      dispatch(adminAction.assignUserProfile(data))
      setShowUpdate(false)
      setLoading(false)
      dispatch(adminAction.getUsersForLogin({ page: pageNo, search }))
      //   }
      // setCurrentUser(user)
    } catch (error) {

      // saveAuth(undefined)
      // setStatus('The login details are incorrect')
      // setSubmitting(false)
      // setLoading(false)
    }
  }

  const [showView, setShowView] = useState(false)

  const hendleuserView = (e: any) => {
    setShowView(true)
    dispatch(adminAction.getuserdetails(e))
  }



  const loadOptionsRole = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate



    const response = await fetch(
      URL.API_BASE_URL +
      `/api/getAllUserByRole?search=${search}&page=${page}&role_id=${roledataUpdate?.role_id}`,
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




  return (


    <div>
      {/* <div className='app-main flex-column flex-row-fluid' id='kt_app_main'> */}
      {/* <!--begin::Content wrapper-->  */}
      <div className='d-flex flex-column flex-column-fluid'>
        {/* <!--begin::Toolbar-->  */}
        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
          {/* <!--begin::Toolbar container-->  */}
          <div
            id='kt_app_toolbar_container'
            className='app-container container-xxl d-flex flex-stack'
          >
            <Modal show={show} dialogClassName='modal-90w' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add User Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='fv-row mb-7 col-6'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'> Role</span>
                    </label>
                    <select
                      className='form-control bg-transparent'
                      aria-label='Select example'
                      name='role_id'
                      onChange={(e) => {
                        hendleChangeroleSelect(e.target.value)
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
                      {/* <option value='0'>No</option> */}
                    </select>
                  </div>
                  <div className='fv-row mb-7 col-6'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Profile Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter a profile name'
                      name='user_name'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_name')}
                      className={clsx(
                        'form-control bg-transparent',
                        { 'is-invalid': formik.touched.role_name && formik.errors.role_name },
                        {
                          'is-valid': formik.touched.role_name && !formik.errors.role_name,
                        }
                      )}
                    />
                    {formik.touched.role_name && formik.errors.role_name && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_name}</span>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7 col-6'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Name</span>
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
                      placeholder='Enter name'
                      name='name'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'form-control bg-transparent',
                        {
                          'is-invalid':
                            formik.touched.role_description && formik.errors.role_description,
                        },
                        {
                          'is-valid':
                            formik.touched.role_description && !formik.errors.role_description,
                        }
                      )}
                    />
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7 col-6'>
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
                      className={clsx(
                        'form-control bg-transparent',
                        {
                          'is-invalid':
                            formik.touched.role_description && formik.errors.role_description,
                        },
                        {
                          'is-valid':
                            formik.touched.role_description && !formik.errors.role_description,
                        }
                      )}
                    />
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='text-center pt-15'>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleClose}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleSubmitCreate()
                    }}
                  // disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
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

            {/* update */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>update User</Modal.Title>
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

                <div className='fv-row mb-7'>
                  <label className='fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>Select user</span>
                    <i
                      className='fas fa-exclamation-circle ms-2 fs-7'
                      data-bs-toggle='popover'
                      data-bs-trigger='hover'
                      data-bs-html='true'
                      data-bs-content='Permission names is required to be unique.'
                    ></i>
                  </label>
                  <AsyncPaginate<any, any, any>
                    value={valueRole}
                    loadOptions={loadOptionsRole}
                    onChange={setValueRole}
                    additional={{
                      page: 1,
                    }}
                  />
                </div>

                {/* <div className='fv-row mb-7'>
                  <label className='fs-6 fw-semibold form-label mb-2'>
                    <span className='required'> Name</span>
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
                    placeholder='Enter a  name'
                    name='name'
                    onChange={(e: any) => {
                      hendleChangerole2(e)
                    }}
                    value={roledataUpdate?.name}
                    // {...formik.getFieldProps('role_name')}
                    className={clsx(
                      'form-control bg-transparent',
                      {'is-invalid': formik.touched.role_name && formik.errors.role_name},
                      {
                        'is-valid': formik.touched.role_name && !formik.errors.role_name,
                      }
                    )}
                  />
                  {formik.touched.role_name && formik.errors.role_name && (
                    <div className='fv-plugins-message-container'>
                      <span role='alert'>{formik.errors.role_name}</span>
                    </div>
                  )}
                </div> */}
                {/* <div className='fv-row mb-7'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>description</span>
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
                      placeholder='Enter a role name'
                      // name='role_name'
                      {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'form-control bg-transparent',
                        {
                          'is-invalid':
                            formik.touched.role_description && formik.errors.role_description,
                        },
                        {
                          'is-valid':
                            formik.touched.role_description && !formik.errors.role_description,
                        }
                      )}
                    />
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div> */}

                {/* <div className='fv-row mb-7'>
                  <label className='fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>city</span>
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
                    placeholder='Enter city'
                    name='city'
                    onChange={(e: any) => {
                      hendleChangerole2(e)
                    }}
                    value={roledataUpdate?.city}
                    // {...formik.getFieldProps('role_description')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid':
                          formik.touched.role_description && formik.errors.role_description,
                      },
                      {
                        'is-valid':
                          formik.touched.role_description && !formik.errors.role_description,
                      }
                    )}
                  />
                  {formik.touched.role_description && formik.errors.role_description && (
                    <div className='fv-plugins-message-container'>
                      <span role='alert'>{formik.errors.role_description}</span>
                    </div>
                  )}
                </div>

                <div className='fv-row mb-7'>
                  <label className='fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>pincode</span>
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
                    placeholder='Enter pincode'
                    name='pincode'
                    onChange={(e: any) => {
                      hendleChangerole2(e)
                    }}
                    value={roledataUpdate?.pincode}
                    // {...formik.getFieldProps('role_description')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid':
                          formik.touched.role_description && formik.errors.role_description,
                      },
                      {
                        'is-valid':
                          formik.touched.role_description && !formik.errors.role_description,
                      }
                    )}
                  />
                  {formik.touched.role_description && formik.errors.role_description && (
                    <div className='fv-plugins-message-container'>
                      <span role='alert'>{formik.errors.role_description}</span>
                    </div>
                  )}
                </div> */}

                {/* <div className='fv-row mb-7'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Select Category</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <select className='form-select' aria-label='Select example'>
                      <option>Select Category</option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Select Seller</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <select className='form-select' aria-label='Select example'>
                      <option>Select Seller</option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                  </div>

                  <div className='fv-row mb-7'>
                    <label className='fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Image</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagesss}
                      onChange={onChangess}
                      maxNumber={maxNumberss}
                      dataURLKey='data_url'
                      acceptType={['jpg']}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className='upload__image-wrapper'>
                          <button
                            className='btn btn-secondary'
                            style={isDragging ? {color: 'red'} : {}}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            Choose image
                          </button>
                          &nbsp;
                          <button className='btn btn-secondary' onClick={onImageRemoveAll}>
                            Remove all images
                          </button>
                          {imageList.map((image, index) => (
                            <div key={index} className='image-item'>
                              <img src={image.data_url} alt='' width='100' />
                              <div className='image-item__btn-wrapper'>
                                <button
                                  className='btn btn-secondary'
                                  onClick={() => onImageUpdate(index)}
                                >
                                  Update
                                </button>
                                <button
                                  className='btn btn-secondary'
                                  onClick={() => onImageRemove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </div> */}
                <div className='text-center pt-15'>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseUpdate}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleSubmitupdateperentCate()
                    }}
                  // disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
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

            {/* View modal */}
            <Modal show={addpermission} onHide={handleCloseaddpermission}>
              <Modal.Header closeButton>
                <Modal.Title>Category Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}

                <div className='mb-10 d-flex'>
                  <div>
                    <h6>Category Name : -</h6>
                    <p>{roleID?.name}</p>
                    <h6>Image :-</h6>
                    <div className='productDetailsImg'>
                      <img src={URL.API_BASE_URL + roleID?.image} alt='' />
                    </div>
                    <div>
                      {/* <h6>Teg</h6>
                      <p>{roleID?.tegs}</p> */}
                    </div>
                    {/* <h6>product Image</h6>
                    <div className='row'>
                      {roleID?.images &&
                        roleID?.images?.map((data: any, i: any) => {
                    

                          return (
                            <div className='col-3 proMultiImg'>
                              <img src={URL.API_BASE_URL + data?.img} alt='' />
                            </div>
                          )
                        })}
                    </div> */}
                  </div>
                </div>
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

            {/* delete modal  */}
            <Modal show={showDelelt} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title> Detele</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure
                {/* <div className='mb-10 d-flex'>
                  <div>
                    <h6>Feature Image</h6>
                    <div className='productDetailsImg'>
                      <img src={URL.API_BASE_URL + roleID?.featureImage} alt='' />
                    </div>
                    <div>
                      <h6>Product Name</h6>
                      <p>{roleID?.title}</p>
                      <h6>Teg</h6>
                      <p>{roleID?.tegs}</p>
                    </div>
                    <h6>product Image</h6>
                    <div className='row'>
                      {roleID?.images &&
                        roleID?.images?.map((data: any, i: any) => {
                        
                          return (
                            <div className='col-3 proMultiImg'>
                              <img src={URL.API_BASE_URL + data?.img} alt='' />
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleCloseDelete}>
                  No
                </Button>
                <Button variant='primary' onClick={hendleDelete}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* kdshfk */}
            <Modal
              show={showView}
              onHide={() => setShowView(false)}
              dialogClassName='modal-90w'
              aria-labelledby='example-custom-modal-styling-title'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-custom-modal-styling-title'>Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='modal-body py-lg-10 px-lg-10'>
                  {/*begin::Stepper */}
                  <div
                    // ref={stepperRef}
                    className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                    id='kt_modal_create_app_stepper'
                  >
                    {/* begin::Aside*/}
                    <div className='justify-content-center justify-content-xl-start flex-row-auto col-6 '>
                      {/* begin::Nav*/}
                      <div className=' ps-lg-10'>
                        {/* begin::Step 1*/}
                        <div className=' current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Name</h3>
                              </div>

                              <div className='stepper-desc col-6'>{get_users_details?.name}</div>
                            </div>
                            {/* end::Label*/}
                          </div>
                          {/* end::Wrapper*/}

                          {/* begin::Line*/}
                          <div className='stepper-line h-40px'></div>
                          {/* end::Line*/}
                        </div>
                        <div className=' current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Email</h3>
                              </div>

                              <div className='stepper-desc col-6'>{get_users_details?.email}</div>
                            </div>
                            {/* end::Label*/}
                          </div>
                          {/* end::Wrapper*/}

                          {/* begin::Line*/}
                          <div className='stepper-line h-40px'></div>
                          {/* end::Line*/}
                        </div>
                        <div className=' current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Mobile</h3>
                              </div>

                              <div className='stepper-desc col-6'>{get_users_details?.mobile}</div>
                            </div>
                            {/* end::Label*/}
                          </div>
                          {/* end::Wrapper*/}

                          {/* begin::Line*/}
                          <div className='stepper-line h-40px'></div>
                          {/* end::Line*/}
                        </div>

                        <div className='stepper-item' data-kt-stepper-element='nav'>
                          {/* <div className='stepper-wrapper'>
                 
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Completed</h3>

                    <div className='stepper-desc'>Review and Submit</div>
                  </div>
            
                </div>
             */}
                        </div>
                        {/* end::Step 5*/}
                      </div>
                      {/* end::Nav*/}
                    </div>
                    <div className='justify-content-center justify-content-xl-start flex-row-auto col-6 '>
                      {/* begin::Nav*/}
                      <div className=' ps-lg-10'>
                        {/* begin::Step 1*/}
                        <div className=' current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Role</h3>
                              </div>

                              <div className='stepper-desc col-6'>
                                {get_users_details?.role?.fullname}
                              </div>
                            </div>
                            {/* end::Label*/}
                          </div>
                          {/* end::Wrapper*/}

                          {/* begin::Line*/}
                          <div className='stepper-line h-40px'></div>
                          {/* end::Line*/}
                        </div>
                        <div className=' current' data-kt-stepper-element='nav'>
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Circle</h3>
                              </div>

                              <div className='stepper-desc col-6'>
                                {get_users_details?.circle?.name}
                              </div>
                            </div>
                          </div>

                          <div className='stepper-line h-40px'></div>
                        </div>
                        <div className=' current' data-kt-stepper-element='nav'>
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Circle city</h3>
                              </div>

                              <div className='stepper-desc col-6'>
                                {get_users_details?.circle?.city}
                              </div>
                            </div>
                          </div>

                          <div className='stepper-line h-40px'></div>
                        </div>
                        <div className=' current' data-kt-stepper-element='nav'>
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Circle pincode</h3>
                              </div>

                              <div className='stepper-desc col-6'>
                                {get_users_details?.circle?.pincode}
                              </div>
                            </div>
                          </div>

                          <div className='stepper-line h-40px'></div>
                        </div>
                      </div>
                      {/* end::Nav*/}
                    </div>
                    {/* begin::Aside*/}

                    {/*begin::Content */}
                    {/* <div className='flex-row-fluid py-lg-5 px-lg-15'>
           
          </div> */}
                    {/*end::Content */}
                  </div>
                  {/* end::Stepper */}
                </div>
              </Modal.Body>
            </Modal>

            {/* <!--begin::Page title-->  */}
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              {/* <!--begin::Title-->  */}
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                User Login
              </h1>
              {/* <!--end::Title-->  */}
              {/* <!--begin::Breadcrumb-->  */}
              <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item text-muted'>
                  {/* <a href='../../demo1/dist/index.html' className='text-muted text-hover-primary'>
                    Home
                  </a> */}
                  <Link to={'/'} className='text-muted text-hover-primary'>
                    Home
                  </Link>

                  {/* <Button variant='primary' onClick={() => setShowView(true)}>
                    Custom Width Modal
                  </Button> */}
                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item'>
                  <span className='bullet bg-gray-400 w-5px h-2px'></span>
                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item text-muted'>User Login</li>
                {/* <!--end::Item-->  */}
              </ul>
              {/* <!--end::Breadcrumb-->  */}
            </div>
            {/* <!--end::Page title-->  */}
            {/* <!--begin::Actions-->  */}
            <div className='d-flex align-items-center gap-2 gap-lg-3'>
              {/* <!--begin::Filter menu-->  */}
              <div className='m-0'>
                {/* <!--begin::Menu toggle-->  */}

                {/* <!--end::Menu toggle-->  */}
                {/* <!--begin::Menu 1-->  */}

                {/* <!--end::Menu 1-->  */}
              </div>
              {/* <!--end::Filter menu-->  */}
              {/* <!--begin::Secondary button-->  */}
              {/* <!--end::Secondary button-->  */}
              {/* <!--begin::Primary button-->  */}

              {/* <!--end::Primary button-->  */}
            </div>
            {/* <!--end::Actions-->  */}
          </div>
          {/* <!--end::Toolbar container-->  */}
        </div>
        {/* <!--end::Toolbar-->  */}
        {/* <!--begin::Content-->  */}
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
                  <div className='d-flex align-items-center position-relative my-1 me-5'>
                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->  */}
                    {/* <span className='svg-icon svg-icon-1 position-absolute ms-6'>
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
                      className='form-control form-control-solid w-250px ps-15'
                      placeholder='Search Category'
                    /> */}
                  </div>
                  <div className='d-flex align-items-center position-relative my-1 me-5'>
                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->  */}
                    {/* <span className='svg-icon svg-icon-1 position-absolute ms-6'>
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
                      className='form-control form-control-solid w-250px ps-15'
                      placeholder='Search Category'
                    /> */}

                    {/* <select
                      className='form-select form-select-white mt-3'
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
                <div className='card-toolbar' style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Input placeholder="input search "
                    className=' mt-3'
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 200, padding: 10 }} />
                  {/* <!--begin::Button-->  */}
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
                    Add Profile
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
              <div className='card-body pt-0'>
                {/* <!--begin::Table-->  */}
                <table
                  className='table align-middle table-row-dashed fs-6 gy-5 mb-0'
                  id='kt_permissions_table'
                >
                  {/* <!--begin::Table head-->  */}
                  <thead>
                    {/* <!--begin::Table row-->  */}
                    {/* <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                    <th className='min-w-125px'>Name</th>
                    <th className='min-w-250px'>Assigned to</th>
                    <th className='min-w-125px'>Created Date</th>
                    <th className='text-end min-w-100px'>Actions</th>
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
                              <i className='fa-solid fa-arrow-down'></i>
                            ) : (
                              <i className='fas fa-arrow-alt-up'></i>
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
                            className='badge badge-light-primary fs-7 m-1'
                          >
                            Administrator
                          </a> */}
                          </td>
                          {/* <!--end::Assigned to=-->  */}
                          {/* <!--begin::Created Date-->  */}
                          <td>{data?.name}</td>
                          <td>{data?.user_name}</td>
                          <td>{data?.role?.fullname}</td>
                          <td>{data?.user?.name}</td>
                          {/* <td>{data?.uid}</td> */}
                          {/* <td>{data?.user_type}</td> */}
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
                            {/* <!--begin::Update-->  */}

                            {/* <td className="text-end"> */}

                            {/* <Dropdown>
                              <Dropdown.Toggle
                                variant='btn btn-light btn-active-light-primary btn-sm'
                                id='dropdown-basic'
                              >
                                Action
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                          
                                <Dropdown.Item
                                  onClick={() => {
                                    hendleToaddPer(data)
                                  }}
                                >
                                  View
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    hendleModalShow(data?._id)
                                  }}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> */}

                            <button
                              data-id='2209'
                              onClick={() => {
                                hendleToaddPer(data)
                              }}
                              className='btn btn-sm btn-info viewItem'
                            >
                              {/* <i className='fas fa-eye'></i> */}
                              Login
                            </button>
                            {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleEditPage(data)
                              }}
                              className='btn btn-sm btn-info ms-3'
                            >
                              <i className='fas fa-edit'></i>
                            </button> */}
                            {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleuserView(data?.id)
                              }}
                              className='btn btn-sm btn-info ms-3'
                            >
                              <i className='fas fa-eye'></i>
                            </button> */}

                            {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleModalShow(data?.id)
                              }}
                              className='btn btn-sm btn-danger ms-3'
                            >
                              <i className='fas fa-trash-alt'></i>
                            </button> */}

                            {/* <!--end::Menu--> */}
                            {/* </td> */}
                            {/* <button
                              className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_update_permission'
                            >
                             
                              <span className='svg-icon svg-icon-3'>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z'
                                    fill='currentColor'
                                  />
                                  <path
                                    opacity='0.3'
                                    d='M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z'
                                    fill='currentColor'
                                  />
                                </svg>
                              </span>
                            
                            </button> */}

                            {/* <!--end::Update-->  */}
                            {/* <!--begin::Delete-->  */}
                            {/* <button
                              className='btn btn-icon btn-active-light-primary w-30px h-30px'
                              data-kt-permissions-table-filter='delete_row'
                            >
                            
                              <span className='svg-icon svg-icon-3'>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z'
                                    fill='currentColor'
                                  />
                                  <path
                                    opacity='0.5'
                                    d='M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z'
                                    fill='currentColor'
                                  />
                                  <path
                                    opacity='0.5'
                                    d='M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z'
                                    fill='currentColor'
                                  />
                                </svg>
                              </span>
                           
                            </button> */}
                            {/* <!--end::Delete-->  */}
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
            {/* <!--end::Card-->  */}
            {/* <!--begin::Modals-->  */}
            {/* <!--begin::Modal - Add permissions-->  */}
            <div
              className='modal fade'
              id='kt_modal_add_permission'
              tabIndex={-1}
              aria-hidden='true'
            >
              {/* <!--begin::Modal dialog-->  */}
              <div className='modal-dialog modal-dialog-centered mw-650px'>
                {/* <!--begin::Modal content-->  */}
                <div className='modal-content'>
                  {/* <!--begin::Modal header-->  */}
                  <div className='modal-header'>
                    {/* <!--begin::Modal title-->  */}
                    <h2 className='fw-bold'>Add a Permission</h2>
                    {/* <!--end::Modal title-->  */}
                    {/* <!--begin::Close-->  */}
                    <div
                      className='btn btn-icon btn-sm btn-active-icon-primary'
                      data-kt-permissions-modal-action='close'
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->  */}
                      <span className='svg-icon svg-icon-1'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <rect
                            opacity='0.5'
                            x='6'
                            y='17.3137'
                            width='16'
                            height='2'
                            rx='1'
                            transform='rotate(-45 6 17.3137)'
                            fill='currentColor'
                          />
                          <rect
                            x='7.41422'
                            y='6'
                            width='16'
                            height='2'
                            rx='1'
                            transform='rotate(45 7.41422 6)'
                            fill='currentColor'
                          />
                        </svg>
                      </span>
                      {/* <!--end::Svg Icon-->  */}
                    </div>
                    {/* <!--end::Close-->  */}
                  </div>
                  {/* <!--end::Modal header-->  */}
                  {/* <!--begin::Modal body-->  */}
                  <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                    {/* <!--begin::Form-->  */}
                    <form id='kt_modal_add_permission_form' className='form' action='#'>
                      {/* <!--begin::Input group-->  */}
                      <div className='fv-row mb-7'>
                        {/* <!--begin::Label-->  */}
                        <label className='fs-6 fw-semibold form-label mb-2'>
                          <span className='required'>Permission Name</span>
                          <i
                            className='fas fa-exclamation-circle ms-2 fs-7'
                            data-bs-toggle='popover'
                            data-bs-trigger='hover'
                            data-bs-html='true'
                            data-bs-content='Permission names is required to be unique.'
                          ></i>
                        </label>
                        {/* <!--end::Label-->  */}
                        {/* <!--begin::Input-->  */}
                        <input
                          className='form-control form-control-solid'
                          placeholder='Enter a permission name'
                          name='permission_name'
                        />
                        {/* <!--end::Input-->  */}
                      </div>
                      {/* <!--end::Input group-->  */}
                      {/* <!--begin::Input group-->  */}
                      <div className='fv-row mb-7'>
                        {/* <!--begin::Checkbox-->  */}
                        <label className='form-check form-check-custom form-check-solid me-9'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            name='permissions_core'
                            id='kt_permissions_core'
                          />
                          <span className='form-check-label' /* for='kt_permissions_core' */>
                            Set as core permission
                          </span>
                        </label>
                        {/* <!--end::Checkbox-->  */}
                      </div>
                      {/* <!--end::Input group-->  */}
                      {/* <!--begin::Disclaimer-->  */}
                      <div className='text-gray-600'>
                        Permission set as a<strong className='me-1'>Core Permission</strong>will be
                        locked and
                        <strong className='me-1'>not editable</strong>in future
                      </div>
                      {/* <!--end::Disclaimer-->  */}
                      {/* <!--begin::Actions-->  */}
                      <div className='text-center pt-15'>
                        <button
                          type='reset'
                          className='btn btn-light me-3'
                          data-kt-permissions-modal-action='cancel'
                        >
                          Discard
                        </button>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          data-kt-permissions-modal-action='submit'
                        >
                          <span className='indicator-label'>Submit</span>
                          <span className='indicator-progress'>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        </button>
                      </div>
                      {/* <!--end::Actions-->  */}
                    </form>
                    {/* <!--end::Form-->  */}
                  </div>
                  {/* <!--end::Modal body-->  */}
                </div>
                {/* <!--end::Modal content-->  */}
              </div>
              {/* <!--end::Modal dialog-->  */}
            </div>
            {/* <!--end::Modal - Add permissions-->  */}
            {/* <!--begin::Modal - Update permissions-->  */}
            <div
              className='modal fade'
              id='kt_modal_update_permission'
              tabIndex={-1}
              aria-hidden='true'
            >
              {/* <!--begin::Modal dialog-->  */}
              <div className='modal-dialog modal-dialog-centered mw-650px'>
                {/* <!--begin::Modal content-->  */}
                <div className='modal-content'>
                  {/* <!--begin::Modal header-->  */}
                  <div className='modal-header'>
                    {/* <!--begin::Modal title-->  */}
                    <h2 className='fw-bold'>Update Permission</h2>
                    {/* <!--end::Modal title-->  */}
                    {/* <!--begin::Close-->  */}
                    <div
                      className='btn btn-icon btn-sm btn-active-icon-primary'
                      data-kt-permissions-modal-action='close'
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->  */}
                      <span className='svg-icon svg-icon-1'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <rect
                            opacity='0.5'
                            x='6'
                            y='17.3137'
                            width='16'
                            height='2'
                            rx='1'
                            transform='rotate(-45 6 17.3137)'
                            fill='currentColor'
                          />
                          <rect
                            x='7.41422'
                            y='6'
                            width='16'
                            height='2'
                            rx='1'
                            transform='rotate(45 7.41422 6)'
                            fill='currentColor'
                          />
                        </svg>
                      </span>
                      {/* <!--end::Svg Icon-->  */}
                    </div>
                    {/* <!--end::Close-->  */}
                  </div>
                  {/* <!--end::Modal header-->  */}
                  {/* <!--begin::Modal body-->  */}
                  <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                    {/* <!--begin::Notice-->  */}
                    {/* <!--begin::Notice-->  */}
                    <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6'>
                      {/* <!--begin::Icon-->  */}
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen044.svg-->  */}
                      <span className='svg-icon svg-icon-2tx svg-icon-warning me-4'>
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
                            rx='10'
                            fill='currentColor'
                          />
                          <rect
                            x='11'
                            y='14'
                            width='7'
                            height='2'
                            rx='1'
                            transform='rotate(-90 11 14)'
                            fill='currentColor'
                          />
                          <rect
                            x='11'
                            y='17'
                            width='2'
                            height='2'
                            rx='1'
                            transform='rotate(-90 11 17)'
                            fill='currentColor'
                          />
                        </svg>
                      </span>
                      {/* <!--end::Svg Icon-->  */}
                      {/* <!--end::Icon-->  */}
                      {/* <!--begin::Wrapper-->  */}
                      <div className='d-flex flex-stack flex-grow-1'>
                        {/* <!--begin::Content-->  */}
                        <div className='fw-semibold'>
                          <div className='fs-6 text-gray-700'>
                            <strong className='me-1'>Warning!</strong>By editing the permission
                            name, you might break the system permissions functionality. Please
                            ensure you're absolutely certain before proceeding.
                          </div>
                        </div>
                        {/* <!--end::Content-->  */}
                      </div>
                      {/* <!--end::Wrapper-->  */}
                    </div>
                    {/* <!--end::Notice-->  */}
                    {/* <!--end::Notice-->  */}
                    {/* <!--begin::Form-->  */}
                    <form id='kt_modal_update_permission_form' className='form' action='#'>
                      {/* <!--begin::Input group-->  */}
                      <div className='fv-row mb-7'>
                        {/* <!--begin::Label-->  */}
                        <label className='fs-6 fw-semibold form-label mb-2'>
                          <span className='required'>Permission Name</span>
                          <i
                            className='fas fa-exclamation-circle ms-2 fs-7'
                            data-bs-toggle='popover'
                            data-bs-trigger='hover'
                            data-bs-html='true'
                            data-bs-content='Permission names is required to be unique.'
                          ></i>
                        </label>
                        {/* <!--end::Label-->  */}
                        {/* <!--begin::Input-->  */}
                        <input
                          className='form-control form-control-solid'
                          placeholder='Enter a permission name'
                          name='permission_name'
                        />
                        {/* <!--end::Input-->  */}
                      </div>
                      {/* <!--end::Input group-->  */}
                      {/* <!--begin::Actions-->  */}
                      <div className='text-center pt-15'>
                        <button
                          type='reset'
                          className='btn btn-light me-3'
                          data-kt-permissions-modal-action='cancel'
                        >
                          Discard
                        </button>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          data-kt-permissions-modal-action='submit'
                        >
                          <span className='indicator-label'>Submit</span>
                          <span className='indicator-progress'>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        </button>
                      </div>
                      {/* <!--end::Actions-->  */}
                    </form>
                    {/* <!--end::Form-->  */}
                  </div>
                  {/* <!--end::Modal body-->  */}
                </div>
                {/* <!--end::Modal content-->  */}
              </div>
              {/* <!--end::Modal dialog-->  */}
            </div>
            {/* <!--end::Modal - Update permissions-->  */}
            {/* <!--end::Modals-->  */}
          </div>
          {/* <!--end::Content container-->  */}
        </div>
        {/* <!--end::Content-->  */}
      </div>
      {/* <!--end::Content wrapper-->  */}
      {/* <!--begin::Footer-->  */}

      {/* <!--end::Footer-->  */}
      {/* </div> */}
    </div>
  )
}

export default UserLogin

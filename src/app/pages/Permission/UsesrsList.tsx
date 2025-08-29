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
import { Input } from 'antd'
// modal
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import { URL } from '../../../redux/common/url'
import { KTSVG } from '../../../_metronic/helpers'
import moment from 'moment'

import DatePicker from 'react-datepicker'

// @ts-ignore

// import {CKEditor} from '@ckeditor/ckeditor5-react'

// @ts-ignore
// import Editor from 'ckeditor5-custom-build/build/ckeditor'

// image uploader
// import ImageUploading from 'react-images-uploading'
import { toast } from 'react-toastify'

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

function UsesrsList() {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')
  // const [comments, setComments] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(1)



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
  const get_role_listss: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
  const get_all_cricle: any[] = useSelector((state: any) =>
    state.admin.get_all_cricle ? state.admin.get_all_cricle : []
  )
  const get_product_list: any = useSelector((state: any) =>
    state.admin.get_users_list ? state.admin.get_users_list : {}
  )
  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )

  const token: any = localStorage.getItem('kt-auth-react-v')
  const user = JSON.parse(token);
  const prfix = `${user?.data?.prefix}`;



  const get_role_list =
    get_role_listss && handleRoleList()



  function handleRoleList() {

    if (prfix == 'cas') {
      return get_role_listss?.filter((data) => {
        console.log(data);

        return data?.shortname == 'scen' || data?.shortname == 'acen'
      })
    }

    if (prfix == 'acens') {
      return get_role_listss?.filter((data) => {
        console.log(data);

        return data?.shortname == 'scen'
      })
    }
  }




  const ITEMS_PER_PAGE = 10

  const hendleToaddPer = (e: any) => {
    setroleID(e)
    setaddpermission(true)
  }

  const hendleModalShow = (e: any) => {
    setShowDelete(true)
    setproductID(e)
  }


  const comments = get_product_list?.data ? get_product_list?.data : []



  const headers = [
    { name: 'S.No.', field: '_id', sortable: false },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'email', field: 'email', sortable: true },
    { name: 'mobile', field: 'mobile', sortable: true },
    // {name: 'remark', field: 'remark', sortable: true},
    { name: 'uid', field: 'uid', sortable: true },
    // {name: 'user_type', field: 'user_type', sortable: true},
    { name: 'active', field: 'active', sortable: true },
    // {name: 'price', field: 'price', sortable: false},
    // {name: 'effective Date', field: 'effectiveDate', sortable: false},
    // {name: 'Parent Id ', field: 'parentId', sortable: false},
    // {name: 'Status', field: 'is_status', sortable: false},
    // {name: 'Deleted', field: 'delete', sortable: false},
    { name: 'Action', field: 'action', sortable: false },
  ]

  const commentsData = useMemo(() => {
    let computedComments = comments

    if (computedComments.length === 0) {
      return computedComments
    }


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
    // dispatch(adminAction.getuser(data))

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
    if (name === "mobile"|| name === 'alt_mobile') {
      setroledata({ ...roledata, [name]: value.slice(0, 10) })
    } else {
      setroledata({ ...roledata, [name]: value })
    }
  }

  const [seleceteRole, setseleceteRole] = useState<any>({})
  const hendleChangeroleSelect = (e: any) => {


    const myObject = get_role_list && get_role_list.find((obj) => obj.id == e)

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
      if (seleceteRole?.shortname == 'user' || seleceteRole?.shortname == 'vendor') {
        if (!roledata?.name) {
          toast.error('please enter name')
        } else if (!seleceteRole?.id) {
          toast.error('please select role')
        } else if (!roledata?.email) {
          toast.error('please enter email')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(roledata?.email)) {
          toast.error('invalid email')
        } else if (!roledata?.password) {
          toast.error('please enter password')
        } else if (!roledata?.remark) {
          toast.error('please enter remark')
        } else if (!roledata?.mobile) {
          toast.error('please enter mobile')
        } else if (!roledata?.latitude) {
          toast.error('please enter latitude')
        } else if (!roledata?.longitude) {
          toast.error('please enter longitude')
        } else if (!roledata?.address) {
          toast.error('please enter address')
        } else {
          data.append('name', roledata?.name)
          data.append('role_id', seleceteRole?.id)

          data.append('email', roledata?.email)
          data.append('password', roledata?.password)
          data.append('remark', roledata?.remark)
          data.append('circle_id', user?.data?.circle_id)
          data.append('mobile', roledata?.mobile)
          data.append('latitude', roledata?.latitude)
          data.append('longitude', roledata?.longitude)
          data.append('address', roledata?.address)



          dispatch(adminAction.createuser(data))
          setShow(false)
          setLoading(false)
        }
      } else if (seleceteRole?.shortname == 'driver') {
        if (!roledata?.name) {
          toast.error('please enter name')
        } else if (!seleceteRole?.id) {
          toast.error('please select role')
        } else if (!roledata?.email) {
          toast.error('please enter email')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(roledata?.email)) {
          toast.error('invalid email')
        } else if (!roledata?.password) {
          toast.error('please enter password')
        } else if (!roledata?.remark) {
          toast.error('please enter remark')
        } else if (!roledata?.circle_id) {
          toast.error('please select circle ')
        } else if (!roledata?.mobile) {
          toast.error('please enter mobile')
        } else if (!roledata?.latitude) {
          toast.error('please enter latitude')
        } else if (!roledata?.longitude) {
          toast.error('please enter longitude')
        } else if (!roledata?.address) {
          toast.error('please enter address')
        } else if (!roledata?.device_id) {
          toast.error('please enter device id')
        } else if (!roledata?.device_model) {
          toast.error('please enter device model')
        } else {
          data.append('name', roledata?.name)
          data.append('role_id', seleceteRole?.id)
          data.append('email', roledata?.email)
          data.append('password', roledata?.password)
          data.append('remark', roledata?.remark)
          data.append('circle_id', user?.data?.circle_id)
          data.append('mobile', roledata?.mobile)
          data.append('latitude', roledata?.latitude)
          data.append('longitude', roledata?.longitude)
          data.append('address', roledata?.address)
          data.append('device_id', roledata?.device_id)
          data.append('device_model', roledata?.device_model)

          dispatch(adminAction.createuser(data))
          setShow(false)
          setLoading(false)
        }
      } else {
        if (!roledata?.name) {
          toast.error('please enter name')
        } else if (!seleceteRole?.id) {
          toast.error('please select role')
        } else if (!roledata?.email) {
          toast.error('please enter email')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(roledata?.email)) {
          toast.error('invalid email')
        } else if (!roledata?.password) {
          toast.error('please enter password')
        } else if (!roledata?.remark) {
          toast.error('please enter remark')
        } else if (!roledata?.mobile) {
          toast.error('please enter mobile')
        } else if (!roledata?.goverment_id) {
          toast.error('please enter goverment id')
        } else {
          data.append('name', roledata?.name)
          data.append('role_id', seleceteRole?.id)
          data.append('email', roledata?.email)
          data.append('password', roledata?.password)
          data.append('remark', roledata?.remark)
          data.append('circle_id', user?.data?.circle_id)
          data.append('mobile', roledata?.mobile)
          data.append('goverment_id', roledata?.goverment_id)
          // data.append('longitude', roledata?.longitude)
          // data.append('address', roledata?.address)
          // data.append('device_id', roledata?.device_id)
          // data.append('device_model', roledata?.device_model)

          dispatch(adminAction.createuser(data))
          setShow(false)
          setLoading(false)
        }

        hendlerolewise('')
      }


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

    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  useEffect(() => {
    hendlerolewise('')
  }, [pageNo, search])

  const hendlerolewise = (e: any) => {


    if (e) {
      setpageNo(1)
      // page=${data?.page}&role_id=${data?.role_id}
      dispatch(adminAction.getuserRoleWise({ page: 1, role_id: e, search }))
    } else {
      dispatch(adminAction.getdepartmentuser(pageNo, search))
    }

    // getuserRoleWise
  }


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
    hendlerolewise('')
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

  const [roledataUpdate, setroledataUpdate] = useState<any>({})
  const [dataUpdate, setdataUpdate] = useState<any>({})


  const hendleChangerole2 = (e: any) => {
    const { name, value } = e.target
    if (name === "mobile"|| name === 'alt_mobile') {
      setroledataUpdate({ ...roledataUpdate, [name]: value.slice(0, 10) })
    } else {
      setroledataUpdate({ ...roledataUpdate, [name]: value })
    }
  }


  const [categoryUpPage, setcategoryUpPage] = useState<any>('')
  const [Imagesfe, setImagesfe] = useState<any>('')
  const onChangefe = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesfe(imageList)
  }

  const hendleEditPage = (e: any) => {

    setShowUpdate(true)
    setroledataUpdate(e)
    setdataUpdate(e)
  }

  // updateperentCate

  const hendleSubmitupdateperentCate = () => {
    setLoading(true)
    try {
      const newFrom = Object.keys(roledataUpdate)
        .filter((key) => roledataUpdate[key] !== dataUpdate[key])
        .reduce((acc, key) => ({ ...acc, [key]: roledataUpdate[key] }), {});

      if (newFrom) {
        dispatch(adminAction.updateUser({ id: dataUpdate?.id, ...newFrom }))
      }

      setShowUpdate(false)
      setLoading(false)
      hendlerolewise('');


    } catch (error) {
      console.error(error)

    }
  }

  const [showView, setShowView] = useState(false)

  const hendleuserView = (e: any) => {
    setShowView(true)
    dispatch(adminAction.getuserdetails(e))
  }


  const hendleToAcctive = (e: any, active: any) => {
    const data = new FormData()
    data.append('id', e)
    data.append('active', active)
    dispatch(adminAction.activeInactive2(data))
    hendlerolewise('')
  }


  const findData = (data: any, id: any) => {
    // console.log(data, id);
    const filter = data&&data.filter((item: any) => item?.id === id);
    // console.log(filter[0]);

    return filter? filter[0] : '';

  }


  return (
    <div>

      <div className='d-flex flex-column flex-column-fluid'>

        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>

          <div
            id='kt_app_toolbar_container'
            className='d-flex flex-stack app-container container-xxl'
          >
            <Modal show={show} dialogClassName='modal-90w' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Role</span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select example'
                      name='role_id'
                      onChange={(e) => {
                        hendleChangeroleSelect(e.target.value)
                      }}
                    >
                      <option value={''}>Select Role</option>
                      {/* <option value={''}>All</option> */}

                      {get_role_list &&
                        get_role_list?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.fullname}
                            </option>
                          )
                        })}

                    </select>
                  </div>
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Name</span>
                    </label>
                    <input

                      placeholder='Enter a  name'
                      name='name'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}

                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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

                      placeholder='Enter email'
                      name='email'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}

                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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
                      className={clsx(
                        'bg-transparent form-control',
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

                  <div className='mb-7 fv-row col-6'>
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
                      value={roledata?.mobile}
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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
                      className={clsx(
                        'bg-transparent form-control',
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

                  {/* <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Circle </span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select example'
                      name='circle_id'
                      onChange={(e) => {
                        hendleChangerole(e)
                      }}
                    >
                      <option value={''}>Select Role</option>
                      <option value={''}>All</option>

                      {get_all_cricle &&
                        get_all_cricle?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.name}
                            </option>
                          )
                        })}

                    </select>
                  </div> */}

                  {seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user' ? (
                    ''
                  ) : (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>Goverment id</span>
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
                        placeholder='Enter Goverment id'
                        name='goverment_id'
                        onChange={(e: any) => {
                          hendleChangerole(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}

                  {/* user */}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {seleceteRole?.shortname == 'driver' && (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>device id</span>
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
                        placeholder='Enter device id'
                        name='device_id'
                        onChange={(e: any) => {
                          hendleChangerole(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}
                  {seleceteRole?.shortname == 'driver' && (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>device model</span>
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
                        placeholder='Enter device model'
                        name='device_model'
                        onChange={(e: any) => {
                          hendleChangerole(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
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
                        <span className='ms-2 spinner-border spinner-border-sm align-middle'></span>
                      </span>
                    )}
                  </button>
                </div>
                {/* </form> */}
              </Modal.Body>

            </Modal>

            {/* update */}
            <Modal show={showUpdate} dialogClassName='modal-90w' onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Role <u>{findData(get_role_list, roledataUpdate?.role_id)?.fullname}</u></span>
                    </label>
                    <input type="text" readOnly value={findData(get_role_list, roledataUpdate?.role_id)?.fullname} className={clsx(
                      'bg-transparent form-control',
                      {
                        'is-invalid':
                          formik.touched.role_description && formik.errors.role_description,
                      },
                      {
                        'is-valid':
                          formik.touched.role_description && !formik.errors.role_description,
                      }
                    )} />
                  </div>
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter a  name'
                      name='name'
                      value={roledataUpdate?.name}
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      // {...formik.getFieldProps('role_name')}
                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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
                      value={roledataUpdate?.email}
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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
                      value={roledataUpdate?.password}
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'bg-transparent form-control',
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

                  <div className='mb-7 fv-row col-6'>
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
                      value={roledataUpdate?.mobile}
                      type={'number'}

                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'bg-transparent form-control',
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
                  <div className='mb-7 fv-row col-6'>
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
                      value={roledataUpdate?.remark}
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      // {...formik.getFieldProps('role_description')}
                      className={clsx(
                        'bg-transparent form-control',
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



                  {seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user' ? (
                    ''
                  ) : (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>Goverment id</span>
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
                        placeholder='Enter Goverment id'
                        name='goverment_id'
                        value={roledataUpdate?.goverment_id}
                        onChange={(e: any) => {
                          hendleChangerole2(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}

                  {/* user */}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          value={roledataUpdate?.latitude}
                          onChange={(e: any) => {
                            hendleChangerole2(e)
                          }}
                          // {...formik.getFieldProps('role_description')}
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          value={roledataUpdate?.longitude}
                          onChange={(e: any) => {
                            hendleChangerole2(e)
                          }}
                          // {...formik.getFieldProps('role_description')}
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
                      <div className='mb-7 fv-row col-6'>
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
                          value={roledataUpdate?.address}
                          onChange={(e: any) => {
                            hendleChangerole2(e)
                          }}
                          // {...formik.getFieldProps('role_description')}
                          className={clsx(
                            'bg-transparent form-control',
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
                    )}
                  {seleceteRole?.shortname == 'driver' && (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>device id</span>
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
                        placeholder='Enter device id'
                        name='device_id'
                        value={roledataUpdate?.device_id}
                        onChange={(e: any) => {
                          hendleChangerole2(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}
                  {seleceteRole?.shortname == 'driver' && (
                    <div className='mb-7 fv-row col-6'>
                      <label className='form-label mb-2 fw-semibold fs-6'>
                        <span className='required'>device model</span>
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
                        placeholder='Enter device model'
                        name='device_model'
                        value={roledataUpdate?.device_model}
                        onChange={(e: any) => {
                          hendleChangerole2(e)
                        }}
                        // {...formik.getFieldProps('role_description')}
                        className={clsx(
                          'bg-transparent form-control',
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
                  )}
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
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
                      hendleSubmitupdateperentCate()
                    }}
                  // disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='ms-2 spinner-border spinner-border-sm align-middle'></span>
                      </span>
                    )}
                  </button>
                </div>
                {/* </form> */}
              </Modal.Body>

            </Modal>

            {/* View modal */}
            <Modal show={addpermission} onHide={handleCloseaddpermission}>
              <Modal.Header closeButton>
                <Modal.Title>Category Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}

                <div className='d-flex mb-10'>
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
                {/* <div className='d-flex mb-10'>
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
                <Modal.Title id='example-custom-modal-styling-title'>User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='px-lg-10 py-lg-10 modal-body'>
                  {/*begin::Stepper */}
                  <div
                    // ref={stepperRef}
                    className='d-flex flex-row-fluid flex-column flex-xl-row stepper stepper-pills stepper-column'
                    id='kt_modal_create_app_stepper'
                  >
                    {/* begin::Aside*/}
                    <div className='flex-row-auto justify-content-xl-start justify-content-center col-6'>
                      {/* begin::Nav*/}
                      <div className='ps-lg-10'>
                        {/* begin::Step 1*/}
                        <div className='current' data-kt-stepper-element='nav'>
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
                          <div className='h-40px stepper-line'></div>
                          {/* end::Line*/}
                        </div>
                        <div className='current' data-kt-stepper-element='nav'>
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
                          <div className='h-40px stepper-line'></div>
                          {/* end::Line*/}
                        </div>
                        <div className='current' data-kt-stepper-element='nav'>
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
                          <div className='h-40px stepper-line'></div>
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
                    <div className='flex-row-auto justify-content-xl-start justify-content-center col-6'>
                      {/* begin::Nav*/}
                      <div className='ps-lg-10'>
                        {/* begin::Step 1*/}
                        <div className='current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            {/* begin::Icon*/}
                            {/* <div className='w-40px h-40px stepper-icon'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div> */}
                            {/* end::Icon*/}

                            {/* begin::Label*/}
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
                          <div className='h-40px stepper-line'></div>
                          {/* end::Line*/}
                        </div>
                        <div className='current' data-kt-stepper-element='nav'>
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

                          <div className='h-40px stepper-line'></div>
                        </div>
                        <div className='current' data-kt-stepper-element='nav'>
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

                          <div className='h-40px stepper-line'></div>
                        </div>
                        <div className='current' data-kt-stepper-element='nav'>
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

                          <div className='h-40px stepper-line'></div>
                        </div>
                      </div>
                      {/* end::Nav*/}
                    </div>
                    {/* begin::Aside*/}

                    {/*begin::Content */}
                    {/* <div className='flex-row-fluid px-lg-15 py-lg-5'>
           
          </div> */}
                    {/*end::Content */}
                  </div>
                  {/* end::Stepper */}
                </div>
              </Modal.Body>
            </Modal>


            <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>

              <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
                Department
              </h1>

              <ul className='my-0 breadcrumb-separatorless pt-1 fw-semibold breadcrumb fs-7'>

                <li className='breadcrumb-item text-muted'>

                  <Link to={'/'} className='text-hover-primary text-muted'>
                    Home
                  </Link>


                </li>

                <li className='breadcrumb-item'>
                  <span className='bg-gray-400 w-5px h-2px bullet'></span>
                </li>

                <li className='breadcrumb-item text-muted'>Department</li>

              </ul>

            </div>

            <div className='d-flex align-items-center gap-2 gap-lg-3'>

              <div className='m-0'>

              </div>

            </div>

          </div>

        </div>

        <div id='kt_app_content' className='flex-column-fluid app-content'>

          <div id='kt_app_content_container' className='app-container container-xxl'>

            <div className='card card-flush'>

              <div className='mt-6 card-header'>
                {/* <!--begin::Card title-->  */}
                <div className='card-title'>
                  {/* <!--begin::Search-->  */}
                  <div className='position-relative d-flex align-items-center my-1 me-5'>

                  </div>
                  <div className='position-relative d-flex align-items-center my-1 me-5' style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Input placeholder="input search "
                      className='mt-3'
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: 200, padding: 10 }} />


                    <select
                      className='form-select mt-3 form-select-white'
                      aria-label='Select example'
                      name='role_id'
                      onChange={(e) => {
                        hendlerolewise(e.target.value)
                      }}
                    >
                      <option value={''}>Select Role</option>

                      {get_role_list &&
                        get_role_list?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.fullname}
                            </option>
                          )
                        })}

                    </select>
                  </div>

                </div>

                <div className='card-toolbar'>
                  {/* <!--begin::Button-->  */}
                  <button
                    type='button'
                    className='btn btn-light-primary'

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
                    {/* <!--end::Svg Icon-->  */}Add User
                  </button>

                </div>
                {/* <!--end::Card toolbar-->  */}
              </div>

              <div className='pt-0 card-body'>
                {/* <!--begin::Table-->  */}
                <table
                  className='table table-row-dashed mb-0 align-middle fs-6 gy-5'
                  id='kt_permissions_table'
                >
                  {/* <!--begin::Table head-->  */}
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
                              <i className='fa-arrow-down fa-solid'></i>
                            ) : (
                              <i className='fa-arrow-alt-up fas'></i>
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

                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.mobile}</td>
                          <td>{data?.uid}</td>

                          <td> <button
                            data-id='2209'
                            onClick={() => {
                              hendleToAcctive(data?.id, data?.active ? 0 : 1)
                            }}
                            className={
                              data?.active
                                ? 'btn btn-sm btn-success ms-3'
                                : 'btn btn-sm btn-danger ms-3'
                            }
                          >
                            {data?.active ? 'Active' : 'Inactive'}
                          </button></td>

                          <td>

                            <button
                              data-id='2209'
                              onClick={() => {
                                hendleEditPage(data)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-edit'></i>
                            </button>

                            <button
                              data-id='2209'
                              onClick={() => {
                                hendleuserView(data?.id)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-eye'></i>
                            </button>
                            {/* <button
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

            <div
              className='modal fade'
              id='kt_modal_add_permission'
              tabIndex={-1}
              aria-hidden='true'
            >
              {/* <!--begin::Modal dialog-->  */}
              <div className='mw-650px modal-dialog modal-dialog-centered'>
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
                  <div className='mx-5 mx-xl-15 my-7 scroll-y modal-body'>
                    {/* <!--begin::Form-->  */}
                    <form id='kt_modal_add_permission_form' className='form' action='#'>
                      {/* <!--begin::Input group-->  */}
                      <div className='mb-7 fv-row'>
                        {/* <!--begin::Label-->  */}
                        <label className='form-label mb-2 fw-semibold fs-6'>
                          <span className='required'>Permission Name</span>
                          <i
                            className='ms-2 fas fa-exclamation-circle fs-7'
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
                      <div className='mb-7 fv-row'>
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
                      <div className='pt-15 text-center'>
                        <button
                          type='reset'
                          className='me-3 btn btn-light'
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
                            <span className='ms-2 spinner-border spinner-border-sm align-middle'></span>
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
              <div className='mw-650px modal-dialog modal-dialog-centered'>
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
                  <div className='mx-5 mx-xl-15 my-7 scroll-y modal-body'>
                    {/* <!--begin::Notice-->  */}
                    {/* <!--begin::Notice-->  */}
                    <div className='d-flex bg-light-warning mb-9 p-6 border border-warning border-dashed rounded notice'>
                      {/* <!--begin::Icon-->  */}
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen044.svg-->  */}
                      <span className='me-4 svg-icon svg-icon-2tx svg-icon-warning'>
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
                      <div className='d-flex flex-grow-1 flex-stack'>
                        {/* <!--begin::Content-->  */}
                        <div className='fw-semibold'>
                          <div className='text-gray-700 fs-6'>
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
                      <div className='mb-7 fv-row'>
                        {/* <!--begin::Label-->  */}
                        <label className='form-label mb-2 fw-semibold fs-6'>
                          <span className='required'>Permission Name</span>
                          <i
                            className='ms-2 fas fa-exclamation-circle fs-7'
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
                      <div className='pt-15 text-center'>
                        <button
                          type='reset'
                          className='me-3 btn btn-light'
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
                            <span className='ms-2 spinner-border spinner-border-sm align-middle'></span>
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

export default UsesrsList

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
import { Link } from 'react-router-dom'
import { URL } from '../../../redux/common/url'
import { KTSVG } from '../../../_metronic/helpers'
import moment from 'moment'
import { AsyncPaginate } from 'react-select-async-paginate'
import DatePicker from 'react-datepicker'

// @ts-ignore

// import {CKEditor} from '@ckeditor/ckeditor5-react'

// @ts-ignore
// import Editor from 'ckeditor5-custom-build/build/ckeditor'

// image uploader
import ImageUploading from 'react-images-uploading'
import { toast } from 'react-toastify'
import { Input } from 'antd'

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

function Vendor() {
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
  const [addpermissionUpdate, setaddpermissionUpdate] = useState(false)
  const [addDocVerifyU, setDocVerifyU] = useState(false)
  const [showDelelt, setShowDelete] = useState(false)

  // date
  const [startDate, setStartDate] = useState(new Date())
  const [startDateup, setStartDateup] = useState(new Date())

  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleClose = () => setShow(false)

  const handleCloseaddpermission = () => setaddpermission(false)
  const handleCloseaddpermissionUpdate = () => setaddpermissionUpdate(false)
  const handleCloseDocVerifyU = () => setDocVerifyU(false)
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

  const maxNumber = 1
  const [images, setImages] = React.useState<any>([])

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImages(imageList)
  }

  const [imagesad, setImagesad] = React.useState<any>([])

  const onChangead = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesad(imageList)
  }

  const [imagespan, setImagespan] = React.useState<any>([])

  const onChangepan = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagespan(imageList)
  }
  const [imagesUpdate, setImagesUpdate] = React.useState<any>([])

  const onChangeUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesUpdate(imageList)
  }

  const [imagesadUpdate, setImagesadUpdate] = React.useState<any>([])

  const onChangeadUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesadUpdate(imageList)
  }

  const [imagespanUpdate, setImagespanUpdate] = React.useState<any>([])

  const onChangepanUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagespanUpdate(imageList)
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

  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  )

  // console.log('get_user_profile', get_user_profile);

  const token: any = localStorage.getItem('kt-auth-react-v')

  const prepix: any = JSON.parse(token)?.data?.prefix

  const criId = get_user_profile?.circle?.id

  // console.log('criId', criId);
  console.log(get_role_listss)
  const get_role_list =
    get_role_listss &&
    get_role_listss?.filter((data) => {
      return data?.shortname == 'vendor'
    })

  const ITEMS_PER_PAGE = 10

  const hendleToaddPer = (e: any) => {
    setroleID(e)
    setaddpermission(true)
  }

  const [updateDoc, setupdateDoc] = useState<any>({})

  // const [roledataDoc, setroledataDoc] = useState<any>({})

  const hendleUpdateDocUpdate = (e: any) => {
    const { name, value } = e.target
    setupdateDoc({ ...updateDoc, [name]: value })
  }

  const [docDetails, setdocDetails] = useState<any>({})

  console.log("docDetails ==> ", docDetails);
  const onChageDocD = (e: any) => {
    const { name, value } = e.target
    console.log("value ==> ", value);
    console.log("name ==> ", name);

    setdocDetails({ ...docDetails, [name]: value })
  }

  const hendledocVerify = (e: any) => {
    setdocDetails(e)
    setDocVerifyU(true)
  }

  const hendleSubmitDocVerify = async () => {
    console.log("docDetails ==> ", docDetails);
    const data = new FormData()

    data.append('id', docDetails?.id)
    data.append('docs_verified', docDetails?.docs_verified)
    data.append('reject_message', docDetails?.reject_message)

    await dispatch(adminAction.documentsApprove(data, { page: 1, role_id: 8 }))
    dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
    setDocVerifyU(false)
  }

  const hendleToaddPerUpdate = (e: any) => {
    console.log(e)

    if (e.dl_expire_date) {
      const sv: any = moment(e.dl_expire_date, 'YYYY-MM-DD HH:mm:ss').toDate()

      setStartDateup(sv)
    }

    // setImagespanUpdate()
    // setImagesadUpdate()
    // setImagesUpdate()

    setImagesUpdate([{ data_url: URL.API_BASE_URL + e.gst_doc }])
    setImagesadUpdate([{ data_url: URL.API_BASE_URL + e.aadhar_doc }])
    setImagespanUpdate([{ data_url: URL.API_BASE_URL + e.pan_doc }])

    setupdateDoc({
      user_id: e?.user_id,
      gst_number: e?.gst_number,
      aadhar_number: e?.aadhar_number,
      pan_number: e?.pan_number,
    })
    setaddpermissionUpdate(true)
  }

  const hendleTosubmitUpdate = async () => {
    const data = new FormData()

    data.append('user_id', updateDoc?.user_id)
    data.append('gst_number', updateDoc?.gst_number)
    data.append('pan_number', updateDoc?.pan_number)
    data.append('aadhar_number', updateDoc?.aadhar_number)

    data.append('dl_expire_date', moment(startDateup).format('yyyy/MM/DD'))

    // data.append('aadhar_doc', imagesad[0]?.file)
    // data.append('pan_doc', imagespan[0]?.file)
    // data.append('dl_doc', images[0]?.file)

    if (imagesadUpdate[0]?.file) {
      // roledata?.role_name
      data.append('aadhar_doc', imagesadUpdate[0]?.file)
    }
    if (imagespanUpdate[0]?.file) {
      // roledata?.role_name
      data.append('pan_doc', imagespanUpdate[0]?.file)
    }
    if (imagesUpdate[0]?.file) {
      // roledata?.role_name
      data.append('gst_doc', imagesUpdate[0]?.file)
    }

    // data.append('longitude', roledata?.longitude)
    // data.append('address', roledata?.address)
    // data.append('device_id', roledata?.device_id)
    // data.append('device_model', roledata?.device_model)

    await dispatch(adminAction.documents_update(data, { page: 1, role_id: 8 }))
    dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))

    setImagesUpdate([])
    setImagesadUpdate([])
    setImagespanUpdate([])
    setupdateDoc({})
    setaddpermissionUpdate(false)
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
    { name: 'Name', field: 'name', sortable: false },
    { name: 'email', field: 'email', sortable: false },
    { name: 'mobile', field: 'mobile', sortable: false },
    // {name: 'remark', field: 'remark', sortable: true},
    { name: 'uid', field: 'uid', sortable: false },
    // {name: 'user_type', field: 'user_type', sortable: true},
    { name: 'active', field: 'active', sortable: false },
    { name: 'Doc Verify', field: 'verify', sortable: false },
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
  }, [comments, currentPage, sorting])

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
    // dispatch(adminAction.getuserRoleWise({ page: data, role_id: 8 }))

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
    if (name === 'mobile' || name === 'alt_mobile') {
      setroledata({ ...roledata, [name]: value.slice(0, 10) })
    } else {
      setroledata({ ...roledata, [name]: value })
    }
  }

  const [seleceteRole, setseleceteRole] = useState<any>({})
  console.log(seleceteRole)
  const hendleChangeroleSelect = (e: any) => {
    console.log(e)

    // const myObject = get_role_list.find((obj) => obj.id == e)
    const myObject = get_role_listss.find((obj) => obj.id == e)
    // get_role_list
    console.log(get_role_listss)
    console.log(myObject)

    setseleceteRole(myObject)

    // const {name, value} = e.target
    // setroledata({...roledata, [name]: value})
  }
  const [aboutPage, setaboutPage] = useState<any>('')
  const [seleceteMangerXen, setseleceteMangerXen] = useState<any>({})
  const [seleceteMangerAen, setseleceteMangerAen] = useState<any>({})
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({})
  const [managerKey, setManagerKey] = useState<any>(0)
  const [managerKeyAen, setManagerKeyAen] = useState<any>(0)
  const [managerKeyJen, setManagerKeyJen] = useState<any>(0)
  useEffect(() => {
    setTimeout(() => {
      // hendleChangeroleSelect('8')
      console.log(get_user_profile)
      hendleChangeroleSelect(get_user_profile?.profile?.role_id)

      if (seleceteRole?.shortname == 'xen') {
        setseleceteMangerXen(get_user_profile?.profile)
      }
      if (seleceteRole?.shortname == 'aen') {
        setseleceteMangerXen(get_user_profile?.xen)
        setseleceteMangerAen(get_user_profile?.profile)
      }
      if (seleceteRole?.shortname == 'jen') {
        setseleceteMangerXen(get_user_profile?.xen)
        setseleceteMangerAen(get_user_profile?.aen)
        setseleceteMangerJen(get_user_profile?.profile)
      }
    }, 1000)
  }, [get_role_list])

  const hendleSubmitCreate = async () => {
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
          // data.append('xen_id', seleceteMangerXen?.id)
          // data.append('aen_id', seleceteMangerAen?.id)
          // data.append('jen_id', seleceteMangerJen?.id)

          data.append('email', roledata?.email)
          // data.append('password', roledata?.password)
          data.append('remark', roledata?.remark)
          data.append('circle_id', criId)
          data.append('mobile', roledata?.mobile)
          data.append('latitude', roledata?.latitude)
          data.append('longitude', roledata?.longitude)
          data.append('address', roledata?.address)
          data.append('alt_mobile', roledata?.alt_mobile)

          // dispatch(adminAction.createuser(data))
          await dispatch(adminAction.createuserAndDriver(data, { page: 1, role_id: 8 }))
          setShow(false)
          setseleceteMangerXen(null)
          setseleceteMangerAen(null)
          setseleceteMangerJen(null)
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
          data.append('circle_id', criId)
          data.append('mobile', roledata?.mobile)
          data.append('latitude', roledata?.latitude)
          data.append('longitude', roledata?.longitude)
          data.append('address', roledata?.address)
          data.append('device_id', roledata?.device_id)
          data.append('device_model', roledata?.device_model)

          await dispatch(adminAction.createuserAndDriver(data, { page: 1, role_id: 8 }))
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
          data.append('xen_id', seleceteMangerXen?.id)
          data.append('aen_id', seleceteMangerAen?.id)
          data.append('jen_id', seleceteMangerJen?.id)
          data.append('role_id', '8')
          data.append('email', roledata?.email)
          data.append('password', roledata?.password)
          data.append('remark', roledata?.remark)
          data.append('circle_id', criId)
          data.append('mobile', roledata?.mobile)
          data.append('goverment_id', roledata?.goverment_id)

          await dispatch(adminAction.createuser(data))
          dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
          setShow(false)
          setLoading(false)
          setseleceteMangerXen(null)
          setseleceteMangerAen(null)
          setseleceteMangerJen(null)
        }
      }
    } catch (error) {
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
        // saveAuth(undefined)
        // setStatus('The login details are incorrect')
        // setSubmitting(false)
        // setLoading(false)
      }
    },
  })

  useEffect(() => {
    // dispatch(adminAction.getPermissionsList('dhsg'))
    // dispatch(adminAction.getuser(1))
    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    dispatch(adminAction.userprofile(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  useEffect(() => {
    dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
  }, [pageNo, search])

  const hendlerolewise = (e: any) => {
    if (e) {
      setpageNo(1)
      // page=${data?.page}&role_id=${data?.role_id}
      dispatch(adminAction.getuserRoleWise({ page: 1, role_id: e }))
    } else {
      dispatch(adminAction.getuser(1))
    }

    // getuserRoleWise
  }

  // create product
  const hendleCreateProduct = () => {
    const data = new FormData()

    // data.append("title", imageEditfor);

    // images

    imagesss?.forEach((file) => { })

    //
  }

  const hendleDelete = () => {
    // deleteProduct
    setShowDelete(false)
    dispatch(adminAction.deleteuser({ id: productID, page: pageNo }))
    // dispatch(adminAction.getRoleList('dhsg'))
    dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
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

  const [roledataUpdate, setroledataUpdate] = useState<any>({})
  const [dataUpdate, setdataUpdate] = useState<any>({})
  const [roledataDoc, setroledataDoc] = useState<any>({})

  const hendleUpdateDoc = (e: any) => {
    const { name, value } = e.target
    setroledataDoc({ ...roledataDoc, [name]: value })
  };

  const hendleChangerole2 = (e: any) => {
    const { name, value } = e.target
    if (name === 'mobile' || name === 'alt_mobile') {
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

  const hendleTosubmit = async () => {
    const data = new FormData()
    data.append('user_id', roleID)
    data.append('gst_number', roledataDoc?.gst_number)
    data.append('pan_number', roledataDoc?.pan_number)
    data.append('aadhar_number', roledataDoc?.aadhar_number)

    data.append('aadhar_doc', imagesad[0]?.file)
    data.append('pan_doc', imagespan[0]?.file)
    // data.append('dl_expire_date', moment(startDate).format('yyyy/MM/DD'))
    data.append('gst_doc', images[0]?.file)

    // data.append('longitude', roledata?.longitude)
    // data.append('address', roledata?.address)
    // data.append('device_id', roledata?.device_id)
    // data.append('device_model', roledata?.device_model)

    await dispatch(adminAction.documents(data, { page: 1, role_id: 8 }))
    await dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
    setImagespan([])
    setImagesad([])
    setImages([])
    setroledataDoc({})
    setaddpermission(false)
  }

  // activeInactive

  const hendleToAcctive = (e: any, active: any) => {
    const data = new FormData()
    data.append('id', e)
    data.append('active', active)
    dispatch(adminAction.activeInactive(data, {}))
    dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
  }

  const hendleEditPage = (e: any) => {
    setShowUpdate(true)
    // const sv: any = moment(e.effectiveDate).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')
    // const sv: any = moment(e.effectiveDate, 'YYYY-MM-DD HH:mm:ss').toDate()

    // setStartDateup(sv)

    setroledataUpdate(e)
    setdataUpdate(e)
    // setcategoryUpPage(e.description)
    // setImagesfe([{data_url: URL.API_BASE_URL + e.image}])
  }

  // updateperentCate

  const hendleSubmitupdateperentCate = () => {
    setLoading(true)
    try {
      const newFrom = Object.keys(roledataUpdate)
        .filter((key) => roledataUpdate[key] !== dataUpdate[key])
        .reduce((acc, key) => ({ ...acc, [key]: roledataUpdate[key] }), {})

      if (Object.keys(newFrom).length === 0) {
        toast.info('Fileds Not Changed')
        return
      }

      if (newFrom) {
        dispatch(adminAction.updateUser({ id: dataUpdate?.id, ...newFrom }))
        dispatch(adminAction.getuserRoleWise({ page: 1, role_id: 8, search }))
      }

      setShowUpdate(false)
      setdataUpdate(null)
      setroledataUpdate(null)
      setLoading(false)
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

  const [imageView, setimageView] = useState(false)
  const [imageList, setimageList] = useState('')

  const onclickView = (e: any) => {
    setimageList(e)
    setimageView(true)
    // setShowView(false)
  }

  const XenComponent = () => {
    // Use React Hooks here
    return (
      <div className='mb-7 text-black fv-row col-3'>
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
    )
  }

  const AenComponent = () => {
    // Use React Hooks here
    return (
      <div className='mb-7 text-black fv-row col-3'>
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
          key={managerKeyAen}
          value={seleceteMangerAen}
          loadOptions={loadOptionsgetManagerAen}
          onChange={setseleceteMangerAen}
          additional={{
            page: 1,
          }}
        />
      </div>
    )
  }

  const JenComponent = () => {
    // Use React Hooks here
    return (
      <div className='mb-7 text-black fv-row col-3'>
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
          key={managerKeyJen}
          value={seleceteMangerJen}
          loadOptions={loadOptionsgetManagerJen}
          onChange={setseleceteMangerJen}
          additional={{
            page: 1,
          }}
        />
      </div>
    )
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
                <Modal.Title>Add Vendor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Circle </span>
                    </label>

                    {/* get_user_profile */}

                    {/* <div className='bg-transparent form-control'>
                      {get_user_profile?.circle?.name}
                    </div> */}

                    {prepix == 'ca' || prepix == 'acen' || prepix == 'scen' ? (
                      <div className='form-control disableb'>{get_user_profile?.circle?.name}</div>
                    ) : (
                      get_user_profile?.circle && (
                        <div className='form-control disableb'>
                          {get_user_profile?.circle?.name}
                        </div>
                      )
                    )}
                  </div>

                  {(seleceteRole?.shortname == 'ca' ||
                    seleceteRole?.shortname == 'acen' ||
                    seleceteRole?.shortname == 'scen') && <XenComponent />}

                  {seleceteRole?.shortname == 'user' ||
                    (seleceteRole?.shortname == 'xen' && (
                      <div className='mb-7 text-black fv-row col-3'>
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

                        {/* <div className='bg-transparent form-control'>
                        {get_user_profile?.xen?.name}
                      </div> */}

                        {prepix == 'xens' ? (
                          <div className='form-control disableb'>
                            {get_user_profile?.profile?.name}
                          </div>
                        ) : get_user_profile?.xen ? (
                          <div className='form-control disableb'>
                            {get_user_profile?.xen?.name}
                          </div>
                        ) : (
                          <AsyncPaginate<any, any, any>
                            key={managerKey}
                            value={seleceteMangerXen}
                            loadOptions={loadOptionsgetManagerXen}
                            onChange={setseleceteMangerXen}
                            additional={{
                              page: 1,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  {(seleceteRole?.shortname == 'ca' ||
                    seleceteRole?.shortname == 'acen' ||
                    seleceteRole?.shortname == 'scen') && <AenComponent />}
                  {(seleceteRole?.shortname == 'ca' ||
                    seleceteRole?.shortname == 'acen' ||
                    seleceteRole?.shortname == 'scen') && <JenComponent />}

                  {seleceteRole?.shortname == 'xen' && <AenComponent />}
                  {seleceteRole?.shortname == 'xen' && <JenComponent />}

                  {seleceteRole?.shortname == 'aen' && <JenComponent />}

                  {seleceteRole?.shortname == 'user' && (
                    <div className='mb-7 text-black fv-row col-3'>
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

                      {/* <div className='bg-transparent form-control'>
                        {get_user_profile?.xen?.name}
                      </div> */}

                      {prepix == 'xens' ? (
                        <div className='form-control disableb'>
                          {get_user_profile?.profile?.name}
                        </div>
                      ) : get_user_profile?.xen ? (
                        <div className='form-control disableb'>
                          {get_user_profile?.xen?.name}
                        </div>
                      ) : (
                        <AsyncPaginate<any, any, any>
                          key={managerKey}
                          value={seleceteMangerXen}
                          loadOptions={loadOptionsgetManagerXen}
                          onChange={setseleceteMangerXen}
                          additional={{
                            page: 1,
                          }}
                        />
                      )}
                    </div>
                  )}
                  {seleceteRole?.shortname == 'user' && (
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

                      {prepix == 'aens' ? (
                        <div className='form-control disableb'>
                          {get_user_profile?.profile?.name}
                        </div>
                      ) : get_user_profile?.aens ? (
                        <div className='form-control disableb'>{get_user_profile?.xen?.name}</div>
                      ) : (
                        <AsyncPaginate<any, any, any>
                          key={managerKey}
                          value={seleceteMangerAen}
                          loadOptions={loadOptionsgetManagerAen}
                          onChange={setseleceteMangerAen}
                          additional={{
                            page: 1,
                          }}
                        />
                      )}
                    </div>
                  )}
                  {seleceteRole?.shortname == 'user' && (
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
                    </div>
                  )}

                  {seleceteRole?.shortname == 'driver' && (
                    <div className='mb-7 fv-row col-3'>
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
                  )}
                  {seleceteRole?.shortname == 'driver' && (
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
                  )}
                  {seleceteRole?.shortname == 'driver' && (
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
                    </div>
                  )}

                  {seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user' ? (
                    ''
                  ) : (
                    <div className='mb-7 fv-row col-3'>
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

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter name'
                      name='name'
                      onChange={(e: any) => {
                        hendleChangerole(e)
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
                      className={clsx('bg-transparent form-control')}
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

                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
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
                    <div className='mb-7 fv-row col-3'>
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
                    <div className='mb-7 fv-row col-3'>
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

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>alt mobile</span>
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
                      placeholder='Enter alt mobile'
                      name='alt_mobile'
                      onChange={(e: any) => {
                        hendleChangerole(e)
                      }}
                      value={roledata?.alt_mobile}
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
              {/* <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>

            <Modal show={addDocVerifyU} onHide={handleCloseDocVerifyU}>
              <Modal.Header closeButton>
                <Modal.Title>Dov Verify</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> docs verified</span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select'
                      name='docs_verified'
                      value={docDetails?.docs_verified}
                      onChange={(e) => {
                        onChageDocD(e)
                      }}
                    >
                      <option value={''}>Select</option>
                      <option value={'Pending'}>Pending</option>
                      <option value={'Verify'}>Verify</option>
                      <option value={'Reject'}>Reject</option>
                    </select>
                  </div>
                </div>

                {docDetails?.docs_verified == 'Reject' && (
                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>reject message</span>
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
                      placeholder='Enter reject message'
                      name='reject_message'
                      value={docDetails?.reject_message}
                      onChange={(e: any) => {
                        onChageDocD(e)
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

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseDocVerifyU}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleSubmitDocVerify()
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
            <Modal show={showUpdate} dialogClassName='modal-90w' onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>update Vendor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter name'
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
                      value={roledataUpdate?.mobile}
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

                  {(seleceteRole?.shortname == 'driver' ||
                    seleceteRole?.shortname == 'vendor' ||
                    seleceteRole?.shortname == 'user') && (
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

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>alt mobile</span>
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
                      placeholder='Enter alt mobile'
                      name='alt_mobile'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={roledataUpdate?.alt_mobile}
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
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
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
                        <span className='ms-2 spinner-border spinner-border-sm align-middle'></span>
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
                <Modal.Title>Doc Upload</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}

                <div className='mb-10'>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Aadhar Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagesad}
                      onChange={onChangead}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>aadhar number </span>
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
                      placeholder='Enter aadhar number'
                      name='aadhar_number'
                      onChange={(e: any) => {
                        const { name, value } = e.target;
                        const aadharRegex = /^\d{0,12}$/;
                        if (aadharRegex.test(value)) {
                          console.log("value ==> ", value);
                          hendleUpdateDoc({ target: { name, value } });
                        }
                        // hendleUpdateDoc(e)
                      }}
                      value={roledataDoc?.aadhar_number || ""}
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

                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Pan Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagespan}
                      onChange={onChangepan}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Pan number</span>
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
                      placeholder='Enter pan number'
                      name='pan_number'
                      onChange={(e: any) => {
                        hendleUpdateDoc(e)
                      }}
                      value={roledataDoc?.pan_number}
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
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>gst Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> gst number</span>
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
                      placeholder='Enter gst number'
                      name='gst_number'
                      onChange={(e: any) => {
                        hendleUpdateDoc(e)
                      }}
                      value={roledataDoc?.dl_number}
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

                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseaddpermission}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleTosubmit()
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

            {/* update doc */}
            <Modal show={addpermissionUpdate} onHide={handleCloseaddpermissionUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Doc Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}

                <div className='mb-10'>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Aadhar Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagesadUpdate}
                      onChange={onChangeadUpdate}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>aadhar number </span>
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
                      placeholder='Enter aadhar number'
                      name='aadhar_number'
                      onChange={(e: any) => {
                        const { name, value } = e.target;
                        const aadharRegex = /^\d{0,12}$/;
                        if (aadharRegex.test(value)) {
                          hendleUpdateDocUpdate({ target: { name, value } });
                        }
                      }}
                      value={updateDoc?.aadhar_number || ""}
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

                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Pan Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagespanUpdate}
                      onChange={onChangepanUpdate}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Pan number</span>
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
                      placeholder='Enter pan number'
                      name='pan_number'
                      onChange={(e: any) => {
                        hendleUpdateDocUpdate(e)
                      }}
                      value={updateDoc?.pan_number}
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
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>gst Image</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <ImageUploading
                      multiple
                      value={imagesUpdate}
                      onChange={onChangeUpdate}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
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
                            style={isDragging ? { color: 'red' } : {}}
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
                  </div>
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> gst number</span>
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
                      placeholder='Enter gst number'
                      name='gst_number'
                      onChange={(e: any) => {
                        hendleUpdateDocUpdate(e)
                      }}
                      value={updateDoc?.gst_number}
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

                  {/* <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>effectiveDate</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <DatePicker
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
                      selected={startDateup}
                      onChange={(date: any) => setStartDateup(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                  </div> */}
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseaddpermissionUpdate}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleTosubmitUpdate()
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
                <Modal.Title id='example-custom-modal-styling-title'>Vendor Details</Modal.Title>
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
                        <div className='current' data-kt-stepper-element='nav'>
                          {/* begin::Wrapper*/}
                          <div className=''>
                            <div className='stepper-label row'>
                              <div className='col-6'>
                                <h3 className='stepper-title'>Address</h3>
                              </div>

                              <div className='stepper-desc col-6'>{get_users_details?.address}</div>
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
                      <div className='ps-lg-10'>
                        <div className='current' data-kt-stepper-element='nav'>
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
                  </div>
                  <hr />
                  <h2>Doc</h2>
                  <div
                    // ref={stepperRef}
                    className='flex-row-fluid flex-column flex-xl-row stepper stepper-pills stepper-column row'
                    id='kt_modal_create_app_stepper'
                  >
                    <div className='col-3'>
                      <h3>aadhar number</h3>
                    </div>
                    <div className='col-3'>
                      <p>{get_users_details?.documents?.aadhar_number}</p>
                    </div>

                    <div className='col-3'>
                      <h3>aadhar number</h3>
                    </div>
                    <div className='col-3'>
                      {/* <p>{get_users_details?.documents?.aadhar_number}</p> */}

                      <div
                        style={{ width: '100px' }}
                        onClick={(e) => {
                          onclickView(URL.API_BASE_URL + get_users_details?.documents?.aadhar_doc)
                        }}
                      >
                        <img
                          style={{ width: '100%' }}
                          src={URL.API_BASE_URL + get_users_details?.documents?.aadhar_doc}
                          alt=''
                        />
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3>gst number</h3>

                      {/* &raquo; */}
                    </div>
                    <div className='col-3'>
                      <p>{get_users_details?.documents?.gst_number}</p>
                    </div>

                    <div className='col-3'>
                      <h3>gst doc</h3>
                    </div>
                    <div className='col-3'>
                      {/* <p>{get_users_details?.documents?.aadhar_number}</p> */}

                      <div
                        style={{ width: '100px' }}
                        onClick={(e) => {
                          onclickView(URL.API_BASE_URL + get_users_details?.documents?.gst_doc)
                        }}
                      >
                        <img
                          style={{ width: '100%' }}
                          src={URL.API_BASE_URL + get_users_details?.documents?.gst_doc}
                          alt=''
                        />
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3>pan number</h3>
                    </div>
                    <div className='col-3'>
                      <p>{get_users_details?.documents?.pan_number}</p>
                    </div>

                    <div className='col-3'>
                      <h3>pan number</h3>
                    </div>
                    <div className='col-3'>
                      {/* <p>{get_users_details?.documents?.aadhar_number}</p> */}

                      <div
                        style={{ width: '100px' }}
                        onClick={(e) => {
                          onclickView(URL.API_BASE_URL + get_users_details?.documents?.pan_doc)
                        }}
                      >
                        <img
                          style={{ width: '100%' }}
                          src={URL.API_BASE_URL + get_users_details?.documents?.pan_doc}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3>docs verified</h3>
                    </div>
                    <div className='col-3'>
                      <p>{get_users_details?.documents?.docs_verified}</p>
                    </div>

                    <div className='col-3'>
                      <h3>reject message</h3>
                    </div>
                    {get_users_details?.documents?.docs_verified == 'Reject' && (
                      <div className='col-3'>
                        <p>{get_users_details?.documents?.reject_message}</p>
                      </div>
                    )}
                  </div>

                  {/* end::Stepper */}
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={imageView}
              onHide={() => setimageView(false)}
            // dialogClassName='modal-90w'
            // aria-labelledby='example-custom-modal-styling-title'
            >
              <Modal.Header closeButton></Modal.Header>

              <img src={imageList} alt='' />
            </Modal>

            <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
              <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
                Vendor
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

                <li className='breadcrumb-item text-muted'>Vendor</li>
              </ul>
            </div>

            <div className='d-flex align-items-center gap-2 gap-lg-3'>
              <div className='m-0'></div>
            </div>
          </div>
        </div>

        <div id='kt_app_content' className='flex-column-fluid app-content'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush'>
              <div className='mt-6 card-header'>
                <div className='card-title'>
                  <div className='position-relative d-flex align-items-center my-1 me-5'></div>
                  <div className='position-relative d-flex align-items-center my-1 me-5'></div>
                </div>

                <div
                  className='card-toolbar'
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Input
                    placeholder='input search '
                    className='mt-3'
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 200, padding: 10 }}
                  />
                  <button type='button' className='btn btn-light-primary' onClick={handleShow}>
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
                    Add Vendor
                  </button>
                </div>
              </div>

              <div className='pt-0 card-body'>
                <table
                  className='table table-row-dashed mb-0 align-middle fs-6 gy-5'
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
                          <td>{soNo}</td>

                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.mobile}</td>
                          <td>{data?.uid}</td>

                          <td>
                            {' '}
                            <button
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
                            </button>
                          </td>
                          <td>
                            {data?.documents?.docs_verified
                              ? data?.documents?.docs_verified
                              : 'doc not uploaded'}
                          </td>

                          <td style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleEditPage(data)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-edit'></i>
                            </button> */}

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
                            {data?.documents?.docs_verified ? (
                              <button
                                data-id='2209'
                                onClick={() => {
                                  hendleToaddPerUpdate(data?.documents)
                                }}
                                className='ms-3 btn btn-sm btn-success'
                              >
                                Update Doc
                                {/* <i className='fa-trash-alt fas'></i> */}
                              </button>
                            ) : (
                              <button
                                data-id='2209'
                                onClick={() => {
                                  hendleToaddPer(data?.id)
                                }}
                                className='ms-3 btn btn-sm btn-success'
                              >
                                Add Docc
                                {/* <i className='fa-trash-alt fas'></i> */}
                              </button>
                            )}
                            {data?.documents?.docs_verified !== 'Verify' && data?.documents ? (
                              <button
                                data-id='2209'
                                onClick={() => {
                                  hendledocVerify(data?.documents)
                                }}
                                className='ms-3 btn btn-sm btn-success'
                              >
                                Doc verify
                                {/* <i className='fa-trash-alt fas'></i> */}
                              </button>
                            ) : (
                              ''
                            )}
                          </td>
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
                </table>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vendor

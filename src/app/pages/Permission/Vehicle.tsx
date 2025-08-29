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

import DatePicker from 'react-datepicker'

import { AsyncPaginate } from 'react-select-async-paginate'

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

function Vehicle() {
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
  const [showassign, setShowassign] = useState(false)

  const [addpermission, setaddpermission] = useState(false)
  const [showDelelt, setShowDelete] = useState(false)

  // date
  const [startDate, setStartDate] = useState(new Date())
  const [reg_cirtifiacte_expire_date, setreg_cirtifiacte_expire_date] = useState(new Date())
  const [puc_expire_date, setpuc_expire_date] = useState(new Date())
  const [insurance_expire_date, setinsurance_expire_date] = useState(new Date())

  const [reg_cirtifiacte_expire_date_up, setreg_cirtifiacte_expire_date_up] = useState(new Date())
  const [puc_expire_date_up, setpuc_expire_date_up] = useState(new Date())
  const [insurance_expire_date_up, setinsurance_expire_date_up] = useState(new Date())
  const [startDateup, setStartDateup] = useState(new Date())

  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleClose = () => setShow(false)

  const handleCloseassign = () => setShowassign(false)

  const [showUpdatevs, setShowUpdatevs] = useState(false)
  const handleCloseUpdatevs = () => setShowUpdatevs(false)
  //   const handleClose = () => setShow(false)

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
  const [imagespuc_photo, setImagespuc_photo] = React.useState<any>([])
  const [imagesinsurance_photo, setImagesinsurance_photo] = React.useState<any>([])
  const [imagesUpdate, setImagesUpdate] = React.useState<any>([])
  const [imagespuc_photoUpdate, setImagespuc_photoUpdate] = React.useState<any>([])
  const [imagesinsurance_photoUpdate, setImagesinsurance_photoUpdate] = React.useState<any>([])

  const maxNumber = 1


  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImages(imageList)
  }

  const onChangepuc_photo = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagespuc_photo(imageList)
  }
  const onChangeinsurance_photo = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesinsurance_photo(imageList)
  }

  const onChangeUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesUpdate(imageList)
  }

  const onChangepuc_photoUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagespuc_photoUpdate(imageList)
  }
  const onChangeinsurance_photoUpdate = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesinsurance_photoUpdate(imageList)
  }

  const [imagesss, setImagesss] = React.useState([])
  const maxNumberss = 8

  const onChangess = (imageList: any, addUpdateIndex: any) => {
    // data for submit

    setImagesss(imageList)
  }

  const cercle_list: any[] = useSelector((state: any) =>
    state.admin.cercle_list ? state.admin.cercle_list : []
  )
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
    state.admin.vehicle_list ? state.admin.vehicle_list : {}
  )
  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )
  const vehicle_details: any = useSelector((state: any) =>
    state.admin.vehicle_details ? state.admin.vehicle_details : {}
  )

  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  )

  // console.log('get_user_profile', get_user_profile);

  const token: any = localStorage.getItem('kt-auth-react-v')

  const prepix: any = JSON.parse(token)?.data?.prefix

  const criId = get_user_profile?.circle?.id

  const ITEMS_PER_PAGE = 10

  const hendleToaddPer = (e: any) => {
    setroleID(e)
    setaddpermission(true)
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
    { name: 'Vehicle  Name', field: 'vehicle_name', sortable: true },
    { name: 'vehicle model', field: 'vehicle_model', sortable: false },
    { name: 'Model year', field: 'model_year', sortable: false },
    // {name: 'remark', field: 'remark', sortable: true},
    { name: 'Registration Number', field: 'registration_number', sortable: false },
    { name: 'Document', field: 'document', sortable: false },
    { name: 'Status', field: 'active', sortable: false },
    // {name: 'Vendor', field: 'vendor', sortable: true},
    // {name: 'user_type', field: 'user_type', sortable: true},
    // {name: 'active', field: 'active', sortable: true},
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
    // dispatch(adminAction.all_vehicles(data))

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
    const myObject = get_role_list.find((obj) => obj.id == e)

    // get_role_list

    setseleceteRole(myObject)
  }

  const [aboutPage, setaboutPage] = useState<any>('')

  const hendleSubmitCreate = async () => {
    // setLoading(true)
    try {
      // seleceteRole?.shortname == 'driver' ||
      // seleceteRole?.shortname == 'vendor' ||
      // seleceteRole?.shortname == 'user'
      const token: any = localStorage.getItem('kt-auth-react-v')

      console.log(token)

      const data = new FormData()

      if (!roledata?.vehicle_name) {
        toast.error('please enter vehicle name')
      } else if (!roledata?.vehicle_model) {
        toast.error('please enter vehicle model ')
      } else if (!roledata?.registration_number) {
        toast.error('please enter registration number')
      } else if (!roledata?.remark) {
        toast.error('please enter remark')
      } /*  else if (!roledata?.circle_id) {
        toast.error('please select circle ')
      }  */ else if (!roledata?.model_year) {
        toast.error('please enter model year')
      } else {
        data.append('vehicle_name', roledata?.vehicle_name)
        //   data.append('role_id', seleceteRole?.id)
        data.append('vehicle_model', roledata?.vehicle_model)
        data.append('registration_number', roledata?.registration_number)
        data.append('remark', roledata?.remark)
        data.append('circle_id', criId)
        data.append('xen_id', seleceteMangerXen?.id)
        data.append('aen_id', seleceteMangerAen?.id)
        data.append('jen_id', seleceteMangerJen?.id)
        data.append('model_year', roledata?.model_year)
        //   data.append('latitude', roledata?.latitude)
        //   data.append('longitude', roledata?.longitude)
        //   data.append('address', roledata?.address)

        await dispatch(adminAction.create_vehicle(data))
        setShow(false)
        setLoading(false)
        dispatch(adminAction.all_vehicles({ pageNo, search }))
        setseleceteMangerXen(null)
        setseleceteMangerAen(null)
        setseleceteMangerJen(null)
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
    // dispatch(adminAction.all_vehicles(1))
    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    dispatch(adminAction.userprofile(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  useEffect(() => {
    dispatch(adminAction.all_vehicles({ pageNo, search }))
  }, [pageNo, search])

  const [seleceteMangerXen, setseleceteMangerXen] = useState<any>({})
  const [seleceteMangerAen, setseleceteMangerAen] = useState<any>({})
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({})
  const [selectedVendor, setSelectedVendor] = useState<any>({})

  const [managerKey, setManagerKey] = useState<any>(0)
  const [managerKeyAen, setManagerKeyAen] = useState<any>(0)
  const [managerKeyJen, setManagerKeyJen] = useState<any>(0)

  useEffect(() => {
    hendleChangeroleSelect(get_user_profile?.profile?.role_id)
    setTimeout(() => {
      // hendleChangeroleSelect('8')

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
      if (seleceteRole?.shortname == 'vendor') {
        setseleceteMangerXen(get_user_profile?.xen);
        setseleceteMangerAen(get_user_profile?.aen);
        setseleceteMangerJen(get_user_profile?.jen)
      }
    }, 1000)
  }, [get_role_list, get_user_profile]);

  useEffect(() => {
    setTimeout(() => {
      // hendleChangeroleSelect('8')

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
      if (seleceteRole?.shortname == 'vendor') {
        setseleceteMangerXen(get_user_profile?.xen)
        setseleceteMangerAen(get_user_profile?.aen)
        setseleceteMangerJen(get_user_profile?.jen)

      }
    }, 1000)
  }, [seleceteRole])

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

  const hendlerolewise = (e: any) => {
    if (e) {
      setpageNo(1)
      // page=${data?.page}&role_id=${data?.role_id}
      dispatch(adminAction.getuserRoleWise({ page: 1, role_id: e }))
    } else {
      dispatch(adminAction.all_vehicles(1))
    }
  }

  const hendleCreateProduct = () => {
    const data = new FormData()
    imagesss?.forEach((file) => { })
  }

  const hendleDelete = () => {
    // deleteProduct
    setShowDelete(false)
    const data = new FormData()
    data.append('vehicle_id', productID)
    dispatch(adminAction.vehicle_delete(data, pageNo))
    dispatch(adminAction.all_vehicles({ pageNo, search }))
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

  const [VecileId, setVecileId] = useState('')
  const [VecileDocu, setVecileDocu] = useState<any>({})

  const hendleEditPage = (e: any) => {
    setShowUpdate(true)
    setVecileId(e?.id)
  }
  const hendleEditPageUpdate = (e: any) => {
    setShowUpdatevs(true)

    const reg_cirtifiacte_expire_date_set: any = moment(
      e.document?.reg_cirtifiacte_expire_date,
      'DD-MM-YYYY HH:mm:ss'
    ).toDate()
    const puc_expire_date_set: any = moment(
      e.document?.puc_expire_date,
      'DD-MM-YYYY HH:mm:ss'
    ).toDate()
    const insurance_expire_date_set: any = moment(
      e.document?.insurance_expire_date,
      'DD-MM-YYYY HH:mm:ss'
    ).toDate()

    setreg_cirtifiacte_expire_date_up(reg_cirtifiacte_expire_date_set)
    setpuc_expire_date_up(puc_expire_date_set)
    setinsurance_expire_date_up(insurance_expire_date_set)

    const insD = e.document?.insurance_photo
    const pubD = e.document?.puc_photo

    const regD = e.document?.reg_cirtifiacte_photo

    setImagesinsurance_photoUpdate([{ data_url: URL.API_BASE_URL + insD }])
    setImagespuc_photoUpdate([{ data_url: URL.API_BASE_URL + pubD }])
    setImagesUpdate([{ data_url: URL.API_BASE_URL + regD }])

    setVecileDocu({
      id: e?.id,
      reg_cirtifiacte_number: e?.document?.reg_cirtifiacte_number,
      puc_number: e?.document?.puc_number,
      insurance_number: e?.document?.insurance_number,
    })
  }

  // updateperentCate

  //   images
  //   imagespuc_photo
  //   imagesinsurance_photo

  const hendleSubmitupdateperentCate = () => {
    setLoading(true)
    try {
      const data = new FormData()

      if (!roledataUpdate?.reg_cirtifiacte_number) {
        toast.error('please enter  vehicle id')
      } else if (!roledataUpdate?.puc_number) {
        toast.error('please enter puc number')
      } else if (!roledataUpdate?.insurance_number) {
        toast.error('please enter insurance number')
      } else if (images?.length == 0) {
        toast.error('please select reg cirtifiacte photo')
      } else if (imagespuc_photo?.length == 0) {
        toast.error('please select  puc photo')
      } else if (images?.length == 0) {
        toast.error('please select  insurance photo')
      } else {
        // insurance_expire_date
        // puc_expire_date
        // reg_cirtifiacte_expire_date

        if (images[0]?.file) {
          // roledata?.role_name
          data.append('reg_cirtifiacte_photo', images[0]?.file)
        }
        if (imagespuc_photo[0]?.file) {
          // roledata?.role_name
          data.append('puc_photo', imagespuc_photo[0]?.file)
        }
        if (imagesinsurance_photo[0]?.file) {
          // roledata?.role_name
          data.append('insurance_photo', imagesinsurance_photo[0]?.file)
        }

        data.append('reg_cirtifiacte_number', roledataUpdate?.reg_cirtifiacte_number)
        data.append('vehicle_id', VecileId)
        // data.append('description', categoryUpPage)
        data.append('puc_number', roledataUpdate?.puc_number)
        data.append('insurance_number', roledataUpdate?.insurance_number)

        data.append(
          'reg_cirtifiacte_expire_date',
          moment(reg_cirtifiacte_expire_date).format('DD/MM/yyyy')
        )
        data.append('puc_expire_date', moment(puc_expire_date).format('DD/MM/yyyy'))
        data.append('insurance_expire_date', moment(insurance_expire_date).format('DD/MM/yyyy'))

        roledataUpdate.reg_cirtifiacte_expire_date = moment(reg_cirtifiacte_expire_date).format(
          'DD/MM/yyyy'
        )
        roledataUpdate.puc_expire_date = moment(puc_expire_date).format('DD/MM/yyyy')
        roledataUpdate.insurance_expire_date = moment(insurance_expire_date).format('DD/MM/yyyy')

        dispatch(adminAction.add_vehicle_doc(data, pageNo))
        setShowUpdate(false)
        setLoading(false)
        dispatch(adminAction.all_vehicles({ pageNo, search }))
      }
      // setCurrentUser(user)
    } catch (error) {
      // console.error(error)
      // saveAuth(undefined)
      // setStatus('The login details are incorrect')
      // setSubmitting(false)
      // setLoading(false)
    }
  }
  const hendleSubmitupdateperentCate24 = () => {
    setLoading(true)
    try {
      const data = new FormData()

      if (!VecileDocu?.reg_cirtifiacte_number) {
        toast.error('please enter  vehicle id')
      } else if (!VecileDocu?.puc_number) {
        toast.error('please enter puc number')
      } else if (!VecileDocu?.insurance_number) {
        toast.error('please enter insurance number')
      } else {
        // insurance_expire_date
        // puc_expire_date
        // reg_cirtifiacte_expire_date

        if (imagesUpdate[0]?.file) {
          // roledata?.role_name
          data.append('reg_cirtifiacte_photo', imagesUpdate[0]?.file)
        }
        if (imagespuc_photoUpdate[0]?.file) {
          // roledata?.role_name
          data.append('puc_photo', imagespuc_photoUpdate[0]?.file)
        }
        if (imagesinsurance_photoUpdate[0]?.file) {
          // roledata?.role_name
          data.append('insurance_photo', imagesinsurance_photoUpdate[0]?.file)
        }

        data.append('reg_cirtifiacte_number', VecileDocu?.reg_cirtifiacte_number)
        data.append('vehicle_id', VecileDocu?.id)
        // data.append('description', categoryUpPage)
        data.append('puc_number', VecileDocu?.puc_number)
        data.append('insurance_number', VecileDocu?.insurance_number)

        data.append(
          'reg_cirtifiacte_expire_date',
          moment(reg_cirtifiacte_expire_date_up).format('DD/MM/yyyy')
        )
        data.append('puc_expire_date', moment(puc_expire_date_up).format('DD/MM/yyyy'))
        data.append('insurance_expire_date', moment(insurance_expire_date_up).format('DD/MM/yyyy'))

        roledataUpdate.reg_cirtifiacte_expire_date = moment(reg_cirtifiacte_expire_date).format(
          'DD/MM/yyyy'
        )
        roledataUpdate.puc_expire_date = moment(puc_expire_date).format('DD/MM/yyyy')
        roledataUpdate.insurance_expire_date = moment(insurance_expire_date).format('DD/MM/yyyy')

        dispatch(adminAction.update_vehicle_doc(data, pageNo))
        setShowUpdatevs(false)
        setLoading(false)
        dispatch(adminAction.all_vehicles({ pageNo, search }))
      }
      // setCurrentUser(user)
    } catch (error) {
      // console.error(error)
      // saveAuth(undefined)
      // setStatus('The login details are incorrect')
      // setSubmitting(false)
      // setLoading(false)
    }
  }

  const [showView, setShowView] = useState(false)

  const hendleuserView = (e: any) => {
    setShowView(true)
    dispatch(adminAction.vehicleDetail({ vehicle_id: e }))
  }

  useEffect(() => {
    dispatch(adminAction.circleList({}))
    return () => { }
  }, [])

  // cercle_list

  // setShowassign

  const [vicle, setvicle] = useState('')
  const [cecleId, setcecleId] = useState<any>('')
  const hendleChangeassign = (e: any) => {
    setShowassign(true)
    setvicle(e?.id)
    console.log(e)
    setcecleId(e?.circle_id)
  }

  const [valueVendor, setValueVendor] = useState<any>({})

  const loadOptionsRole = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate

    const response = await fetch(
      URL.API_BASE_URL + `/api/getAllVendor?search=${search}&page=${page}&circle_id=${cecleId}`,
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

  const hendleAssignVendor = () => {
    const data = new FormData()
    data.append('vehicle_id', vicle)
    data.append('circle_id', cecleId)
    data.append('vendor_id', valueVendor?.id)
    //   data.append('latitude', roledata?.latitude)
    //   data.append('longitude', roledata?.longitude)
    //   data.append('address', roledata?.address)

    setShowassign(false)
    dispatch(adminAction.assign_vehicle_vendor(data, pageNo))
    dispatch(adminAction.all_vehicles({ pageNo, search }))
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
      {/* <div className='flex-row-fluid flex-column app-main' id='kt_app_main'> */}
      {/* <!--begin::Content wrapper-->  */}
      <div className='d-flex flex-column flex-column-fluid'>
        {/* <!--begin::Toolbar-->  */}
        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
          {/* <!--begin::Toolbar container-->  */}
          <div
            id='kt_app_toolbar_container'
            className='d-flex flex-stack app-container container-xxl'
          >
            <Modal show={show} dialogClassName='modal-90w' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Vehiclerr</Modal.Title>
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

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Vehicle Name</span>
                    </label>
                    <input
                      // className='form-control form-control-solid'
                      placeholder='Enter a  vehicle name'
                      name='vehicle_name'
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
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>vehicle model</span>
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
                      placeholder='Enter vehicle_model'
                      name='vehicle_model'
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
                      <span className='required'>registration number</span>
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
                      placeholder='Enter registration number'
                      name='registration_number'
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
                      <span className='required'>model year</span>
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
                      placeholder='Enter model year'
                      name='model_year'
                      type={'number'}
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
                      <option value={''}>Select Circle</option>
                     
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

            {/* update */}
            <Modal show={showUpdate} dialogClassName='modal-90w' onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Add Document </Modal.Title>
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
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> reg cirtifiacte number</span>
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
                      placeholder='Enter a  reg cirtifiacte number'
                      name='reg_cirtifiacte_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={roledataUpdate?.reg_cirtifiacte_number}
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
                      <span className='required'>reg cirtifiacte expire date</span>
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
                      selected={reg_cirtifiacte_expire_date}
                      onChange={(date: any) => setreg_cirtifiacte_expire_date(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>reg cirtifiacte photo</span>
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
                    //   acceptType={['jpg']}
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

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>puc number</span>
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
                      placeholder='Enter puc number'
                      name='puc_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={roledataUpdate?.puc_number}
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
                      <span className='required'>puc expire date</span>
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
                      selected={puc_expire_date}
                      onChange={(date: any) => setpuc_expire_date(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>puc photo</span>
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
                      value={imagespuc_photo}
                      onChange={onChangepuc_photo}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
                    //   acceptType={['jpg']}
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

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>insurance number</span>
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
                      placeholder='Enter insurance number'
                      name='insurance_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={roledataUpdate?.insurance_number}
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
                      <span className='required'>insurance expire date</span>
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
                      selected={insurance_expire_date}
                      onChange={(date: any) => setinsurance_expire_date(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>insurance photo</span>
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
                      value={imagesinsurance_photo}
                      onChange={onChangeinsurance_photo}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
                    //   acceptType={['jpg']}
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

                  {/* <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>city</span>
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
                      placeholder='Enter city'
                      name='city'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={roledataUpdate?.city}
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
                  </div> */}
                </div>

                {/* <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Category</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
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
                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Seller</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
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

                  <div className='mb-7 fv-row'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Image</span>
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

            {/* update ddoc */}
            <Modal show={showUpdatevs} dialogClassName='modal-90w' onHide={handleCloseUpdatevs}>
              <Modal.Header closeButton>
                <Modal.Title>Update Document </Modal.Title>
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
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> reg cirtifiacte number</span>
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
                      placeholder='Enter a  reg cirtifiacte number'
                      name='reg_cirtifiacte_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={VecileDocu?.reg_cirtifiacte_number}
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
                      <span className='required'>reg cirtifiacte expire date</span>
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
                      selected={reg_cirtifiacte_expire_date_up}
                      onChange={(date: any) => setreg_cirtifiacte_expire_date_up(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>reg cirtifiacte photo</span>
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
                    //   acceptType={['jpg']}
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
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button
                              className='btn btn-secondary'
                              style={isDragging ? { color: 'red' } : {}}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Choose image
                            </button>
                          )}
                          &nbsp;
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button className='btn btn-secondary' onClick={onImageRemoveAll}>
                              Remove all images
                            </button>
                          )}
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

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>puc number</span>
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
                      placeholder='Enter puc number'
                      name='puc_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={VecileDocu?.puc_number}
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
                      <span className='required'>puc expire date</span>
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
                      selected={puc_expire_date_up}
                      onChange={(date: any) => setpuc_expire_date_up(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>puc photo</span>
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
                      value={imagespuc_photoUpdate}
                      onChange={onChangepuc_photoUpdate}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
                    //   acceptType={['jpg']}
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
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button
                              className='btn btn-secondary'
                              style={isDragging ? { color: 'red' } : {}}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Choose image
                            </button>
                          )}
                          &nbsp;
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button className='btn btn-secondary' onClick={onImageRemoveAll}>
                              Remove all images
                            </button>
                          )}
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

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>insurance number</span>
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
                      placeholder='Enter insurance number'
                      name='insurance_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={VecileDocu?.insurance_number}
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
                      <span className='required'>puc expire date</span>
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
                      selected={insurance_expire_date_up}
                      onChange={(date: any) => setinsurance_expire_date_up(date)}
                      dateFormat='dd/MM/yyyy'
                    />
                    {/* <input
                
                    placeholder='Enter effectiveDate'
                    name='effectiveDate'
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
                  /> */}
                    {formik.touched.role_description && formik.errors.role_description && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.role_description}</span>
                      </div>
                    )}
                  </div>

                  <div className='mb-7 fv-row col-12'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>insurance photo</span>
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
                      value={imagesinsurance_photoUpdate}
                      onChange={onChangeinsurance_photoUpdate}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
                    //   acceptType={['jpg']}
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
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button
                              className='btn btn-secondary'
                              style={isDragging ? { color: 'red' } : {}}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Choose image
                            </button>
                          )}
                          &nbsp;
                          {imageList?.length > 0 ? (
                            ''
                          ) : (
                            <button className='btn btn-secondary' onClick={onImageRemoveAll}>
                              Remove all images
                            </button>
                          )}
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
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseUpdatevs}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleSubmitupdateperentCate24()
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
                <Modal.Title id='example-custom-modal-styling-title'> Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='px-lg-10 py-lg-10 modal-body'>
                  <div className='row'>
                    <div className='col-3'>
                      <h3 className='stepper-title'>vehicle name</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>{vehicle_details?.vehicle_name}</div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>vehicle model</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>{vehicle_details?.vehicle_model}</div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>registration number</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.registration_number}
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>model year</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>{vehicle_details?.model_year}</div>
                    </div>
                  </div>

                  <hr />
                  <h3>Document</h3>
                  <div className='row'>
                    <div className='col-3'>
                      <h3 className='stepper-title'>insurance number</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.insurance_number}
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>insurance photo</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        <div style={{ width: '100px' }}>
                          <img
                            style={{ width: '100%' }}
                            src={URL.API_BASE_URL + vehicle_details?.documents?.insurance_photo}
                            alt=''
                          />
                        </div>
                        {/* {vehicle_details?.documents?.insurance_expire_date} */}
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3 className='stepper-title'>insurance expire date</h3>
                    </div>
                    <div className='col-9'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.insurance_expire_date}
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3 className='stepper-title'>puc number</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.puc_number}
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>puc photo</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        <div style={{ width: '100px' }}>
                          <img
                            style={{ width: '100%' }}
                            src={URL.API_BASE_URL + vehicle_details?.documents?.puc_photo}
                            alt=''
                          />
                        </div>
                        {/* {vehicle_details?.documents?.insurance_expire_date} */}
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3 className='stepper-title'>puc expire date</h3>
                    </div>
                    <div className='col-9'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.puc_expire_date}
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>reg cirtifiacte number</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.reg_cirtifiacte_number}
                      </div>
                    </div>
                    <div className='col-3'>
                      <h3 className='stepper-title'>reg cirtifiacte photo</h3>
                    </div>
                    <div className='col-3'>
                      <div className='stepper-desc col-6'>
                        <div style={{ width: '100px' }}>
                          <img
                            style={{ width: '100%' }}
                            src={
                              URL.API_BASE_URL + vehicle_details?.documents?.reg_cirtifiacte_photo
                            }
                            alt=''
                          />
                        </div>
                        {/* {vehicle_details?.documents?.insurance_expire_date} */}
                      </div>
                    </div>

                    <div className='col-3'>
                      <h3 className='stepper-title'>reg cirtifiacte expire date</h3>
                    </div>
                    <div className='col-9'>
                      <div className='stepper-desc col-6'>
                        {vehicle_details?.documents?.reg_cirtifiacte_expire_date}
                      </div>
                    </div>
                  </div>

                  <hr />
                  <h3>Vendor</h3>
                  <div className='row'>
                    {vehicle_details?.vehiclevendor &&
                      vehicle_details?.vehiclevendor?.map((data: any, i: any) => {
                        return (
                          <div className='col-6' key={i}>
                            <div className='row'>
                              <div className='col-6'>
                                {' '}
                                <h3 className='stepper-title'>vendor name</h3>
                              </div>
                              <div className='col-6'>{data?.vendor_id?.name}</div>
                              <div className='col-6'>
                                {' '}
                                <h3 className='stepper-title'>jen name</h3>
                              </div>
                              <div className='col-6'>{data?.jen_id?.name}</div>
                              <div className='col-6'>
                                {' '}
                                <h3 className='stepper-title'>aen name</h3>
                              </div>
                              <div className='col-6'>{data?.aen_id?.name}</div>
                              <div className='col-6'>
                                {' '}
                                <h3 className='stepper-title'>xen name</h3>
                              </div>
                              <div className='col-6'>{data?.xen_id?.name}</div>
                              <div className='col-6'>
                                {' '}
                                <h3 className='stepper-title'>circle name</h3>
                              </div>
                              <div className='col-6'>{data?.circle_id?.name}</div>
                            </div>
                          </div>
                        )
                      })}

                    {/* <div className='col-6'>
                      <div className='stepper-desc col-6'>{vehicle_details?.vehicle_name}</div>
                    </div> */}
                  </div>
                  {/* end::Stepper */}
                </div>
              </Modal.Body>
            </Modal>

            {/* assign vendor  */}

            <Modal show={showassign} dialogClassName='modal-90w' onHide={handleCloseassign}>
              <Modal.Header closeButton>
                <Modal.Title>assign vendor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Circle </span>
                    </label>
                    <select
                      className='bg-transparent form-control'
                      aria-label='Select example'
                      name='circle_id'
                      value={cecleId}
                      disabled
                    // onChange={(e) => {
                    //   setcecleId(e?.target?.value)
                    // }}
                    >
                      <option value={''}>Select Circle</option>
                      {/* <option value={''}>All</option> */}
                      {/* <option>Admin</option>
                      <option>Sub Admin</option> */}
                      {/* <option>Select Role</option> */}
                      {get_all_cricle &&
                        get_all_cricle?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.name}
                            </option>
                          )
                        })}
                      {/* <option value='0'>No</option> */}
                    </select>
                  </div>

                  <div className='mb-7 fv-row col-6'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select user</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <AsyncPaginate<any, any, any>
                      value={valueVendor}
                      loadOptions={loadOptionsRole}
                      onChange={setValueVendor}
                      additional={{
                        page: 1,
                      }}
                    />
                  </div>
                </div>

                <div className='pt-15 text-center'>
                  <button
                    type='reset'
                    className='me-3 btn btn-light'
                    data-kt-permissions-modal-action='cancel'
                    onClick={handleCloseassign}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-permissions-modal-action='submit'
                    onClick={() => {
                      hendleAssignVendor()
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

            {/* <!--begin::Page title-->  */}
            <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
              {/* <!--begin::Title-->  */}
              <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
                Vehicle
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
                <li className='breadcrumb-item text-muted'>Vehicle</li>
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
                  {/* <!--begin::Button-->  */}
                  <button
                    type='button'
                    className='btn btn-light-primary'
                    // data-bs-toggle='modal'
                    // data-bs-target='#kt_modal_add_permission'
                    onClick={handleShow}
                  >
                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen035.svg-->  */}
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
                    {/* <!--end::Svg Icon-->  */}Add Vehicle
                  </button>
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
                          <td>{data?.vehicle_name}</td>
                          <td>{data?.vehicle_model}</td>
                          <td>{data?.model_year}</td>
                          <td>{data?.registration_number}</td>
                          <td>{data?.document == null ? 'Pending' : 'Complete'}</td>
                          {/* <td>{data?.user_type}</td> */}
                          <td>{data?.active ? 'Active' : 'Inactive'}</td>
                          {/* <td>{data?.vendor?.name}</td> */}
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

                            {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleToaddPer(data)
                              }}
                              className='btn btn-sm btn-info viewItem'
                            >
                              <i className='fas fa-eye'></i>
                            </button> */}

                            {/* setShowassign */}
                            {seleceteRole?.shortname == 'vendor' ? <></> :
                              <button
                                data-id='2209'
                                onClick={() => { hendleChangeassign(data) }}
                                className='ms-3 btn btn-sm btn-info'
                              >
                                Assign Vendor
                              </button>
                            }

                            {data?.document == null ? (
                              <button
                                data-id='2209'
                                onClick={() => {
                                  hendleEditPage(data)
                                }}
                                className='ms-3 btn btn-sm btn-info'
                              >
                                <i className='fas fa-add'></i>
                              </button>
                            ) : (
                              <button
                                data-id='2209'
                                onClick={() => {
                                  hendleEditPageUpdate(data)
                                }}
                                className='ms-3 btn btn-sm btn-info'
                              >
                                <i className='fas fa-edit'></i>
                              </button>
                            )}
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

                            {/* <!--end::Menu--> */}
                            {/* </td> */}
                            {/* <button
                              className='me-3 w-30px h-30px btn btn-icon btn-active-light-primary'
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
                              className='w-30px h-30px btn btn-icon btn-active-light-primary'
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

export default Vehicle

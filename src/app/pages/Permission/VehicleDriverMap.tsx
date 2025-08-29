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
// import ImageUploading from 'react-images-uploading'
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

function VehicleDriverMap() {
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
  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  )


  const token: any = localStorage.getItem('kt-auth-react-v')

  const prepix: any = JSON.parse(token)?.data?.prefix

  const [show, setShow] = useState(false)

  const [addpermission, setaddpermission] = useState(false)
  const [showDelelt, setShowDelete] = useState(false)

  // date
  const [startDate, setStartDate] = useState(new Date())
  const [startDateup, setStartDateup] = useState(new Date())

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseaddpermission = () => setaddpermission(false)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShow = () => setShow(true)

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
  const [ciId, setciId] = useState<any>('')

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
  const get_role_listss: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
  const get_all_cricle: any[] = useSelector((state: any) =>
    state.admin.get_all_cricle ? state.admin.get_all_cricle : []
  )
  const get_product_list: any = useSelector((state: any) =>
    state.admin.assign_driver ? state.admin.assign_driver : {}
  )
  const get_users_details: any = useSelector((state: any) =>
    state.admin.get_users_details ? state.admin.get_users_details : {}
  )

  const get_role_list =
    get_role_listss &&
    get_role_listss?.filter((data) => {
      return data?.shortname == 'user'
    })

  const ITEMS_PER_PAGE = 10


  const comments = get_product_list?.data ? get_product_list?.data : []

  const headers = [
    { name: 'S.No.', field: '_id', sortable: false },
    { name: 'Driver', field: 'diver', sortable: false },
    { name: 'Vehicle', field: 'vehicle', sortable: false },
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

    // if (!ciId) {
    // dispatch(adminAction.getuser(data))
    // dispatch(adminAction.all_vehicle_driver({page: data, role_id: ciId}))

    // return () => {}
    // } else {
    //     dispatch(adminAction.all_vehicle_driver_Filter({page: 1, role_id: ciId}))

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

  useEffect(() => {
    console.log(seleceteRole)
    setTimeout(() => {
      hendleChangeroleSelect(get_user_profile?.profile?.role_id)

      // seleceteRole?.shortname == 'user'
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
    }, 1000);
  }, [get_role_list, get_user_profile]);

  const hendleChangeroleSelect = (e: any) => {
    const myObject = get_role_listss.find((obj) => obj.id == e)

    // get_role_list

    setseleceteRole(myObject)

    // const {name, value} = e.target
    // setroledata({...roledata, [name]: value})
  };


  const [aboutPage, setaboutPage] = useState<any>('');
  const [seleceteMangerXen, setseleceteMangerXen] = useState<any>({});
  const [seleceteMangerAen, setseleceteMangerAen] = useState<any>({});
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({});
  const [seleceteMangerVendor, setseleceteMangerVendor] = useState<any>({});
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({});
  const [seleceteMangerDriver, setseleceteMangerDriver] = useState<any>({});
  // const [criId, setcriId] = useState<any>('')
  const criId = get_user_profile?.circle?.id;

  const handleCloseUpdate = () => {
    setShowUpdate(false)
    setseleceteMangerXen(null)
    setseleceteMangerAen(null)
    setseleceteMangerJen(null)
    setseleceteMangerVendor(null)
    setseleceteMangerVehicle(null)
    setseleceteMangerDriver(null)
    // setcriId('')
  }
  const handleClose = () => {
    setShow(false)
    setseleceteMangerXen(null)
    setseleceteMangerAen(null)
    setseleceteMangerJen(null)
    setseleceteMangerVendor(null)
    setseleceteMangerVehicle(null)
    setseleceteMangerDriver(null)
    // setcriId('')
  }

  const hendleSubmitCreate = () => {
    try {

      const data = new FormData()
      if (!criId) {
        toast.error('please select circle ')
      } else if (!seleceteMangerVehicle?.vehicle_id) {
        toast.error('please select vehicle')
      } else if (!seleceteMangerDriver?.id) {
        toast.error('please select driver')
      } else {
        data.append('xen_id', seleceteMangerXen?.id)
        data.append('aen_id', seleceteMangerAen?.id)
        data.append('vendor_id', seleceteMangerVendor?.id)
        data.append('jen_id', seleceteMangerJen?.id)
        data.append('vehicle_id', seleceteMangerVehicle?.vehicle_id)
        data.append('driver_id', seleceteMangerDriver?.id)
        data.append('circle_id', criId)

        dispatch(adminAction.assign_driver(data, { page: 1, role_id: 10 }))
        setShow(false)
        setseleceteMangerXen(null)
        setseleceteMangerAen(null)
        setseleceteMangerJen(null)
        setseleceteMangerVendor(null)
        setseleceteMangerVehicle(null)
        setseleceteMangerDriver(null)
        setLoading(false)
        // setcriId('')
        dispatch(adminAction.all_vehicle_driver({ page: pageNo, role_id: 10, search }))
      }
     
    } catch (error) {
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
    // dispatch(adminAction.all_vehicle_driver({page: 1, role_id: 10}))
    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    dispatch(adminAction.userprofile(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  useEffect(() => {
    dispatch(adminAction.all_vehicle_driver({ page: pageNo, role_id: 10, search }))
  }, [pageNo, search])

  const hendlerolewise = (e: any) => {
    if (e) {
      setpageNo(1)
      setciId(e)

      // page=${data?.page}&role_id=${data?.role_id}
      dispatch(adminAction.all_vehicle_driver_Filter({ page: 1, role_id: e }))
    } else {
      dispatch(adminAction.all_vehicle_driver({ page: 1, role_id: 10 }))
    }

    // getuserRoleWise
  }

  // create product

  // createProduct

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
    dispatch(adminAction.deleteAssignDriver(productID, pageNo))
    // dispatch(adminAction.getRoleList('dhsg'))
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

  const hendleEditPage = (e: any) => {
    setShowUpdate(true)
    // const sv: any = moment(e.effectiveDate).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')
    // const sv: any = moment(e.effectiveDate, 'YYYY-MM-DD HH:mm:ss').toDate()

    // setStartDateup(sv)

    setroledataUpdate({
      name: e.name,
      city: e.city,
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

      if (!roledataUpdate?.name) {
        toast.error('please enter  name')
      } else if (!roledataUpdate?.city) {
        toast.error('please enter city')
      } else if (!roledataUpdate?.pincode) {
        toast.error('please enter pincode')
      } else {
        data.append('name', roledataUpdate?.name)
        // data.append('description', categoryUpPage)
        data.append('city', roledataUpdate?.city)
        data.append('pincode', roledataUpdate?.pincode)
        // data.append('kmTo', roledataUpdate?.kmTo)
        // data.append('effectiveDate', moment(startDateup).format('DD/MM/yyyy'))
        // data.append('remark', roledataUpdate?.remark)
        // data.append('price', roledataUpdate?.price)
        // data.append('categoryName', 'test cate')
        // data.append('pageNo', pageNo)
        // data.append('parentId', '11')
        // data.append('sellerId', '20')

        roledataUpdate.effectiveDate = moment(startDateup).format('yyyy/MM/DD')

        dispatch(adminAction.updatecircle(roledataUpdate))
        setShowUpdate(false)
        setLoading(false)
        dispatch(adminAction.all_vehicle_driver({ page: pageNo, role_id: 10, search }))
      }
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
  const loadOptionsgetManagerVendor = async (
    search: any,
    loadedOptions: any,
    { page }: { page: any }
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/get_department_child?search=${search}&page=${page}&id=${seleceteMangerJen?.id}&circle_id=${criId}`,
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

  const loadOptionsgetManagerVehicle = async (
    search: any,
    loadedOptions: any,
    { page }: { page: any }
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/all_vendors_tanker?search=${search}&page=${page}&vendor_id=${seleceteMangerVendor?.id}&circle_id=${criId}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    )

    const responseJSON: PaginatedResponse = await response.json()

    const options: any = responseJSON?.results?.map((data: any) => {
      data.value = data?.id
      data.label = data?.vehicle?.registration_number

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
  const loadOptionsgetManagerDriver = async (
    search: any,
    loadedOptions: any,
    { page }: { page: any }
  ) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    // roledataUpdate
    const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
    const response = await fetch(
      URL.API_BASE_URL +
      prfix +
      `/get_all_driver_circle?search=${search}&page=${page}&circle_id=${criId}`,
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
  const [managerKeyVendor, setManagerKeyVendor] = useState<any>(0)
  const [managerKeyVehicle, setManagerKeyVehicle] = useState<any>(0)
  const [managerKeyDriver, setManagerKeyDriver] = useState<any>(0)

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
      setManagerKeyVendor((prevKey: any) => prevKey + 1)
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      setManagerKeyDriver((prevKey: any) => prevKey + 1)
      setseleceteMangerXen({})
      setseleceteMangerAen({})
      setseleceteMangerJen({})
      setseleceteMangerVendor({})
      setseleceteMangerVehicle({})
      setseleceteMangerDriver({})
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
      setManagerKeyVendor((prevKey: any) => prevKey + 1)
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      // setseleceteMangerXen({})
      setseleceteMangerAen({})
      setseleceteMangerJen({})
      seleceteRole?.shortname !== 'vendor' && setseleceteMangerVendor({})
      setseleceteMangerVehicle({});
    }
  }, [seleceteMangerXen])

  useEffect(() => {
    // Only load options if a role ID is selected
    if (seleceteMangerAen?.id) {
      loadOptionsgetManagerJen('', [], { page: 1 });

      setManagerKeyJen((prevKey: any) => prevKey + 1);
      setManagerKeyVendor((prevKey: any) => prevKey + 1);
      setManagerKeyVehicle((prevKey: any) => prevKey + 1);

      setseleceteMangerJen({});
      seleceteRole?.shortname !== 'vendor' && setseleceteMangerVendor({});
      setseleceteMangerVehicle({})
    };
  }, [seleceteMangerAen])

  useEffect(() => {
    // Only load options if a role ID is selected
    if (seleceteMangerJen?.id) {
      loadOptionsgetManagerVendor('', [], { page: 1 })

      setManagerKeyVendor((prevKey: any) => prevKey + 1)
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)

      seleceteRole?.shortname !== 'vendor' && setseleceteMangerVendor({})
      setseleceteMangerVehicle({})
    }
  }, [seleceteMangerJen]);

  useEffect(() => {
    if (prepix === "vendors") {
      setseleceteMangerVendor(get_user_profile?.profile);
    };
  }, [get_user_profile]);

  useEffect(() => {
    // Only load options if a role ID is selected

    if (seleceteMangerVendor?.id) {
      loadOptionsgetManagerVendor('', [], { page: 1 })

      //   setManagerKeyVendor((prevKey: any) => prevKey + 1)
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)

      //   setseleceteMangerVendor({})
      setseleceteMangerVehicle({})
    }
  }, [seleceteMangerVendor]);

  const hendleToAcctive = (e: any, active: any) => {
    const data = new FormData()
    data.append('id', e)
    data.append('active', active)
    dispatch(adminAction.activeInactive(data, { page: pageNo, role_id: 10 }))
  };

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
  };

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
  };

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
  };

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
                <Modal.Title>Vehicle Driver Maping</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='row'>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'> Circle </span>
                    </label>

                    {prepix == 'ca' || prepix == 'acen' || prepix == 'scen' ? (
                      <div className='form-control disableb'>{get_user_profile?.circle?.name}</div>
                    ) : get_user_profile?.circle ? (
                      <div className='form-control disableb'>{get_user_profile?.circle?.name}</div>
                    ) : (
                      <select
                        className='bg-transparent form-control'
                        aria-label='Select example'
                        name='circle_id'
                      // onChange={(e) => {
                      //   setcriId(e?.target?.value)
                      // }}
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

                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Vendor</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    {seleceteRole?.shortname == 'vendor'
                      ? <select
                        className='form-control'
                        aria-label='Select example'
                        name='circle_id'
                        disabled
                      >
                        <option value={get_user_profile?.profile?.id}>{get_user_profile?.profile?.name}</option>
                      </select>
                      :
                      < AsyncPaginate<any, any, any>
                        key={managerKeyVendor}
                        value={seleceteMangerVendor}
                        loadOptions={loadOptionsgetManagerVendor}
                        onChange={setseleceteMangerVendor}

                        additional={{
                          page: 1,
                        }}
                      />
                    }
                  </div>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Vehicle</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
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
                  </div>
                  <div className='mb-7 fv-row col-3'>
                    <label className='form-label mb-2 fw-semibold fs-6'>
                      <span className='required'>Select Driver</span>
                      <i
                        className='ms-2 fas fa-exclamation-circle fs-7'
                        data-bs-toggle='popover'
                        data-bs-trigger='hover'
                        data-bs-html='true'
                        data-bs-content='Permission names is required to be unique.'
                      ></i>
                    </label>
                    <AsyncPaginate<any, any, any>
                      key={managerKeyDriver}
                      value={seleceteMangerDriver}
                      loadOptions={loadOptionsgetManagerDriver}
                      onChange={setseleceteMangerDriver}
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
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>update rate</Modal.Title>
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

                <div className='mb-7 fv-row'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'> Name</span>
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
                    placeholder='Enter a  name'
                    name='name'
                    onChange={(e: any) => {
                      hendleChangerole2(e)
                    }}
                    value={roledataUpdate?.name}
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
                      <span className='required'>description</span>
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
                      placeholder='Enter a role name'
                      // name='role_name'
                      {...formik.getFieldProps('role_description')}
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

                <div className='mb-7 fv-row'>
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
                </div>

                <div className='mb-7 fv-row'>
                  <label className='form-label mb-2 fw-semibold fs-6'>
                    <span className='required'>pincode</span>
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
                    placeholder='Enter pincode'
                    name='pincode'
                    onChange={(e: any) => {
                      hendleChangerole2(e)
                    }}
                    value={roledataUpdate?.pincode}
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
                <Modal.Title id='example-custom-modal-styling-title'>Users Details</Modal.Title>
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

            {/* <!--begin::Page title-->  */}
            <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
              {/* <!--begin::Title-->  */}
              <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
                Vehicle Driver
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
                <li className='breadcrumb-item text-muted'> Vehicle Driver </li>
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
                  <div
                    className='position-relative d-flex align-items-center my-1 me-5'
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
                      <option value={''}> All</option>
                     
                      {get_all_cricle &&
                        get_all_cricle?.map((data, i) => {
                          return (
                            <option value={data?.id} key={i}>
                              {data?.name}
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
                    {/* <!--end::Svg Icon-->  */} Vehicle Driver Map
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
                          <td>{soNo}</td>

                          <td>{data?.driver?.name}</td>
                          <td>{data?.vehicle?.registration_number}</td>
                          {/* <td>{data?.mobile}</td>
                          <td>{data?.uid}</td> */}

                          {/* <td>
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
                          </td> */}

                          {/* <td> */}
                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleuserView(data?.id)
                              }}
                              className='ms-3 btn btn-sm btn-info'
                            >
                              <i className='fas fa-eye'></i>
                            </button> */}
                          {/* <button
                              data-id='2209'
                              onClick={() => {
                                hendleModalShow(data?.id)
                              }}
                              className='ms-3 btn btn-sm btn-danger'
                            >
                              <i className='fa-trash-alt fas'></i>
                            </button> */}

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
                          {/* </td> */}
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

export default VehicleDriverMap

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
import { assign_vehicle_vendor } from '../../../redux/Admin/action'

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

function VEhicleVendorMap() {
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

  const token: any = localStorage.getItem('kt-auth-react-v');

  const prepix: any = JSON.parse(token)?.data?.prefix;

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

  const [seleceteMangerXen, setseleceteMangerXen] = useState<any>({});
  console.log("seleceteMangerXen ==> ", seleceteMangerXen);
  const [seleceteMangerAen, setseleceteMangerAen] = useState<any>({});
  console.log("seleceteMangerAen ==> ", seleceteMangerAen);
  const [seleceteMangerJen, setseleceteMangerJen] = useState<any>({});
  console.log("seleceteMangerJen ==> ", seleceteMangerJen);
  const [seleceteMangerVendor, setseleceteMangerVendor] = useState<any>({});
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({});
  const [seleceteMangerDriver, setseleceteMangerDriver] = useState<any>({});

  const [managerKey, setManagerKey] = useState<any>(0)
  const [managerKeyAen, setManagerKeyAen] = useState<any>(0)
  const [managerKeyJen, setManagerKeyJen] = useState<any>(0)
  const [managerKeyVendor, setManagerKeyVendor] = useState<any>(0)
  const [managerKeyVehicle, setManagerKeyVehicle] = useState<any>(0)
  const [managerKeyDriver, setManagerKeyDriver] = useState<any>(0)

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
  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  )
  console.log("get_user_profile ==> ", get_user_profile);

  const criId = get_user_profile?.circle?.id
  const [imagesss, setImagesss] = React.useState([])
  const maxNumberss = 8

  const get_role_listss: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
  const get_all_cricle: any[] = useSelector((state: any) =>
    state.admin.get_all_cricle ? state.admin.get_all_cricle : []
  )
  const get_product_list: any = useSelector((state: any) =>
    state.admin.vehicle_list_vendor ? state.admin.vehicle_list_vendor : {}
  )
  const vehicle_details: any = useSelector((state: any) =>
    state.admin.vehicle_details ? state.admin.vehicle_details : {}
  )

  const get_role_list =
    get_role_listss &&
    get_role_listss?.filter((data) => {
      return data?.shortname == 'user'
    })

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
    { name: 'Cricle', field: 'cricle', sortable: true },
    { name: 'Xen', field: 'exn', sortable: false },
    { name: 'Aen', field: 'aen', sortable: false },
    // {name: 'remark', field: 'remark', sortable: true},
    { name: 'Jen', field: 'jen', sortable: false },
    { name: 'Vendor', field: 'vendor', sortable: false },
    { name: 'Vehicle', field: 'vehicle', sortable: false },
    { name: 'Vehicle Number', field: 'vehicleno', sortable: false },
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
    // dispatch(adminAction.all_vehicles_vendor(data))

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
  // console.log("seleceteRole ==> ", seleceteRole);

  const hendleChangeroleSelect = (e: any) => {
    const myObject = get_role_listss.find((obj) => obj.id == e)

    // get_role_list

    setseleceteRole(myObject)
  };

  const [aboutPage, setaboutPage] = useState<any>('')

  console.log(seleceteMangerXen)
  console.log(seleceteMangerAen)
  console.log(seleceteMangerVendor)
  console.log(seleceteMangerJen)
  console.log(seleceteMangerVehicle)
  console.log(seleceteMangerDriver)
  const hendleSubmitCreate = () => {
    // setLoading(true)
    try {


      const data = new FormData()
      if (!criId) {
        toast.error('please select circle ')
      } else if (!seleceteMangerVehicle?.vehicle_id) {
        toast.error('please select vehicle')
      } else if (!seleceteMangerVendor?.id) {
        toast.error('please select Vendor')
      } else {
        data.append('xen_id', seleceteMangerXen?.id)
        data.append('aen_id', seleceteMangerAen?.id)
        data.append('vendor_id', seleceteMangerVendor?.id)
        data.append('jen_id', seleceteMangerJen?.id)
        data.append('vehicle_id', seleceteMangerVehicle?.vehicle_id)
        data.append('circle_id', criId)

        dispatch(assign_vehicle_vendor(data,pageNo))
        setShow(false)
        setLoading(false)
        dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
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
    // dispatch(adminAction.getPermissionsList('dhsg'))
    // dispatch(adminAction.all_vehicles_vendor(1))
    dispatch(adminAction.circleList({}))
    dispatch(adminAction.getRoleList(''))
    dispatch(adminAction.getgetAllCircles(''))
    dispatch(adminAction.userprofile(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => { }
  }, [])

  useEffect(() => {
    dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
  }, [pageNo, search])


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
      // setManagerKeyDriver((prevKey: any) => prevKey + 1)
      setseleceteMangerXen({})
      setseleceteMangerAen({})
      setseleceteMangerJen({})
      console.log("setseleceteMangerJen 1 ==> ", setseleceteMangerJen);
      setseleceteMangerVendor({})
      setseleceteMangerVehicle({})
      // setseleceteMangerDriver({})
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
      console.log("setseleceteMangerJen 2==> ", setseleceteMangerJen);
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
      console.log("setseleceteMangerJen3 ==> ", setseleceteMangerJen);
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
        // console.log("seleceteRole ==> ", seleceteRole);

        setseleceteMangerXen(get_user_profile?.xen)
        setseleceteMangerAen(get_user_profile?.aen)
        setseleceteMangerJen(get_user_profile?.profile)
        console.log("setseleceteMangerJen 4 ==> ", setseleceteMangerJen);
      }
      if (seleceteRole?.shortname == 'vendor') {
        setseleceteMangerXen(get_user_profile?.xen)
        setseleceteMangerAen(get_user_profile?.aen)
        setseleceteMangerJen(get_user_profile?.jen)
        console.log("setseleceteMangerJen 5==> ", setseleceteMangerJen);
      }
    }, 1000);
  }, [get_role_list, get_user_profile]);


  useEffect(() => {
    if (seleceteRole) {
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
          // console.log("seleceteRole ==> ", seleceteRole);

          setseleceteMangerXen(get_user_profile?.xen)
          setseleceteMangerAen(get_user_profile?.aen)
          setseleceteMangerJen(get_user_profile?.profile)
          console.log("setseleceteMangerJen 6 ==> ", setseleceteMangerJen);
        }
        if (seleceteRole?.shortname == 'vendor') {
          setseleceteMangerXen(get_user_profile?.xen)
          setseleceteMangerAen(get_user_profile?.aen)
          setseleceteMangerJen(get_user_profile?.jen)
          console.log("setseleceteMangerJen 7 ==> ", setseleceteMangerJen);
        }
      }, 1000);
    }
  }, [seleceteRole])


  // const hendlerolewise = (e: any) => {
  //   if (e) {
  //     setpageNo(1)
  //     // page=${data?.page}&role_id=${data?.role_id}
  //     dispatch(adminAction.getuserRoleWise({page: 1, role_id: e}))
  //   } else {
  //     dispatch(adminAction.all_vehicles_vendor(1))
  //   }

  //   // getuserRoleWise
  // }

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
    const data = new FormData()
    data.append('vehicle_id', productID)
    dispatch(adminAction.vehicle_delete(data, pageNo))
    // dispatch(adminAction.getRoleList('dhsg'))
    dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
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
        dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
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
        dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
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

  const [vicle, setvicle] = useState('')

  const hendleChangeassign = (e: any) => {
    setShowassign(true)
    setvicle(e)
  }

  const [cecleId, setcecleId] = useState<any>('')

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
    dispatch(adminAction.all_vehicles_vendor({ page: pageNo, search }))
  }

  useEffect(() => {
    // Only load options if a role ID is selected

    if (seleceteMangerVendor?.id) {
      loadOptionsgetManagerVendor('', [], { page: 1 })
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      setseleceteMangerVehicle({})
    }
  }, [seleceteMangerVendor]);


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
  // const loadOptionsgetManagerDriver = async (
  //   search: any,
  //   loadedOptions: any,
  //   { page }: { page: any }
  // ) => {
  //   const token: any = await localStorage.getItem('kt-auth-react-v')

  //   // roledataUpdate
  //   const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
  //   const response = await fetch(
  //     URL.API_BASE_URL +
  //     prfix +
  //     `/get_all_driver_circle?search=${search}&page=${page}&circle_id=${criId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token).api_token}`,
  //       },
  //     }
  //   )

  //   const responseJSON: PaginatedResponse = await response.json()

  //   const options: any = responseJSON?.results?.map((data: any) => {
  //     data.value = data?.id
  //     data.label = data?.name

  //     return data
  //   })

  //   return {
  //     options: options,
  //     hasMore: responseJSON.has_more,
  //     additional: {
  //       page: page + 1,
  //     },
  //   }
  // }


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
                <Modal.Title>Vehicle Vendor Map1</Modal.Title>
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

            </Modal>

            {/* update ddoc */}
            <Modal show={showUpdatevs} dialogClassName='modal-90w' onHide={handleCloseUpdatevs}>
              <Modal.Header closeButton>
                <Modal.Title>Update Document </Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                      placeholder='Enter a  reg cirtifiacte number'
                      name='reg_cirtifiacte_number'
                      onChange={(e: any) => {
                        hendleChangerole2(e)
                      }}
                      value={VecileDocu?.reg_cirtifiacte_number}
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
                    </div>

                  </div>
                </div>
              </Modal.Body>

            </Modal>

            {/* delete modal  */}
            <Modal show={showDelelt} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title> Detele</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure

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
                  </div>
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
                      onChange={(e) => {
                        setcecleId(e?.target?.value)
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

            {/* <!--begin::Page title-->  */}
            <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
              {/* <!--begin::Title-->  */}
              <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
                Vehicle Vendor Map
              </h1>
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


                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item'>
                  <span className='bg-gray-400 w-5px h-2px bullet'></span>
                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item text-muted'>Vehicle Vendor Map</li>
                {/* <!--end::Item-->  */}
              </ul>
              {/* <!--end::Breadcrumb-->  */}
            </div>
            {/* <!--end::Page title-->  */}
            {/* <!--begin::Actions-->  */}
            <div className='d-flex align-items-center gap-2 gap-lg-3'>
              <div className='m-0'>
              </div>
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

                  </div>
                  <div className='position-relative d-flex align-items-center my-1 me-5'>

                  </div>
                  {/* <!--end::Search-->  */}
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
                  {prepix !== "vendors" &&
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
                      Vehicle Vendor Map
                    </button>

                  }

                </div>
              </div>
              {/* <!--begin::Card body-->  */}
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
                          <td>{data?.circle_id?.name}</td>
                          <td>{data?.xen_id?.name}</td>
                          <td>{data?.aen_id?.name}</td>
                          <td>{data?.jen_id?.name}</td>
                          <td>{data?.vendor_id?.name}</td>
                          <td>{data?.vehicle?.vehicle_name}</td>
                          <td>{data?.vehicle?.registration_number}</td>

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
                />
              </div>
            </div>
            <div
              className='modal fade'
              id='kt_modal_add_permission'
              tabIndex={-1}
              aria-hidden='true'
            >
              {/* <!--begin::Modal dialog-->  */}
              <div className='mw-650px modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h2 className='fw-bold'>Add a Permission</h2>
                    {/* <!--begin::Close-->  */}
                    <div
                      className='btn btn-icon btn-sm btn-active-icon-primary'
                      data-kt-permissions-modal-action='close'
                    >
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
                    </div>
                  </div>

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
                        {/* <!--begin::Input-->  */}
                        <input
                          className='form-control form-control-solid'
                          placeholder='Enter a permission name'
                          name='permission_name'
                        />
                      </div>
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
                    </div>
                  </div>
                  <div className='mx-5 mx-xl-15 my-7 scroll-y modal-body'>
                    <div className='d-flex bg-light-warning mb-9 p-6 border border-warning border-dashed rounded notice'>
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
                      </div>
                    </div>
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
                        {/* <!--begin::Input-->  */}
                        <input
                          className='form-control form-control-solid'
                          placeholder='Enter a permission name'
                          name='permission_name'
                        />
                      </div>
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VEhicleVendorMap

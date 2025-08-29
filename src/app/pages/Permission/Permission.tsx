import React, {useEffect, useMemo, useState} from 'react'
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from 'react-redux'
import {adminAction, UniversityAction} from '../../../redux/common/action'
import {Pagination, TableHeader} from '../Table'
import PaginationComponent from '../Table/Pagination/Pagination'

// modal
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

function PermissionPage() {
  // deta table  state start
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')
  // const [comments, setComments] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(1)

  const [itemsPerPage, setitemsPerPage] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState({field: '', order: ''})

  // deta table  state end

  // modal

  const [show, setShow] = useState(false)
  const [showdelete, setShowdelete] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleClosedelete = () => setShowdelete(false)
  const handleShowdelete = () => setShowdelete(true)

  // modal end

  // api call

  const dispatch = useDispatch()

  // get api data

  const counsellor: any[] = useSelector((state: any) =>
    state.admin.get_per_list ? state.admin.get_per_list : []
  )

  const get_role_list: any[] = useSelector((state: any) =>
    state.admin.get_role_list ? state.admin.get_role_list : []
  )
 

  const ITEMS_PER_PAGE = 10

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
 

  const comments = counsellor ? counsellor : []
  const headers = [
    {name: 'No', field: 'id', sortable: false},
    {name: 'Module', field: 'module', sortable: true},
    {name: 'Role', field: 'role_id', sortable: false},
    {name: 'Write', field: 'write', sortable: false},
    {name: 'Read', field: 'read', sortable: false},
    {name: 'Edit', field: 'edit', sortable: false},
    {name: 'Delete', field: 'delete', sortable: false},
    // {name: 'Title', field: 'title', sortable: true},
    // {name: 'Email', field: 'email', sortable: true},
    {name: 'Action', field: 'action', sortable: false},
  ]

  const commentsData = useMemo(() => {
    let computedComments = comments

    // if (search) {
    //     computedComments = computedComments.filter(
    //         comment =>
    //             comment.name.toLowerCase().includes(search.toLowerCase()) ||
    //             comment.email.toLowerCase().includes(search.toLowerCase())
    //     );
    // }

    setTotalItems(computedComments.length)

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

  const handlePageClick = (event: any) => {
    const newOffset = event.selected % (comments.length / 2)
    setCurrentPage(newOffset + 1)
    setItemOffset(newOffset * itemsPerPage)
  }

  //   const handlePageClick = (event) => {
  //     // const newOffset = event.selected % (comments.length / 2);
  //     // setCurrentPage(newOffset + 1);
  //     // setItemOffset(newOffset * itemsPerPage);

  //     const data = event?.selected + 1

  //     setpageNo(data)

  //     // if (!userSearch) {
  //     dispatch(ShoetoggelAction.getusers(data))

  //     return () => {}
  //     // } else {
  //     //   dispatch(
  //     //     ShoetoggelAction.searchUser({ pageNumber: data, key: userSearch })
  //     //   );

  //     //   return () => {};
  //     // }
  //   }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setPageCount(Math.ceil(comments?.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, comments])

  // Table shoorting Function

  const onSortingChange = (field: any) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

    setSortingField(field)
    setSortingOrder(order)
    setSorting({field, order})
  }

  const hendleWinTime = () => {
 
    // dispatch(AdminAction.getPermissionsList({}))
  }

  useEffect(() => {
    dispatch(adminAction.getPermissionsList('dhsg'))
    dispatch(adminAction.getRoleList('dhsg'))
    return () => {}
  }, [])

  const [premisiionListData, setpremisiionListdata] = useState<any>({})

  const onChangedata = (e: any) => {
    const {name, value} = e.target
    setpremisiionListdata({...premisiionListData, [name]: value})
  }

  const hendlecreateP = async () => {
    if (!premisiionListData?.module) {
      toast.error('please enter module')
    } else if (!premisiionListData?.role_id) {
      toast.error('please select role ')
    } else if (!premisiionListData?.read) {
      toast.error('please select read permissions')
    } else if (!premisiionListData?.write) {
      toast.error('please select write permissions')
    } else if (!premisiionListData?.edit) {
      toast.error('please select edit permissions')
    } else if (!premisiionListData?.delete) {
      toast.error('please select delete permissions')
    } else {
      // createPermission
      var formdata = new FormData()
      formdata.append('module', premisiionListData?.module)
      formdata.append('role_id', premisiionListData?.role_id)
      formdata.append('read', premisiionListData?.read)
      formdata.append('write', premisiionListData?.write)
      formdata.append('edit', premisiionListData?.edit)
      formdata.append('delete', premisiionListData?.delete)
      dispatch(adminAction.createPermission(formdata))
      setShow(false)
      return () => {}
    }
  }

  const [deleteId, setdeleteId] = useState<any>('')

 

  const hendledeleteSelect = (e: any) => {
    setShowdelete(true)
    setdeleteId(e)
  }

  const deleteSubmit = () => {
    dispatch(adminAction.deletePermission(deleteId))
    setShowdelete(false)
    return () => {}
  }

  const hendleUpdateP = (id: any, type: any, status: any) => {
    dispatch(adminAction.updatePermission({id, type, status}))
    // setShowdelete(false)
    return () => {}
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}
                <div className='mb-10'>
                  <label className='form-label'>Module</label>
                  <input
                    type='text'
                    name='module'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                    className='form-control'
                    placeholder='module'
                  />
                </div>
                {/* <div className='mb-10'>
                  <label className='form-label'>Role</label>
                  <input
                    type='text'
                    name='role_id'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                    className='form-control'
                    placeholder='role'
                  />
                </div> */}

                <div className='mb-10'>
                  <label className='form-label'>Role</label>
                  <select
                    className='form-select form-select-white mt-3'
                    aria-label='Select example'
                    name='role_id'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                  >
                    <option>Select Role</option>
                    {get_role_list &&
                      get_role_list?.map((data, i) => {
                        return <option value={data?.id}>{data?.fullname}</option>
                      })}
                    {/* <option value='0'>No</option> */}
                  </select>
                </div>

                <div className='mb-10'>
                  <label className='form-label'>Write</label>
                  <select
                    className='form-select form-select-white mt-3'
                    aria-label='Select example'
                    name='write'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                  >
                    <option>Select Write</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                </div>
                <div className='mb-10'>
                  <label className='form-label'>Read</label>
                  <select
                    className='form-select form-select-white mt-3'
                    aria-label='Select example'
                    name='read'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                  >
                    <option>Select Read</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                </div>
                <div className='mb-10'>
                  <label className='form-label'>Edit</label>
                  <select
                    className='form-select form-select-white mt-3'
                    aria-label='Select example'
                    name='edit'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                  >
                    <option>Select Edit</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                </div>
                <div className='mb-10'>
                  <label className='form-label'>Delete</label>
                  <select
                    className='form-select form-select-white mt-3'
                    aria-label='Select example'
                    onChange={(e) => {
                      onChangedata(e)
                    }}
                    name='delete'
                  >
                    <option>Select delete</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={hendlecreateP}>
                  Save Changes
                  {/* hendlecreateP */}
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showdelete} onHide={handleClosedelete}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure for delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>{/* Woohoo, you're reading this text in a modal! */}</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClosedelete}>
                  Close
                </Button>
                <Button variant='primary' onClick={deleteSubmit}>
                  Save Changes
                  {/* hendlecreateP */}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* <!--begin::Page title-->  */}
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              {/* <!--begin::Title-->  */}
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                Permissions List
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
                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item'>
                  <span className='bullet bg-gray-400 w-5px h-2px'></span>
                </li>
                {/* <!--end::Item-->  */}
                {/* <!--begin::Item-->  */}
                <li className='breadcrumb-item text-muted'>User Management</li>
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
                <div
                  className='menu menu-sub menu-sub-dropdown w-250px w-md-300px'
                  data-kt-menu='true'
                  id='kt_menu_637dc7729cedd'
                >
                  {/* <!--begin::Header-->  */}
                  <div className='px-7 py-5'>
                    <div className='fs-5 text-dark fw-bold'>Filter Options</div>
                  </div>
                  {/* <!--end::Header-->  */}
                  {/* <!--begin::Menu separator-->  */}
                  <div className='separator border-gray-200'></div>
                  {/* <!--end::Menu separator-->  */}
                  {/* <!--begin::Form-->  */}
                  <div className='px-7 py-5'>
                    {/* <!--begin::Input group-->  */}
                    <div className='mb-10'>
                      {/* <!--begin::Label-->  */}
                      <label className='form-label fw-semibold'>Status:</label>
                      {/* <!--end::Label-->  */}
                      {/* <!--begin::Input-->  */}
                      <div>
                        <select
                          className='form-select form-select-solid'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_637dc7729cedd'
                          data-allow-clear='true'
                        >
                          <option></option>
                          <option value='1'>Approved</option>
                          <option value='2'>Pending</option>
                          <option value='2'>In Process</option>
                          <option value='2'>Rejected</option>
                        </select>
                      </div>
                      {/* <!--end::Input-->  */}
                    </div>
                    {/* <!--end::Input group-->  */}
                    {/* <!--begin::Input group-->  */}
                    <div className='mb-10'>
                      {/* <!--begin::Label-->  */}
                      <label className='form-label fw-semibold'>Member Type:</label>
                      {/* <!--end::Label-->  */}
                      {/* <!--begin::Options-->  */}
                      <div className='d-flex'>
                        {/* <!--begin::Options-->  */}
                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
                          <input className='form-check-input' type='checkbox' value='1' />
                          <span className='form-check-label'>Author</span>
                        </label>
                        {/* <!--end::Options-->  */}
                        {/* <!--begin::Options-->  */}
                        <label className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value='2'
                            //   checked='checked'
                          />
                          <span className='form-check-label'>Customer</span>
                        </label>
                        {/* <!--end::Options-->  */}
                      </div>
                      {/* <!--end::Options-->  */}
                    </div>
                    {/* <!--end::Input group-->  */}
                    {/* <!--begin::Input group-->  */}
                    <div className='mb-10'>
                      {/* <!--begin::Label-->  */}
                      <label className='form-label fw-semibold'>Notifications:</label>
                      {/* <!--end::Label-->  */}
                      {/* <!--begin::Switch-->  */}
                      <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          name='notifications'
                          // checked='checked'
                        />
                        <label className='form-check-label'>Enabled</label>
                      </div>
                      {/* <!--end::Switch-->  */}
                    </div>
                    {/* <!--end::Input group-->  */}
                    {/* <!--begin::Actions-->  */}
                    <div className='d-flex justify-content-end'>
                      <button
                        type='reset'
                        className='btn btn-sm btn-light btn-active-light-primary me-2'
                        data-kt-menu-dismiss='true'
                      >
                        Reset
                      </button>
                      <button
                        type='submit'
                        className='btn btn-sm btn-primary'
                        data-kt-menu-dismiss='true'
                      >
                        Apply
                      </button>
                    </div>
                    {/* <!--end::Actions-->  */}
                  </div>
                  {/* <!--end::Form-->  */}
                </div>
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
                      placeholder='Search Permissions'
                    /> */}
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
                    {/* <!--end::Svg Icon-->  */}Add Permission
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
                          key={data?.name}
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
                    {commentsData?.map((data: any, i) => {
                   

                      return (
                        <tr>
                          {/* <!--begin::Name=-->  */}
                          {/* <td>User Management</td> */}
                          {/* <!--end::Name=-->  */}
                          {/* <!--begin::Assigned to=-->  */}
                          <td>
                            {data?.id}
                            {/* <a
                              href='../../demo1/dist/apps/user-management/roles/view.html'
                              className='badge badge-light-primary fs-7 m-1'
                            >
                              Administrator
                            </a> */}
                          </td>
                          {/* <!--end::Assigned to=-->  */}
                          {/* <!--begin::Created Date-->  */}
                          <td>{data?.module}</td>
                          <td>{data?.role?.fullname}</td>
                          {/* <td>{data?.write}</td> */}
                          <td>
                            <button
                              data-id='2209'
                              onClick={() => {
                                const statusValue = data?.write == '0' ? '1' : '0'
                                hendleUpdateP(data?.id, 'write', statusValue)
                              }}
                              className={
                                data?.write == '1'
                                  ? 'btn btn-sm btn-success viewItem'
                                  : 'btn btn-sm btn-danger viewItem'
                              }
                            >
                              {data?.write == '1' ? 'Yes' : 'No'}
                            </button>

                            {/* {data?.write} */}
                          </td>
                          <td>
                            <button
                              data-id='2209'
                              onClick={() => {
                                const statusValue = data?.read == '0' ? '1' : '0'
                                hendleUpdateP(data?.id, 'read', statusValue)
                              }}
                              className={
                                data?.read == '1'
                                  ? 'btn btn-sm btn-success viewItem'
                                  : 'btn btn-sm btn-danger viewItem'
                              }
                            >
                              {data?.read == '1' ? 'Yes' : 'No'}
                            </button>
                            {/* {data?.read} */}
                          </td>
                          <td>
                            <button
                              data-id='2209'
                              onClick={() => {
                                const statusValue = data?.edit == '0' ? '1' : '0'
                                hendleUpdateP(data?.id, 'edit', statusValue)
                              }}
                              className={
                                data?.edit == '1'
                                  ? 'btn btn-sm btn-success viewItem'
                                  : 'btn btn-sm btn-danger viewItem'
                              }
                            >
                              {data?.edit == '1' ? 'Yes' : 'No'}
                            </button>

                            {/* {data?.edit} */}
                          </td>
                          <td>
                            <button
                              data-id='2209'
                              onClick={() => {
                                const statusValue = data?.delete == '0' ? '1' : '0'
                                hendleUpdateP(data?.id, 'delete', statusValue)
                              }}
                              className={
                                data?.delete == '1'
                                  ? 'btn btn-sm btn-success viewItem'
                                  : 'btn btn-sm btn-danger viewItem'
                              }
                            >
                              {data?.delete == '1' ? 'Yes' : 'No'}
                            </button>

                            {/* {data?.delete} */}
                          </td>
                          {/* <!--end::Created Date-->  */}
                          {/* <!--begin::Action=-->  */}
                          <td /* className='text-end' */>
                            {/* <!--begin::Update-->  */}
                            {/* <button
                              className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_update_permission'
                            >
                             
                              <i className='las la-edit fs-2x'></i>
                            
                            </button>
                            <button
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
                            <button
                              className='btn btn-icon btn-active-light-primary w-30px h-30px'
                              data-kt-permissions-table-filter='delete_row'
                              onClick={() => {
                                hendledeleteSelect(data?.id)
                              }}
                            >
                              {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->  */}
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
                              {/* <!--end::Svg Icon-->  */}
                            </button>
                            {/* <!--end::Delete-->  */}
                          </td>
                          {/* <!--end::Action=-->  */}
                        </tr>
                      )
                    })}
                  </tbody>
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

export default PermissionPage

import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../../../redux/common/url'
import { useDispatch, useSelector } from 'react-redux'
import { adminAction } from '../../../redux/common/action'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import { handleCSVNew, handleExcelNew, handlePDFNew } from './print'
import { AsyncPaginate } from 'react-select-async-paginate'
import { toast } from 'react-toastify'
import { reportColumns } from '../../constant'

interface Option {
  value: string
  label: string
};

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
};

const VehicalWise = () => {
  const dispatch = useDispatch()

  const [vendor, setVendor] = useState([])
  const [vendorId, setVendorId] = useState<string>('')

  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({})
  const [pageNo, setpageNo] = useState<any>(1)
  const [pageCount, setPageCount] = useState(0)

  const [managerKeyVehicle, setManagerKeyVehicle] = useState<any>(0)

  const [approved, setApproved] = useState<Option[]>([]);

  const token: any = localStorage.getItem('kt-auth-react-v')
  const user = JSON.parse(localStorage.getItem('access_admin_token')!).data

  const get_product_list: any = useSelector((state: any) =>
    state.admin.get_all_reports ? state.admin.get_all_reports : {}
  )
  const reportData = get_product_list?.data ? get_product_list?.data : [];

  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  );

  const prepix: any = JSON.parse(token)?.data?.prefix
  const totalAmount = reportData?.reduce((acc: any, curr: any) => acc + curr.amount, 0)

  const criId = get_user_profile?.circle?.id

  useEffect(() => {
    // dispatch(adminAction.getReports(1));
    dispatch(adminAction.userprofile(''));
    // all_vehicles();
  }, []);

  useEffect(() => {
    if (prepix === "vendors") {
      setVendorId(get_user_profile?.profile?.id);
    }
  }, [get_user_profile]);

  useEffect(() => {
    setPageCount(Math.ceil(get_product_list?.total / 50))
  }, [get_product_list]);

  useEffect(() => {
    // Only load options if a role ID is selected
    if (vendorId) {

      // loadOptionsgetManagerVendor('', [], {page: 1})
      //   setManagerKeyVendor((prevKey: any) => prevKey + 1)
      //   setseleceteMangerVendor({})
      setManagerKeyVehicle((prevKey: any) => prevKey + 1);
      setseleceteMangerVehicle({});
    }
  }, [vendorId]);

  useEffect(() => {

    getReports()
  }, [pageNo]);

  const getReports = async () => {
    const query = [
      vendorId && `vendor=${vendorId}`,
      seleceteMangerVehicle?.vehicle_id && `vehicle=${seleceteMangerVehicle?.vehicle_id}`,
      fromDate && `fromdate=${moment(fromDate).format('YYYY-MM-DD')}`,
      toDate && `todate=${moment(toDate).format('YYYY-MM-DD')}`,
      name && `search=${name}`,
    ].filter(Boolean).join('&');

    dispatch(adminAction.getReportsFilter(pageNo, query, "pending"));
  };

  function checkAllData(e: any) {
    if (!e) {
      setApproved([])
    } else {
      setApproved(reportData.map((data: any) => data.id))
    }
  };


  const approveBulkReport = async () => {
    try {
      if (approved.length === 0) {
        toast.error('Please select atleast one record')
        return
      }
      const token: any = await localStorage.getItem('kt-auth-react-v')
      const config = {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).api_token,
        },
      }
      const res = await axios.post(
        `${URL.API_BASE_URL}/api/${prepix}/approveBulkReport`,
        { ids: approved, approved: 'accept' },
        config
      )
      if (res?.data?.data) {
        getReports()
        toast.success(res?.data?.message)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  };

  // reject
  const disapproveBulkReport = async () => {
    try {
      if (approved.length === 0) {
        toast.error('Please select atleast one record')
        return
      }
      const token: any = await localStorage.getItem('kt-auth-react-v')
      const config = {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).api_token,
        },
      }
      const res = await axios.post(
        `${URL.API_BASE_URL}/api/${prepix}/approveBulkReport`,
        { ids: approved, approved: 'reject' },
        config
      )
      if (res?.data?.data) {
        getReports()
        toast.success(res?.data?.message)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  };



  const handlePageClick = (event: any) => {
    // const newOffset = event.selected % (comments.length / 2);
    // setCurrentPage(newOffset + 1);
    // setItemOffset(newOffset * itemsPerPage);
    const data = event?.selected + 1
    setpageNo(data)
    return () => { }
    // } else {
    //   dispatch(
    //     ShoetoggelAction.searchUser({ pageNumber: data, key: userSearch })
    //   );

    //   return () => {};
    // }
  };

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
      `/all_vendors_tanker?search=${search}&page=${page}&vendor_id=${vendorId}&circle_id=${criId}`,
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
  };

  const loadOptionsVendor = async (search: any, loadedOptions: any, { page }: { page: any }) => {
    const token: any = await localStorage.getItem('kt-auth-react-v')

    const response = await fetch(
      URL.API_BASE_URL + URL.getVendorList + `?circle_id=${user?.circle_id}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).api_token}`,
        },
      }
    );

    const responseJSON: PaginatedResponse = await response.json();
    console.log("responseJSON ==> ", responseJSON);

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
  };

  const handleDownload = async () => {
    try {
      const token: any = await localStorage.getItem('kt-auth-react-v')
      const config = {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).api_token,
        },
      };

      const query = [
        `approved=pending`,
        vendorId && `vendor=${vendorId}`,
        seleceteMangerVehicle?.vehicle_id && `vehicle=${seleceteMangerVehicle?.vehicle_id}`,
        fromDate && `fromdate=${moment(fromDate).format('YYYY-MM-DD')}`,
        toDate && `todate=${moment(toDate).format('YYYY-MM-DD')}`,
        name && `search=${name}`,
      ].filter(Boolean).join('&');

      const prefix = `/api/${JSON.parse(token)?.data?.prefix}`;
      const res = await axios.get(
        `${URL.API_BASE_URL}${prefix + URL.downloadReports}?${query}`, config);
      if (res?.data?.data) {
        return res?.data?.data;
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    };
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="text-gray-600" >Trip Report Vehicle Wise</h3>
        <p><span className="text-primary">Home</span> / Trip Report Vehicle Wise</p>
      </div>
      <div className='bg-white shadow m-0 p-3 pt-6 rounded-2xl'>

        {/* Filter Options */}
        <div className='d-flex justify-content-between px-5'>
          <div className='me-3 col-2' style={{ position: 'relative' }}>
            <label>
              <b>Vendor</b>
            </label>{' '}
            <br />
            {
              prepix === "vendors"
                ?
                <select
                  className='form-control'
                  name=''
                  id=''
                  style={{ width: '200px' }}
                  disabled
                >
                  <option value={get_user_profile?.profile?.id}>
                    {get_user_profile?.profile?.name}
                  </option>
                </select>
                :
                <AsyncPaginate<any, any, any>
                  // key={managerKeyVehicle}
                  // value={seleceteMangerVehicle}
                  loadOptions={loadOptionsVendor}
                  onChange={(item: any) => {
                    console.log(item);
                    setVendorId(item?.id)
                  }}
                  additional={{ page: 1 }}
                  className='bg-transparent form-control p-0 border-0'
                />
            }
          </div>

          <div className='me-3 col-2' style={{ position: 'relative' }}>
            <label>
              <b>Vehicle</b>
            </label>{' '}
            <br />
            <AsyncPaginate<any, any, any>
              key={managerKeyVehicle}
              value={seleceteMangerVehicle}
              loadOptions={loadOptionsgetManagerVehicle}
              onChange={(data: any) => { setseleceteMangerVehicle(data) }}
              additional={{
                page: 1,
              }}
              className='bg-transparent form-control p-0 border-0'
            />
          </div>
          <div className='me-3'>
            <label>
              <b>Date From:</b>
            </label>{' '}
            <br />
            <input
              className='form-control'
              type='date'
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className='me-3'>
            <label>
              <b>Date To:</b>
            </label>{' '}
            <br />
            <input
              className='form-control'
              type='date'
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div
            className='mt-8'
            style={{
              backgroundColor: '#52A841',
              color: 'white',
              height: '30px',
              width: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => getReports()}
          >
            View
          </div>
        </div>
        {
          prepix === "jens" &&
          <div className='d-flex align-items-center justify-content-end gap-4 px-5'>
            <div className='d-flex content-center justify-content-center gap-3'>
              <input
                onChange={(e) => {
                  checkAllData(e.target.checked)
                }}
                type='checkbox'
                id='select'
              />{' '}
              <label htmlFor='select'>
                <b>check / uncheck all</b>
              </label>
            </div>

            <div
              onClick={approveBulkReport}
              className='mt-8'
              style={{
                backgroundColor: '#ADAFAD',
                color: 'white',
                height: '30px',
                width: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Approve Selected
            </div>

            <div
              onClick={disapproveBulkReport}
              className='mt-8'
              style={{
                backgroundColor: '#E21965',
                color: 'white',
                height: '30px',
                width: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Disapprove Selected
            </div>
          </div>

        }
        <div className='d-flex justify-content-betq align-items-center gap-4 mt-4 px-5'>

          {/* reports Download */}
          <div className='d-flex gap-1'>
            {/* <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={() => handleCopy(reportData)}
            >
              Copy
            </div> */}
            <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={async () => {
                const data = await handleDownload();
                handleCSVNew(data, reportColumns, "Report Vendor Wise", fromDate, toDate)
              }}
            >
              CSV
            </div>
            <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={async () => {
                const data = await handleDownload();
                handlePDFNew(data, reportColumns, "Report Vendor Wise", fromDate, toDate)
              }}
            >
              PDF
            </div>
            <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={async () => {
                const data = await handleDownload();
                handleExcelNew(data, reportColumns, "Report Vendor Wise", fromDate, toDate)
              }}
            >
              EXCEL
            </div>
          </div>

          {/* Search Input */}
          <div>
            <input
              type='search'
              placeholder='Search wise Name'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Pagination Table */}
        <div className='mt-9'>
          <table className='table' style={{ fontSize: '12px', fontWeight: '300' }}>
            <thead className='table-light'>
              <tr>
                <th>S.NO.</th>
                <th>Job Id</th>
                <th>Pickup location</th>
                <th>Drop location</th>
                <th>Pickup Date / time</th>
                <th>End Date / time</th>
                <th>Trip Duration</th>
                <th>Name</th>
                <th>Number</th>
                <th>Tanker Number</th>
                <th>Distance</th>
                <th>Amount</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: '60vh', overflow: 'auto' }}>
              {reportData.length > 0 &&
                reportData.map((item: any, index: any) => (
                  <tr key={index}
                    onClick={() => {
                      approved.includes(item?.id)
                        ? setApproved((prev) =>
                          prev.filter((approvedId) => approvedId !== item?.id)
                        )
                        : setApproved((prev) => [...prev, item?.id])
                    }}
                    className={approved.includes(item?.id) ? 'bg-success text-white' : ''}
                  >
                    <td>{index + 1}</td>
                    <td>{item?.id}</td>
                    <td>{item?.source_hydrant_center?.address}</td>
                    <td>{item?.destination?.address}</td>
                    <td>{item?.accepted_time}</td>
                    <td>{item?.complete_time}</td>
                    <td>{item?.trip_duration}</td>
                    {/* <td></td> */}
                    <td>{item?.source_hydrant_center?.station_name}</td>
                    <td>{item?.user?.mobile}</td>
                    <td>{item?.vehicle?.registration_number}</td>
                    <td>{item?.total_distance}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.remark}</td>
                    <td>
                      <Link to={`/view_details/${item?.id}/pending`}>
                        <button className='btn-group btn-group-sm bg-primary text-white'>
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tr>
              <td colSpan={6}></td>
              <td>
                <b>Date</b>
              </td>
              <td>
                {' '}
                {fromDate ? fromDate : '--'} to{toDate ? toDate : '--'}
              </td>
              <td colSpan={2}></td>
              <td>
                <b>Total</b>
              </td>
              <td colSpan={2} className='text-center fs-5'>
                {totalAmount}
              </td>
              <td></td>
            </tr>
            <tfoot>
              <tr>
                <td colSpan={13} style={{ textAlign: 'center' }}>
                  This is System Generated Report it does not require any signature or stamp.
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <p>Showing 1 to 201 of 201 entries</p> */}
          <div style={{ height: '45px' }}>
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
  )
}

export default VehicalWise

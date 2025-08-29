import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../../../redux/common/url'
import { useDispatch, useSelector } from 'react-redux'
import { adminAction } from '../../../redux/common/action'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import { handleCSVNew, handleExcelNew, handlePDFNew } from '../Provisional/print'
import { AsyncPaginate } from 'react-select-async-paginate'
import { toast } from 'react-toastify'
import { revenueReportColumns } from '../../constant'

interface Option {
  value: string
  label: string
}

interface PaginatedResponse {
  results: Option[]
  has_more: boolean
};
const Revenue = () => {

  const [vendorId, setVendorId] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [seleceteMangerVehicle, setseleceteMangerVehicle] = useState<any>({})
  const [pageNo, setpageNo] = useState<any>(1)
  const [pageCount, setPageCount] = useState(0)
  const [reportData, setReportData] = useState([]);

  const [managerKeyVehicle, setManagerKeyVehicle] = useState<any>(0)

  const token: any = localStorage.getItem('kt-auth-react-v')

  const prepix: any = JSON.parse(token)?.data?.prefix
  const get_user_profile: any = useSelector((state: any) =>
    state.admin.get_user_profile ? state.admin.get_user_profile : {}
  );

  const criId = get_user_profile?.circle?.id;

  const handlePageClick = (event: any) => {
    const data = event?.selected + 1
    setpageNo(data)
    return () => { }
  };

  const get_product_list: any = useSelector((state: any) =>
    state.admin.get_all_reports ? state.admin.get_all_reports : {}
  );

  const user = JSON.parse(localStorage.getItem('access_admin_token')!).data

  useEffect(() => {
    setPageCount(Math.ceil(get_product_list?.total / 10))
  }, [get_product_list])

  useEffect(() => {
    if (prepix === "vendors") {
      setVendorId(get_user_profile?.profile?.id);
    }
  }, [get_user_profile]);

  useEffect(() => {
    if (vendorId) {
      setManagerKeyVehicle((prevKey: any) => prevKey + 1)
      setseleceteMangerVehicle({})
    }
  }, [vendorId]);

  useEffect(() => {
    getReports()
  }, [pageNo]);

  const getReports = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("kt-auth-react-v")!);
      const config = {
        headers: {
          Authorization: "Bearer " + token.api_token,
        },
      };
      const query = [
        `approved=accept`,
        `page=${pageNo}`,
        vendorId && `vendor=${vendorId}`,
        seleceteMangerVehicle?.vehicle_id && `vehicle=${seleceteMangerVehicle?.vehicle_id}`,
        fromDate && `fromdate=${moment(fromDate).format('YYYY-MM-DD')}`,
        toDate && `todate=${moment(toDate).format('YYYY-MM-DD')}`,
        name && `search=${name}`,
      ].filter(Boolean).join('&');


      const prefix = `/api/${token?.data?.prefix}`
      const res = await axios.get(
        `${URL.API_BASE_URL}${prefix + URL.revenueVendorwise}?${query}`,
        config
      );

      if (res?.data?.data?.data) {
        setReportData(res?.data?.data?.data);
        // setPage(res?.data?.current_page);
        // setPage(res?.data?.data?.current_page)
        setPageCount(Math.ceil(res?.data?.data?.total / 50))
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    };
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
        `approved=accept`,
        vendorId && `vendor=${vendorId}`,
        seleceteMangerVehicle?.vehicle_id && `vehicle=${seleceteMangerVehicle?.vehicle_id}`,
        fromDate && `fromdate=${moment(fromDate).format('YYYY-MM-DD')}`,
        toDate && `todate=${moment(toDate).format('YYYY-MM-DD')}`,
        name && `search=${name}`,
      ].filter(Boolean).join('&');

      const prefix = `/api/${JSON.parse(token)?.data?.prefix}`
      const res = await axios.get(
        `${URL.API_BASE_URL}${prefix + URL.downloadVendorwise}?${query}`,
        config
      );

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
        <h3 className="text-gray-600" >Revenue Report</h3>
        <p><span className="text-primary">Home</span> / Revenue Report</p>
      </div>
      <div className='bg-white shadow m-0 p-3 pt-6 rounded-2xl'>
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
              onChange={setseleceteMangerVehicle}
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

        <div className='d-flex justify-content-betq align-items-center gap-4 mt-4 px-5'>
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
                handleCSVNew(data, revenueReportColumns, "Report Revenue Wise", fromDate, toDate)
              }}
            >
              CSV
            </div>
            <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={async () => {
                const data = await handleDownload();
                handlePDFNew(data, revenueReportColumns, "Report Revenue Wise", fromDate, toDate)
              }}
            >
              PDF
            </div>
            <div
              className='p-2'
              style={{ border: '1px solid #000', backgroundColor: '#ADAFAD' }}
              onClick={async () => {
                const data = await handleDownload();
                handleExcelNew(data, revenueReportColumns, "Report Revenue Wise", fromDate, toDate)
              }}
            >
              EXCEL
            </div>
          </div>

          <div>
            <input
              type='search'
              placeholder='Search wise Name'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-9'>
          <table className='table' style={{ fontSize: '12px', fontWeight: '300' }}>
            <thead className='table-light'>
              <tr>
                <th>S.NO.</th>
                <th>User</th>
                <th>Tanker Number</th>
                <th>Total Trip</th>
                <th>Distance</th>

              </tr>
            </thead>
            <tbody style={{ maxHeight: '60vh', overflow: 'auto' }}>
              {
                reportData?.length > 0 && reportData?.map((item: any, index: any) => {

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name || "--"}</td>
                      <td>{item?.tankers_number}</td>
                      <td>{item?.bookings_count}</td>
                      {/* <td>{item?.bookings_sum_total_distance}</td> */}
                      <td>{item?.total_distance?.toFixed(2)}</td>

                    </tr>
                  )
                })
              }
            </tbody>

            <tfoot>
              <tr>

                <td><b>Date</b></td>
                <td style={{ 'textAlign': 'center' }}>
                  {' '}
                  {fromDate ? fromDate : '--'} to &nbsp;{toDate ? toDate : '--'}
                </td>
                {/* <td> 31-05-2024 to 31-05-2024</td> */}
                <td><b>Total</b></td>
                <td style={{ 'textAlign': 'center' }}>
                  {reportData?.reduce((acc: number, item: { bookings_count?: number }) =>
                    acc + (item?.bookings_count ?? 0), 0)}
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={5} style={{ 'textAlign': 'center' }}>
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

export default Revenue
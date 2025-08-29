import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { URL } from '../../redux/common/url'
import { toast } from 'react-toastify'

const ViewDetails: FC = () => {
  const { id, status } = useParams();
  const [reportData, setReportData] = useState<any>({});
  const [remark, setRemark] = useState<any>("");

  const token: any = localStorage.getItem('kt-auth-react-v')
  console.log("token ==> ", token);
  const currentRole = JSON.parse(token)?.data?.prefix;
  console.log("currentRole ==> ", currentRole);

  useEffect(() => {
    getReports()
  }, []);

  const getReports = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token.api_token,
        },
      };
      const query = [`approved=${status}`, `id=${id}`].filter(Boolean).join('&');
      const prefix = `/api/${currentRole}`;

      const res = await axios.get(`${URL.API_BASE_URL}${prefix + URL.getReports}?${query}`, config);
      const reportsData = res?.data?.data;

      if (reportsData?.data) {
        setReportData(reportsData.data[0])
        setRemark(reportsData.data[0]?.remark)
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    };
  };

  const handleRemarkSubmit = async (id: any, remark: any) => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token.api_token,
        },
      };
      const prefix = `/api/${currentRole}`;

      const payload = { booking_id: parseInt(id), remark };
      const res = await axios.post(`${URL.API_BASE_URL}${prefix + URL.updateBookingRemark}`, payload, config)
      if (res?.data?.data) {
        toast.success(res?.data?.message);
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    };
  };

  return (
    <div>
      <div className='d-flex flex-column flex-wrap justify-content-center me-3 page-title'>
        <h1 className='d-flex flex-column justify-content-center my-0 fw-bold text-dark page-heading fs-3'>
          View Detail Trip
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

          <li className='breadcrumb-item text-muted'>View Detail Trip</li>
        </ul>
      </div>
      <div className='mt-5 p-6 rounded card card-flush'>
        <div className='mt-9'>
          <table className='table' style={{ fontSize: '12px', fontWeight: '300' }}>
            <tbody>
              <tr>
                <th>Trip ID / Trip Auto ID</th>
                <td>{reportData?.id}</td>
              </tr>
              <tr>
                <th>Customer Name</th>
                <td>{reportData?.user?.name}</td>
              </tr>
              <tr>
                <th>Customer Mobile Number</th>
                <td>{reportData?.user?.mobile}</td>
              </tr>
              <tr>
                <th>Source Address</th>
                <td>{reportData?.source_hydrant_center?.address}</td>
              </tr>
              <tr>
                <th>Destination Address</th>
                <td>{reportData?.destination?.address}</td>
              </tr>
              <tr>
                <th>Trip Accepted By</th>
                <td>{reportData?.driver?.name}</td>
              </tr>
              <tr>
                <th>Trip Accepted At</th>
                <td>{reportData?.accepted_time}</td>
              </tr>
              <tr>
                <th>Trip End</th>
                <td>{reportData?.complete_time}</td>
              </tr>
              <tr>
                <th>Trip Duration</th>
                <td>{reportData?.trip_duration}</td>
              </tr>
              <tr>
                <th>Vehicle</th>
                <td>{reportData?.vehicle?.registration_number}</td>
              </tr>
              <tr>
                <th>Filling Image</th>
                <td>
                  <img src={`${URL.API_BASE_URL}${reportData?.filling_image}`} alt='tripimg' />
                </td>
              </tr>
              <tr>
                <th>Trip Start Image</th>
                <td>
                  <img src={`${URL.API_BASE_URL}${reportData?.destination_image}`} alt='tripimg' />
                </td>
              </tr>
              <tr>
                <th>Before Water Supply</th>
                <td>
                  {' '}
                  <a
                    href={`${URL.API_BASE_URL}${reportData?.filling_video}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    -View Video
                  </a>
                </td>
              </tr>
              <tr>
                <th>After Water Supply</th>
                <td>
                  <a
                    href={`${URL.API_BASE_URL}${reportData?.destination_video}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    -View Video
                  </a>
                </td>
              </tr>
              <tr>
                <th>Remark</th>
                {
                  currentRole === "jens"
                    ?
                    <td>
                      <div className="d-flex align-items-stretch justify-content-between gap-3">
                        <textarea
                          className="form-control w-75"
                          style={{ height: "50px", resize: "none" }}
                          placeholder="Enter remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        />
                        <button
                          className="btn-outline-secondary w-25 btn btn-primary btn"
                          // style={{ height: "38px" }}
                          onClick={() => {

                            handleRemarkSubmit(id, remark);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                    :
                    <td>{reportData?.remark}</td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails

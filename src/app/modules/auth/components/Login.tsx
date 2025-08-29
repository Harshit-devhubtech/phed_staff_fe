/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import {useDispatch, useSelector} from 'react-redux'
import {adminAction} from '../../../../redux/common/action'

const loginSchema = Yup.object().shape({
  user_name: Yup.string()
    // .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('user_name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  role_id: Yup.string().required('role is required'),
})

const initialValues = {
  user_name: '',
  password: '',
  role_id: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const dispatch = useDispatch()
  const roles_list: any[] = useSelector((state: any) =>
    state.admin.roles_list ? state.admin.roles_list : []
  )

  useEffect(() => {
    dispatch(adminAction.getrolesList(''))
    // dispatch(adminAction.getRoleList('dhsg'))
    return () => {}
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.user_name, values.password, values.role_id)
        saveAuth(auth)

        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user)
        window.location.reload()
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Role </label>

        <select
          // className='form-select form-select-white mt-3'
          aria-label='Select example'
          // name='role_id'
          // onChange={(e) => {
          //   hendlerolewise(e.target.value)
          // }}
          {...formik.getFieldProps('role_id')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.role_id && formik.errors.role_id,
            },
            {
              'is-valid': formik.touched.role_id && !formik.errors.role_id,
            }
          )}
        >
          <option value={''}>Select Role</option>
          {/* <option value={''}>All</option> */}
          {/* <option>Admin</option>
                      <option>Sub Admin</option> */}
          {/* <option>Select Role</option> */}
          {roles_list &&
            roles_list?.map((data, i) => {
              return (
                <option value={data?.id} key={i}>
                  {data?.fullname}
                </option>
              )
            })}
          {/* <option value='0'>No</option> */}
        </select>
        {formik.touched.role_id && formik.errors.role_id && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.role_id}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-3'>
        <label className='form-label fs-6 fw-bolder text-dark'>user name</label>
        <input
          placeholder='user_name'
          {...formik.getFieldProps('user_name')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.user_name && formik.errors.user_name},
            {
              'is-valid': formik.touched.user_name && !formik.errors.user_name,
            }
          )}
          type='text'
          name='user_name'
          autoComplete='off'
        />
        {formik.touched.user_name && formik.errors.user_name && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.user_name}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      {/* begin::Action */}
      <div className='d-grid '>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}

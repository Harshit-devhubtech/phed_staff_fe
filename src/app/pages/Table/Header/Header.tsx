import React, {useState} from 'react'
// import {FontAwesomeIcon} from '@fortawesome/fontawesome-free'

const Header = (headers: any, onSorting: (field: any, order: any) => {}) => {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')

  const onSortingChange = (field: any) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'

    setSortingField(field)
    setSortingOrder(order)
    onSorting(field, order)
  }

 

  return (
    <thead>
      <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
        {headers?.headers.map((data: any) => (
          <th
            className='min-w-125px'
            key={data?.name}
            onClick={(e) => (data?.sortable ? onSortingChange(data?.field) : null)}
          >
            {data?.name}

            {
              sortingField &&
                sortingField === data?.field &&
                (sortingOrder === 'asc' ? (
                  //   <FontAwesomeIcon icon='fa-solid fa-arrow-down' />
                  <i className='fa-solid fa-arrow-down'></i>
                ) : (
                  <i className='fas fa-arrow-up'></i>
                ))
           
            }
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header

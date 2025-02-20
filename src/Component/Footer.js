import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full bg-gray-800 gap-y-6 py-6'>

        <table>
            <tr>
                <td className='text-gray-50 text-xs border-r px-2'>Privacy Policy</td>
                <td className='text-gray-50 text-xs border-r px-2'>Terms and Conditions</td>
                <td className='text-gray-50 text-xs px-2'>Cookies</td>
            </tr>
        </table>
        <p className='text-gray-50 text-xs'>©2024 adidas India Marketing Pvt. Ltd</p>
    </div>
  )
}

export default Footer
import React from 'react'
import { categories } from '../../assets/Data';

const ItemsInCase = () => {

    
  const displaycategories = categories.filter((item) => item.id > 5 && item.id < 11);

  return (
    <>
      <div className='tracking-wide h-1/2 sm:h-full rounded overflow-y-auto p-3 pr-0 pb-0 bg-[#15171e] sm:w-[50%] md:w-[30%] lg:w-[40%] xl:w-[30%]'>
          <h3 className='text-gray-300 text-lg font-medium mt-2 mb-1 flex justify-center sm:mt-0 sm:mb-0 sm:block'>ITEMS IN THE CASE:</h3>
          <div className='text-gray-300 text-lg font-medium flex justify-center mb-4 bg-gray-500 mr-3 sm:hidden'>HERES THE PROBABILITY</div>
          <div className='relative grid gap-2 font-sans grid-cols-2 sm:grid-cols-1 lg:grid-cols-2'>
            {displaycategories.map((item, index) => (
              <div
                key={index}
                className='border-none font-medium rounded bg-[#181a21] cursor-pointer flex flex-col items-center transition-all p-3 pt-1 relative hover:scale-105 group min-h-[185px] max-h-[190px] min-w-[170px] max-w-[190px] text-gray-300'
              >
                <span className='w-[176px] sm:w-[186px] h-[2px] bg-orange-400 ' > </span>
                <span className='absolute left-3 top-2'>5.35%</span>
                <img
                  className='group-hover:-rotate-6 transition-all w-full max-w-[60px] rendering-pixelated mt-6 slide-image'
                  style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)' }}
                  src={item.imageURL}
                  alt=''
                />
                <span className='mt-1'>{item.title}</span>
                <span className='flex items-center gap-1 mt-1'>
                  {item.price}
                  <img
                    src='https://growdice.co/assets/dl-2a39d38a.webp'
                    alt=''
                    className='w-4 h-4 ml-2'
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default ItemsInCase

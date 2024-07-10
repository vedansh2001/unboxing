import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories, items } from '../assets/Data';

const Spinpage = () => {
  const { id } = useParams();
  const displaycategories = categories.filter((item) => item.id > 5 && item.id < 11);
  const object = items.find(item => item.id == id);
  const img = object?.imageURL;
  const price = object?.price;

  return (
    <div className='w-full bg-slate-900'>
      <div className='w-full h-[500px] block sm:flex gap-2 mb-2 rounded bg-[#181a21]'>
        {/* Left Side */}
        <div className='tracking-wide h-full rounded overflow-y-auto p-3 pb-0 bg-[#15171e] sm:w-[50%] md:w-[30%]'>
          <h3 className='text-gray-300 font-medium mb-2'>ITEMS IN THE CASE:</h3>
          <div className='relative grid gap-2 font-sans grid-cols-2 sm:grid-cols-1 lg:grid-cols-2'>
            {displaycategories.map((item, index) => (
              <div
                key={index}
                className='border-none font-medium rounded bg-[#181a21] cursor-pointer flex flex-col items-center transition-all p-3 relative hover:scale-105 group min-h-[185px] max-h-[190px] min-w-[170px] max-w-[190px] text-gray-300'
              >
                <span className='absolute left-2 top-1'>5.35%</span>
                <img
                  className='group-hover:-rotate-6 transition-all w-full max-w-[60px] rendering-pixelated mt-6'
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

        {/* Right Side */}
        <div className='-ml-6 h-full font-sans tracking-wide font-medium text-gray-300 bg-[#181a21] flex flex-col justify-between p-3 sm:w-[50%] md:w-[70%]'>
          <Link to='/' className='flex justify-end'>Back</Link>
          <div className='md:flex'>
            <img className='w-36 h-32 w-max-[175px] h-max-[175px] ml-[20%] mr-12' src={img} alt='' />
            <div className='flex flex-col items-center gap-3'>
              <span>ALL IN</span>
              <div className='flex items-center font-semibold gap-1 text-black'>
                <span className='h-10 w-36 bg-green-300 rounded flex items-center justify-center mr-2'>
                  Open for {price}
                  <img
                    src='https://growdice.co/assets/dl-2a39d38a.webp'
                    alt=''
                    className='w-4 h-4 ml-2'
                  />
                </span>
                <span className='h-10 w-28 bg-slate-300 rounded flex items-center justify-center'>
                  Demo Spin
                </span>
              </div>
              <span>Skip Animation</span>
            </div>
          </div>
          <span className='flex justify-end'>Setting</span>
        </div>
      </div>

      {/* Additional Content */}
      <div className='item-container relative overflow-hidden w-full h-[250px] px-5 rounded bg-[#181a21] flex'>
        {items.map((item, index) => (
          <div key={index} className='min-h-[180px] min-w-[140px] flex flex-col justify-center'>
            <img
              src={item.imageURL}
              alt=''
              className='min-w-[50px] min-h-[50px] max-w-[70px] max-h-[70px] select-none rendering-pixelated'
            />
          </div>
        ))}
      </div>

      {/* Placeholder for Height */}
      <div className='h-[500px] w-full bg-slate-900'></div>
    </div>
  );
};

export default Spinpage;

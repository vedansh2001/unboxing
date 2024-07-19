import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { items } from '../../assets/Data';

const LiveDrop = () => {
    const InitialItems = items;
    const [slidesToShow, setSlidesToShow] = useState(8);

    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setSlidesToShow(8);
      } else if (width >= 992) {
        setSlidesToShow(6);
      } else if (width >= 800){
        setSlidesToShow(5)
      } else if (width >= 600) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(3);
      }
    };
    useEffect(() => {
      updateSlidesToShow();
  
      window.addEventListener('resize', updateSlidesToShow);
  
      return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);


    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true
      };

  return (
    <>
      <div className='bg-[#15171e] font-medium text-sm leading-3 w-full flex flex-col gap-1 px-5 font-sans tracking-wide'>
  <span className='mt-3 mb-2 px-2 text-gray-300'>Live drops</span>
  <div className='relative w-full gap-2 font-sans'>
    <Slider {...settings}>
      {InitialItems.map((item, index) => (
        <div
          key={index}
          className='flex flex-col justify-center items-center text-sm bg-[#181a21] font-normal text-gray-300 
          rounded-sm cursor-pointer px-2 py-4 overflow-hidden min-w-[140px] min-h-[160px] max-h-[160px] max-w-[140px]'
        >
          <img
            className="w-full max-w-[90px] ml-6"
            style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)' }}
            src={item.imageURL}
            alt=''
          />
          <div className='flex justify-center my-2'>{item.title}</div>
          <div className='flex justify-center items-center'>
            {item.price}
            <img
              src='https://growdice.co/assets/dl-2a39d38a.webp'
              alt=''
              className='w-4 h-4 ml-2'
            />
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>
    </>
  )
}

export default LiveDrop

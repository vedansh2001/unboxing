import React, { useEffect, useState } from 'react';
import { items } from '../assets/Data';
import debounce from 'lodash.debounce';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage = () => {
  const InitialItems = items;
  const [sortedItems, setSortedItems] = useState(InitialItems);
  const [query, setQuery] = useState("");

  const updateQuery = (e) => setQuery(e.target.value.toLowerCase());
  const debouncedOnchange = debounce(updateQuery, 300);

  useEffect(() => {
    const filteredProd = query
      ? items.filter((item) => item.title.toLowerCase().includes(query))
      : InitialItems;
    setSortedItems(filteredProd);
  }, [query]);

  const handleClick = () => {
    setSortedItems(filteredProd)
  }

  const handleFeatured = () => {
    setSortedItems(InitialItems);
  };

  const handleLowToHigh = () => {
    const sorted = [...sortedItems].sort((a, b) => a.price - b.price);
    setSortedItems(sorted);
  };

  const handleHighToLow = () => {
    const sorted = [...sortedItems].sort((a, b) => b.price - a.price);
    setSortedItems(sorted);
  };
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true
  };

  return (
    <>
      <div>
      <div className='bg-[#15171e]  font-medium text-sm leading-3 w-full flex flex-col gap-1 px-5 font-sans tracking-wide'>
        <span className=' mt-3 mb-2 px-2 text-gray-300'>Live drops</span>
        <div className='relative w-full overflow-hidden gap-2 font-sans'>
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

        
        <div className='flex text-sm  font-medium flex-row px-7 py-6 bg-[#15171e] w-[100%] leading-3  text-gray-200 tracking-wide'>
          <div className='flex w-full mt-4  gap-10 '>
            <input type='text' placeholder='Search case name...' onChange={debouncedOnchange} className='h-8 rounded bg-gray-800 p-3 w-[65%]' />
          

          <div className='w-[35%] flex items-center'>
            <span className='pr-2'>Sort by :</span>
            <select
              name='sort by'
              className='px-2 flex-grow h-8 rounded bg-gray-800 cursor-pointer'
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'featured') handleFeatured();
                if (value === 'lowtohigh') handleLowToHigh();
                if (value === 'hightolow') handleHighToLow();
              }}
            >
              <option value='featured'>Featured</option>
              <option value='lowtohigh'>Price: Low to High</option>
              <option value='hightolow'>Price: High to Low</option>
            </select>
          </div>
          </div>
        </div>

        <div className='relative tracking-wide text-sm leading-3 font-sans bg-[#15171e] p-7 grid gap-3 grid-cols-7 min-h-[calc(100vh-250px)]'>
          {sortedItems.map((item, index) => (
            <div
              key={index}
              className=' border-none font-medium rounded bg-[#181a21] cursor-pointer flex flex-col items-center transition-all p-3 
              relative gap-4 hover:scale-105 group min-h-[170px] max-h-[170px]'
            >
              <span className='text-gray-300'>{item.title}</span>
              <img
                className='group-hover:-rotate-6 transition-all w-full max-w-[90px] rendering-pixelated'
                style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)' }}
                src={item.imageURL}
                alt=''
              />
              <span className='text-gray-300 flex items-center gap-1'>
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
  );
};

export default Homepage;

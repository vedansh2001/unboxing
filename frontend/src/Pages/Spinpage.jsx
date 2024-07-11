import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories, items } from '../assets/Data';

const Spinpage = () => {
  const { id } = useParams();
  const displaycategories = categories.filter((item) => item.id > 5 && item.id < 11);
  const object = items.find(item => item.id == id);
  const img = object?.imageURL;
  const price = object?.price;
  
  const [isChecked, setIsChecked] = useState(false); // State variable to track checkbox status
  const [isScrolling, setIsScrolling] = useState(false); // State variable to track scrolling animation
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  let scrollAmount = 20; // Adjust scroll speed here (increase this value for faster scrolling)
  let time = 3000 + 4000 * Math.random();

  const startScroll = () => {
    setIsScrolling(true);
    if (isChecked) {
      scrollAmount = 30;
      time = 1500 + 1500 * Math.random();
    }
    const container = containerRef.current;
    const scrollInterval = setInterval(() => {
      container.scrollLeft += scrollAmount;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.appendChild(container.firstElementChild.cloneNode(true));
        container.removeChild(container.firstElementChild);
        container.scrollLeft = 0;
        setCurrentIndex(currentIndex => (currentIndex + 1) % categories.length);
      }
    }, 10); // Adjust interval time here (decrease this value for faster animation)

    // Clear interval and set scrolling state to false after random duration
    setTimeout(() => {
      clearInterval(scrollInterval);
      setIsScrolling(false);
    }, time);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Update state based on checkbox status
  };

  return (
    <div className='w-full bg-[#15171e]'>
      <div className='w-full sm:h-[500px] h-[1000px] block sm:flex gap-2 mb-1 rounded bg-[#181a21]'>
        {/* Left Side */}
        <div className='tracking-wide h-1/2 sm:h-full rounded overflow-y-auto p-3 pr-0 pb-0 bg-[#15171e] sm:w-[50%] md:w-[30%] lg:w-[40%] xl:w-[30%]'>
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
        <div className='-ml-6 h-1/2 sm:h-full font-sans tracking-wide font-medium text-gray-300 bg-[#181a21] flex flex-col justify-between p-5 sm:w-[50%] md:w-[70%] lg:w-[60%] xl:w-[70%]'>
          <Link to='/' className='flex justify-end'>Back</Link>
          <div className='lg:flex'>
            <img
              className='w-36 h-32 w-max-[175px] h-max-[175px] ml-[35%] lg:ml-[23%] mr-12 mb-8'
              style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)' }}
              src={img}
              alt=''
            />
            <div className='flex flex-col gap-4 items-center md:items-center lg:items-start sm:ml-9 md:ml-0'>
              <span>ALL IN</span>
              <div className='flex items-center font-semibold gap-1 text-black'>
                <span className='h-10 w-40 bg-green-300 cursor-pointer rounded flex items-center justify-center mr-2'>
                  Open for {price}
                  <img
                    src='https://growdice.co/assets/dl-2a39d38a.webp'
                    alt=''
                    className='w-4 h-4 ml-2'
                  />
                </span>
                <button
                  onClick={startScroll}
                  disabled={isScrolling}
                  className={`h-10 w-28 bg-slate-300 cursor-pointer rounded flex items-center justify-center ${
                    isScrolling ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Demo Spin
                </button>
              </div>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  id='vehicle1'
                  name='vehicle1'
                  className='h-6 w-6 mr-2 bg-sky-500'
                  value='Bike'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Skip Animation
              </label>
            </div>
          </div>
          <span className='flex justify-end cursor-pointer'>Setting</span>
        </div>
      </div>

      {/* Additional Content */}
      <div>
        <div className='item-container relative overflow-hidden w-full h-[250px] px-5 rounded bg-[#181a21] flex' ref={containerRef}>
          {categories.map((item, index) => (
            <div key={index} className='min-h-[180px] min-w-[140px] flex flex-col justify-center'>
              <img
                src={item.imageURL}
                alt=''
                className='min-w-[50px] min-h-[50px] max-w-[70px] max-h-[70px] select-none rendering-pixelated'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for Height */}
      <div className='h-[500px] w-full bg-[#15171e]'></div>
    </div>
  );
};

export default Spinpage;

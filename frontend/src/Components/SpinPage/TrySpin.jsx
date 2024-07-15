import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { items } from '../../assets/Data';

const TrySpin = ({isScrolling, setIsScrolling, id, isChecked, setIsChecked, setIsSliding, containerRef}) => {

  const object = items.find(item => item.id == id);
  const img = object?.imageURL;
  const price = object?.price;
  
  let scrollAmount = 20;
  let time = 3000 + 4000 * Math.random();
  let stopScroll = false;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const startScroll = () => {
    setIsScrolling(true);
    setIsSliding(false);
    stopScroll = false; // Reset stopScroll flag

    if (isChecked) { 
      scrollAmount = 30;
      time = 1500 + 1500 * Math.random();
    }
    const container = containerRef.current;
    const scrollInterval = setInterval(() => {
    container.scrollLeft += scrollAmount;

      // Check if we should stop scrolling
      if (!stopScroll && container.scrollLeft >= container.scrollWidth / 2) {
        container.appendChild(container.firstElementChild.cloneNode(true));
        container.removeChild(container.firstElementChild);
        container.scrollLeft = 0;
      }
    }, 10);

    setTimeout(() => {
      clearInterval(scrollInterval);
      setIsScrolling(false);
      setIsSliding(true);
    }, time);
  };

  return (
    <>
      <div className='-ml-7 h-1/2 sm:h-full font-sans tracking-wide font-medium text-gray-200 bg-[#181a21] flex flex-col justify-between p-5 sm:w-[50%] md:w-[70%] lg:w-[60%] xl:w-[70%]'>
          
          <Link to='/' className='flex justify-end hover:opacity-90'>Back</Link>

          <div className='lg:flex'>
            <img
              className='w-36 h-32 w-max-[175px] h-max-[175px] ml-[35%] lg:ml-[23%] mr-12 mb-8'
              style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)' }}
              src={img}
              alt=''
            />
            <div 
              className='flex flex-col gap-4 items-center md:items-center lg:items-start sm:ml-9 md:ml-0'
            >
              <span>ALL IN</span>
              <div 
                className='flex items-center font-semibold gap-1 text-black'
              >
                <span 
                  className='h-10 w-40 transition-colors duration-300 ease-in-out hover:bg-orange-400 text-gray-100 cursor-pointer
                  rounded-sm flex items-center justify-center mr-2 border-solid border-green-600 border-2'
                >
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
                    className={`h-10 w-28 text-gray-100 transition-colors duration-300 ease-in-out hover:bg-orange-400 cursor-pointer border-solid border-green-600 border-2 rounded-sm flex items-center justify-center ${
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
          <span 
              className='flex justify-end cursor-pointer hover:opacity-90'>Setting
          </span>
          
        </div>
    </>
  )
}

export default TrySpin

import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories, items } from '../assets/Data';

const Spinpage = () => {
  const { id } = useParams();
  const displaycategories = categories.filter((item) => item.id > 5 && item.id < 11);
  const object = items.find(item => item.id == id);
  const img = object?.imageURL;
  const price = object?.price;

  const [isChecked, setIsChecked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef(null);

  let scrollAmount = 20;
  let time = 3000 + 4000 * Math.random();
  let stopScroll = false;

  let randomID = Math.floor(80*Math.random())

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
        setCurrentIndex(currentIndex => (currentIndex + 1) % categories.length);
      }
    }, 10);

    setTimeout(() => {
      clearInterval(scrollInterval);
      setIsScrolling(false);
      setIsSliding(true);
    }, time);
  };



  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  return (
    <div className='w-full bg-[#15171e]'>
      <div className='w-full sm:h-[500px] h-[1000px] block sm:flex gap-2 mb-1 rounded bg-[#181a21]'>

        {/* Left Side */}
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

        {/* Right Side */}
        <div className='-ml-7 h-1/2 sm:h-full font-sans tracking-wide font-medium text-gray-200 bg-[#181a21] flex flex-col justify-between p-5 sm:w-[50%] md:w-[70%] lg:w-[60%] xl:w-[70%]'>
          <Link to='/' className='flex justify-end hover:opacity-90'>Back</Link>
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
                <span className='h-10 w-40 transition-colors duration-300 ease-in-out hover:bg-orange-400 text-gray-100 cursor-pointer rounded-sm flex items-center justify-center mr-2 border-solid border-green-600 border-2'>
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
          <span className='flex justify-end cursor-pointer hover:opacity-90'>Setting</span>
        </div>
      </div>

      {/* Additional Content */}
      <div>
        <div
             className={`text-gray-950 ${isSliding ? 'hidden' : 'item-container text-gray-300 absolute overflow-hidden w-full h-[250px] rounded bg-[#181a21] flex '}`}
        ref={containerRef}>
          {categories.map((item, index) => (
            <div key={index} className='min-h-[180px] min-w-[140px] max-w-[150px] flex flex-col items-center justify-center'>
              <img
                src={item.imageURL}
                alt=''
                className='min-w-[60px] min-h-[60px] max-w-[70px] max-h-[70px] select-none rendering-pixelated'
              />
              {item.id}
            </div>
          ))}
        </div>
        <div className={`text-gray-950 ${isSliding ? 'h-[250px] relative top-[45px] left-1/2 transform -translate-x-1/2 min-w-[140px] min-h-[160px] max-h-[260px] max-w-[140px] items-center rounded-md' : 'hidden'}`}>
        <div
          className='flex flex-col justify-center items-center text-sm bg-[#232630] font-normal text-gray-300 
          rounded-sm cursor-pointer px-2 py-4 overflow-hidden min-w-[140px] min-h-[160px] max-h-[160px] max-w-[140px]  '
        >
          <style jsx>{`
        @keyframes updown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
          <img
            className="w-full max-w-[60px] flex justify-center"
            // style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.3) -6px 6px 0px)','updown 2s ease-in-out infinite' }}
            src={categories[randomID].imageURL}
            alt=''
            style={{
              animation: 'updown 2s ease-in-out infinite',
            }}
          />
          
          <div className='flex font-medium tracking-wide justify-center my-2'>{categories[randomID].title}</div>
          <div className='flex font-medium justify-center items-center'>
            {categories[randomID].price}
            <img
              src='https://growdice.co/assets/dl-2a39d38a.webp'
              alt=''
              className='w-4 h-4 ml-2'
            />
          </div>
        </div>
        </div>
      </div>

      {/* Placeholder for Height */}
      <div className='h-[500px] w-full bg-[#15171e]'>
      </div>
      
    </div>
  );
};

export default Spinpage;

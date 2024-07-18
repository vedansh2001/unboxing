import React, { useEffect, useState } from 'react';
// import { categories } from '../../assets/Data';

const Spinner = ({ isSliding, containerRef, itemsArray }) => {
  const randomID = Math.floor(80 * Math.random());

  function shuffleArray(array) {
    // Create a copy of the original array to avoid modifying it directly
    const shuffledArray = [...array];    
    // Start from the end of the array and swap elements randomly
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
    }    
    return shuffledArray;
  }
  const categories = shuffleArray(itemsArray);

  // const [categories, setCategories] = useState([])
  // setCategories(itemsArray)

  // useEffect(() => {
  //   const getFeedPosts = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/");
  //       if (!res.ok) {
  //         throw new Error("Fetch error: " + res.status);
  //       }
  //       const data = await res.json();
  //       setCategories(data);
  //     } catch (error) {
  //       alert("Error fetching data. Please try again later.");
  //     }
  //   }

  //   getFeedPosts();

  // }, []);


  return (
    <>
      <div>
        <div
          className={`text-gray-950 ${isSliding ? 
            'hidden' : 'item-container text-gray-300 absolute overflow-hidden w-full h-[250px] rounded bg-[#181a21] flex'}`}
          ref={containerRef}
        >
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
        <div className={`text-gray-950 ${isSliding ? 
          'h-[250px] relative top-[45px] left-1/2 transform -translate-x-1/2 min-w-[140px] min-h-[160px] max-h-[260px] max-w-[140px] items-center rounded-md' 
          : 'hidden'}`}
        >

          <div
            className='flex flex-col justify-center items-center text-sm bg-[#232630] font-normal text-gray-300 rounded-sm cursor-pointer px-2 py-4 overflow-hidden min-w-[140px] min-h-[160px] max-h-[160px] max-w-[140px]'
          >
            <style>
              {`
                @keyframes updown {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-15px); }
                }
              `}
            </style>
            {categories && categories[randomID]?.imageURL && (
            <img
              className="w-full max-w-[60px] flex justify-center"
              src={categories[randomID].imageURL}
              alt=''
              style={{
                animation: 'updown 2s ease-in-out infinite',
              }}
            />
            )}
            {categories && categories[randomID]?.title && (
            <div className='flex font-medium tracking-wide justify-center my-2'>{categories[randomID].title}</div>
            )}
            {categories && categories[randomID]?.price && (
            <div className='flex font-medium justify-center items-center'>
              
              {categories[randomID].price}
              <img
                src='https://growdice.co/assets/dl-2a39d38a.webp'
                alt=''
                className='w-4 h-4 ml-2'
              />
            </div>
            )}
            
          </div>


        </div>
      </div>
    </>
  );
};

export default Spinner;
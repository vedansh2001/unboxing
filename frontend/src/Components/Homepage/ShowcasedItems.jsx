import React, { useEffect, useState } from 'react'
import { items } from '../../assets/Data';
import debounce from 'lodash.debounce';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const scrollToTop = () => {
    window.scrollTo(0, 0)
  }  
  

const ShowcasedItems = () => {

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
  
  


  return (
    <>
      <div>
   

<div className='flex text-sm  font-medium flex-row px-7 py-6 bg-[#15171e] w-[100%] leading-3  text-gray-200 tracking-wide'>
  <div className='block w-full mt-4  gap-10 
  md:flex
  '>
    <div className='h-8 rounded border-solid border-[#22283e] border-[1px] w-[100%]
   md:w-[65%]' >
    <input type='text' placeholder='Search case name...' className='bg-gray-800 rounded px-3 h-8 w-full' onChange={debouncedOnchange} />
    </div>
  
  
  <div className='grid w-[100%] mt-4
  md:w-[30%]
  md:flex
  md:items-center
  md:mt-0
  '>
    <span className='pl-1 mb-2 md:mb-0 md:pr-2'>Sort By :</span>
    <select
      name='sort by'
      className='px-2 flex-grow h-8 rounded border-solid border-[#22283e] border-[1px] bg-gray-800 cursor-pointer'
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


<div className='relative tracking-wide text-sm leading-3 font-sans bg-[#15171e] p-7 grid gap-3 min-h-[calc(100vh-250px)]
 grid-cols-2
 sm:grid-cols-3
 md:grid-cols-4
 lg:grid-cols-5
 xl:grid-cols-7
'>
  {sortedItems.map((item, index) => (
    <Link to={`spinpage/${item.id}`} onClick={scrollToTop}>
    <div
      key={index}
      className=' border-none font-medium rounded bg-[#181a21] cursor-pointer flex flex-col items-center transition-all p-3 
      relative gap-4 hover:scale-105 group min-h-[170px] max-h-[170px] max-w-[170px]'
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
    </Link>
  ))}
</div>
</div>
    </>
  )
}

export default ShowcasedItems

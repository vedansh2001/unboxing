import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemsInCase from '../Components/SpinPage/ItemsInCase';
import Spinner from '../Components/SpinPage/Spinner';
import TrySpin from '../Components/SpinPage/TrySpin';

const Spinpage = () => {
  const { id } = useParams(); 
  const [isChecked, setIsChecked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef(null);
  const [showItems, setShowItems] = useState([])
  const [itemsArray, setItemsArray] = useState([])

  
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(`https://backend-r9oyhy6ku-vedansh-mishras-projects-5df6cc6a.vercel.app/getItems/${id}`);
        if (!res.ok) {
          throw new Error("Fetch error: " + res.status);
        }
        const data = await res.json();        
        setShowItems(data);
        
        const dataArray = data.listofobj.flatMap(item =>
          Array.from({ length: item.prob }, () => ({
            id: item.id,
            imageURL: item.imageURL,
            title: item.title,
            price: item.price
          }))
        );
        setItemsArray(dataArray)
        
      } catch (error) {
        alert("Error fetching data. Please try again later.");
      }
    }
    getItems();
  }, []);



  

  return (
    <div className='w-full bg-[#15171e]'>
      <div className='w-full sm:h-[500px] h-[1000px] block sm:flex gap-2 mb-1 rounded bg-[#181a21]'>

      {showItems && showItems.listofobj ? (
          <ItemsInCase showItems={showItems}/>
        ) : (
          <div className='text-gray-300 relative top-[40%] left-[40%]' >Loading...</div>
        )}

          <TrySpin  
            isScrolling={isScrolling} setIsScrolling={setIsScrolling} id={id} isChecked={isChecked} 
            setIsChecked={setIsChecked} setIsSliding={setIsSliding} containerRef={containerRef} 
          />
      </div>
      {itemsArray && itemsArray.length>0 ? (
        <Spinner isSliding={isSliding} containerRef={containerRef} itemsArray={itemsArray} />
      ) : (
        <div className='text-gray-300 relative top-[50%] left-[50%]'>Loading...</div>
      )}

      
      <div className='h-[500px] w-full bg-[#15171e]'></div>
    </div>
  );
};

export default Spinpage;

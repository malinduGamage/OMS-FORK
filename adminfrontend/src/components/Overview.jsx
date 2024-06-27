import React from "react";
import { goodsList } from "../constants";
import Carousel from "./Carousel";
import { slideImages } from "../constants";
import { timeTable } from "../constants";

const Overview = () => {

  
  const formatAddress = (address) => {
    
    let parts = address.split(',').map(part => part.trim());

    
    parts[0] = parts[0].replace(' ', '');

   
    return parts.join('<br>');
  }

  
  const formattedAddress = formatAddress('No 85, Desimount Housing Scheme , pilessa , kurunegala');

  return (
    <>

    <div>


     

      <div className="grid lg:grid-cols-2 h-[50vh] my-20 ">

        <div className="w-full ">

        <h1 className="px-10 text-2xl font-bold mt-5 text-center">Brighten a Child's Day: Spend Your Free Time with Us!</h1>

        <p className="text-sm mx-20 mt-10  text-justify">At our  orphanage, we warmly welcome you to make a difference. You can choose a time slot that suits your schedule and confirm it with our friendly staff. Whether you wish to offer a meal during breakfast, lunch, or dinner, or to inspire and teach during our volunteer sessions, your presence and support are invaluable. Each moment spent with our children enriches their lives and helps build a nurturing community. </p>

        <p className="mx-20 mt-10 text-primary text-sm">Contact Us: 037-2234223</p>

        </div>

        <div className="w-full md:my-0  ">

          <div className=" mt-20 mx-20">
          {
            timeTable.map((item,index)=>(
              <p className="my-3 text-sm" key={index}>
                {item.time} - {item.task}
              </p>
            ))
          }

          </div>

         


        </div>
      </div>

      <Carousel images={slideImages}/>

    </div>
    
    <div className="grid lg:grid-cols-2 h-[50vh] my-20  ">
      <div className="bg-primary w-full">
        <div className="p-10 relative ">
          <h1 className="text-white text-2xl font-bold">Donate Goods</h1>
          <p className="text-white font-semibold mt-4 mb-10 text-md">See how you can make a difference...</p>
          <p className="text-md text-white mt-4 font-semibold">Our Address:</p>
          <p className="text-white mt-4 text-md mb-10" dangerouslySetInnerHTML={{ __html: formattedAddress }}></p>

          <h1 className="text-white text-2xl font-bold my-5">For Financial Donations</h1>
          <button className="text-white  px-5 py-2 border-white border-2 hover:border-primary hover:bg-white hover:text-primary transition-all duration-300 ">Proceed here</button>
        </div>
      </div>
      <div className=" flex flex-col gap-4 w-full">

        <div className="p-10">
          <h1 className="text-2xl font-bold">What Is Useful To Us</h1>

          {goodsList.map((item, index) => (
            <p key={index} className=" mt-2 text-sm flex items-start">
              <span className="bullet">&#8226;</span> {/* Round bullet point */}
              <span className="ml-2">
                {item.item} {item.details && <span>- {item.details}</span>}
              </span>
            </p>
          ))}

          <div className=""></div>
        </div>
       
      </div>
    </div></>
   
  );
};

export default Overview;

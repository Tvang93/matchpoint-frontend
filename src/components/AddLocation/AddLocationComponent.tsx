"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourtConditionComponent from "./CourtConditionComponent";
import AmenitiesComponent from "./AmenitiesComponent";

const AddLocationComponent = () => {
  const { push } = useRouter();

  const [courtConditionArr, setCourtConditionArr] = useState<string[]>([]);
  const [courtCondition, setCourtCondition] = useState<string>("");

  const handleCourtConditionArr = () => {
    const arrToAdd = courtConditionArr;
    arrToAdd.push(courtCondition);
    console.log(arrToAdd);
    setCourtConditionArr(arrToAdd);
    console.log(courtConditionArr);
  };

  useEffect(() => {
    if (courtCondition !== "") {
      console.log(courtCondition);
      handleCourtConditionArr();
    }
  }, [courtCondition]);

  const handleDeleteCourtCondition = (con: string) => {
    const arrToAdd = courtConditionArr;
    const idx = arrToAdd.indexOf(con);
    arrToAdd.splice(idx, 1);
    console.log(arrToAdd);
    setCourtConditionArr(arrToAdd);
    console.log(courtConditionArr);
  };

  const [amenities, setAmenities] = useState<string>("");
  const [amenitiesArr, setAmenitiesArr] = useState<string[]>([]);

  useEffect(() => {
    if (amenities !== "") {
      console.log(amenities);
      handleAmenitiesArr();
    }
  }, [amenities]);

  const handleAmenitiesArr = () => {
    const arrToAdd = amenitiesArr;
    arrToAdd.push(amenities);
    console.log(arrToAdd);
    setAmenitiesArr(arrToAdd);
    console.log(amenitiesArr);
  };

  const handleDeleteAmenities = (amen: string) => {
    const arrToAdd = amenitiesArr;
    const idx = arrToAdd.indexOf(amen);
    arrToAdd.splice(idx, 1);
    console.log(arrToAdd);
    setAmenitiesArr(arrToAdd);
    console.log(amenitiesArr);
  };

  const handleBackToHome = () => {
    push("/");
  };

  return (
    <div className="flex flex-col py-15 px-20 ">
      <h1 className="self-center text-[#E1FF00] text-4xl mb-3">Add Location</h1>
      <div className="flex w-full justify-between">
        <div className="text-[#E1FF00]">placeholder</div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#E1FF00] text-xl">Coodinates:</h2>
            <div className="flex gap-5">
              <input
                id="LatitudeField"
                className="border-1 bg-white"
                type="number"
              />
              <input
                id="LongitudalField"
                className="border-1 bg-white"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[#E1FF00] text-xl">Name of Location:</h2>
            <input
              id="LocationNameField"
              className="bg-white border-1"
              type="text"
            />
          </div>
        </div>
        <div className="text-[#E1FF00]">placeholder</div>
      </div>
      <h2 className="text-[#E1FF00] my-3 text-xl">Add Tags:</h2>
      <div className="grid grid-cols-2">
        <div className="h-80">
          <h3 className="text-[#E1FF00] mb-3">Condition of Court:</h3>
          <CourtConditionComponent
            deleteFunction={handleDeleteCourtCondition}
            setFunction={setCourtCondition}
            stringArr={courtConditionArr}
          />
        </div>
        <div className="h-80">
          <h3 className="text-[#E1FF00] mb-3">Amenities:</h3>
          <AmenitiesComponent
            deleteFunction={handleDeleteAmenities}
            setFunction={setAmenities}
            stringArr={amenitiesArr}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-[#E1FF00] border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)] w-100 self-center">
          Add Location
        </button>
        <button
          className="bg-white border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgba(255,255,255,0.80)] w-100 self-center"
          onClick={handleBackToHome}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default AddLocationComponent;

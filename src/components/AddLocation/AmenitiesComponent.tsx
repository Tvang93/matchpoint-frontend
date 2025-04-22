"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

const AmenitiesComponent = () => {
  const [isAmenitiesModalActive, setIsAmenitiesModalActive] =
    useState<boolean>(false);
  const [amenities, setAmenities] = useState<string>("");
  const [amenitiesToAdd, setAmenitiesToAdd] = useState<string>("");
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

  return (
    <div>
      <button
        className="bg-white rounded-full w-10 hover:cursor-pointer hover:bg-[rgba(255,255,255,0.80)]"
        onClick={() => setIsAmenitiesModalActive(true)}
      >
        +
      </button>
      <Modal
        show={isAmenitiesModalActive}
        onClose={() => setIsAmenitiesModalActive(false)}
      >
        <ModalHeader>Add Amenity</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <input
              type="text"
              className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2"
              placeholder="Add an Amenity. eg. bathrooms"
              onChange={(e) => setAmenitiesToAdd(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setIsAmenitiesModalActive(false)}>
            Close
          </Button>
          <Button
            onClick={() => [
              setAmenities(amenitiesToAdd),
              setIsAmenitiesModalActive(false),
            ]}
          >
            Add Amenity
          </Button>
        </ModalFooter>
      </Modal>
      <ul className="flex pt-2">
        {amenitiesArr.map((amenity: string, idx: number) => (
          <li
            key={idx}
            className="flex gap-2 bg-[#99a7bd] border-1 border-[#E1FF00] rounded-full me-2 px-3 my-1"
          >
            <div className="">{amenity}</div>
            <div
              className="bg-white"
              onClick={() => handleDeleteAmenities(amenity)}
            >
              X
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenitiesComponent;

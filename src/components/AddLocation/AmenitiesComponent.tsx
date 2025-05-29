"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import React, { useState } from "react";

interface CourtConditionComponentProps {
  stringArr: string[];
  stringToAdd: string;
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  setToAddFunction: React.Dispatch<React.SetStateAction<string>>;
  deleteFunction: (con: string) => void;
}

const AmenitiesComponent: React.FC<CourtConditionComponentProps> = ({
  stringArr,
  setFunction,
  deleteFunction,
  stringToAdd,
  setToAddFunction
}) => {
  const [isAmenitiesModalActive, setIsAmenitiesModalActive] =
    useState<boolean>(false);


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
              id="AddAmenityInputField"
              type="text"
              className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2"
              placeholder="Add an Amenity. eg. bathrooms"
              onChange={(e) => setToAddFunction(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setIsAmenitiesModalActive(false)}>
            Close
          </Button>
          <Button
            onClick={() => [
              setFunction(stringToAdd),
              setIsAmenitiesModalActive(false),
            ]}
          >
            Add Amenity
          </Button>
        </ModalFooter>
      </Modal>
      <ul className="flex pt-2">
        {stringArr.map((amenity: string, idx: number) => (
          <li
            key={idx}
            className="flex gap-2 bg-[#1e2a44] text-[#E1FF00] border-1 border-white rounded-full me-2 ps-3 my-1"
          >
            <div className="">{amenity}</div>
            <div className="border rounded-e-full border-white p-1 text-[10px] text-white cursor-pointer hover:bg-[#99a7bd] hover:brightness-125 hover:text-gray-600" onClick={() => deleteFunction(amenity)}>
              X
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenitiesComponent;

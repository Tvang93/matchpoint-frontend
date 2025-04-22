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
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  deleteFunction: (con: string) => void
}

const AmenitiesComponent: React.FC<CourtConditionComponentProps> = ({
  stringArr,
  setFunction,
  deleteFunction
}) => {
  
  const [isAmenitiesModalActive, setIsAmenitiesModalActive] =
      useState<boolean>(false);
      const [amenitiesToAdd, setAmenitiesToAdd] = useState<string>("");

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
              setFunction(amenitiesToAdd),
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
            className="flex gap-2 bg-[#99a7bd] border-1 border-[#E1FF00] rounded-full me-2 px-3 my-1"
          >
            <div className="">{amenity}</div>
            <div
              className="bg-white"
              onClick={() => deleteFunction(amenity)}
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

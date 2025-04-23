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

const CourtConditionComponent: React.FC<CourtConditionComponentProps> = ({
  stringArr,
  setFunction,
  deleteFunction,
  stringToAdd,
  setToAddFunction
}) => {
  const [isCourtModalActive, setIsCourtModalActive] = useState<boolean>(false);



  return (
    <div>
      <button
        className="bg-white rounded-full w-10 hover:cursor-pointer hover:bg-[rgba(255,255,255,0.80)]"
        onClick={() => setIsCourtModalActive(true)}
      >
        +
      </button>
      <Modal
        show={isCourtModalActive}
        onClose={() => setIsCourtModalActive(false)}
      >
        <ModalHeader>Add Court Condition</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <input
              id="addCourtConditionInputField"
              type="text"
              className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2"
              placeholder="Add a Condition. eg. Cracked Surface"
              onChange={(e) => setToAddFunction(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setIsCourtModalActive(false)}>
            Close
          </Button>
          <Button
            onClick={() => [
              setFunction(stringToAdd),
              setIsCourtModalActive(false),
            ]}
          >
            Add Condition
          </Button>
        </ModalFooter>
      </Modal>
      <ul className="flex pt-2">
        {stringArr.map((conditions: string, idx: number) => (
          <li
            key={idx}
            className="flex gap-2 bg-[#99a7bd] border-1 border-[#E1FF00] rounded-full me-2 px-3 my-1"
          >
            <div className="">{conditions}</div>
            <div
              className="bg-white"
              onClick={() => deleteFunction(conditions)}
            >
              X
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtConditionComponent;

'use client'

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "flowbite-react";
import React, { useEffect, useState } from "react";

const CourtConditionComponent = () => {

  const [isCourtModalActive, setIsCourtModalActive] = useState<boolean>(false);
  const [courtCondition, setCourtCondition] = useState<string>("");
  const [conditionToAdd, setConditionToAdd] = useState<string>("");
  const [courtConditionArr, setCourtConditionArr] = useState<string[]>([]);

  useEffect(() => {
    if(courtCondition !== ""){
      console.log(courtCondition);
      handleCourtConditionArr();
    }
  }, [courtCondition]);

  const handleCourtConditionArr = () => {
    const arrToAdd = courtConditionArr;
    arrToAdd.push(courtCondition);
    console.log(arrToAdd);
    setCourtConditionArr(arrToAdd);
    console.log(courtConditionArr);
  };
  
  const handleDeleteCourtCondition = (con: string) => {
    const arrToAdd = courtConditionArr;
    const idx = arrToAdd.indexOf(con)
    arrToAdd.splice(idx, 1);
    console.log(arrToAdd);
    setCourtConditionArr(arrToAdd);
    console.log(courtConditionArr);
  }

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
              type="text"
              className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2"
              placeholder="Add a Condition. eg. Cracked Surface"
              onChange={(e) => setConditionToAdd(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setIsCourtModalActive(false)}>
            Close
          </Button>
          <Button
            onClick={() => [
              setCourtCondition(conditionToAdd),
              setIsCourtModalActive(false),
            ]}
          >
            Add Condition
          </Button>
        </ModalFooter>
      </Modal>
      <ul className="flex pt-2">
        {courtConditionArr.map((conditions: string, idx: number) => (
          <li
            key={idx}
            className="flex gap-2 bg-[#99a7bd] border-1 border-[#E1FF00] rounded-full me-2 px-3 my-1"
          >
            <div className="">{conditions}</div>
            <div
              className="bg-white"
              onClick={() => handleDeleteCourtCondition(conditions)}
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

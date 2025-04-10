"use client";

// import CourtConditionModalComponent from "@/components/AddLocation/CourtConditionModalComponent";
import NavbarComponent from "@/components/NavbarComponent";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddLocationPage = () => {
  // const { push } = useRouter();

  const [isCourtModalActive, setIsCourtModalActive] = useState<boolean>(false);
  const [isAmenitiesModalActive, setIsAmenitiesModalActive] =
    useState<boolean>(false);
  const [courtCondition, setCourtCondition] = useState<string>("");
  const [conditionToAdd, setConditionToAdd] = useState<string>("");
  const [courtConditionArr, setCourtConditionArr] = useState<string[]>([]);

  const [amenities, setAmenities] = useState<string>("");
  const [amenitiesToAdd, setAmenitiesToAdd] = useState<string>("");

  useEffect(() => {
    console.log(courtCondition);
    handleCourtConditionArr();
  }, [courtCondition]);

  useEffect(() => {
    console.log(amenities);
  }, [amenities]);

  const handleCourtConditionArr = () => {
    const arrToAdd = courtConditionArr;
    arrToAdd.push(courtCondition);
    console.log(arrToAdd);
    setCourtConditionArr(arrToAdd);
    console.log(courtConditionArr);
  };

  return (
    <div className="bg-[#243451] min-h-screen">
      <NavbarComponent />
      <div className="flex flex-col py-15 px-20 ">
        <h1 className="self-center text-[#E1FF00] text-4xl mb-3">
          Add Location
        </h1>
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
                      placeholder="Add a Condition"
                      value={conditionToAdd}
                      onChange={(e) => setConditionToAdd(e.target.value)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red"
                    onClick={() => setIsCourtModalActive(false)}
                  >
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
              <ul className="flex">
                {courtConditionArr.map((conditions: string, idx: number) => (
                  <li key={idx} className="bg-[#3C434E] border-1 border-[#E1FF00] rounded-full">{conditions}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-80">
            <h3 className="text-[#E1FF00] mb-3">Amenities:</h3>
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
                <ModalHeader>Add Amenities</ModalHeader>
                <ModalBody>
                  <div className="space-y-6">
                    <input
                      type="text"
                      className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2"
                      placeholder="Add an Amenities"
                      value={amenitiesToAdd}
                      onChange={(e) => setAmenitiesToAdd(e.target.value)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red"
                    onClick={() => setIsAmenitiesModalActive(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => [
                      setAmenities(amenitiesToAdd),
                      setIsAmenitiesModalActive(false),
                    ]}
                  >
                    Add Amenities
                  </Button>
                </ModalFooter>
              </Modal>
              {}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="bg-[#E1FF00] border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)] w-100 self-center">
            Add Location
          </button>
          <button className="bg-white border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgba(255,255,255,0.80)] w-100 self-center">
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationPage;

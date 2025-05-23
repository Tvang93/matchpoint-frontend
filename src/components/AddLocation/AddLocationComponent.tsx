"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourtConditionComponent from "./CourtConditionComponent";
import AmenitiesComponent from "./AmenitiesComponent";
import { IAddLocationDTO } from "@/utils/Interfaces";
import { addNewLocation } from "@/utils/DataServices";
import MapBoxALComponent from "./MapboxALComponent";
import { Dropdown, DropdownItem, Label, Select } from "flowbite-react";


const AddLocationComponent = () => {
  const { push } = useRouter();

  const [courtName, setCourtName] = useState<string>("");
  const [courtLatitude, setCourtLatitude] = useState<string>("");
  const [courtLongitude, setCourtLongitude] = useState<string>("");

  const [courtConditionArr, setCourtConditionArr] = useState<string[]>([]);
  const [courtCondition, setCourtCondition] = useState<string>("");
  const [conditionToAdd, setConditionToAdd] = useState<string>("");

  const [amenities, setAmenities] = useState<string>("");
  const [amenitiesArr, setAmenitiesArr] = useState<string[]>([]);
  const [amenitiesToAdd, setAmenitiesToAdd] = useState<string>("");

  const [courtSurface, setCourtSurface] = useState<string>("");

  const [addLocationDTO, setAddLocationDTO] = useState<IAddLocationDTO>();

  // -------------------- Court Conditions Logic -------------------------------------

  const handleCourtConditionArr = () => {
    const arrToAdd = courtConditionArr;
    arrToAdd.push(courtCondition);
    setCourtConditionArr(arrToAdd);
    setCourtCondition("");
  };

  useEffect(() => {
    if (courtCondition !== "") {
      handleCourtConditionArr();
    }
  }, [courtCondition]);

  const handleDeleteCourtCondition = (con: string) => {
    const arrToAdd = courtConditionArr;
    const idx = arrToAdd.indexOf(con);
    arrToAdd.splice(idx, 1);
    setCourtConditionArr(arrToAdd);
    setConditionToAdd("");
  };

  // -------------------- Amenities Logic -------------------------------------

  useEffect(() => {
    if (amenities !== "") {
      handleAmenitiesArr();
    }
  }, [amenities]);

  const handleAmenitiesArr = () => {
    const arrToAdd = amenitiesArr;
    arrToAdd.push(amenities);
    setAmenitiesArr(arrToAdd);
    setAmenities("");
  };

  const handleDeleteAmenities = (amen: string) => {
    const arrToAdd = amenitiesArr;
    const idx = arrToAdd.indexOf(amen);
    arrToAdd.splice(idx, 1);
    setAmenitiesArr(arrToAdd);
    setAmenitiesToAdd("");
  };

  // -------------------- Add Location Logic -------------------------------------

  useEffect(() => {
    let object: IAddLocationDTO | undefined;
    if (addLocationDTO !== undefined) {
      object = addLocationDTO;
    } else {
      object = {
        courtName: "",
        coordinates: [0, 0],
        conditions: [""],
        amenities: [""],
        surface: ""
      };
    }

    // console.log("before change object", object);
    // console.log("before change addLocation", addLocationDTO);

    if (object !== undefined) {
      object.amenities = amenitiesArr;
      object.conditions = courtConditionArr;
      object.coordinates = [Number(courtLongitude), Number(courtLatitude)];
      object.courtName = courtName;
      object.surface = courtSurface;
    }

    setAddLocationDTO(object);
    console.log("after change object", object);
    // console.log("after change addLocation", addLocationDTO);
  }, [
    amenitiesArr,
    courtConditionArr,
    courtLatitude,
    courtLongitude,
    courtName,
    courtSurface
  ]);

  const handleAddNewLocation = async () => {
    const token = sessionStorage.getItem('Token');
    if(!token) return console.log('no token');

    // console.log("AddLocationDTO", addLocationDTO);

    if(addLocationDTO !== undefined && checkAddLocationDTO(addLocationDTO)){
      const success = await addNewLocation(addLocationDTO, token)

      if(!success.success){
      return alert(success.Message);
      }

      alert("Location Added!")
      push("/")
    }
  };

  const checkAddLocationDTO = (obj: IAddLocationDTO) => {
    if (
      obj.courtName?.trim() == "" ||
      obj.courtName == undefined ||
      obj.surface.trim() == "" ||
      // obj.lat == "" ||
      // obj.lat == undefined ||
      // obj.lng == "" ||
      // obj.lng == undefined
      obj.coordinates[0] == undefined ||
      obj.coordinates[1] == undefined
    )
      return false;

    return true;
  };
  
  // -------------------- Back To Home Logic -------------------------------------

  const handleBackToHome = () => {
    push("/");
  };

  useEffect(()=>{
    console.log(courtSurface)
  }, [courtSurface])

  return (
    <div className="flex flex-col py-15 px-20 ">
      <h1 className="self-center text-[#E1FF00] text-4xl mb-3">Add Location</h1>
      <div className="flex w-full justify-between">
        <div className="self-start pb-20">
          <MapBoxALComponent setLat={setCourtLatitude} setLng={setCourtLongitude}/>
        </div>
        <div className="self-center flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#E1FF00] text-xl">Coodinates:</h2>
            <div className="flex gap-5 ">
              <div className="flex flex-col">
                <p className="text-[#E1FF00]">Latitude:</p>
                <input
                  id="LatitudeField"
                  className="border-1 bg-white ps-2"
                  type="number"
                  value={courtLatitude}
                  readOnly
                  // onChange={((e)=>setCourtLatitude(e.target.value))}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[#E1FF00]">Longitude:</p>
                <input
                  id="LongitudalField"
                  className="border-1 bg-white ps-2"
                  type="number"
                  value={courtLongitude}
                  readOnly
                  // onChange={((e)=>setCourtLongitude(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[#E1FF00] text-xl">Name of Location:</h2>
            <input
              id="LocationNameField"
              className="bg-white border-1"
              type="text"
              maxLength={32}
              onChange={(e) => setCourtName(e.target.value)}
            />
          </div>
          {/* Add court Surface Dropdown */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="court-surfaces" className="text-[#E1FF00] text-xl">Select a Surface</Label>
            </div>
            <Select id="court-surfaces" required onChange={(e)=>setCourtSurface(e.target.value)}>
              <option value={""}>Please Select a Surface</option>
              <option value={"Hard Surface"}>Hard Surface</option>
              <option value={"Clay"}>Clay</option>
              <option value={"Grass"}>Grass</option>
              <option value={"Dirt"}>Dirt</option>
            </Select>

          </div>
        </div>
        <div className="w-100 text-[#E1FF00]">placeholder</div>
      </div>
      <h2 className="text-[#E1FF00] my-3 text-xl">Add Tags:</h2>
      <div className="grid grid-cols-2">
        <div className="h-80">
          <h3 className="text-[#E1FF00] mb-3">Condition of Court:</h3>
          <CourtConditionComponent
            deleteFunction={handleDeleteCourtCondition}
            setFunction={setCourtCondition}
            stringArr={courtConditionArr}
            setToAddFunction={setConditionToAdd}
            stringToAdd={conditionToAdd}
          />
        </div>
        <div className="h-80">
          <h3 className="text-[#E1FF00] mb-3">Amenities:</h3>
          <AmenitiesComponent
            deleteFunction={handleDeleteAmenities}
            setFunction={setAmenities}
            stringArr={amenitiesArr}
            stringToAdd={amenitiesToAdd}
            setToAddFunction={setAmenitiesToAdd}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="bg-[#E1FF00] border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)] w-100 self-center"
          onClick={handleAddNewLocation}
        >
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

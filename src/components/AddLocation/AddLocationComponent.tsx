"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourtConditionComponent from "./CourtConditionComponent";
import AmenitiesComponent from "./AmenitiesComponent";
import { IAddLocationDTO } from "@/utils/Interfaces";
import { addNewLocation } from "@/utils/DataServices";
import MapBoxALComponent from "./MapboxALComponent";
import { Label, Select } from "flowbite-react";
import UploadBlobButtonComponent from "../UploadBlobButtonComponent";

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

  const [imageUrl, setImageUrl] = useState<string>("");

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
    setAmenitiesArr([...arrToAdd]);
    setAmenities("");
  };

  const handleDeleteAmenities = (amen: string) => {
    const arrToAdd = amenitiesArr;
    const idx = arrToAdd.indexOf(amen);
    arrToAdd.splice(idx, 1);
    setAmenitiesArr([...arrToAdd]);
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
        surface: "",
        image: "",
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
      object.image = imageUrl;
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
    courtSurface,
    imageUrl,
  ]);

  const handleAddNewLocation = async () => {
    const token = sessionStorage.getItem("Token");
    if (!token) return console.log("no token");

    // console.log("AddLocationDTO", addLocationDTO);

    if (addLocationDTO !== undefined && checkAddLocationDTO(addLocationDTO)) {
      const success = await addNewLocation(addLocationDTO, token);

      if (!success.success) {
        return alert(success.Message);
      }

      alert("Location Added!");
      push("/");
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

  useEffect(() => {
    console.log(courtSurface);
  }, [courtSurface]);

  return (
    <div className="flex flex-col py-5 sm:py-15 sm:px-20">
      <h1 className="self-center text-[#E1FF00] text-4xl mb-3">Add Location</h1>
      <div className="flex flex-col items-center  lg:flex-row w-full justify-between xl:justify-around">
        <div className="pb-12">
          <MapBoxALComponent
            setLat={setCourtLatitude}
            setLng={setCourtLongitude}
          />
        </div>
        <div className="self-center flex flex-col gap-3 rounded-lg p-4 bg-[#BCD0EA] lg:bg-transparent">
          {/* Coordinates Divs */}
          <div className="flex flex-col gap-3 text-gray-600 lg:text-[#E1FF00]">
            <h2 className=" text-xl">Coodinates:</h2>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 xl:gap-5">
              <div className="flex flex-col">
                <p className="lg:text-[#E1FF00] text-gray-600">Latitude:</p>
                <input
                  id="LatitudeField"
                  className="border-1 bg-white ps-2 text-black"
                  type="number"
                  value={courtLatitude}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <p className="lg:text-[#E1FF00] text-gray-600">Longitude:</p>
                <input
                  id="LongitudalField"
                  className="border-1 bg-white ps-2 text-black"
                  type="number"
                  value={courtLongitude}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Name Of Location */}
          <div className="flex flex-col gap-3">
            <h2 className="text-gray-600 lg:text-[#E1FF00] text-xl">
              Name of Location:
            </h2>
            <input
              id="LocationNameField"
              className="bg-white border-1"
              type="text"
              maxLength={32}
              onChange={(e) => setCourtName(e.target.value)}
            />
          </div>
          {/* Court Surface Dropdown */}
          <div>
            <div className="mb-2">
              <Label
                htmlFor="court-surfaces"
                className="text-gray-600 lg:text-[#E1FF00] text-xl"
              >
                Select a Surface
              </Label>
            </div>
            <Select
              id="court-surfaces"
              className="text-black"
              required
              onChange={(e) => setCourtSurface(e.target.value)}
            >
              <option value={""}>Please Select a Surface</option>
              <option value={"Hard Surface"}>Hard Surface</option>
              <option value={"Clay"}>Clay</option>
              <option value={"Grass"}>Grass</option>
              <option value={"Dirt"}>Dirt</option>
            </Select>
          </div>
        </div>
        {/* Blob Upload Button */}
        <div className="flex flex-col justify-center my-10">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <UploadBlobButtonComponent setImageUrl={setImageUrl} />
          </main>
        </div>
      </div>
      {/* Add Tag Section */}
      <div className="flex flex-col items-center lg:block lg:items-start 2xl:ps-40">
        <div className="min-w-50 sm:min-w-100">
          <h2 className="text-[#E1FF00] my-3 text-xl">Add Tags:</h2>
        </div>
        <div className="grid lg:grid-cols-2 min-w-50 sm:min-w-100">
          {/* Court Conditions */}
          <div className="lg:h-70">
            <h3 className="text-[#E1FF00] mb-3">Condition of Court:</h3>
            <CourtConditionComponent
              deleteFunction={handleDeleteCourtCondition}
              setFunction={setCourtCondition}
              stringArr={courtConditionArr}
              setToAddFunction={setConditionToAdd}
              stringToAdd={conditionToAdd}
            />
          </div>
          {/* Amenities */}
          <div className="lg:h-70">
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
      </div>
      {/* Nav Buttons */}
      <div className="flex flex-col gap-4 mt-10">
        <button
          className="bg-[#E1FF00] border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)] w-50 sm:w-100 self-center"
          onClick={handleAddNewLocation}
        >
          Add Location
        </button>
        <button
          className="bg-white border-1 text-[#243451] rounded-[20px] hover:cursor-pointer hover:bg-[rgba(255,255,255,0.80)] w-50 sm:w-100 self-center"
          onClick={handleBackToHome}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default AddLocationComponent;

import AddLocationComponent from "@/components/AddLocation/AddLocationComponent";
import NavbarComponent from "@/components/NavbarComponent";
import React from "react";

const AddLocationPage = () => {

  return (
    <div className="bg-[#243451] min-h-screen">
      <NavbarComponent />
      <AddLocationComponent />
    </div>
  );
};

export default AddLocationPage;

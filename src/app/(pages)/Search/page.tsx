import MapBoxComponent from "@/components/MapBoxComponent";
import NavbarComponent from "@/components/NavbarComponent";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className=" flex min-h-screen">
        <MapBoxComponent />
      </div>
    </div>
  );
};

export default SearchPage;

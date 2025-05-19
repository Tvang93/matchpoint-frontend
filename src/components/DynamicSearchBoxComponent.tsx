import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { SearchBoxProps } from "@mapbox/search-js-react/dist/components/SearchBox";

const DynamicSearchBoxComponent: ComponentType<SearchBoxProps> = dynamic(() => import("@/components/SearchBoxComponent").then((mod)=> mod.SearchBoxComponent), {
  ssr: false,
});

export default DynamicSearchBoxComponent;
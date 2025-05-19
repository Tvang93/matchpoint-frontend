import dynamic from "next/dynamic";
import { ComponentType } from "react";

const DynamicSearchBoxComponent: ComponentType<any> = dynamic(() => import("@/components/SearchBoxComponent").then((mod)=> mod.SearchBoxComponent), {
  ssr: false,
});

export default DynamicSearchBoxComponent;
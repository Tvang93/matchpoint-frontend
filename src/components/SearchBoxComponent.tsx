'use client'

import { SearchBox } from "@mapbox/search-js-react";
import { useState } from "react";

interface Props {
    lat?: number,
    lng?: number
}

export function SearchBoxComponent(props: Props) {
  const {lat, lng} = props
  const [value, setValue] = useState('');
  
  const handleChange = (d: string) => {
    setValue(d);
  };

  const MySearchBox = () => <SearchBox accessToken="pk.eyJ1IjoidHZhbmciLCJhIjoiY205NzhjeDU4MDR2YjJsb2pvaGxuZnZ0eiJ9.nRf1lWYQP-I8W6cqHJjvww"/>
  
  return (
    <div>
        <SearchBox
        // options={{
        //     proximity: {
        //         lng: -122.431297,
        //         lat: 37.773972,
        //     },
        // }}
        // value={value}
        // onChange={handleChange}
        accessToken="pk.eyJ1IjoidHZhbmciLCJhIjoiY205NzhjeDU4MDR2YjJsb2pvaGxuZnZ0eiJ9.nRf1lWYQP-I8W6cqHJjvww"
        />
    </div>
    );
}
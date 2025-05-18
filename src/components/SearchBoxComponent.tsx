"use client";

// import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, useEffect} from "react";
import { mapbox } from "@/utils/DataServices";


type LocationSuggestion = {
  mapbox_id: string;
  name: string;
  place_formatted: string;
  maki?: string;
};

export function SearchBoxComponent() {
  // const { push } = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [sessionToken, setSessionToken] = useState<string>("")

  const [searchSuggestions, setSearchSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(false);

  const [mapboxId, setMapboxId] = useState<string>("")

  const newUUIDToken = crypto.randomUUID();

  useEffect(() => {
    setIsMounted(true);
    setSessionToken(newUUIDToken)
  }, []);

  useEffect(()=>{
    console.log(isMounted)
  }, [isMounted])

  const handleSearchEnter = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if(inputValue.trim() !== ""){
      const res = await fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/${inputValue}&access_token=${mapbox}&session_token=${sessionToken}`)
      const data = await res.json()
      console.log(data)
      }
    }
  };

  useEffect(() => {
    console.log(searchValue)
    console.log(sessionToken)
    console.log(isMounted)
    if (isMounted && sessionToken && inputValue.trim() != "") {
      const suggestFetch = async () => {
        try {
          const res = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${inputValue}&access_token=${mapbox}&session_token=${sessionToken}&language=en&country=US&limit=5&proximity=-121.2756,37.9616`
          );
          const data = await res.json();
          console.log(data)
          setSearchSuggestions(data.suggestions);
        } catch (err) {
          console.error("Geocoding Error:", err);
          setSearchSuggestions([]);
        }
      };
      suggestFetch();
    }

    if(searchValue.trim() == ""){
      setHasSuggestions(false)
    }
  }, [inputValue, isMounted]);

  useEffect(() => {
    console.log(searchSuggestions);
    console.log("fetch works?")
    if(searchSuggestions.length > 0){
    console.log(searchSuggestions[0].name)
    setHasSuggestions(true)
    }
  }, [searchSuggestions]);

  // const handleSelectSuggestion = async () => {
  //   set
  // }

  useEffect(()=>{
    if(mapboxId.trim() !== ""){
      const retrieveMapbox = async () => {
      const res = await fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}&access_token=${mapbox}&session_token=${sessionToken}`)
      const data = await res.json()
      console.log(data)
      }
      retrieveMapbox();
    }
  }, [mapboxId])



  return (
    <div className="relative">
        <p className="ps-5 text-white text-shadow-lg font-bold text-2xl">Search a Location to Find Courts Nearby</p>
        <div className="absolute">
          <input
            id="SearchBar"
            className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 placeholder:text-[rgb(0,0,0,0.7)]"
            placeholder="Search Location..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleSearchEnter(e)}
          />
            { hasSuggestions &&
          <div className="bg-white px-2 py-1 mx-5 border-1 border-black">
              {searchSuggestions.map((suggestions,idx)=>{
                return(
                  <div 
                  key={idx} 
                  className="flex flex-row gap-2 hover:bg-green-200 hover:cursoor-pointer overflow-x-auto"
                  onClick={()=>setInputValue(suggestions.name)}
                  >
                    <p className="text-lg font-bold inline max-w-[50%] overflow-x-auto">{suggestions.name}</p>
                    <p className="self-end">{suggestions.place_formatted}</p>
                  </div>
                )
              })
            }
          </div>
            }
        </div>
    </div>
  );
}

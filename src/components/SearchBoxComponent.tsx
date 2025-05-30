"use client";

// import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, useEffect } from "react";
import { mapbox } from "@/utils/DataServices";
import { useSearchBoxCore, useSearchSession } from "@mapbox/search-js-react";
import { FeatureCollection } from "geojson";
import { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useLocationCoordinatesContext } from "@/context/UserInfoContext";
import { useRouter } from "next/navigation";

// type LocationSuggestion = {
//   mapbox_id: string;
//   name: string;
//   place_formatted: string;
//   maki?: string;
// };

export function SearchBoxComponent() {
  const { push } = useRouter();
  const { setSearchCoordinates, setSearchQuery } = useLocationCoordinatesContext();
  const [inputValue, setInputValue] = useState<string>("");
  // const [searchValue, setSearchValue] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  // const [sessionToken, setSessionToken] = useState<string>("")

  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchBoxSuggestion[]
  >([]);
  const [hasSuggestions, setHasSuggestions] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<boolean>(false);

  const [mapboxId, setMapboxId] = useState<string>("");
  // const [hasMapboxId, setHasMapboxId] = useState<boolean>(false);

  const [retrievedData, setRetrievedData] = useState<FeatureCollection>();

  // const newUUIDToken = crypto.randomUUID();

  useEffect(() => {
    setIsMounted(true);
    // setSessionToken(newUUIDToken)
  }, []);

  // useEffect(() => {
  //   console.log(isMounted);
  // }, [isMounted]);

  const search = useSearchBoxCore({
    accessToken: mapbox,
    poi_category: "place",
  });
  const session = useSearchSession(search);

  const handleSearchEnter = async (
    event: KeyboardEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim() != "") {
      setHasSuggestions(false)
      retrieveFunc();
    }
  };

  const retrieveFunc = () => {
    if (mapboxId && searchSuggestions) {
      const specificSuggestion: SearchBoxSuggestion[] =
        searchSuggestions.filter((searches) => searches.mapbox_id == mapboxId);

      if (specificSuggestion) {
        const suggestion = specificSuggestion[0];
        if (session.canRetrieve(suggestion)) {
          session.retrieve(suggestion);
          session.addEventListener("retrieve", (res) => {
            setRetrievedData(res);
            console.log("retieve:", res);
          });
        } else if (session.canSuggest(suggestion)) {
          // .. go through suggest flow again ..
          session.suggest(suggestion.toString());
        }
      }
    }

    if (searchSuggestions) {
      const suggestion = searchSuggestions[0];
      if (session.canRetrieve(suggestion)) {
        session.retrieve(suggestion);
        session.addEventListener("retrieve", (res) => {
          setRetrievedData(res);
          console.log("retieve:", res);
        });
      } else if (session.canSuggest(suggestion)) {
        // .. go through suggest flow again ..
        session.suggest(suggestion.toString());
      }
    }

    
  };

  useEffect(() => {
    if (selectedSuggestion && inputValue.trim() != "") retrieveFunc();
  }, [selectedSuggestion]);

  useEffect(() => {
    if (retrievedData) {
      if (
        retrievedData.features[0].geometry &&
        retrievedData.features[0].geometry.type === "Point"
      )
        setSearchCoordinates({
          latitude: retrievedData.features[0].geometry.coordinates[1],
          longitude: retrievedData.features[0].geometry.coordinates[0],
        });
      push(`/Search`);
      setInputValue("");
    }
  }, [retrievedData]);

  useEffect(() => {
    if (inputValue.trim() != "") {
      session.suggest(inputValue);

      session.addEventListener("suggest", (res) => {
        setSearchSuggestions(res.suggestions);
        console.log("suggest:", res);
      });
    }

    if (inputValue.trim() == "") {
      setHasSuggestions(false);
    }

    if (selectedSuggestion) {
      setSelectedSuggestion(false);
    }
  }, [inputValue]);

  useEffect(() => {
    // console.log(searchSuggestions);
    // console.log("fetch works?");
    if (searchSuggestions.length > 0) {
      // console.log(searchSuggestions[0].name);
      setHasSuggestions(true);
    }
  }, [searchSuggestions, isMounted]);

  return (
    <div className="relative w-full">
      <input
        id="SearchBar"
        className="bg-white py-2 px-5 text-xl sm:text-3xl border-1 rounded-4xl w-full placeholder:text-[rgb(0,0,0,0.7)] text-black"
        placeholder="Search Location..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleSearchEnter(e)}
        autoComplete="off"
      />
      {hasSuggestions && (
        <div className="absolute bg-white px-2 py-1 mx-5 border-1 border-black w-[94%] z-1000">
          {searchSuggestions.map((suggestions, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-row gap-2 hover:bg-green-200 hover:cursoor-pointer overflow-x-auto z-9999"
                onClick={() => [
                  setInputValue(suggestions.name),
                  setSearchQuery(suggestions.name),
                  setSelectedSuggestion(true),
                  setMapboxId(suggestions.mapbox_id),
                ]}
              >
                <p className="text-lg font-bold inline max-w-[50%] overflow-x-auto text-black">
                  {suggestions.name}
                </p>
                <p className="self-end text-black">
                  {suggestions.place_formatted}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

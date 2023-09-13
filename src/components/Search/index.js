import { useCallback, useState, forwardRef } from "react";
import ResultCard from "../ResultCard";
import SvgIcon1 from "./icons/SvgIcon1";


function Search() {
  let [searchResults, setSearchResults] = useState([]);
  return (
    <div className={`flex justify-start items-stretch flex-col gap-5 grow-0 shrink-0 basis-auto box-border mt-[66px]`}>
      {/* Input Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
      <div className={`grow-0 shrink-0 basis-auto box-border bg-[#d9d9d9] h-[50px] flex flex-row items-center [justify-content:start] rounded-md border-[none]`}>
        <input
          placeholder="Tinkoff"
          type="text"
          className={`w-full [font-family:Inter] text-[21px] font-normal bg-transparent [outline:none] box-border [background:none] ml-2.5 border-[none] text-[black]`}
          onChange={(e) =>
            e.target.value &&
            fetch(
              `https://backapi.rustore.ru/applicationData/apps?pageNumber=0&pageSize=40&query=${e.target.value}`
            )
              .then((res) => res.json())
              .then((data) => {
                if (data && data.body && data.body.content) {
                  setSearchResults(data.body.content.map((app) => ({
                    ...app,
                    key: app.appId
                  })))
                } else {
                  throw new Error("No results")
                }
              })
              .catch((err) => {
                if (err.message === "No results") {
                  setSearchResults([])
                } else {
                  console.error(err)
                  throw err
                }
              })
          }
        />
        <SvgIcon1 className="w-8 h-8 flex mr-[6.5px] mt-[9.5px] mb-[8.5px]" />
      </div>


      {/* for each value in search resutls use resultcard */}
      {
        searchResults.map((result) => (
          result.appName &&
          <ResultCard
            key={result.appId}
            name={result.appName}
            imageLink={result.iconUrl}
            appId={result.appId}
          />
        ))
      }
    </div>
  );
}

export default Search;

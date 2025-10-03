import { useCallback, useState, forwardRef } from "react";
import ResultCard from "../ResultCard";
import SvgIcon1 from "./icons/SvgIcon1";

function Search() {
  let [searchResults, setSearchResults] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    fetch(
      `https://backapi.rustore.ru/applicationData/apps?pageNumber=0&pageSize=40&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.body && data.body.content) {
          setSearchResults(data.body.content.map((app) => ({
            ...app,
            key: app.appId
          })));
        } else {
          throw new Error("No results");
        }
      })
      .catch((err) => {
        if (err.message === "No results") {
          setSearchResults([]);
        } else {
          setError("Ошибка поиска. Пожалуйста, попробуйте еще раз.");
          console.error(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={`flex justify-start items-stretch flex-col gap-5 grow-0 shrink-0 basis-auto box-border max-w-3xl w-full mx-auto`}>
      <div className={`grow-0 shrink-0 basis-auto box-border bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex items-center h-14`}>
        <input
          placeholder="Введите название приложения..."
          type="text"
          className={`w-full text-lg px-4 py-3 font-medium bg-transparent outline-none border-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500`}
          onChange={handleSearch}
        />
        <div className="px-4">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SvgIcon1 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-2">{error}</div>
      )}

      <div className="flex flex-col gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            result.appName &&
            <ResultCard
              key={result.appId}
              name={result.appName}
              imageLink={result.iconUrl}
              appId={result.appId}
            />
          ))
        ) : searchResults.length === 0 && !isLoading && !error ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">Введите запрос для поиска приложений</div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;

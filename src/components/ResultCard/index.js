import { useCallback, useState, forwardRef, useEffect, useContext } from "react";
import SvgIcon1 from "./icons/SvgIcon1";

function ResultCard({
  name,
  imageLink,
  appId
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    setIsDownloading(true);
    setError(null);
    
    fetch(
      "https://backapi.rustore.ru/applicationData/download-link",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "appId": appId,
          "firstInstall": true,
        })
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.body && data.body.apkUrl) {
          window.location.href = data.body.apkUrl;
        } else {
          throw new Error("No download link available");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось скачать приложение");
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return (
    <div className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex justify-between items-center rounded-lg overflow-hidden`}>
      <div className={`flex items-center p-3 flex-1`}>
        <div className={`mr-4 flex-shrink-0`}>
          <img
            className={`w-16 h-16 object-cover rounded-md border border-gray-100`}
            src={imageLink}
            alt={`${name} icon`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-medium text-gray-800 truncate`}>{name}</h3>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <button 
        onClick={handleDownload} 
        disabled={isDownloading}
        className={`p-4 transition-colors duration-200 h-full flex items-center justify-center`}
      >
        {isDownloading ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <SvgIcon1 className="w-6 h-6 text-blue-600" />
        )}
      </button>
    </div>
  );
}

export default ResultCard;

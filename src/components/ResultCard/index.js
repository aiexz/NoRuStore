import { useCallback, useState, forwardRef, useEffect, useContext } from "react";
import SvgIcon1 from "./icons/SvgIcon1";
import Modal from 'react-modal';

function ResultCard({
  name,
  imageLink,
  appId
}) {
  return (

    <div className={`bg-[#d9d9d9] flex justify-between items-center flex-row h-[100px] grow-0 shrink-0 basis-auto box-border px-[6.5px] rounded-md`}>
      <div className={`flex justify-end items-start flex-row grow-0 shrink basis-auto box-border mr-[6.75px]`}>
        <div className={`grow-0 shrink-0 basis-auto box-border mr-3.5`}>
          <img
            className={`w-[75px] h-[75px] max-w-[initial] box-border object-cover block rounded-md border-[none]`}
            src={imageLink}
          />
        </div>
        <p className={`grow-0 shrink basis-auto box-border [font-family:Inter] text-base font-normal text-[black]`}>{name}</p>
      </div>
      <a onClick={() => {
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
              window.location.href = data.body.apkUrl
            } else {
              throw new Error("No results")
            }
          })
          .catch((err) => {
            console.error(err)
            throw err
          }
          )
      }} className={`p-2`}>
        <SvgIcon1 className="grow-0 shrink-0 basis-auto box-border w-8 h-8 flex" />
      </a>
    </div>
  );
}


export default ResultCard;

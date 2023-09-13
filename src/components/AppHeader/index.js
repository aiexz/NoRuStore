import { useCallback, useState, forwardRef } from "react";
import Search from "../Search";

function AppHeader() {
  return (
    <div className={`bg-[#ebebeb] flex justify-start items-stretch flex-col box-border pt-14 pb-[327px] px-5`}>
      <div className={`flex justify-start items-center flex-col grow-0 shrink-0 basis-auto box-border`}>
        <p className={`grow-0 shrink-0 basis-auto box-border [font-family:Inter] text-[26px] font-normal text-[black]`}>NoRuStore</p>
        <p className={`max-w-[196px] grow-0 shrink-0 basis-auto box-border [font-family:Inter] text-xs font-normal text-center text-[#4f4f4f]`}>
          Скачивай приложения из RuStore
          <br />
          без установки Rustore
        </p>
      </div>
      <Search />
    </div>
  );
}

export default AppHeader;

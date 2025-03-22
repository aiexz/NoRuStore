import { useCallback, useState, forwardRef } from "react";
import Search from "../Search";

function AppHeader() {
  return (
    <div className={`bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex justify-start items-stretch flex-col box-border pt-10 pb-20 px-5 md:px-10`}>
      <div className={`flex justify-center items-center flex-col grow-0 shrink-0 basis-auto box-border mb-8`}>
        <h1 className={`text-4xl md:text-5xl font-bold text-blue-600 mb-2`}>NoRuStore</h1>
        <p className={`max-w-md grow-0 shrink-0 basis-auto box-border text-sm md:text-base font-medium text-center text-gray-600`}>
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

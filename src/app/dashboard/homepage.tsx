"use client"

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ShippingComp from "./cost/Shipping"
import ProvinsiComp from "./provinsi/Provinsi"
import CityComp from "./kota/City"

export default function Homepage() {
  const [activeMenu, setActiveMenu] = useState<"cost" | "provinsi" | "kota" | null>(null);

  const renderForm = () => {
    switch (activeMenu) {
      case "cost":
        return (
          <ShippingComp />
        );
      case "provinsi":
        return (
          <ProvinsiComp />
        );
      case "kota":
        return (
          <CityComp />
        );
      default:
        return <p className="text-gray-500">Select a menu to view its form.</p>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="flex gap-6">
          <div className="space-y-4">
            <button
              className={`w-full py-2 px-4 rounded-md text-white ${
                activeMenu === "cost" ? "bg-indigo-600" : "bg-gray-500 hover:bg-gray-600"
              }`}
              onClick={() => setActiveMenu("cost")}
            >
              Cost
            </button>
            <button
              className={`w-full py-2 px-4 rounded-md text-white ${
                activeMenu === "provinsi" ? "bg-indigo-600" : "bg-gray-500 hover:bg-gray-600"
              }`}
              onClick={() => setActiveMenu("provinsi")}
            >
              Provinsi
            </button>
            <button
              className={`w-full py-2 px-4 rounded-md text-white ${
                activeMenu === "kota" ? "bg-indigo-600" : "bg-gray-500 hover:bg-gray-600"
              }`}
              onClick={() => setActiveMenu("kota")}
            >
              Kota
            </button>
          </div>

          <div className="flex-1">
            {renderForm()}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaDatabase } from "react-icons/fa";
import { FiPackage, FiSettings, FiLogOut } from "react-icons/fi";
import Linechart from "./Linechart";
import PurchaseResult from "./PurchaseResult";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex h-screen">
      <div className="w-64 h-full bg-white shadow-lg flex flex-col items-center justify-between py-12 px-12 gap-8">
        <div className="flex flex-col items-center justify-start w-full gap-8">
          <Link href="/">
            <Image
              alt="dashboardlogo"
              src="/datalogo.png"
              width={256}
              height={256}
              className="transition-transform duration-300 hover:scale-90"
            />
          </Link>

          <div className="flex flex-col items-start justify-start w-full gap-1">
            <Button
              className={`w-[100%] px-4 transition-colors duration-300 text-zinc-600 justify-start ${
                activeTab === 0 ? "bg-[#FFF5E2]" : "bg-white"
              }`}
              size="lg"
              radius="full"
              startContent={<FaDatabase size={16} />}
              onClick={() => setActiveTab(0)}
            >
              後台分析
            </Button>
            <Button
              className={`w-[100%] px-4 transition-colors duration-300 text-zinc-600 justify-start ${
                activeTab === 1 ? "bg-[#FFF5E2]" : "bg-white"
              }`}
              size="lg"
              radius="full"
              startContent={<FiPackage size={16} />}
              onClick={() => setActiveTab(1)}
            >
              購買結果
            </Button>
          </div>
        </div>

        <div className="w-full mt-auto">
          <div className="border-t border-gray-300 mt-28 mb-6 mx-[-3rem]"></div>
          <div className="flex flex-col items-start justify-start w-full">
            <Button
              className="w-[100%] px-4 transition-colors duration-300 text-zinc-600 bg-white justify-start"
              size="lg"
              radius="full"
              startContent={<FiSettings size={16} />}
            >
              設定
            </Button>
            <Button
              className="w-[100%] px-4 transition-colors duration-300 bg-white text-zinc-600 justify-start"
              size="lg"
              radius="full"
              startContent={<FiLogOut size={16} />}
            >
              登出
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        {activeTab === 0 && <Linechart />}
        {activeTab === 1 && <PurchaseResult />}
      </div>
    </div>
  );
}

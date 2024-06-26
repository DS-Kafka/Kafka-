"use client";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { LuPointer } from "react-icons/lu";

export default function Product(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value));
  };
  const handlePurchase = async () => {
    const response = await fetch("http://127.0.0.1/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        // amount: quantity,
      }),
    });

    if (response.ok) {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "購買成功",
          text: "您的商品已成功下單。",
          confirmButtonText: "確定",
          timer: 5000,
        });
      }, 1000);
    }
  };
  const { status, productname, id, price, originalPrice, image } = props;
  return (
    <div
      className={`${
        status === "out" && `text-zinc-600`
      }w-full flex flex-col gap-1 justify-between items-start`}
    >
      <div className="relative w-full border-1 border-gray-200 rounded-xl items-center justify-center flex bg-white">
        {status === "out" && (
          <div className="bg-gray-300/80 rounded-full z-10 absolute h-16 items-center justify-center flex w-16">
            已售完
          </div>
        )}
        <Image
          alt="Product"
          src={image}
          width={150}
          height={150}
          className="rounded-xl"
        />
      </div>
      <div
        className={`${
          status === "out" ? `text-zinc-600` : `text-black`
        } line-clamp-2	`}
      >
        {productname}{" "}
      </div>
      <div
        className={`${
          status === "out" ? `text-zinc-600` : `text-red`
        } font-bold`}
      >
        ${price}
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="line-through text-zinc-500 text-xs">
          ${originalPrice}
        </div>
      </div>
      <Button
        className={`${
          status === "out" ? `bg-zinc-300` : `bg-yellow`
        } w-full text-white font-bold`}
        isDisabled={status === "out" ? true : false}
        onPress={onOpen}
      >
        {status !== "out" ? (
          <div className="gap-2 flex flex-row items-center justify-center">
            <LuPointer size={20} />
            直接購買
          </div>
        ) : (
          `已售完`
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {productname}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-start items-end gap-4">
                  <div className="relative w-1/2 border-1 border-gray-200 rounded-xl items-center justify-center flex bg-white">
                    <Image
                      alt="Product"
                      src="/product.png"
                      width={150}
                      height={150}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <div
                      className={`${
                        status === "out" ? `text-zinc-600` : `text-red`
                      } font-bold`}
                    >
                      ${price}
                    </div>
                    <div className="line-through text-zinc-500 text-xs">
                      ${originalPrice}
                    </div>
                  </div>
                </div>
                <div className="gap-4 flex flex-col">
                  <Input
                    type="text"
                    label="購買者姓名"
                    variant="underlined"
                    placeholder="請輸入您的姓名"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <Input
                    type="number"
                    label="購買商品數量"
                    placeholder="0"
                    variant="underlined"
                    onChange={handleQuantityChange}
                  /> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handlePurchase();
                    onClose();
                  }}
                  isDisabled={name === "" ? true : false}
                >
                  確定購買
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

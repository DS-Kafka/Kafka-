'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Input } from '@nextui-org/react'
import { FaSearch } from 'react-icons/fa'

import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'

export default function Header() {
    const [keyword, setKeyword] = useState('')

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 py-4 bg-white 2xl:px-96 md:px-32">
                <Link href="/">
                    <Image
                        alt="HOHOJIA"
                        src="/logo.png"
                        width={150}
                        height={150}
                        className="transition-transform duration-300 hover:scale-90"
                    />
                </Link>

                <div className="hidden lg:block">
                    <Input
                        radius="lg"
                        type=""
                        label=""
                        placeholder="搜尋"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full px-1 bg-white border-2 border-yellow rounded-xl hover:bg-white "
                        startContent={
                            <Button
                                className="p-0 bg-transparent rounded-s-none rounded-e-sm text-yellow"
                                isIconOnly
                                startContent={<FaSearch />}
                            />
                        }
                        classNames={{
                            label: 'bg-white',
                            input: ' bg-white hover:bg-white',
                            innerWrapper: 'bg-white hover:bg-white',
                            inputWrapper:
                                ' bg-white hover:bg-white group-data-[focus=true]:bg-white group-data-[focus=false]:bg-white data-[hover=true]:bg-white',
                        }}
                    />
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center bg-transparent text-zinc-600">
                        <MdOutlineShoppingCart size={20} />
                        <div className="hidden md:block">購物車</div>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-transparent text-zinc-600">
                        <IoPersonOutline size={20} className="" />
                        <div className="hidden md:block">登入/註冊</div>
                    </div>
                </div>
            </header>
            <div className="w-full px-4 bg-white md:hidden">
                <Input
                    radius="lg"
                    // key="outside"
                    type=""
                    label=""
                    placeholder="搜尋"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-1 bg-white border-2 border-yellow rounded-xl hover:bg-white"
                    startContent={
                        <Button
                            className="p-0 bg-transparent rounded-s-none rounded-e-sm text-yellow"
                            isIconOnly
                            startContent={<FaSearch />}
                        />
                    }
                    classNames={{
                        label: 'bg-white',
                        input: ' bg-white hover:bg-white',
                        innerWrapper: 'bg-white hover:bg-white',
                        inputWrapper:
                            ' bg-white hover:bg-white group-data-[focus=true]:bg-white group-data-[focus=false]:bg-white data-[hover=true]:bg-white',
                    }}
                />{' '}
            </div>

            <div className="flex flex-row justify-start w-full gap-4 px-4 py-4 text-xs bg-white 2xl:px-96 md:text-base sm:text-base md:px-32 text-zinc-600">
                <div className="cursor-pointer ">3C</div>
                <div className="cursor-pointer ">家電</div>
                <div className="cursor-pointer ">日用</div>
                <div className="cursor-pointer ">食品</div>
                <div className="cursor-pointer ">美妝</div>
                <div className="cursor-pointer ">時尚</div>
                <div className="cursor-pointer ">書店</div>
            </div>
        </>
    )
}

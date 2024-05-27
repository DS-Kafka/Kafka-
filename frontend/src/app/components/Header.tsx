'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Button,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
} from '@nextui-org/react'
import { FaSearch } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import { TbBellRinging2Filled } from 'react-icons/tb'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [keyword, setKeyword] = useState('')

    return (
        <>
            <header className="2xl:px-96 py-4 px-4 md:px-32 justify-between w-full items-center flex bg-white sticky">
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
                        className="border-2 w-full  border-yellow rounded-xl bg-white px-1 hover:bg-white "
                        startContent={
                            <Button
                                className="bg-transparent p-0 rounded-s-none rounded-e-sm text-yellow"
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
                    <div className="text-zinc-600 bg-transparent flex flex-col items-center justify-center">
                        <MdOutlineShoppingCart size={20} />
                        <div className="hidden md:block">購物車</div>
                    </div>
                    <div className="text-zinc-600 bg-transparent flex flex-col items-center justify-center">
                        <IoPersonOutline size={20} className="" />
                        <div className="hidden md:block">登入/註冊</div>
                    </div>
                </div>
            </header>
            <div className="w-full  md:hidden sticky px-4 bg-white">
                <Input
                    radius="lg"
                    // key="outside"
                    type=""
                    label=""
                    placeholder="搜尋"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className=" border-2 w-full   border-yellow rounded-xl bg-white px-1 hover:bg-white "
                    startContent={
                        <Button
                            className="bg-transparent p-0 rounded-s-none rounded-e-sm text-yellow"
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

            <div className="2xl:px-96 md:text-base sm:text-base text-xs w-full bg-white px-4 md:px-32 py-4 flex flex-row gap-4 text-zinc-600 justify-start">
                <div className="cursor-pointer	">3C</div>
                <div className="cursor-pointer	">家電</div>
                <div className="cursor-pointer	">日用</div>
                <div className="cursor-pointer	">食品</div>
                <div className="cursor-pointer	">美妝</div>
                <div className="cursor-pointer	">時尚</div>
                <div className="cursor-pointer	">書店</div>
            </div>
        </>
    )
}

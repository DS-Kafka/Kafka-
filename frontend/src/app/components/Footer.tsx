'use client'

import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6'
import { Accordion, AccordionItem } from '@nextui-org/react'

export default function Footer() {
    const footerContents = [
        {
            title: '關於DShome購物',
            links: [
                { title: '關於我們', href: '/' },
                { title: 'DShome夥伴', href: '/' },
                { title: '隱私權條款', href: '/' },
            ],
        },

        {
            title: '顧客權益',
            links: [
                { title: '個人頁面', href: '/' },
                { title: '帳號設定', href: '/' },
                { title: '常見問題', href: '/' },
            ],
        },
    ]

    return (
        <div className="flex flex-col items-center w-full gap-8 mt-12 bg-white border-yellow-300 text-zinc-600 lg:gap-0 lg:flex-row lg:justify-between md:px-32 py-14 border-t-1">
            <div className="flex flex-col items-center gap-4 lg:items-start">
                <Image alt="DShome" src="/logo.png" width={150} height={150} />
                <p className="hidden text-center lg:text-start md:block">購物使人愉快！</p>
                <div className="flex flex-col w-full gap-1 md:hidden">
                    <div className="flex justify-center gap-3">
                        <Link href={'https://www.facebook.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaFacebookF size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.instagram.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaInstagram size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.twitter.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaTwitter size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.youtube.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaYoutube size={16} />}
                            />
                        </Link>
                    </div>
                    <Link
                        href={'https://maps.app.goo.gl/hMwnkDb3Zk3913aq7'}
                        className="text-sm transition-colors duration-300 hover:text-gray-500 "
                    >
                        116台北市文山區指南路二段64號
                    </Link>
                </div>
            </div>

            <div className="hidden gap-2 px-8 md:flex md:col-row md:gap-12 lg:text-nowrap">
                {footerContents.map((content, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <h4 className="w-full pb-2 font-bold md:underline md:underline-offset-8 decoration-2">
                            {content.title}
                        </h4>

                        <div className="flex-col hidden gap-2 md:flex">
                            {content.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-sm transition-colors duration-300 hover:text-gray-500"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex-col items-center hidden gap-5 md:flex lg:items-start">
                    <h4 className="w-full pb-2 font-bold md:underline md:underline-offset-8 decoration-2">聯絡我們</h4>
                    <Link
                        href={'https://maps.app.goo.gl/hMwnkDb3Zk3913aq7'}
                        className="text-sm transition-colors duration-300 hover:text-gray-500"
                    >
                        116台北市文山區指南路二段64號
                    </Link>
                    <div className="flex gap-3">
                        <Link href={'https://www.facebook.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaFacebookF size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.instagram.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaInstagram size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.twitter.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaTwitter size={16} />}
                            />
                        </Link>
                        <Link href={'https://www.youtube.com'} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaYoutube size={16} />}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block w-full px-12 md:hidden text-zinc-600">
                <Accordion
                    itemClasses={{
                        base: 'py-0 w-full',
                        title: 'font-normal text-base text-zinc-600',
                        trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
                        indicator: 'text-medium',
                        content: 'text-small px-2',
                    }}
                >
                    {footerContents.map((content, index) => (
                        <AccordionItem key={index} aria-label={content.title} title={content.title}>
                            <div className="flex flex-col gap-3">
                                {content.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-sm transition-colors duration-300 hover:text-gray-500"
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { LuPointer } from 'react-icons/lu'

export default function Product(props: any) {
    const { status } = props
    return (
        <div className={`${status === 'out' && `text-zinc-600`}w-full flex flex-col gap-1 justify-center items-start`}>
            <div className="relative w-full border-1 border-gray-200 rounded-xl items-center justify-center flex bg-white">
                {status === 'out' && (
                    <div className="bg-gray-300/80 rounded-full z-10 absolute h-16 items-center justify-center flex w-16">
                        已售完
                    </div>
                )}
                <Image alt="Product" src="/product.png" width={150} height={150} className="rounded-xl" />
            </div>
            <div className={`${status === 'out' ? `text-zinc-600` : `text-black`}`}>
                Dyson V15 Detect Absolute 無線吸塵器
            </div>
            <div className={`${status === 'out' ? `text-zinc-600` : `text-red`} font-bold`}>$19,900</div>
            <div className="flex flex-row items-center justify-between w-full">
                <div className="line-through text-zinc-500 text-xs">$26,900</div>
                <div className={`${status === 'out' ? `text-zinc-600` : `text-red`} text-xs`}>
                    剩餘數量:{status === 'out' ? `0` : `5`}
                </div>
            </div>
            <Button
                className={`${status === 'out' ? `bg-zinc-300` : `bg-yellow`} w-full text-white font-bold`}
                isDisabled={status === 'out' ? true : false}
            >
                {status !== 'out' ? (
                    <div className="gap-2 flex flex-row items-center justify-center">
                        <LuPointer size={20} />
                        已售完
                    </div>
                ) : (
                    `直接購買`
                )}
            </Button>
        </div>
    )
}

import Image from 'next/image'
import Product from './Product'
import { FcAlarmClock } from 'react-icons/fc'
import { LuPointer } from 'react-icons/lu'

export default function OnSale() {
    return (
        <div className="border-2 border-yellow w-full flex flex-col gap-4 justify-center items-start rounded-xl">
            <div className="relative hidden md:flex justify-center items-center">
                <div className="absolute z-10 text-white font-bold text-xl flex flex-row justify-center items-center gap-4">
                    <FcAlarmClock className=" " size={30} />
                    限時搶購
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="211" height="76" viewBox="0 0 211 76" fill="none">
                    <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H211L196.672 68.0601C195.697 72.6876 191.615 76 186.886 76H0V10Z"
                        fill="#FFBA42"
                    />
                </svg>
            </div>
            <div className="relative md:hidden flex justify-center items-center">
                <div className="absolute z-10 text-white font-bold text-md flex flex-row justify-center items-center gap-1">
                    <FcAlarmClock className=" " size={20} />
                    限時搶購
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="139" height="50" viewBox="0 0 139 50" fill="none">
                    <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H139L130.133 42.0627C129.158 46.6889 125.076 50 120.348 50H0V10Z"
                        fill="#FFBA42"
                    />
                </svg>
            </div>

            <div className="grid-cols-2 md:grid-cols-5	grid gap-8 p-8">
                <Product status="" />
                <Product status="out" />
                <Product status="out" />
                <Product status="out" />
                <Product status="out" />
            </div>
        </div>
    )
}

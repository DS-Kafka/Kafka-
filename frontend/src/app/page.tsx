import Image from 'next/image'
import Header from '@/app/components/Header'
import Banner from '@/app/components/Banner'
import OnSale from './components/OnSale'

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-full flex min-h-screen flex-col items-center justify-start px-4 md:px-32 2xl:px-96 py-8 gap-8">
                <Banner />
                <OnSale />
            </main>
        </>
    )
}

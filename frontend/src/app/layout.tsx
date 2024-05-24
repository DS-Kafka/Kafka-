import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DShome 24hr購物',
    description:
        'DShome24h購物提供3C資訊、數位通訊、生活家電、日用生活、傢俱廚衛、運動戶外、時尚精品、美妝保養、保健醫療、食品生鮮、圖書票券等數百萬件商品。全台保證24小時到貨，DShome24h購物是您網路購物的首選。',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}

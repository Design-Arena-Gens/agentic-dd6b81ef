export const metadata = {
  title: 'गोलू और मोलू की कहानी - Golu aur Molu ki Kahani',
  description: 'An animated interactive story of two potato friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  )
}

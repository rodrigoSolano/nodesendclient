/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Node Send</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <main className="mt-20">
            {children}
          </main>
        </div>
      </div>  
    </>
  )
}

export default Layout;
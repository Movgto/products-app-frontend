import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <header className="bg-pink-900">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-white font-extrabold text-2xl py-3">Products Administrator</h1>
        </div>
      </header>
      <main className="mt-3 mx-auto max-w-4xl p-4 shadow-md bg-white">
        <Outlet />
      </main>
    </>
  )
}

export default Layout

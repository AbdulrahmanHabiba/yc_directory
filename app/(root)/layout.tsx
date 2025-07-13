import Navbar from '../../components/Navbar';
import React from 'react'

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar/>
      {children}
    </main>
  )
}

export default Layout;

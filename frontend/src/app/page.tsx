import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'

function HomePage() {
  return (
    <div>
      HomePage
      <br/>
      <Link href="/dashboard/admin" className={buttonVariants()}>
        {/* Botón que redirige al CRUD de productos */}
        Administrador
      </Link>


    </div>
  )
}

export default HomePage

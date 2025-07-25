import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import Ping from './Ping'
import { after } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

export default async function View({id } : {id : string}) {

    const {views : totalViews } = await client
            .withConfig({useCdn : false })
            .fetch(STARTUP_BY_ID_QUERY , {id})
            

  // after(() => writeClient.incrementViews(id))
  after(async () => await writeClient.patch(id).set({views : totalViews + 1}).commit())

  return (
      <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  )
}

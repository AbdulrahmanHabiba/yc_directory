import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it'
import View from '@/components/View'

import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound(); 
  const md = markdownit()
  const parsedDetails = md.render(post?.pitch || '# Not Found Pitch !')
  
  return (
    <> 
     <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {typeof post.image === "string" && post.image.trim() !== "" ? (
          <Image
            src={post.image}
            alt="thumbnail"
            width={800}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        ) : (
          <Image
            src="/logo.png"
            alt="thumbnail"
            width={800}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        )}
 
       <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
             {typeof post.author.image === "string" && post.author.image.trim() !== "" ? (
               <Image
                 src={post.author.image}
                 alt="avatar"
                 width={64}
                 height={64}
                 className="rounded-full drop-shadow-lg"
               />
             ) : (
               <Image
                 src="/logo.png"
                 alt="avatar"
                 width={64}
                 height={64}
                 className="rounded-full drop-shadow-lg"
               />
             )}

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedDetails ? (
            <article className='prose' dangerouslySetInnerHTML={{ __html: parsedDetails }} />
          ) : (
            <p className="no-result">No pitch details available</p>
          )}
      
        </div>

        <hr className='divider' />
        <Suspense fallback={<Skeleton className='h-[100px] w-full' />}>
        <View id = {id} /> 
          </Suspense>    
      </section>






      </>
  )
}

export default page
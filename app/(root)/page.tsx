import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
export default async function Home({ searchParams }: { searchParams: Promise<{query?: string}> }) {

    const query = (await searchParams).query
    const params = { search : query || null}
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY , params})
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup, <br/>
                    Connect With Entrepreneurs
                </h1>

                <p className="sub-heading max-w-3xl ">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
                    Competitions.
                </p>
                <SearchForm query={query?.toString()}/>
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post : StartupTypeCard) => (
                            post && <StartupCard key={post._id} post={post as StartupTypeCard}/>
                        ))
                    ) : (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>

            <SanityLive />
        </>
    );
}

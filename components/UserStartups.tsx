import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

interface UserStartupsProps {
  id: string;
}

const UserStartups = async ({ id }: UserStartupsProps) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  if (!startups || startups.length === 0) {
    return (
      <li className="text-center text-gray-500 py-8">
        No startups found for this user.
      </li>
    );
  }

  return (
    <>
      {startups.map((startup: StartupTypeCard) => (
        startup && <StartupCard key={startup._id} post={startup} />
      ))}
    </>
  );
};

export default UserStartups;
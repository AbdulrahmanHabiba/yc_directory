import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { Skeleton } from "./ui/skeleton";

// Type for startup data with resolved author from queries
export type StartupTypeCard = {
  _id: string;
  title: string | null;
  slug: unknown;
  _createdAt: string;
  author: {
    _id: string;
    name: string | null;
    image: unknown;
    bio: string | null;
  } | null;
  views: number | null;
  description: string | null;
  category: string | null;
  image: string | null;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  // Early return if post is undefined or null
  if (!post) {
    return null;
  }

  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          {author?.image ? (
            <Image
              src={
                typeof author.image === "string"
                  ? author.image
                  : urlFor(author.image).width(48).height(48).url()
              }
              alt={author.name || "avatar"}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/logo.png"
              alt="default"
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        {image ? (
          <Image
            src={
              typeof image === "string"
                ? image
                : urlFor(image).width(400).height(250).url()
            }
            alt="startup image"
            width={400}
            height={250}
            className="startup-card_img"
          />
        ) : (
          <Image
            src="/logo.png"
            alt="default"
            width={400}
            height={250}
            className="startup-card_img"
          />
        )}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};


export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;

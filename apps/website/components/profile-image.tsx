import { USER } from "@/config/user";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const SelfImage = () => {
  const lightImg = USER.image.profileLight ?? USER.image.profile;
  const darkImg = USER.image.profileDark ?? USER.image.profile;

  return (
    <>
      <Image
        src={lightImg}
        width={64}
        height={64}
        priority={true}
        className="rounded-full bg-white dark:hidden"
        alt={`A photo of ${USER.name}`}
      />
      <Image
        src={darkImg}
        width={64}
        height={64}
        priority={true}
        className="hidden rounded-full bg-white dark:block"
        alt={`A photo of ${USER.name}`}
      />
    </>
  );
};

export const ProfileImage = ({ className }: { className?: string }) => {
  const lightImg = USER.image.profileLight ?? USER.image.profile;
  const darkImg = USER.image.profileDark ?? USER.image.profile;

  return (
    <div
      className={cn(
        "relative size-[160px] sm:size-[160px] border-r-1 border-black dark:border-white",
        className,
      )}
    >
      {/* Light mode profile image */}
      <img
        src={lightImg}
        fetchPriority="high"
        className="h-full w-full select-none bg-secondary object-cover dark:hidden"
        alt={`Profile of ${USER.name}`}
      />
      {/* Dark mode profile image */}
      <img
        src={darkImg}
        fetchPriority="high"
        className="hidden h-full w-full select-none bg-secondary object-cover dark:block"
        alt={`Profile of ${USER.name}`}
      />
    </div>
  );
};

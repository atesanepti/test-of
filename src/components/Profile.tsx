import Image from "next/image";
import man from "@/../public/assets/man.png";

const Profile = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={man}
        alt={name}
        className="w-[30px] aspect-square rounded-full"
        placeholder="blur"
      />
      <span className="text-sm font-semibold text-white">{name}</span>
    </div>
  );
};

export default Profile;

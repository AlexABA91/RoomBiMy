import Image from "next/image";
import Link from "next/link";

const SocialNetwork: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Link href="#" style={{ marginLeft: "5px" }}>
      <Image src={src} width={20} height={20} alt="Picture of the author" />
    </Link>
  );
};

export { SocialNetwork };

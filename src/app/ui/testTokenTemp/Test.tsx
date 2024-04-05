"use client";
import { checkTokenExpiration } from "@/app/services/jwtDecoder";
import { useSession } from "next-auth/react";

const Test: React.FC = () => {
  const session = useSession();
  const { data } = session;

  const click = () => {
    console.log("345 Rt", data?.user?.name);
    if (data?.user?.name) checkTokenExpiration(data?.user?.name);
  };

  return (
    <div>
      <button onClick={click}>jwt</button>
    </div>
  );
};

export { Test };

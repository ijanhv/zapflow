"use client";
import React from "react";
import { SheetMenu } from "../dashboard/sidebar/sheet-menu";
import { LinkButton } from "../buttons/link-button";
import { PrimaryButton } from "../buttons/primary-button";
import { useRouter } from "next/navigation";

// export const Appbar = () => {
//   const router = useRouter();
//   return (
//     <div className="flex border-b justify-between p-4">
//       <div className="flex flex-col justify-center text-2xl font-extrabold">
//         Zapier
//       </div>
//       <div className="flex">
//         <div className="pr-4">
//           <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
//         </div>
//         <div className="pr-4">
//           <LinkButton
//             onClick={() => {
//               router.push("/auth/login");
//             }}
//           >
//             Login
//           </LinkButton>
//         </div>
//         <PrimaryButton
//           onClick={() => {
//             router.push("/auth/signup");
//           }}
//         >
//           Signup
//         </PrimaryButton>
//       </div>
//     </div>

export const Appbar = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="max-w-7xl mx-auto flex h-14 items-center w-full justify-between">
        <div className="flex items-center justify-between  lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">Zapier</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
          </div>
          <div className="">
            <LinkButton
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </LinkButton>
          </div>
          <PrimaryButton
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Signup
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
};

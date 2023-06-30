"use client";

import { Popover, Transition } from "@headlessui/react";
import type { Session } from "next-auth";
import Image from "next/image";
import { Fragment, useState } from "react";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";

type UserInfoProps = {
  session?: Session;
};

const LoginSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    height="30px"
    width="30px"
    version="1.1"
    id="Capa_1"
    viewBox="0 0 499.1 499.1"
  >
    <g>
      <g>
        <g>
          <path d="M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5     l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2     C7.7,232.5,0,240.1,0,249.6z" />
          <path d="M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166     c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7     c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6     c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z" />
        </g>
      </g>
    </g>
  </svg>
);

export const UserInfo = ({ session }: UserInfoProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  if (!session) {
    return (
      <LoginButton className="rounded-lg border-0 bg-spotify-green p-2 text-lg text-white hover:bg-green-600 focus:outline-none">
        <LoginSvg />
      </LoginButton>
    );
  }

  return (
    <Popover className="h-[40px]">
      {() => {
        if (!session?.user || !session?.user.image || !session?.user.name) {
          return <></>;
        }

        return (
          <>
            <Popover.Button className="border-none focus:outline-none">
              <div
                className="flex items-center gap-4"
                onClick={() => setIsLogoutOpen(!isLogoutOpen)}
              >
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-solid border-spotify-green"
                />
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute mt-1 max-w-sm -translate-x-10 rounded-md bg-white text-black">
                <LogoutButton className="h-full w-full px-5 py-1">
                  Logout
                </LogoutButton>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

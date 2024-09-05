import type { NextPage } from "next";
import Link from "next/link";
import Card from "../components/card";
import {
  RocketLaunchIcon,
  BanknotesIcon,
  MagnifyingGlassPlusIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../functions/classNameJoin";

const infoCards = [
  {
    title: "Lend RPL to be Staked",
    href: "/lender",
    content: ["Get started as a Lender! Earn interest on your RPL."],
    icon: RocketLaunchIcon,
    iconForeground: "text-amber-700 dark:text-amber-300",
    iconBackground: "bg-amber-100 dark:bg-amber-900/70",
  },
  {
    title: "Borrow RPL for your Node",
    href: "/borrower",
    content: ["Get RPL to stake on Rocket Pool! No extra collateral required."],
    icon: BanknotesIcon,
    iconForeground: "text-green-700 dark:text-green-300",
    iconBackground: "bg-green-100 dark:bg-green-900/70",
  },
  {
    title: "Rocket Lend Explorer",
    href: "/explorer",
    content: ["See active loans and pools."],
    icon: MagnifyingGlassPlusIcon,
    iconForeground: "text-blue-700 dark:text-blue-300",
    iconBackground: "bg-blue-100 dark:bg-blue-900/70",
  },
  {
    title: "Docs and Info",
    href: "/docs",
    content: ["How Rocket Lend works."],
    icon: BookOpenIcon,
    iconForeground: "text-purple-700 dark:text-purple-300",
    iconBackground: "bg-purple-100 dark:bg-purple-900/70",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <h1
        className={
          "w-fit font-medium text-2xl sm:text-3xl md:text-4xl mx-auto my-16"
        }
      >
        Welcome to{" "}
        <span className="font-bold bg-gradient-to-r from-yellow-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent">
          Rocket Lend
        </span>
        !
      </h1>

      <p
        className={
          "text-lg sm:text-xl md:text-2xl font-extralight text-center my-12 mx-auto max-w-xs sm:max-w-xl"
        }
      >
        The immutable protocol for borrowing and lending staked{" "}
        <Link
          target="_blank"
          href="https://etherscan.io/address/0xd33526068d116ce69f19a9ee46f0bd304f21a51f"
          className="text-amber-500 rounded-sm font-light"
        >
          RPL
        </Link>{" "}
        for use on{" "}
        <Link
          href="https://rocketpool.net"
          className="text-amber-500 rounded-sm font-light"
        >
          Rocket Pool
        </Link>{" "}
        nodes.
      </p>

      <div className="rounded-lg bg-transparent grid sm:grid-cols-2 gap-2 max-w-xs sm:max-w-fit mx-auto">
        {infoCards.map((card, index) => {
          return (
            <Link
              key={index}
              href={card.href}
              className={classNames(
                index === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                index === 1 ? "sm:rounded-tr-lg" : "",
                index === infoCards.length - 2 ? "sm:rounded-bl-lg" : "",
                index === infoCards.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-zinc-50 shadow dark:bg-zinc-800/50 p-6"
              )}
            >
              <Card card={card} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;

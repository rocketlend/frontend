import type { NextPage } from "next";
import Link from "next/link";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
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
    content: ["Get started as a Lender!", "Earn interest on your RPL."],
    icon: RocketLaunchIcon,
    iconForeground: "text-orange-700",
    iconBackground: "bg-orange-50",
  },
  {
    title: "Borrow RPL for your Node",
    href: "/borrower",
    content: [
      "Get RPL to stake on Rocket Pool!",
      "No extra collateral required.",
    ],
    icon: BanknotesIcon,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
  },
  {
    title: "Rocket Lend Explorer",
    href: "/explorer",
    content: ["See active loans and pools."],
    icon: MagnifyingGlassPlusIcon,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50",
  },
  {
    title: "Docs and Info",
    href: "/docs",
    content: ["How Rocket Lend works."],
    icon: BookOpenIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Welcome to Rocket Lend!</h1>

      <p className={styles.description}>
        The immutable protocol for borrowing and lending staked{" "}
        <a href="https://etherscan.io/address/0xd33526068d116ce69f19a9ee46f0bd304f21a51f">
          RPL
        </a>{" "}
        for use on <a href="https://rocketpool.net">Rocket Pool</a> nodes.
      </p>

      <div className="overflow-hidden rounded-lg bg-transparent shadow grid sm:grid-cols-2 gap-px">
        {infoCards.map((card, index) => {
          return (
            <Link key={index} href={card.href}>
              <div
                className={classNames(
                  index === 0
                    ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                    : "",
                  index === 1 ? "sm:rounded-tr-lg" : "",
                  index === infoCards.length - 2 ? "sm:rounded-bl-lg" : "",
                  index === infoCards.length - 1
                    ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                    : "",
                  "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                )}
              >
                <Card card={card} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;

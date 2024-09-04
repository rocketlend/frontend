import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { StackedLayout } from "./stacked-layout";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "./navbar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./dropdown";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "./sidebar";

import { ChevronDownIcon } from "@heroicons/react/16/solid";

// import styles from "../styles/Home.module.css";
import { FC, ReactNode } from "react";
import { DiscordIcon, GitHubIcon } from "./CustomIcons";

const navItems = [
  { label: "Home", url: "/" },
  { label: "Borrower", url: "/borrower" },
  { label: "Lender", url: "/lender" },
  { label: "Explorer", url: "/explorer" },
  { label: "Docs", url: "/docs" },
];

const Footer = () => {
  return (
    <footer className="dark:bg-zinc-900 dark:lg:bg-zinc-950 bg-white lg:bg-zinc-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {navItems.map((item) => (
            <div key={item.label} className="pb-6">
              <a
                href={item.url}
                className="text-sm leading-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <a
            key={"GitHub"}
            href={"https://github.com/rocketlend"}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <span className="sr-only">{"GitHub"}</span>
            <GitHubIcon aria-hidden="true" className="h-6 w-6" />
          </a>
          {/* TODO get correct Discord link */}
          <a
            key={"Discord"}
            href={""}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <span className="sr-only">{"GitHub"}</span>
            <DiscordIcon aria-hidden="true" className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-zinc-500">
          &copy; 2024 Rocket Lend. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div className="text-zinc-900 dark:text-zinc-50">
      <StackedLayout
        navbar={
          <Navbar>
            <Dropdown>
              <DropdownButton as={NavbarItem} className="max-lg:hidden">
                {/* <Avatar src="TODO/path/to/logo" /> */}
                <NavbarLabel>Rocket Lend</NavbarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                {/* TODO maybe this could be where the user switches between different lender IDs or whatnot - or maybe we don't need it */}
              </DropdownMenu>
            </Dropdown>
            <NavbarDivider className="max-lg:hidden" />
            <NavbarSection className="max-lg:hidden">
              {navItems.map(({ label, url }) => (
                <NavbarItem
                  key={label}
                  href={url}
                  current={
                    url === "/" ? asPath === "/" : asPath.startsWith(url)
                  }
                >
                  {label}
                </NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                  {/* <Avatar src="TODO/path/to/logo" /> */}
                  <SidebarLabel>Rocket Lend</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu>
                  {/* TODO maybe this could be where the user switches between different lender IDs or whatnot - or maybe we don't need it */}
                </DropdownMenu>
              </Dropdown>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                {navItems.map(({ label, url }) => (
                  <SidebarItem key={label} href={url}>
                    {label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
      <Footer />
    </div>
  );
};
export default Layout;

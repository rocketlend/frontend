import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
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

const navItems = [
  { label: "Home", url: "/" },
  { label: "Borrower", url: "/borrower" },
  { label: "Lender", url: "/lender" },
  { label: "Explorer", url: "/explorer" },
  { label: "Docs", url: "/docs" },
];

// function Navbar() {
//   return (
//     <div className='flex gap-2'>
//       <a href='/'>Home</a>
//       <a href='borrower'>Borrower</a>
//       <a href='lender'>Lender</a>
//       <a href='explorer'>Explorer</a>
//       <a href='docs'>Docs</a>
//       <ConnectButton />
//     </div>
//   )
// };

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <div className={styles.container}>
    // <Head>
    //   <title>Rocket Lend</title>
    //   <meta
    //     content="Frontend for Rocket Lend: lending protocol for staked RPL"
    //     name="description"
    //   />
    //   <link href="/favicon.ico" rel="icon" />
    // </Head>
    // <Navbar />
    // <main className={styles.main}>
    //   {children}
    // </main>
    // <footer className={styles.footer}>
    //   <a href="https://github.com/rocketlend/frontend" rel="noopener noreferrer" target="_blank">
    //     Rocket Lend is Free Software available on GitHub.
    //   </a>
    // </footer>
    // </div>
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
              <NavbarItem key={label} href={url}>
                {label}
              </NavbarItem>
            ))}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <ConnectButton />
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
      <main className="dark:text-white">
      {children}
      </main>
    </StackedLayout>
  );
};
export default Layout;

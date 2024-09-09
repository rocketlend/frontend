import type { NextPage } from "next";
import { useParams } from "next/navigation";

const Page: NextPage = () => {
  const { node } = useParams<{ node: string }>() || { node: "" };
  return <p>TODO: borrower page for node {node}</p>
};

export default Page;

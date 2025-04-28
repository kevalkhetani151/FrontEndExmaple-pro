"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    route.push("/login");
  }, []);
  return <h1>hello this is a exmaple</h1>;
}

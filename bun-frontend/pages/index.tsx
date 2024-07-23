import { Inter } from "next/font/google";

import TodoApp from "@/components/TodoApp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <TodoApp />
    </>
  );
}

import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center gap-4">
      <Link href={"/upload"} className={"text-xl underline text-blue-600"}>
        Task 01
      </Link>
      <Link href={"/form"} className={"text-xl underline text-blue-600"}>
        Task 02
      </Link>
    </main>
  );
}

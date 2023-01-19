import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  let router = useRouter()
  router.push("/game-presenters/all")
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Scheduling</title>
        <link rel="icon" href="/favico.ico" />
      </Head>

      <p className="font-bold text-md">Loading...</p>
    </div>
  );
};

export default Home;

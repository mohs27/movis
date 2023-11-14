import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModalCustom from "@/hooks/useInfoModalCustom";
import useMovieList from "@/hooks/useMovieList";
import { Metadata, NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalCustom();

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta
          name="description"
          content="A Netflix Clone project, using Next.js, React.js, MongoDB, TypeScript, and Prisma ORM, providing a Netflix-like experience."
        />
        <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="My List" data={favorites} />
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  );
}

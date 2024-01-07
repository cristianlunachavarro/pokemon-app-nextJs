import React, { FC } from "react";
import { ReactElement } from "react";

import { NavBar } from "../ui";
import Head from "next/head";
import Loader from "../ui/loader";

type layoutProps = {
  children: ReactElement;
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

const Layout: FC<layoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Cristian Luna" />
        <meta
          name="description"
          content={`Information about the pokemon: ${title}`}
        />
        <meta name="keywords" content={`pokemon, pokedex, ${title}`} />

        <meta
          property="og:title"
          content={`Information about the pokemon: ${title}`}
        />
        <meta
          property="og:description"
          content={`This is the page of ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/pokemon.jpeg`} />
      </Head>
      <NavBar />
      <main
        style={{
          padding: "2% 2%",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;

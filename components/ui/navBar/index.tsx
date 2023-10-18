import { Text, useTheme, Image, Link } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";

export const NavBar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px 0 0",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="Icono Pokemon"
          width={70}
          height={70}
        />
        <NextLink href="/" passHref>
          <Link>
            <Text color="white" h2>
              P
            </Text>
            <Text color="white" h3>
              okemón
            </Text>
          </Link>
        </NextLink>
      </div>
      <NextLink href="/favorites" passHref>
        <Text>Favorites</Text>
      </NextLink>
    </div>
  );
};

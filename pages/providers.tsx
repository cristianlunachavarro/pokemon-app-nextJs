"use client";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "../themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider theme={darkTheme}>{children}</NextUIProvider>;
}

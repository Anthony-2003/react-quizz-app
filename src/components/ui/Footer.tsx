import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Footer({ children }: Props) {
  return <footer>{children}</footer>;
}

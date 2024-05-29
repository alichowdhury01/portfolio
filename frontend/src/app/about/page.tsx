import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";
import About from "@/components/About";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Ali Chowdhury",
};

export default function AboutPage() {
  const images = [
    '/public/images/tesla.jpg',
    '/images/foodie.jpg',
    '/images/tech.jpg',
    '/public/coding.jpg',
  ];
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About />
    </Container>
  );
}

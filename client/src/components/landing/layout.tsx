import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import FancyButton from "../ui/button";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" pos="relative" px={10} gap={20} h="100vh" align="center" bg="#FFF9E5">
      <Flex
        maxW="1650px"
        w="full"
        bg="none"
        justify="space-between"
        p={2}
        align="center"
        h="135px"
        pos="sticky"
      >
        <Flex align="center">
          <Image src="/icons/ojami-logo.svg" alt="ojami logo" w="80px" />
          <Image src="/assets/oja-kora.svg" alt="oja kora" w="120px" transform="rotate(-15deg)" />
        </Flex>
        <FancyButton bg="/assets/buttons/small-flower.svg" w={"100px"} h={"200px"}>
            my cart
        </FancyButton>
      </Flex>
      {children}
    </Flex>
  );
};

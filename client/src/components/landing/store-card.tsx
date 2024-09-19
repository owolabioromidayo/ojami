import { Flex, Image, Text, Avatar, Stack, Icon, FlexProps } from "@chakra-ui/react";
import React from "react";
import FancyButton from "../ui/button";
import { IoStarSharp } from "react-icons/io5";


interface StoreCardProps extends FlexProps {
  image: string;
  avatar: string;
  store: string;
  ratings: number;
  reviews: string;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  image,
  avatar,
  store,
  ratings,
  reviews,
  ...props
}) => {
  return (
    <Flex pos="relative" h="350px" w="360px" {...props}>
      <Flex
        direction="column"
        overflow="hidden"
        border="2px solid #000000"
        h="320px"
        w="360px"
        _hover={{
          "& img": { transform: "scale(1.1)" },
          "& .contain": {
            bottom: 2,
            width: "340px",
            borderRadius: "10px",
            color: "#EF8421",
            fontWeight: 600,
            border: "2px solid #000",
          },
        }}
        rounded="20px"
        pos="relative"
        align="center"
        cursor="pointer"
      >
        <Image
          src={image}
          alt={store}
          objectFit="cover"
          objectPosition="top"
          h="320px"
          w="360px"
          zIndex={0}
          transition="0.5s ease"
          pos="relative"
        />
        <Flex
          className="contain"
          bg="white"
          pos="absolute"
          bottom={0}
          w="full"
          borderTop="2px solid #000"
          transition="0.5s ease"
          direction="row"
          p={4}
          gap={1}
        >
            <Avatar src={avatar} border="2px solid #000" />
            <Stack spacing={-1}>
                <Text fontSize={18} fontWeight={600}>
                {store}
            </Text>
            <Flex align="center" gap={1}>
            <Icon as={IoStarSharp} />
            <Text fontSize={14} color="#000" fontWeight={500}>
                {ratings} ({reviews})
            </Text>
            </Flex>
            </Stack>
        </Flex>
      </Flex>
      <FancyButton
        pos="absolute"
        bottom={2}
        right={"-120px"}
        transform="rotate(-15deg)"
        bg="/assets/buttons/oja-sweet-blue.svg"
        w="350px"
        h="70px"
      >
        shop now
      </FancyButton>
    </Flex>
  );
};

import { FC, useEffect, useState } from "react";
import type { ReactElement } from "react";
import {
  Box,
  Stack,
  Avatar,
  Text,
  Flex,
  Image,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import VendorLayout from "@/components/mobile/layout/VendorLayout";
import type { NextPageWithLayout } from "../_app";
import { IoStarSharp } from "react-icons/io5";
import { GrCircleInformation } from "react-icons/gr";
import { useOjaContext } from "@/components/provider";

const Store: NextPageWithLayout<{}> = () => {
  useViewportHeight();
  const { user } = useOjaContext();
  const storeData = user?.storefronts[0]

  if (user?.storefronts.length === 0) {
    return (
      <Flex
        height="calc(var(--vh, 1vh) * 100 - 60px)"
        pt={'1rem'}
        flexDir={"column"}
      >
        <Flex
          backgroundColor="#FFF4E6"
          p="1rem"
          border="2px solid #B80000"
          rounded="lg"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={3}
          maxW="90%"
          mx="auto"
        >
          <Flex alignItems="center" gap={2}>
            <Icon as={GrCircleInformation} color="#B80000" boxSize={5} />
            <Text fontSize="sm" fontWeight="500">
              Storefront Required
            </Text>
          </Flex>
          <Text fontSize="xs" color="#333333">
            To access this page and manage your products, please create a
            storefront account. This will enable you to upload and view your
            products effectively.
          </Text>
          <Button
            size="sm"
            backgroundColor="#000000"
            color="#ffffff"
            w="100%"
            maxW="200px"
            py="0.75rem"
            mt={2}
            _focus={{ backgroundColor: "#00000070" }}
          >
            Create Storefront
          </Button>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Box
        height="calc(var(--vh, 1vh) * 100 - 60px)"
        w="100vw"
        overflowY={"auto"}
        px={"0.5rem"}
        pt={"0.5rem"}
      >
        <Stack
          border={"2px solid #000000"}
          rounded={"xl"}
          p={"1rem"}
          alignItems={"center"}
          lineHeight={"1"}
          backgroundColor={"#FFF9E5"}
          gap={2}
        >
          <Flex position={"relative"}>
            <Avatar
              src="https://th.bing.com/th/id/OIP.Y_Qxr_ZYqtvVIxrKDUFVSQAAAA?rs=1&pid=ImgDetMain"
              size={"lg"}
              border={"2px solid #000000"}
            />
            <Flex position={"absolute"} left={"10"}>
              <Image
                src="/images/mobile/store-profile-image-tag.svg"
                alt="sotre-tag"
                height={"18px"}
                w={"19px"}
              />
            </Flex>
          </Flex>
  
          <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
            Top shelf wine & Liquor
          </Text>
          <Flex alignItems={"center"} gap={1}>
            <Icon as={IoStarSharp} />
            <Text fontSize={"xs"} fontWeight={"500"}>
              4.5 (2k)
            </Text>
          </Flex>
          <Text fontSize={"xs"} textAlign={"center"}>
            A premium selection of wines and liquor from around the world
          </Text>
        </Stack>
      </Box>
    )
  }

}

Store.getLayout = function getLayout(page: ReactElement) {
  return <VendorLayout>{page}</VendorLayout>;
};

export default Store;

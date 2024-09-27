import type { ReactElement } from "react";
import { Box, Stack, Flex, Text, Grid, GridItem, Heading, Avatar, Badge } from "@chakra-ui/react";
import VendorLayout from "@/components/mobile/layout/VendorLayout";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { useOjaContext } from "@/components/provider";
import {format} from 'date-fns'

const VendorHome: NextPageWithLayout<{}> = () => {
  const {user} = useOjaContext()
  const currentDate = format(new Date(), 'MMMM yyyy')
  const quickLinks = [
    {
      image: "/images/mobile/vendorHome/create-link.svg",
      title: "Create Payment Link",
    },
    {
      image: "/images/mobile/vendorHome/qrcode.svg",
      title: "Generate QR Code",
    },
    {
      image: "/images/mobile/vendorHome/add-products.svg",
      title: "Add Products",
    },
    {
      image: "/images/mobile/vendorHome/discounts.svg",
      title: "Discounts",
    },
    {
      image: "/images/mobile/vendorHome/refunds.svg",
      title: "Refunds",
    },
    {
      image: "/images/mobile/vendorHome/request-payout.svg",
      title: "Request Payout",
    },
  ];

  const orderHistory = [
    {
      profileImg: "/images/mobile/profile.svg",
      status: "completed",
      amount: 1102000,
      firstName: "Andrew",
      lastName: "Okafor",
      items: [
        "1x PlayStation 5 Slim 1TB 1x",
        "EA FC25 Standard Version 1x PS5 Dualshock Controller x2",
      ],
    },
    {
      profileImg: "/images/mobile/profile.svg",
      status: "cancelled",
      amount: -355000,
      firstName: "Sarah",
      lastName: "Benibo",
      items: ["1x iPhone 13 Pro 256GB SSD"],
    },
    {
      profileImg: "/images/mobile/profile.svg",
      status: "delivering",
      amount: 1102000,
      firstName: "Victoria",
      lastName: "Folarin",
      items: [
        "1x Sony XM1000-WH5",
        "2x Oraimo Freepods 4",
      ],
    },
    {
      profileImg: "/images/mobile/profile.svg",
      status: "cancelled",
      amount: 0,
      firstName: "Joshua",
      lastName: "Danjuma",
      items: [
        "1x PlayStation 5 Slim 1TB 1x",
        "EA FC25 Standard Version 1x PS5 Dualshock Controller x2",
      ],
    },
  ];

  console.log(user)

  return (
    <Box
      p={"0.2rem"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "scrollbar-width": "none",
        "-webkit-overflow-scrolling": "touch",
      }}
    >
      <Stack>
        <Box
          backgroundColor={"#EF8421"}
          w={"full"}
          border={"2px solid #000000"}
          rounded={"2xl"}
          pl={"1.5rem"}
        >
          <Flex justifyContent={"space-between"}>
            <Text
              fontSize={"xl"}
              color={"#000000"}
              fontWeight={"500"}
              pt={"2rem"}
            >
              Welcome to ọjà mi, {user?.firstname}
            </Text>
            <Image
              alt="gear"
              src={"/images/mobile/green-gear.svg"}
              width={100}
              height={100}
            />
          </Flex>

          <Flex
            flexDir={"column"}
            lineHeight={"1"}
            gap={2}
            pb={"1.5rem"}
          >
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              Revenue • {currentDate}
            </Text>
            <Text fontWeight={"semibold"} fontSize={"sm"}>
              {user?.virtualWallet.currency}{" "}
              <span style={{ fontSize: "30px", fontWeight: "600" }}>
                {user?.virtualWallet.balance.toLocaleString()}
              </span>
            </Text>
          </Flex>
        </Box>

        {/* `Quick Links` */}
        <Box>
          <Grid
            templateColumns="repeat(3, 1fr)"
            rounded={"2xl"}
            border={"2px solid #000000"}
          >
            <GridItem w="100%" bg="#ffffff" rounded={"2xl"}>
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderTop={"0px"}
                borderLeft={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[0].image}
                  width={36}
                  height={50}
                  alt={quickLinks[0].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[0].title}
                </Text>
              </Stack>
            </GridItem>
            <GridItem w="100%" bg="#ffffff">
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderTop={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[1].image}
                  width={36}
                  height={50}
                  alt={quickLinks[1].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[1].title}
                </Text>
              </Stack>
            </GridItem>
            <GridItem w="100%" bg="#ffffff" rounded={"2xl"}>
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderTop={"0px"}
                borderRight={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[2].image}
                  width={36}
                  height={50}
                  alt={quickLinks[2].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[2].title}
                </Text>
              </Stack>
            </GridItem>
            <GridItem w="100%" bg="#ffffff" rounded={"2xl"}>
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderBottom={"0px"}
                borderLeft={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[3].image}
                  width={36}
                  height={50}
                  alt={quickLinks[3].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[3].title}
                </Text>
              </Stack>
            </GridItem>
            <GridItem w="100%" bg="#ffffff">
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderBottom={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[4].image}
                  width={36}
                  height={50}
                  alt={quickLinks[4].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[4].title}
                </Text>
              </Stack>
            </GridItem>
            <GridItem
              w="100%"
              bg="#ffffff"
              borderBottom={"0px"}
              rounded={"2xl"}
            >
              <Stack
                alignItems={"center"}
                alignContent={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                p={"0.5rem"}
                border="1px solid #000000"
                borderBottom={"0px"}
                borderRight={"0px"}
                h={"full"}
              >
                <Image
                  src={quickLinks[5].image}
                  width={36}
                  height={50}
                  alt={quickLinks[5].title}
                  style={{ objectPosition: "center" }}
                />
                <Text
                  fontSize={"2xs"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {quickLinks[5].title}
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </Box>

        {/* Order history */}
        <Box mt={"1rem"} px={"0.5rem"}>
          <Heading as={"h2"} fontSize={"xs"} fontWeight={"semibold"}>
            Order History
          </Heading>

          <Stack mt={"1rem"}>
            {orderHistory.map((item, index) => (
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                key={index}
              >
                <Flex gap={2}>
                  <Avatar
                    src="/images/mobile/profile.svg"
                    border={"2px solid #000000"}
                  />
                  <Stack gap={0}>
                    <Flex gap={2} alignItems={"center"}>
                      <Text fontWeight={"bold"} fontSize={"xs"}>
                        Andrew Okafor
                      </Text>
                      <Badge
                        fontSize={"3xs"}
                        py={"0.1rem"}
                        px={"0.3rem"}
                        rounded={"2xl"}
                        border={"2px solid #000000"}
                        h={"fit-content"}
                        backgroundColor={"#00E440"}
                        textTransform={"none"}
                      >
                        completed
                      </Badge>
                    </Flex>
                    <Stack gap={0} lineHeight={"1"} mt={"0.2rem"}>
                      <Text fontSize={"2xs"} isTruncated>
                        1x PlayStation 5 Slim 1TB 1x
                      </Text>
                      <Text fontSize={"2xs"} isTruncated maxW={"130px"}>
                        EA FC25 Standard Version 1x PS5 Dualshock Controller x2
                      </Text>
                    </Stack>
                  </Stack>
                </Flex>

                <Text color={"#299517"} fontWeight={"semibold"} fontSize={"xs"}>
                  + NGN1,102,000
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

VendorHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <VendorLayout>
      {page}
    </VendorLayout>
  );
};

export default VendorHome;

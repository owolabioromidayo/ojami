import type { ReactElement } from "react";
import { Box, Heading, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import VendorLayout from "@/components/mobile/layout/VendorLayout";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
// import FancyButton from "@/components/ui/button";

interface Product {
  productImg: string;
  productName: string;
  price?: number; 
  amountRemaining?: number;
}

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Box>
      <Box
        minW={"150px"}
        border={"2px solid #000000"}
        rounded={"2xl"}
        display={"flex"}
        flexDir={"column"}
        h={"full"}
        overflow={"hidden"}
      >
        <Box w={"full"} h={"100px"} position="relative">
          <Image
            alt={product.productName}
            src={product.productImg}
            layout="fill"
            objectFit="cover"
          />
        </Box>

        <Box
          borderTop={"2px solid #000000"}
          p={2}
          w={"full"}
          wordBreak="break-word"
          whiteSpace="normal"
          bg={"#ffffff"}
        >
          <Text fontSize={"0.5rem"} textAlign={"start"} fontWeight={"semibold"} noOfLines={2}>
            {product.productName}
          </Text>

          <Text fontSize={'xs'} fontWeight={'bold'}>NGN {product.price?.toLocaleString()}</Text>
        </Box>
      </Box>
      {/* <FancyButton
          bg="/images/mobile/blue-ellipse.svg"
          transform={"rotate(10deg)"}
          height={40}
          width={48}
          top={-150}
          left={100}
        >
          <Text whiteSpace="normal" textAlign="center" fontSize="3xs">
            3 remaining
          </Text>
        </FancyButton> */}
    </Box>
  );
};

const Products: NextPageWithLayout = ({}) => {
  useViewportHeight();
  const hotProducts = [
    {
      productImg:
        "https://cdn.mos.cms.futurecdn.net/7Qv4q73m9Nif9CpxtfVWs6.jpg",
      productName: "PlayStation 5 Slim (No disk drive) 512GB SSD",
    },
    {
      productImg:
        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large.jpg",
      productName: "iPhone 16 Blue Color (eSim) 256GB Storage",
    },
    {
      productImg:
        "https://th.bing.com/th/id/OIP.Xli-KRUs0aWQJKYzgA1lJgHaEK?rs=1&pid=ImgDetMain",
      productName: "Samsung Galaxy S24 Titanium Finish with 256Gb SSD",
    },
  ];
  const remainingStock = [
    {
      productImg:
        "https://th.bing.com/th/id/R.4753f00d6d7174e47abad4142d826087?rik=ENYxZAKkw9miUQ&pid=ImgRaw&r=0",
      productName:
        "Playstation Marvel’s Spider-Man: Miles Morales – PlayStation 5",
      price: 66000,
      amountRemaining: 1,
    },
    {
      productImg:
        "https://th.bing.com/th/id/OIP.hKBS7znt1OxelAeeQdKVuwHaEK?rs=1&pid=ImgDetMain",
      productName:
        "Infinix HOT 40i 6.78 4GB RAM/128GB ROM Android 13 - Green 5 Slim (No disk drive) 512GB SSD",
      price: 170000,
      amountRemaining: 190,
    },
    {
      productImg:
        "https://th.bing.com/th/id/OIP.J2KI5UDn3Ne2t2gL0Njf3QHaEo?rs=1&pid=ImgDetMain",
      productName: "Oraimo SpacePods X Burna Boy ANC True Wireless Earbuds",
      price: 70000,
      amountRemaining: 190,
    },
    {
      productImg:
        "https://th.bing.com/th/id/OIP.ig60thKQyhRa34byQRtR0QHaEK?rs=1&pid=ImgDetMain",
      productName:
        "Ace Elec ACE 14.1'' Intel Celeron J4105 4Core CPU 16GB+512GB Laptop SILVER",
      price: 240000,
      amountRemaining: 190,
    },
    {
      productImg:
        "https://cdn.mos.cms.futurecdn.net/7Qv4q73m9Nif9CpxtfVWs6.jpg",
      productName: "PlayStation 5 Slim (No disk drive) 512GB SSD",
      price: 840000,
      amountRemaining: 190,
    },
    {
      productImg:
        "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-hero-geo-240909_inline.jpg.large.jpg",
      productName: "iPhone 16 Blue Color (eSim) 256GB Storage",
      price: 840000,
      amountRemaining: 190,
    },
  ];

  return (
    <Box
      height="calc(var(--vh, 1vh) * 100 - 60px)"
      w="100vw"
      backgroundImage={"/images/mobile/bgs/products-bg.svg"}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      overflow={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "scrollbar-width": "none",
        "-webkit-overflow-scrolling": "touch",
      }}
    >
      <Heading
        as={"h1"}
        size={"lg"}
        fontWeight={"semibold"}
        pt={"3rem"}
        px="0.8rem"
      >
        My products
      </Heading>

      {/* Hot products */}
      <Box w={"full"} overflowX={"scroll"}>
        <Heading
          as={"h2"}
          fontSize={"xs"}
          fontWeight={"semibold"}
          color={"#B0B0B0"}
          mt={"1rem"}
          px={"0.8rem"}
        >
          🔥 Hot Products from your store
        </Heading>

        <Flex
          overflowX="auto"
          whiteSpace="nowrap"
          gap={2}
          px={"0.8rem"}
          mt={"1rem"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "scrollbar-width": "none",
            "-webkit-overflow-scrolling": "touch",
          }}
        >
          {hotProducts.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </Flex>
      </Box>

      {/* Remaining stock */}
      <Box w={"full"} mt={"1.5rem"} pb={"1rem"}>
        <Heading
          as={"h2"}
          fontSize={"xs"}
          fontWeight={"semibold"}
          color={"#B0B0B0"}
          px={"0.8rem"}
        >
          Remaining stock
        </Heading>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          px={"0.8rem"}
          mt={"0.2rem"}
        >
          {remainingStock.map((product, index) => (
            <GridItem w="100%" bg="#ffffff" rounded={"2xl"} key={index}>
              <ProductItem product={product} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <VendorLayout>{page}</VendorLayout>;
};

export default Products;

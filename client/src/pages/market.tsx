import { StoreCard } from "@/components/landing/store-card";
import { MarketLayout } from "@/components/market/layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Text,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Box,
  Stack,
} from "@chakra-ui/react";
import { fakeStores, faketrends } from "../../fakedata";
import {
  TbAccessible,
  TbBuildingStore,
  TbDeviceDesktop,
  TbDeviceGamepad2,
  TbFolders,
  TbHanger,
  TbSmartHome,
} from "react-icons/tb";
import FancyButton from "@/components/ui/fancy-button";
import React, { useEffect, useState } from "react";
import ChairViewer from "@/components/utils/viewpoint";
import Genjitsu from "@/components/utils/xr/genjitsu";

const Market = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const [activeIndex, setActiveIndex] = useState(0);
  const totalDots = 5; // Total number of carousel dots

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalDots);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const categories = [
    {
      category: "Fashion",
      icon: TbHanger,
    },
    {
      category: "Gaming",
      icon: TbDeviceGamepad2,
    },
    {
      category: "Health & Beauty",
      icon: TbAccessible,
    },
    {
      category: "Home & Office",
      icon: TbSmartHome,
    },
    {
      category: "Supermarket",
      icon: TbBuildingStore,
    },
    {
      category: "Electronics",
      icon: TbDeviceDesktop,
    },
    {
      category: "Others",
      icon: TbFolders,
    },
  ];
  const newItems = [
    {
      image:
        "https://s.alicdn.com/@sc04/kf/Hc511f42a8afc4425bd5fc60016f0ca23m.jpg_720x720q50.jpg",
      link: "",
    },
    {
      image:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/81/8633852/1.jpg?1104",
      link: "",
    },
    {
      image:
        "https://i5.walmartimages.com/asr/2843e61e-69dd-4cf7-bf21-66ef70ec2f49.b4bcf06c7d167c5413455b890b0b49d2.jpeg",
      link: "",
    },
    {
      image:
        "https://www.anotherapple.com/wp-content/uploads/2024/09/iphone-16-retail-box.jpg",
      link: "",
    },
  ];
  return (
    <MarketLayout>
      <Text fontWeight={600} fontSize={22} mb={4}>
        Suggested stores
      </Text>
      <Flex w="full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {fakeStores.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <StoreCard
                  avatar={item.avatar}
                  image={item.image}
                  ratings={item.ratings}
                  reviews={item.reviews}
                  store={item.store}
                  mr={20}
                  mb={2}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Flex>
      <Flex align="center" gap={5} justify="space-between" w="full" mt={14}>
        {categories.map((item) => (
          <Flex
            _hover={{ transform: "rotate(3deg)" }}
            key={item.category}
            h="80px"
            w="full"
          >
            <FancyButton
              bg="/assets/buttons/oja-cloud-green.svg"
              key={item.category}
              w="full"
              h="80px"
            >
              <Flex gap={2} align="center">
                <Icon as={item.icon} />
                {item.category}
              </Flex>
            </FancyButton>
          </Flex>
        ))}
      </Flex>

      <Flex
        my={24}
        w="full"
        h="full"
        justify="space-between"
        gap={3}
        align="start"
      >
        {/** Top Items */}
        <Stack h="full">
          <Text mb={4} fontWeight={600} fontSize={22}>
            Top ranking
          </Text>
          <Flex
            direction="column"
            p={5}
            bg="white"
            w="445px"
            rounded="15px"
            border="2px solid #000"
          >
            <Carousel plugins={[plugin.current]} className="w-full">
              <CarouselContent>
                {faketrends.map((item) => (
                  <CarouselItem key={item.label}>
                    <Flex direction="column" w="450px">
                      <Text fontWeight={600} fontSize={18} mb={1}>
                        Most Popular
                      </Text>
                      <Text mb={4}>{item.label}</Text>
                      <Image
                        src={item.image}
                        border="2px solid #000"
                        alt={item.label}
                        w="400px"
                        h="420px"
                        objectFit="cover"
                        rounded="15px"
                      />
                      <Flex gap="4" mt={4} align="center">
                        {item.subImages.map((img) => (
                          <Image
                            key={img}
                            src={img}
                            w="123px"
                            h="100px"
                            objectFit="cover"
                            alt=""
                            border="2px solid #000"
                            rounded="10px"
                          />
                        ))}
                      </Flex>
                    </Flex>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <Flex>
                <CarouselPrevious />
                <CarouselNext />
              </Flex> */}
            </Carousel>
            <Flex justify="center" mt={3} align="center" gap={2}>
              {Array.from({ length: totalDots }).map((_, index) => (
                <Flex
                  w={activeIndex === index ? "14px" : "8px"} // Set width based on active index
                  h="8px"
                  rounded="full"
                  key={index}
                  bg={activeIndex === index ? "black" : "gray.400"}
                  transition="width 0.3s ease" // Smooth transition for width change
                />
              ))}
            </Flex>
          </Flex>
        </Stack>
        {/** New Items */}
        <Stack h="full" w="full">
          <Text mb={4} fontWeight={600} fontSize={22}>
            New arrivals
          </Text>
          <Flex
            direction="column"
            p={5}
            bg="white"
            w="full"
            rounded="15px"
            border="2px solid #000"
          >
            <Text fontSize="18" fontWeight={500} mb={4}>
              2,400+ products added today
            </Text>
            <SimpleGrid columns={2} spacing={5}>
              {newItems.map((item) => (
                <Image
                  src={item.image}
                  alt="new items"
                  key={item.image}
                  w="320px"
                  h="200px"
                  objectFit="cover"
                  border="2px solid #000"
                  rounded="9px"
                />
              ))}
            </SimpleGrid>
          </Flex>
          <Flex
            direction="column"
            p={5}
            bg="white"
            // w="445px"
            rounded="15px"
            border="2px solid #000"
          >
            <Flex gap="4" align="center">
              <Image
                src="https://www.mcsteve.com/wp-content/uploads/2021/01/airpods-max-9.jpg"
                w="123px"
                h="110px"
                objectFit="cover"
                alt=""
                border="2px solid #000"
                rounded="10px"
              />
              <Stack>
                <Text fontSize={18} fontWeight={500}>
                  New this week
                </Text>
                <Text fontSize={14} fontWeight={400}>
                  Products from verified vendors only
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </Stack>

        {/** Best Items */}
        <Stack h="full" w="full">
          <Text mb={4} fontWeight={600} fontSize={22}>
            Top deals for you
          </Text>
          <Flex
            direction="column"
            p={5}
            bg="white"
            // w="445px"
            rounded="15px"
            border="2px solid #000"
          >
            <Flex gap="4" align="center">
              <Image
                src="https://aimee-annabel.com/wp-content/uploads/2023/12/clothing-line-manufacturer.jpg"
                h="110px"
                objectFit="cover"
                alt=""
                border="2px solid #000"
                rounded="10px"
              />
              <Text fontSize={18} fontWeight={500}>
                Huge sales, 20-day lowest prices
              </Text>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            p={5}
            bg="white"
            w="full"
            h="505px"
            align="center"
            rounded="15px"
            border="2px solid #000"
            pos="relative"
          >
            <Text
              textAlign="left"
              w="full"
              fontSize="18"
              fontWeight={500}
              mb={4}
            >
              Deals on best sellers
            </Text>
            <Image
              src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/44/4499272/1.jpg?9222"
              alt="new items"
              w="full"
              h="415px"
              objectFit="cover"
              border="2px solid #000"
              rounded="9px"
            />
            <Flex
              align="center"
              transform="rotate(13deg)"
              justify="center"
              pos="absolute"
              right={"-60px"}
              top={"-10px"}
              bgImg="/assets/sharper.svg"
              bgRepeat="no-repeat"
              bgSize="contain"
              w="180px"
              h="180px"
            >
              <Text fontWeight={600}>50% OFF</Text>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
      <Flex
        direction="column"
        p={5}
        bg="white"
        // w="445px"
        rounded="15px"
        border="2px solid #000"
      >
        <ChairViewer />
      </Flex>

      <Flex
        direction="column"
        p={5}
        bg="white"
        // w="445px"
        h="1000px"
        rounded="15px"
        border="2px solid #000"
      >
        <Genjitsu />
      </Flex>
    </MarketLayout>
  );
};
export default Market;

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
import { Text, Flex, Icon, Image, Circle, Box } from "@chakra-ui/react";
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

const Market = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000 })
  );

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
  return (
    <MarketLayout>
      <Text fontWeight={600} fontSize={20} mb={4}>
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

      {/** Top Items */}
      <Flex
      mt={24}
        direction="column"
        p={5}
        bg="white"
        w="445px"
        rounded="15px"
        border="2px solid #000"
      >
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
        >
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
          <Flex>
            <CarouselPrevious />
            <CarouselNext />
          </Flex>
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
    </MarketLayout>
  );
};
export default Market;

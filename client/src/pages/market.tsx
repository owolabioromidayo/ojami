import { StoreCard } from "@/components/landing/store-card";
import { MarketLayout } from "@/components/market/layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Text, Flex, Icon } from "@chakra-ui/react";
import { fakeStores } from "../../fakedata";
import { TbAccessible, TbBuildingStore, TbDeviceDesktop, TbDeviceGamepad2, TbFolders, TbHanger, TbSmartHome } from "react-icons/tb";
import FancyButton from "@/components/ui/fancy-button";


const Market = () => {
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
    ]
  return (
    <MarketLayout>
      <Text fontWeight={600} fontSize={20} mb={4}>Suggested stores</Text>
      <Flex  w="full">
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
           <FancyButton bg="/assets/buttons/oja-cloud-green.svg" key={item.category} w="full" h="80px">
            <Flex gap={2} align="center">
                <Icon as={item.icon} />
                {item.category}
                </Flex>
            </FancyButton>
        ))}

      </Flex>
    </MarketLayout>
  );
};
export default Market;

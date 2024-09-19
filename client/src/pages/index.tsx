import { LandingLayout } from "@/components/landing/layout";
import { StoreCard } from "@/components/landing/store-card";
import FancyButton from "@/components/ui/button";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function Home() {
  const fakeStores = [
    {
      image: "https://www.lefez.co.uk/media/xkcdxowd/drinks-home-page-banner-image-and-drinks-page-image.jpg?center=0.46226074395088479,0.5033333333333333&mode=crop&width=1920&height=1246&rnd=132700553814770000",
      avatar: "https://i.pinimg.com/originals/df/aa/9d/dfaa9df694a648d64592ad67c837fd3a.jpg",
      store: "Top Shelf Wine & Liquor",
      ratings: 4.7,
      reviews: "12.1k",
    },
    {
      image: "https://www.stylerave.com/wp-content/uploads/2021/12/IMG-20211213-WA0014.jpg",
      avatar: "https://encrypted-tbn2.gstatic.com/faviconV2",
      store: "Style Rave Fashion",
      ratings: 4.4,
      reviews: "26.7k",
    },
    {
      image: "https://i.pinimg.com/736x/d1/95/b8/d195b854ddb053bc6a0f37bffeef7dbe.jpg",
      avatar: "https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg",
      store: "Aunty Dara Groceries",
      ratings: 4.0,
      reviews: "271.4k",
    },
    {
      image: "https://cdn.legit.ng/images/1120/b88411a0846952ef.jpeg?v=1",
      avatar: "https://media.istockphoto.com/id/1485377454/vector/clothing-hanger-clothes-fashion-wardrobe-store-black-elegant-handwriting-font-vector-design.jpg",
      store: "The Cloth Store",
      ratings: 4.2,
      reviews: "2.5k",
    },
    {
      image: "https://www.lefez.co.uk/media/xkcdxowd/drinks-home-page-banner-image-and-drinks-page-image.jpg?center=0.46226074395088479,0.5033333333333333&mode=crop&width=1920&height=1246&rnd=132700553814770000",
      avatar: "https://i.pinimg.com/originals/df/aa/9d/dfaa9df694a648d64592ad67c837fd3a.jpg",
      store: "Top Shelf Wine & Liquor",
      ratings: 4.7,
      reviews: "12.1k",
    },
    {
      image: "https://www.lefez.co.uk/media/xkcdxowd/drinks-home-page-banner-image-and-drinks-page-image.jpg?center=0.46226074395088479,0.5033333333333333&mode=crop&width=1920&height=1246&rnd=132700553814770000",
      avatar: "https://i.pinimg.com/originals/df/aa/9d/dfaa9df694a648d64592ad67c837fd3a.jpg",
      store: "Top Shelf Wine & Liquor",
      ratings: 4.7,
      reviews: "12.1k",
    },
  ]
  return (
    <LandingLayout>
      <Flex direction="column" w="full" h="full" maxW="1650px" align="center">
        <Flex direction="column" align="center" h="900px" overflow="hidden">
          <Text fontSize="4rem" fontWeight={"700"}>
            E dey my market
          </Text>
          <FancyButton
            bg="/assets/buttons/oja-sweet-blue.svg"
            w="200px"
            minH="100px"
            transform="rotate(10deg)"
          >
            shop now
          </FancyButton>
          <Flex align="center" gap={5} mt={20}>
            <Box
              w="1200px"
              mb={-20}
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
            <Box
              w="1200px"
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
            <Box
              w="1200px"
              mb={-20}
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg="white"
        w="full"
        h="900px"
        pos="absolute"
        mt="1100px"
        justify="center"
      >
        <Image
          src="/assets/dividers/oja-white.svg"
          w="full"
          pos="absolute"
          mt={"-100px"}
          alt={"divider"}
        />
        <Flex
          direction="column"
          w="full"
          h="full"
          maxW="1650px"
          mt="100px"
          align="center"
        >
          <Text fontSize="3.5rem" fontWeight={600}>
            Discover stores on ọjà mi
          </Text>
          <Flex gap={14} mt={20}>
            {fakeStores.map((item) => (
              <StoreCard
                key={item.store}
                image={item.image}
                store={item.store}
                avatar={item.avatar}
                ratings={item.ratings}
                reviews={item.reviews}
              />
            ))}
          </Flex>
          <FancyButton bg="/assets/buttons/oja-cloud-green.svg" w="300px" h="90px" mt={20}>Explore ọjà mi</FancyButton>
        </Flex>
      </Flex>
    </LandingLayout>
  );
}

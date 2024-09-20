import { LandingLayout } from "@/components/landing/layout";
import { StoreCard } from "@/components/landing/store-card";
import FancyButton from "@/components/ui/button";
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { fakeStores, images } from "../../fakedata";
import { SearchModal } from "@/components/utils/search-modal";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <LandingLayout>
      <Flex direction="column" w="full" h="full" maxW="1650px" align="center">
        <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="right" speed={7}>
            <Image
              pointerEvents="none"
              src="/assets/oja-clouds.svg"
              alt="clouds"
            />
            <Image
              pointerEvents="none"
              src="/assets/oja-clouds.svg"
              alt="clouds"
            />
          </Marquee>
        </Flex>
        <Flex
          direction="column"
          align="center"
          h="900px"
          overflow="hidden"
          zIndex={1}
        >
          <Text fontSize={{ base: "2.1rem", md: "4rem" }} fontWeight={"700"}>
            E dey my market
          </Text>
          <FancyButton
            bg="/assets/buttons/oja-sweet-blue.svg"
            w="200px"
            minH="100px"
            transform="rotate(10deg)"
            onClick={onOpen}
          >
            shop now
          </FancyButton>
          <SearchModal isOpen={isOpen} onClose={onClose} />
          <Flex align="center" gap={5} mt={20}>
            <Box
              w={{ base: "500px", md: "1200px" }}
              mb={-20}
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
            <Box
              w={{ base: "500px", md: "1200px" }}
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
            <Box
              w={{ base: "500px", md: "1200px" }}
              mb={-20}
              h="700px"
              rounded="30px"
              border="2px solid #000000"
              bg="gray.100"
            />
          </Flex>
        </Flex>
      </Flex>

      {/* Section 2 */}

      <Flex
        bg="white"
        w="full"
        h="900px"
        pos="absolute"
        mt="1100px"
        justify="center"
      >
        <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="right">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-white.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-white.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex>
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

          <Flex
            pos="absolute"
            w="full"
            direction="column"
            align="center"
            mt={{ base: 52, md: 24 }}
          >
            <Marquee speed={40} pauseOnHover>
              <Flex mt={20} p={2} w="full" overflow="hidden">
                {fakeStores.map((item) => (
                  <StoreCard
                    mr={14}
                    key={item.store}
                    image={item.image}
                    store={item.store}
                    avatar={item.avatar}
                    ratings={item.ratings}
                    reviews={item.reviews}
                  />
                ))}
              </Flex>
            </Marquee>
            <FancyButton
              bg="/assets/buttons/oja-cloud-green.svg"
              w="300px"
              h="90px"
              mt={20}
            >
              Explore ọjà mi
            </FancyButton>
          </Flex>
        </Flex>
      </Flex>

      {/* Section 3 */}

      <Flex
        bg="#EF8421"
        w="full"
        h="900px"
        pos="absolute"
        mt="2200px"
        justify="center"
      >
        <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="right">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-orange.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-orange.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          h="460px"
          maxW="1650px"
          mt="100px"
          align="center"
          justify="space-between"
          px={{ base: 4 }}
        >
          <Text fontSize={{ base: "3rem", md: "4rem" }} fontWeight={600}>
            List my Products
          </Text>
          <Image
            src="/assets/oja-products.png"
            w="500px"
            alt="oja-products"
            pointerEvents="none"
          />
        </Flex>
      </Flex>

      {/* Section 4 */}

      <Flex
        bg="#2BADE5"
        w="full"
        h="900px"
        pos="absolute"
        mt="3000px"
        justify="center"
      >
        <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="left">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-blue.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-blue.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          h="460px"
          maxW="1650px"
          mt="100px"
          align="center"
          justify="space-between"
          px={{ base: 4 }}
        >
          <Text fontSize={{ base: "3rem", md: "4rem" }} fontWeight={600}>
            Manage my Payments
          </Text>
          <Image
            src="/assets/oja-payments.svg"
            w="500px"
            mt={10}
            alt="oja-payments"
            pointerEvents="none"
          />
        </Flex>
      </Flex>

      {/* Section 5 */}

      <Flex
        bg="#00E440"
        w="full"
        h="900px"
        pos="absolute"
        mt="3800px"
        justify="center"
      >
        <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="left">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-green.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-green.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          h="460px"
          maxW="1650px"
          mt="100px"
          align="center"
          justify="space-between"
          px={{ base: 4 }}
        >
          <Text fontSize={{ base: "3rem", md: "4rem" }} fontWeight={600}>
            Create my Marketplace
          </Text>
          <Image
            src="/assets/oja-market.svg"
            w="600px"
            mt={10}
            alt="oja-market"
            pointerEvents="none"
          />
        </Flex>
      </Flex>

      {/* Section 5 */}

      <Flex
        bg="#FFF9E5"
        w="full"
        h="800px"
        pos="absolute"
        mt="4600px"
        justify="center"
      >
        <Flex w="full" pos="absolute" mt={"700px"}>
          <Marquee direction="left">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-cream.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-cream.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          h="460px"
          maxW="1650px"
          mt={{ base: "-50px", md: "100px"}}
          align="center"
          justify={{ md: "space-between"}}
        >
          <Flex pos={{ md: "absolute" }} w={{ base: "80%", md: "100%"}}>
            <Flex
              bgImg="/assets/green-area.svg"
              bgPos="center"
              bgSize="contain"
              bgRepeat="no-repeat"
              w={{ base: "300px", md: "800px"}}
              h={{ md: "600px"}}
              pos="relative"
              align="center"
              justify="center"
              px={{ base: 2, md: 28}}
            >
              <Image src="/assets/oja-watashi.svg" alt="star" mr={6} w={{ base: "50px", md: "full"}} />
              <Text lineHeight={1} fontSize={{ base:"2rem", md: "4rem"}} fontWeight={600}>
                3D/AR Something sha
              </Text>
            </Flex>
            <FancyButton
              bg="/assets/buttons/oja-ellipse-purple.svg"
              w={{ base:"220px", md: "200px"}}
              h={{ base: "200px", md: "80px"}}
              zIndex={1}
              pos="relative"
              right={{base:"80px", md: "280px"}}
              top={{ base:"270px", md: "470px"}}
              transform="rotate(-12deg)"
            >
              <Text fontSize={{md: "26"}}>try it</Text>
            </FancyButton>
          </Flex>

          <Flex pos={{ md: "absolute" }} w={{ base: "80%", md: "50%"}} right={0}>
            <Flex
              bgImg="/assets/orange-area.svg"
              bgPos="center"
              bgSize="contain"
              bgRepeat="no-repeat"
              w={{ base: "300px", md: "800px"}}
              zIndex={1}
              h="600px"
              pos="relative"
              align="center"
              justify="center"
              px={{ base: 12, md: 40}}
            >
              <Image src="/assets/oja-watashi.svg" alt="star" mr={6} w={{ base: "50px", md: "full"}} />
              <Text lineHeight={1} fontSize={{ base:"2rem", md: "4rem"}}  fontWeight={600}>
                AI Shopping Assistant
              </Text>
            </Flex>
            <FancyButton
              bg="/assets/buttons/oja-ellipse-blue.svg"
              w={{ base:"220px", md: "200px"}}
              h={{ base: "200px", md: "80px"}}
              zIndex={1}
              pos="relative"
              right={{base:"80px", md: "280px"}}
              top={{ base:"270px", md: "470px"}}
              transform="rotate(-12deg)"
            >
              <Text fontSize={{md: "26"}}>try it</Text>
            </FancyButton>
          </Flex>
        </Flex>
      </Flex>

      {/* Section 6 */}

      <Flex
        bg="white"
        w="full"
        h="900px"
        pos="absolute"
        mt="5500px"
        justify="center"
      >
        {/* <Flex w="full" pos="absolute" mt={"-100px"}>
          <Marquee direction="right">
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-white.svg"
              w="full"
              alt={"divider"}
            />
            <Image
              pointerEvents="none"
              src="/assets/dividers/oja-white.svg"
              w="full"
              alt={"divider"}
            />
          </Marquee>
        </Flex> */}
        <Flex
          direction="column"
          w="full"
          h="full"
          maxW="1650px"
          mt="100px"
          align="center"
        >
          <Text fontSize="3.5rem" fontWeight={600}>
            Find it on ọjà mi
          </Text>
          <FancyButton
            bg="/assets/buttons/oja-cloud-green.svg"
            w="300px"
            h="90px"
            right={-40}
            mt={-7}
            transform={"rotate(-10deg)"}
          >
            Explore ọjà mi
          </FancyButton>

          <Flex
            pos="absolute"
            w="full"
            direction="column"
            align="center"
            mt={24}
          >
            <Marquee speed={50} direction="right">
              <Flex mt={20} p={2} w="full" overflow="hidden" align="center">
                {images.map((item) => (
                  <Image
                    key={item}
                    src={item}
                    alt="explore oja"
                    w="350px"
                    mr={4}
                    pointerEvents="none"
                  />
                ))}
              </Flex>
            </Marquee>
          </Flex>
        </Flex>
      </Flex>
    </LandingLayout>
  );
}

import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  keyframes,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import React from "react";
import FancyButton from "../ui/fancy-button";
import { SignInModal } from "../utils/signin-modal";
import { IoSearch, IoSparkles, IoSparklesOutline } from "react-icons/io5";

interface MarketLayoutProps {
  children: React.ReactNode;
}

export const MarketLayout: React.FC<MarketLayoutProps> = ({ children }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { isOpen: isMOpen, onToggle } = useDisclosure();
  const tools = [
    {
      label: "AI Chat",
    },
    {
      label: "AI Search",
    },
    {
      label: "Explore",
    },
    {
      label: "AR Store",
    },
  ];

  const rotateAnimation = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;
  return (
    <Flex
      direction="column"
      px={{ lg: 10 }}
      gap={20}
      h="100vh"
      align="center"
      bg="#FFF9E5"
    >
      <Flex
        maxW="1650px"
        w="full"
        bg="#FFF9E5"
        justify="space-between"
        p={2}
        align="center"
        h="135px"
        zIndex={15}
        pos="fixed"
      >
        <Flex align="center">
          <Image
            pointerEvents="none"
            src="/icons/ojami-logo.svg"
            alt="ojami logo"
            w={{ base: "50px", md: "80px" }}
          />
          <Image
            pointerEvents="none"
            src="/assets/oja-kora.svg"
            alt="oja kora"
            w={{ base: "50px", md: "120px" }}
            transform="rotate(-15deg)"
          />
        </Flex>

        <Flex direction="column" h="full"  align="center"  mt={8} pos="relative">
          <Flex align="center" gap={1}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" py={"34px"}>
                <Icon as={IoSearch} />
              </InputLeftElement>
              <Input
              w="460px"
                border="2px solid #000"
                rounded="12px"
                py={8}
                focusBorderColor="#EF8421"
              />
            </InputGroup>
            <IconButton
              onClick={() => onToggle()}
              colorScheme="orange"
              variant="ghost"
              icon={<IoSparkles />}
              fontSize={24}
              aria-label="shop assistant"
              py={8}
              px={6}
            />
          </Flex>
          <Collapse in={isMOpen} animateOpacity>
            <Box
            zIndex={10}
            pos="absolute"
            left={0}
              p="20px"
              mt="4"
              bg="white"
              border="2px solid #000"
              rounded="md"
            >
              <Text color="black" mb={2} fontWeight={600}>
                Quick Tools
              </Text>
              <Flex gap={2} align="center">
                {tools.map((item) => (
                  <Box
                    key={item.label}
                    bg="orange"
                    w="115px"
                    h="80px"
                    rounded="12px"
                    border="2px solid #000"
                    alignContent="center"
                    textAlign="center"
                    fontWeight={600}
                    cursor="pointer"
                    transition="0.5s ease"
                    _hover={{ transform: "scale(1.05)" }}
                    _active={{ transform: "scale(0.95)" }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Flex>

              <Flex align="center" gap={2} mt={10} mb={2} fontWeight={600}>
                <Icon as={IoSparklesOutline} />
                <Text>Suggested searches</Text>
              </Flex>
              <Flex
                align="center"
                gap={2}
                p={2}
                _hover={{ bg: "#f0f0f0" }}
                rounded="lg"
                cursor="pointer"
              >
                <Icon
                  as={IoSearch}
                  fontSize={36}
                  p={2}
                  border="1px solid #e2e2e2"
                  rounded="4"
                />
                <Text>PlayStation 5 Pro</Text>
              </Flex>
            </Box>
          </Collapse>
        </Flex>
        
        <FancyButton
          bg="/assets/buttons/small-flower.svg"
          w={{ base: "70px", md: "100px" }}
          h={{ base: "120px", md: "100px" }}
          onClick={onOpen}
        >
          my cart
        </FancyButton>
        <SignInModal isOpen={isOpen} onClose={onClose} />
      </Flex>


      <Flex
      mt="180px"
        maxW="1650px"
        w="full"
        direction="column"
        pos="relative"
        >

      {children}
        </Flex>
      <Flex
        w="full"
        mt="6300px"
        bg="#FFF9E5"
        pt="14"
        pos="absolute"
        direction="column"
        // justify="center"
        align="center"
        zIndex={1}
      >
        <Image
          pointerEvents="none"
          src="/assets/star.svg"
          alt="star"
          pos="absolute"
          right={-14}
          top={-14}
          animation={`${rotateAnimation} 40s linear infinite`}
        />
        <Image
          pointerEvents="none"
          src="/icons/oja-foot.png"
          w="500px"
          alt="footer"
        />
        <Image
          pointerEvents="none"
          src="/assets/dividers/oja-orange.svg"
          w="full"
          mt={20}
          alt="footer"
        />
        <Flex bg="#EF8421" w="full" h="40px" zIndex={2} mt={-10} />
      </Flex>
    </Flex>
  );
};

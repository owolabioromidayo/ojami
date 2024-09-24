import { FC } from "react";
import { Box, Text, Input, Stack, Flex, keyframes } from "@chakra-ui/react";
import FancyButton from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";

interface SigninMobileProps {}

const SigninMobile: FC<SigninMobileProps> = ({}) => {
  const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
  useViewportHeight();
  return (
    <Box
      backgroundImage={"/images/mobile/bgs/sign-in-bg.svg"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      height="calc(var(--vh, 1vh) * 100)"
      w="100vw"
      overflow="auto"
      pt={"6rem"}
      px={"1.5rem"}
    >
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"} mt={"0.5rem"}>
          Sign in
        </Text>
        <Box
          animation={`${rotateAnimation} 15s linear infinite`}
          display="inline-block"
        >
          <Image
            src="/images/mobile/green-spinner.svg"
            alt="vector"
            width={80}
            height={80}
          />
        </Box>
      </Flex>

      <Stack direction={"column"} mt={"1rem"} spacing={5}>
        <Box>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Email Address
          </Text>
          <Input
            size="sm"
            type="email"
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#ECECEC"}
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            fontSize={"2xl"}
            focusBorderColor="#EF8421"
          />
        </Box>

        <Box>
          <Text mb="6px" fontWeight={"semibold"} fontSize={"sm"}>
            Password
          </Text>
          <Input
            size="sm"
            type="password"
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#ECECEC"}
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            fontSize={"2xl"}
            focusBorderColor="#EF8421"
          />
        </Box>
      </Stack>

      <Flex justifyContent={"center"} mt={"2rem"}>
        <FancyButton bg="/assets/buttons/oja-cloud-orange.svg" w={250} h={70}>
          <Text
            maxW="150px"
            whiteSpace="normal"
            textAlign="center"
            fontSize="sm"
          >
            Sign in
          </Text>
        </FancyButton>
      </Flex>

      <Flex justifyContent={"center"} mt={"1.5rem"}>
        <Link href={"#"} style={{ fontSize: "14px", fontWeight: "600" }}>
          Sign in with passkey
        </Link>
      </Flex>
    </Box>
  );
};

export default SigninMobile;

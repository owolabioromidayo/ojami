import { FC, useState } from "react";
import { Flex, Text, Input, Box, Heading } from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import FancyButton from "@/components/ui/button";
import Link from "next/link";

interface SignupMobileProps {}

const SignupMobile: FC<SignupMobileProps> = ({}) => {
  const [dateInput, setDateInput] = useState("text");
  useViewportHeight();
  return (
    <Box h="calc(var(--vh, 1vh) * 100)" w={"100vw"} backgroundColor={"#2BADE5"}>
      <Box backgroundColor={"#2BADE5"} h="calc(var(--vh, 1vh) * 7)"></Box>
      <Box
        h="calc(var(--vh, 1vh) * 93)"
        w={"100vw"}
        background={"#ffffff"}
        bottom={0}
        roundedTop={"2xl"}
        borderTop={"2px solid #000000"}
        overflowY={"auto"}
        px={"1.5rem"}
        scrollBehavior={"smooth"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none",
          "-webkit-overflow-scrolling": "touch",
        }}
        pb={"3rem"}
      >
        <Heading as={"h1"} size={"lg"} mt={"1.5rem"}>
          Create account
        </Heading>

        <Box mt={"2rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Full name
          </Text>
          <Input
            type="text"
            size="sm"
            placeholder="First Name"
            fontSize={"sm"}
            border={"2px solid #000000"}
            roundedTop={"lg"}
            borderBottomWidth={"1px"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            roundedBottom={"0px"}
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
          />
          <Input
            type="text"
            size="sm"
            placeholder="Last Name"
            fontSize={"sm"}
            border={"2px solid #000000"}
            borderTopWidth={"1px"}
            roundedTop={"0px"}
            roundedBottom={"lg"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
          />

          <Text fontSize={"2xs"} color={"#767676"} mt={"0.5rem"}>
            Make sure it matches the name on your government ID
          </Text>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Birthday
          </Text>
          <Input
            type={dateInput}
            size="sm"
            placeholder="dd/mm/yyyy"
            fontSize={"sm"}
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
            onFocus={() => setDateInput("date")}
            onBlur={(e) => !e.target.value && setDateInput("text")}
          />
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Email Address
          </Text>
          <Input
            type={"email"}
            size="sm"
            placeholder="example@gmail.com"
            fontSize={"sm"}
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
          />
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Phone Number
          </Text>
          <Input
            type={"tel"}
            size="sm"
            placeholder="0801 999 9999"
            fontSize={"sm"}
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
          />
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Password
          </Text>
          <Input
            type={"password"}
            size="sm"
            placeholder="••••••••••••"
            fontSize={"sm"}
            border={"2px solid #000000"}
            rounded={"lg"}
            height={"50px"}
            background={"#FBFBFB"}
            focusBorderColor="#2BADE5"
            _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
            _placeholder={{ color: "#B9B9B9" }}
          />
        </Box>

        <Flex justifyContent={"center"}>
          <FancyButton
            bg="/assets/buttons/oja-sweet-purple.svg"
            mt={"1.5rem"}
            w={200}
            h={62}
          >
            <Text
              maxW="150px"
              whiteSpace="normal"
              textAlign="center"
              fontSize="sm"
            >
              <Link href={"/register-business-step-1"}>continue</Link>
            </Text>
          </FancyButton>
        </Flex>

        <Flex justifyContent={"center"} mt={"1rem"}>
          <Text fontSize={"xs"} textAlign={"center"}>
            By clicking Continue you agree to out terms and conditions
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignupMobile;

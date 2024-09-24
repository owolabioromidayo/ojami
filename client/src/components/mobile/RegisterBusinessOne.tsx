import { FC, useState } from "react";
import { Flex, Text, Input, Box, Heading, Select } from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import FancyButton from "@/components/ui/button";
import { states, countries } from "@/utils/states";
import Link from "next/link";

interface RegisterBusinessOneMobileProps {}

const RegisterBusinessOneMobile: FC<RegisterBusinessOneMobileProps> = ({}) => {
  const [dateInput, setDateInput] = useState("text");
  useViewportHeight();
  return (
    <Box h="calc(var(--vh, 1vh) * 100)" w={"100vw"} backgroundColor={"#A580FF"}>
      <Box backgroundColor={"#A580FF"} h="calc(var(--vh, 1vh) * 7)"></Box>
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
          Register Business
        </Heading>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Business Name
          </Text>
          <Input
            type={dateInput}
            size="sm"
            placeholder="e.g., John's Electronics"
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
            Address
          </Text>
          <Input
            type={"email"}
            size="sm"
            placeholder="123 Example Street, City"
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
            State
          </Text>
          <Select
            placeholder="select state"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            {states?.map((state, index) => (
              <option value={state} key={index}>
                {state}
              </option>
            ))}
          </Select>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Country
          </Text>
          <Select
            placeholder="Select Country"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            {countries?.map((country, index) => (
              <option value={country.name} key={index}>
                {country.name}
              </option>
            ))}
          </Select>
        </Box>

        <Flex justifyContent={"center"}>
          <FancyButton
            bg="/assets/buttons/oja-sweet-orange.svg"
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
              <Link href={"/register-business-step-2"}>continue</Link>
            </Text>
          </FancyButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default RegisterBusinessOneMobile;

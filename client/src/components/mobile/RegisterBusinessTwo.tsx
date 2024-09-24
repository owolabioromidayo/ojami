import { FC } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import FancyButton from "@/components/ui/button";
import Link from "next/link";

interface RegisterBusinessTwoMobileProps {}

const RegisterBusinessTwoMobile: FC<RegisterBusinessTwoMobileProps> = ({}) => {
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
            Do you have a physical store?
          </Text>
          <Select
            placeholder="select option"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Do you have a delivery method?
          </Text>
          <Select
            placeholder="select option"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            How do you plan to use Oja mi
          </Text>
          <Select
            placeholder="select plan"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Business category
            <span
              style={{
                color: "#ACACAC",
                fontSize: "10px",
                fontWeight: "400",
                paddingLeft: "5px",
              }}
            >
              (select 4 max)
            </span>
          </Text>
          <Menu matchWidth closeOnSelect={false}>
            <MenuButton
              height={"50px"}
              background={"#FBFBFB"}
              _placeholder={{ color: "#B9B9B9" }}
              rounded={"lg"}
              fontSize={"sm"}
              border={"2px solid #000000"}
              w={"full"}
              textAlign={"start"}
              px={"0.8rem"}
            >
              Select category
            </MenuButton>
            <MenuList>
              <MenuOptionGroup title="Business categories" type="checkbox">
                <MenuItemOption value="email">Email</MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
              <Link href={"/verify-business"}>continue</Link>
            </Text>
          </FancyButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default RegisterBusinessTwoMobile;

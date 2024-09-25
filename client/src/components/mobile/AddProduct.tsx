import { FC, useRef, useState } from "react";
import {
  Flex,
  Text,
  Input,
  Box,
  Heading,
  Select,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import FancyButton from "@/components/ui/fancy-button";
import Link from "next/link";
import { HiOutlineCamera } from "react-icons/hi2";

interface AddProductMobileProps {}

const AddProductMobile: FC<AddProductMobileProps> = ({}) => {
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [fileName, setFileName] = useState("");

  const [description, setDescription] = useState("");
  const [wordCountError, setWordCountError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useViewportHeight();
  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    setFileName(file!.name);

    if (file) {
      reader.onload = () => {
        setFileContent(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const countWords = (str: string) => {
    return str.trim().split(/\s+/).length;
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    const wordCount = countWords(text);

    if (wordCount > 300) {
      setWordCountError(true);
    } else {
      setWordCountError(false);
    }

    setDescription(text);
  };

  console.log(fileContent);
  return (
    <Box h="calc(var(--vh, 1vh) * 100)" w={"100vw"} backgroundColor={"#EF8421"}>
      <Box backgroundColor={"#EF8421"} h="calc(var(--vh, 1vh) * 7)"></Box>
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
          Add my products
        </Heading>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Name
          </Text>
          <Input
            type="text"
            size="sm"
            placeholder="E.g. PlayStation 5 Pro 2TB SSD"
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
            Price
          </Text>
          <Input
            type={"number"}
            size="sm"
            placeholder="Enter amount"
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
            Category
          </Text>
          <Select
            placeholder="select category"
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            _placeholder={{ color: "#B9B9B9" }}
            rounded={"lg"}
            size={"sm"}
            fontSize={"sm"}
            focusBorderColor="#2BADE5"
          >
            <option value="option1">option1</option>
          </Select>
        </Box>

        <Box mt={"1.5rem"}>
          <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
            Add Image
          </Text>

          <Input
            type="file"
            ref={inputRef}
            display="none"
            onChange={handleFileChange}
          />

          <Button
            w={"full"}
            border={"2px solid #000000"}
            height={"50px"}
            background={"#FBFBFB"}
            rounded={"lg"}
            _focus={{ borderColor: "#2BADE5" }}
            onClick={handleFileClick}
          >
            <Icon as={HiOutlineCamera} boxSize={5} />
          </Button>

          <Text fontSize={"xs"} mt={"0.2rem"} color={"blue.400"}>
            {fileName}
          </Text>
        </Box>

        <Accordion allowToggle backgroundColor={"transparent"} mt={"1.5rem"}>
          <AccordionItem backgroundColor={"transparent"} border={"0px"}>
            <h2>
              <AccordionButton
                p={0}
                bg={"transparent"}
                border={"0px"}
                _focus={{ backgroundColor: "transparent" }}
              >
                <Text fontSize={"sm"} fontWeight={"semibold"}>
                  Advanced options
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={"1rem"} px={0}>
              <FormControl isInvalid={wordCountError}>
                <Box mt={"0.3rem"}>
                  <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                    Description
                    <span
                      style={{
                        color: "#ACACAC",
                        fontSize: "10px",
                        fontWeight: "400",
                        paddingLeft: "5px",
                      }}
                    >
                      (300 words)
                    </span>
                  </Text>
                  <Textarea
                    value={description}
                    size="sm"
                    placeholder="Write more about your product"
                    fontSize={"sm"}
                    border={"2px solid #000000"}
                    rounded={"lg"}
                    background={"#FBFBFB"}
                    focusBorderColor="#2BADE5"
                    _focus={{ backgroundColor: "#ffffff", borderWidth: "1px" }}
                    _placeholder={{ color: "#B9B9B9" }}
                    onChange={handleDescriptionChange}
                  />
                  {wordCountError && (
                    <FormErrorMessage>
                      Word count exceeded. Maximum is 300 words.
                    </FormErrorMessage>
                  )}
                </Box>
              </FormControl>

              <Box mt={"1.5rem"}>
                <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                  Stock Quantity
                </Text>
                <Input
                  type="number"
                  placeholder="Enter stock quantity"
                  min={0}
                  step={1}
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
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex
          justifyContent={"center"}
          flexDirection="column"
          alignItems={"center"}
          gap={3}
        >
          <FancyButton
            bg="/assets/buttons/oja-sweet-blue.svg"
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

          <Link href={"#"} style={{ fontWeight: "600", fontSize: "13px" }}>
            Maybe later
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default AddProductMobile;

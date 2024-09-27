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
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import FancyButton from "@/components/ui/fancy-button";
import Link from "next/link";
import { HiOutlineCamera } from "react-icons/hi2";
import * as Yup from "yup";
import axios from "axios";
import { Description } from "@radix-ui/react-dialog";

interface AddProductMobileProps {}

const categories = [
  "Electronics",
  "Fashion",
  "Home and Living",
  "Health and Beauty",
  "Sports and Outdoors",
  "Toys and Games",
  "Books and Stationery",
  "Automotive",
  "Groceries",
  "Services",
];

const AddProductMobile: FC<AddProductMobileProps> = ({}) => {
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dat1uvwz1/image/upload`;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const toast = useToast()
  const [fileNames, setFileNames] = useState([""]);
  const [imageUrls, setImageUrls] = useState<string[]>()
  const [storefrontId, setStorefrontId] = useState()
  const [isSubmitting,  setIsSubmitting] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const inputRef = useRef<HTMLInputElement>(null);
  useViewportHeight();
  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;
    const fileNames = []

    for(let every of files){
      fileNames.push(every.name)
    }

    setFileNames(fileNames)

    if (files) {
      const fileReaders: FileReader[] = [];
      const fileContents: string[] = [];

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        fileReaders.push(reader);

        reader.onload = () => {

          fileContents[index] = reader.result as string;
        };

        reader.readAsDataURL(file);
      });
      
    }

    const urls = await handleImageUpload(files);
    setImageUrls(urls);
  };

const handleImageUpload = async (selectedFiles: FileList) => {
  const imageUrls: string[] = [];

  try {
    toast({
      title: `Uploading ${selectedFiles!.length} image(s)`,
      description: "Please wait while the images are being uploaded...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    const uploadPromises = Array.from(selectedFiles).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset as string);
      formData.append("cloud_name", "dat1uvwz1");

      const response = await axios.post(CLOUDINARY_URL, formData);
      if (response) {
        return response.data.secure_url;
      } else {
        throw new Error(`Error uploading ${file.name}`);
      }
    });

    const responses = await Promise.all(uploadPromises);
    imageUrls.push(...responses);

    toast({
      title: `${selectedFiles!.length} image(s) uploaded successfully!`,
      description: "Your images have been uploaded to Cloudinary.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  } catch (e) {
    console.log("Error:", e);

    toast.closeAll();

    toast({
      title: `Error uploading images`,
      description: "An error occurred while uploading the images.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  return imageUrls;
};

const handleSubmit = async (values: any) => {
  //TODO: add toasts for  success and errors
  setIsSubmitting(true);
  const postData = {
    name: values.productName.trim(), // on the form
    images: imageUrls, //done
    description: values.description, // on the form
    tags: values.tags, // not done
    storefrontId: storefrontId, //not done
    price: values.price.trim(), //on the form
  };
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/users/signup`,
      postData
    );
    if (response) {
      window.location.assign("/auth/account-success");
    }
  } catch (err) {
    console.log("error", err);
  } finally {
    setIsSubmitting(false);
  }
};

  const schema = Yup.object().shape({
    description: Yup.string().max(
      300,
      "Word count exceeded. Maximum is 300 words."
    ),
  });

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

        <Formik
          initialValues={{
            productName: "",
            price: "",
            category: "",
            immageField: [],
            description: "",
            stockQuantity: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={schema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl
                isInvalid={!!errors.productName && touched.productName}
              >
                <Box mt={"1.5rem"}>
                  <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                    Name
                  </Text>
                  <Field
                    as={Input}
                    id="productName"
                    name="productName"
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
                <FormErrorMessage>{errors.productName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.price && touched.price}>
                <Box mt={"1.5rem"}>
                  <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                    Price
                  </Text>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
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
                <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.category && touched.category}>
                <Box mt={"1.5rem"}>
                  <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                    Category
                  </Text>
                  <Field
                    as={Select}
                    id="category"
                    name="category"
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
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Field>
                </Box>
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Box mt={"1.5rem"}>
                  <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                    Add Image
                  </Text>

                  <Input
                    type="file"
                    ref={inputRef}
                    display="none"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                    multiple
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

                  <Flex flexDir={"column"}>
                    {fileNames.map((filename, index) => (
                      <Text
                        fontSize={"2xs"}
                        mt={"0.2rem"}
                        color={"blue.400"}
                        key={index}
                      >
                        {filename}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              </FormControl>

              <Accordion
                allowToggle
                backgroundColor={"transparent"}
                mt={"1.5rem"}
              >
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
                    <FormControl isInvalid={!!errors.description}>
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
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          size="sm"
                          placeholder="Write more about your product"
                          fontSize={"sm"}
                          border={"2px solid #000000"}
                          rounded={"lg"}
                          background={"#FBFBFB"}
                          focusBorderColor="#2BADE5"
                          _focus={{
                            backgroundColor: "#ffffff",
                            borderWidth: "1px",
                          }}
                          _placeholder={{ color: "#B9B9B9" }}
                        />
                          <FormErrorMessage>
                            {errors.description}
                          </FormErrorMessage>
                      </Box>
                    </FormControl>

                    <FormControl>
                      <Box mt={"1.5rem"}>
                        <Text mb="6px" fontSize={"sm"} fontWeight={"semibold"}>
                          Stock Quantity
                        </Text>
                        <Field
                          as={Input}
                          id="stockQuantity"
                          name="stockQuantity"
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
                          _focus={{
                            backgroundColor: "#ffffff",
                            borderWidth: "1px",
                          }}
                          _placeholder={{ color: "#B9B9B9" }}
                        />
                      </Box>
                    </FormControl>
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
                  type="submit"
                >
                  <Text
                    maxW="150px"
                    whiteSpace="normal"
                    textAlign="center"
                    fontSize="sm"
                  >
                    continue
                  </Text>
                </FancyButton>

                <Link
                  href={"#"}
                  style={{ fontWeight: "600", fontSize: "13px" }}
                >
                  Maybe later
                </Link>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddProductMobile;

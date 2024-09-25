"use client";

import { MarketLayout } from "@/components/market/layout";
import { OjaContext } from "@/components/provider";
import FancyButton from "@/components/ui/fancy-button";
import { ProductItem, renderStars } from "@/components/utils/product";
import { MiniStoreCard, StoreCard } from "@/components/utils/store-card";
import { Cart, Product } from "@/utils/types";

import {
  Avatar,
  Flex,
  Text,
  IconButton,
  Stack,
  Image,
  Icon,
  Select,
  Button,
  Input,
  SimpleGrid,
  Box,
  useNumberInput,
  HStack,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { IoChevronDown, IoStarSharp } from "react-icons/io5";
import { TbInfoTriangle, TbTruckDelivery } from "react-icons/tb";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const productId =
    typeof router.query.id === "string"
      ? parseInt(router.query.id)
      : -1;

  const fetchproductData = async () => {
    if (!productId) return;
    const url = `http://localhost:4000/api/ecommerce/products/${productId}`;

    try {
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const productData = await response.json(); // Parse the JSON from the response
      setProducts(productData.product); // Update the cart state with fetched data
    } catch (error: any) {
      setError(error.message); // Update error state if there's an error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (!products) {
      fetchproductData();
    }
  }, [products, productId]);

  const averageRating =
    products?.ratings.length! > 0
      ? (
          products?.ratings?.reduce(
            (acc: any, curr) => parseInt(acc) + Number(curr),
            0
          )! / products?.ratings?.length!
        ).toFixed(1)
      : "0.0";

      const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: products?.quantity!,
        precision: 0,
      })
  
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()
  const [value, setValue] = React.useState(1)

    const handleValueChange = () => {
        const currentValue = parseInt(input.value, 10); 
        setValue(currentValue)
    };

  const [index, setIndex] = React.useState(0)

  const addToCart = async () => {
    const response = await fetch("http://localhost:4000/api/ecommerce/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId,
        quantity: value,
      }),
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      toast({
        title: "Cart Error",
        description: `${data.errors[0].message}`,
        status: "error",
        duration: 5000,
        position: "top",
        containerStyle: { border: "2px solid #000", rounded: "md" },
      });
    } else {
      toast({
        title: "Add to Cart",
        description: "You just added a product to your cart 🤑",
        status: "success",
        duration: 5000,
        position: "top",
        containerStyle: { border: "2px solid #000", rounded: "md" },
      });
    }
  };


  return (
    <MarketLayout>
      <Flex w="full" align="start" gap={40} justify="center">
        <Stack>
            <Flex direction="column" gap={2}>
                <Image src={products?.images[index]} alt={products?.name} w="650px" h="650px" objectFit="cover" rounded="10px" border="2px solid #000" />
                <Flex gap={3} align="center">
                    {products?.images?.map((item, i) => (
                        <Box key={i} rounded="10px" border={index === i ? "2px solid #000" : "none"} cursor="pointer" onClick={() => setIndex(i)} p={1} w="100px" h="100px" overflow="hidden">
                            <Image src={item} key={item} rounded="7px" alt={products?.name} w="100px" h="87px" objectFit="cover" />
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </Stack>
        <Stack>
            <Flex align="center" gap={2}>
                <Image src={products?.storefront?.profileImageUrl!} w="50px" h="50px" alt={products?.storefront?.storename} rounded="10px" />
                <Text fontWeight={500}>{products?.storefront?.storename}</Text>
            </Flex>
        <Text mt={2} fontWeight={600} fontSize={20}>{products?.name}</Text>
        <Flex gap={1} align="center" fontSize={15}>
        {renderStars()} 
        <Text fontWeight={500}>
        ({Math.floor(Math.random() * (800 - 15 + 1)) + 15})
        </Text>
      </Flex>
      <Flex gap={2} align="center" display={products?.price! > 10000 && products?.price! < 15000 ? 'flex' : 'none'}>
      <Text fontWeight={600} textDecor="line-through" >₦{products?.price.toLocaleString()}</Text>
      <Text fontWeight={600} color="orange.500">₦{(products?.price! * 0.49).toLocaleString()}</Text>
      </Flex>

      <Text fontWeight={600} display={products?.price! > 10000 && products?.price! < 15000 ? 'none' : 'flex'}>₦{products?.price.toLocaleString()}</Text>
      <Flex gap={2} align="center" fontSize={15} mt={3} fontWeight={500}>
        <Icon as={TbTruckDelivery} />
        <Text>Delivery calculated at checkout</Text>
      </Flex>
      <Button variant="link" colorScheme="purple" w="fit-content" fontSize={14}>Add address</Button>
      <Flex w="full" mt={6} align="center" justify="space-between">
        <Text fontSize={18} fontWeight={500}>Quantity</Text>
      <HStack maxW='150px' bg="white" border="2px solid #000" rounded="9px" p={1}>
      <Button bg="none" {...dec} onClick={handleValueChange}>-</Button>
      <Input focusBorderColor="white" fontWeight={500} pr={1} border="none" w="50px" {...input} />
      <Button bg="none" {...inc} onClick={handleValueChange}>+</Button>
    </HStack>       
      </Flex>
      <Flex align="center" gap={3} w="full">
        <FancyButton bg="/assets/buttons/oja-sweet-purple.svg" w="full" h="120px" onClick={() => addToCart()}>
            Add to Cart
        </FancyButton>
        <FancyButton bg="/assets/buttons/oja-sweet-orange.svg" w="full" h="120px">
            Buy now
        </FancyButton>
      </Flex>

      <Text fontSize={18} fontWeight={500}>Description</Text>
      <Text w="450px">{products?.description}</Text>
    <MiniStoreCard storefront={products?.storefront!} />

        </Stack>
      </Flex>
    </MarketLayout>
  );
};

export default ProductsPage;

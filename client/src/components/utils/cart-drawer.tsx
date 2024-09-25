import { Cart } from "@/utils/types";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Image,
  Icon,
  Flex,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { OjaContext } from "../provider";
import FancyButton from "../ui/fancy-button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const btnRef = React.useRef(null);
  const { cart } = useContext(OjaContext);
  console.log(cart?.items);
  const toast = useToast();

  const createCart = async () => {
    const response = await fetch("http://localhost:4000/api/ecommerce/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        title: "Cart Created Successful",
        description: "You can now start shopping",
        status: "success",
        duration: 5000,
        position: "top",
        containerStyle: { border: "2px solid #000", rounded: "md" },
      });
      window.location.assign("/market");
    }
  };

  // Add this new function to calculate the total price
  const calculateTotalPrice = (cart: Cart | null) => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  // Calculate the total price
  const totalPrice = calculateTotalPrice(cart);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent
        borderLeft="2px solid #000"
        bgImg="/assets/oja-cart-bg.svg"
        bgSize="cover"
        bgPos="top"
        bgRepeat="no-repeat"
      >
        <DrawerCloseButton />
        <DrawerHeader>My Cart</DrawerHeader>

        <DrawerBody>
          {!cart ? (
            <Flex direction="column" align="center">
              <Text>Click the button to create your cart</Text>
              <FancyButton
                bg="/assets/buttons/oja-sweet-blue.svg"
                w="150px"
                h="100px"
                onClick={() => createCart()}
              >
                Create Cart
              </FancyButton>
            </Flex>
          ) : (
            <Flex
              direction="column"
              p={3}
              border="2px solid #000"
              h="full"
              w="full"
              bg="white"
              overflowY="auto" // Add this line
            >
              {cart?.items?.map((item) => (
                <Flex
                  borderBottom="2px solid #000"
                  gap={3}
                  w="full"
                  py={3}
                  px={1}
                  key={item.id}
                  alignItems="center"
                 justify="space-between"
                >
                  <Flex gap={2} align="center">

                  <Image
                    border="2px solid #000"
                    rounded="md"
                    src={item.product.images[0]}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                    alt={item.product.name}
                  />
                  <Stack>
                    <Flex align="center" gap={2} >
                      <Image
                        src={item.product.storefront.profileImageUrl!}
                        w="30px"
                        h="30px"
                        alt={item.product.storefront.storename}
                        rounded="10px"
                      />
                      <Text fontSize={15} fontWeight={500}>
                        {item.product.storefront.storename}
                      </Text>
                    </Flex>
                    <Text fontSize={20} fontWeight={500}>{item.product.name} x{item.quantity}</Text>
                  </Stack>
                  </Flex>
                  <Text fontSize={20} fontWeight={500}>₦{item.product.price.toLocaleString()}</Text>
                  {/* Add more item details here */}
                </Flex>
              ))}
            </Flex>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Stack textAlign="right" spacing={5}>
          <Text fontSize={20} fontWeight={500}>Total: ₦{totalPrice.toLocaleString()}</Text>
          <Flex gap={3}>
          <Button variant="ghost" py={6} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            py={6}
            px={7}
            border="2px solid #000"
            color="black"
          >
            Checkout
          </Button>

          </Flex>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

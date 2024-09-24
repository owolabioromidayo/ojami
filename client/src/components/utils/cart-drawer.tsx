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
  const toast = useToast();
  const [tempCart, setTempCart] = useState<Cart|null>(null)

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
      window.location.assign('/market')
    }
  };
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
            <>My Cart</>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="ghost" mr={3} py={6} onClick={onClose}>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

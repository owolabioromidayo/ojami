import type { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import VendorLayout from "@/components/mobile/layout/VendorLayout";
import type { NextPageWithLayout } from "../_app";

const Store: NextPageWithLayout<{}> = () => {
  useViewportHeight();

  return <Box height="calc(var(--vh, 1vh) * 100)" w="100vw">
    <Text fontSize={'4xl'}>SAMPLE EKWE!</Text>
  </Box>;
};

Store.getLayout = function getLayout(page: ReactElement) {
  return <VendorLayout>{page}</VendorLayout>;
};

export default Store;

import { FC } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import RegisterBusinessOneMobile from "@/components/mobile/RegisterBusinessOne";

interface RegisterStepOneProps {}

const RegisterStepOne: FC<RegisterStepOneProps> = ({}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return <>{isMobile && <RegisterBusinessOneMobile />}</>;
};

export default RegisterStepOne;

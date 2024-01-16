import { useMediaQuery } from "react-responsive";

const useMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile;
};

export default useMobile;

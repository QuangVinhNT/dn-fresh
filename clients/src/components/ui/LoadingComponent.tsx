import webColors from "@/constants/webColors";
import { BarLoader } from "react-spinners";
import Overlay from "./Overlay";

const LoadingComponent = () => {
  return (
    <>
      <Overlay />
      <div style={{ position: 'absolute', zIndex: 9999, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <BarLoader color={webColors.white} width={200}/>
      </div>
    </>
  );
};

export default LoadingComponent;

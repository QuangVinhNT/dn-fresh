import { overlayStore } from "@/store";

const Overlay = () => {
  const {isShowOverlay} = overlayStore();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
        // opacity: isShowOverlay ? 1 : 0,
        opacity: 1,
      }}
    ></div>
  );
};

export default Overlay;

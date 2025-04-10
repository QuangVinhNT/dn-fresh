const Overlay = () => {

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
      }}
    ></div>
  );
};

export default Overlay;

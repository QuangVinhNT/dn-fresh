interface Props {
  width?: number;
  height?: number;
}
const SpaceComponent = (props: Props) => {
  const { width, height } = props;
  return (
    <div style={{
      width: width ? `${width}px` : `0px`,
      height: height ? `${height}px` : `0px`
    }}></div>
  );
};

export default SpaceComponent;

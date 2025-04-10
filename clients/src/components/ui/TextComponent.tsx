import webColors from "../../constants/webColors";

interface Props {
  text: string;
  fontWeight?: number;
  color?: string;
  fontSize?: number;
  uppercase?: boolean;
  title?: boolean;
  className?: string;
}
const TextComponent = (props: Props) => {
  const { text, fontWeight, color, fontSize, uppercase, title, className } = props;
  return (
    <p
      className={`${className}`}
      style={{
        fontWeight: title ? '500' : (fontWeight ?? 400),
        color: title ? '#000' : (color ?? webColors.text),
        fontSize: title ? '24px' : (fontSize ?? '14px'),
        textTransform: uppercase ? 'uppercase' : 'unset',
        margin: title ? '20px 0' : undefined
      }}>{text}</p>
  );
};

export default TextComponent;

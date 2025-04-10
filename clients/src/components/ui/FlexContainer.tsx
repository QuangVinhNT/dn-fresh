import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'stretch' | 'start' | 'end' | 'center';
  wrap?: boolean;
  styles?: React.CSSProperties;
}
const FlexContainer = (props: Props) => {
  const {children, direction, justify, align, wrap, styles} = props
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction ?? 'row',
      justifyContent: justify ?? 'flex-start',
      alignItems: align ?? 'start',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...styles 
    }}>
      {children}
    </div>
  )
}

export default FlexContainer

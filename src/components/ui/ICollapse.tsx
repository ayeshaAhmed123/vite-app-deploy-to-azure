import React, { ReactNode, useEffect, useState } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

interface ICollapseProps {
  children?: ReactNode;
  headertext?: string | ReactNode;
  panalClassName?: string;
  collapseClassName?: string;
  expandIconPosition?: "start" | "end";
  expandIcon?: ((panelProps: any) => ReactNode);
  showArrow?: boolean;
  defaultActiveKey?: Array<string>;
  extra?: ReactNode;
  key?: string | number;
  activeKey?: number | string
  onChange?: any
  collapsible?: 'header' | 'icon'
  iconClass?: any
  layout?: any

}
const ICollapse: React.FC<ICollapseProps> = ({
  children,
  headertext,
  collapseClassName,
  expandIconPosition,
  panalClassName,
  showArrow,
  expandIcon,
  defaultActiveKey,
  extra,
  key, activeKey, onChange,
  collapsible,
  iconClass,
  layout


}) => {
  // const [extraicon, setextraiconposition] = useState('');
  // const onChange = (key: string | string[] | any) => {
  //   // console.log(key);
  //   setCollapseChange(key)
  // };
  const [collapseChange, setcollapseChange] = useState<string[]>(defaultActiveKey ? defaultActiveKey : [])

  return (
    <>

      <div className={`d-flex ${layout}`}>
        <div className={`pe-3 ${iconClass}`} >
          {/* <img src={!collapseChange.length ? collapsePlus : collapseMinus} alt='' className='pointer'
            onClick={() => {
              if (!collapseChange.length) {
                setcollapseChange(['1'])
              }
              else {
                setcollapseChange([])
              }
            }}
          /> */}
          <div
            onClick={() => {
              if (!collapseChange.length) {
                setcollapseChange(['1'])
              }
              else {
                setcollapseChange([])
              }
            }}
            className="collapse-plus-minus-icon fw-bold"
          >
            {!collapseChange.length ? '+' : '−'}
          </div>
        </div>

        <Collapse
          defaultActiveKey={defaultActiveKey}
          // onChange={onChange}
          expandIconPosition={expandIconPosition}
          // expandIcon={expandIcon}
          expandIcon={() => null}
          className={`w-100 border-0 ${collapseClassName}`}
          accordion
          activeKey={collapseChange}
          collapsible={collapsible}
        >
          <Panel
            extra={extra}
            header={headertext}
            key={key && key ? key : '1'}
            showArrow={showArrow}
            className={panalClassName}
          >
            {children}
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default ICollapse;

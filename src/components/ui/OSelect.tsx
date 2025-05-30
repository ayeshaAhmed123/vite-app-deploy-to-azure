import React, { ReactNode } from "react";
import { Select } from "antd";

interface ISelectProps {
  className?: string;
  placeholder?: string;
  // mode: string,
  onChange?: any;
  // optionList: any,
  value?: any;
  setvalue?: string
  options?: Array<{}> | undefined;
  firstoption?: any;
  label?: string | ReactNode;
  layout?: string;
  labelClass?: string;
  mode?: "multiple" | "tags"
  validation?: string | ReactNode;
  disabled?: boolean;
  onClick?: (e) => void
  labelInValue?: boolean,
  isMendatory?: boolean
  suffixIcon?: string | JSX.Element
  children?: ReactNode
  onClear?: any
  loading?: boolean
  filterOption?: any,
  onSearch?: any
  dropdownRender?: any
  errorMessage?: any
  popupClassName?: any
  size?: 'large' | 'middle' | 'small';
  name?: string;
}
export const ISelect = (props: ISelectProps) => {

  // const onChange = (value: string) => {
  //     console.log(`selected ${value}`);
  // };
  const customFilterOption = (input, option) => {
    const optionLabel = option.label || '';
    return optionLabel.toLowerCase().includes(input.toLowerCase());
  };
  return (
    <div className={props.layout}>
      {props.label === '' ? <label> &nbsp; </label> :
        <label className={props.labelClass}>{props.label}{props.validation} {props?.isMendatory && <span className="error">*</span>}</label>
      }
      <Select
        title="some"
        onClear={props.onClear}
        showSearch
        className={props.className}
        mode={props.mode}
        defaultValue={props.firstoption}
        allowClear
        children={props.children}
        placeholder={props.placeholder}
        optionFilterProp="children"
        onChange={props.onChange}
        onSearch={props.onSearch}
        maxTagCount="responsive"
        suffixIcon={props.suffixIcon}
        value={props.value}
        labelInValue={props.labelInValue}
        onClick={props.onClick}
        disabled={props.disabled}
        loading={props.loading}
        filterOption={props.filterOption ? props.filterOption : customFilterOption}
        popupClassName={props.popupClassName}
        dropdownRender={props.dropdownRender ? props.dropdownRender : undefined}
        // filterOption={(input, option) => {
        //   const optionLabel = typeof option?.label === 'string' ? option.label : '';
        //   return optionLabel.toLowerCase().includes(input.toLowerCase());
        // }}
        options={props.options}
        size={props.size}
      />
      {
        props.errorMessage &&
        <div className="error label-star fontsize14 text-left">
          {props.errorMessage}
        </div>
      }

    </div>
  );
};


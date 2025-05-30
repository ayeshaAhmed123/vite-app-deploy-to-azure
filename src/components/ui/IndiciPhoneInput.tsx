import React from 'react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './IndiciPhoneInput.css';

interface IndiciPhoneInputProps {
    name?: string;
    value?: string;
    layout?: string;
    label?: string;
    labelClass?: string;
    country?: string;
    onChange?: (value: string) => void;
    isRequired?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    placeholder?: string;
    onBlur?: () => void;
    style?: React.CSSProperties;
}

const IndiciPhoneInput: React.FunctionComponent<IndiciPhoneInputProps> = ({
    name,
    value,
    layout,
    label,
    labelClass,
    country = 'US', // Default country if not passed
    onChange,
    isRequired,
    errorMessage,
    placeholder,
    onBlur,
    disabled,
    style,
}) => {
    return (
        <div>
            <label className={`label-style ${labelClass}`} style={{ display:'flex', marginBottom: '3px' }} htmlFor={name}>
                {label} {isRequired ? <span className="text-danger">*</span> : null}
            </label>

            <div className="phone-input-container">
                <PhoneInputWithCountrySelect
                    onChange={onChange}
                    id={name}
                    autoComplete="off"
                    className="indici-phone-input"
                    country={country}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            </div>

            {errorMessage && <div className="error fontsize14">{errorMessage}</div>}
        </div>
    );
};

export default IndiciPhoneInput;

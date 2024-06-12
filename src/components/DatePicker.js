import React from 'react';

import defaultLocal from 'antd/es/date-picker/locale/tr_TR';
import AntDatePicker from 'antd/lib/date-picker';
import { dateFormat } from 'constant/DateTypes';
import 'moment/locale/tr';
import PropTypes from 'prop-types';

import Header from './Header';

const DatePicker = (props) => {
  const {
    label,
    labelElement = null,
    id,
    errors = '',
    required = false,
    className = '',
    datePickerClassName = '',
    allowClear = true,
    autoFocus = false,
    bordered = true,
    disabled = false,
    datePickerDropdownClassName = '',
    inputReadOnly = false,
    locale = defaultLocal,
    picker = 'date',
    placeholder = 'Tarih Seçiniz',
    placement = 'bottomLeft',
    size = 'large',
    status = '',
    format = dateFormat,
    showNow = false,
    showTime = false,
    showToday = true,
    value,
    onChange = () => {},
    ...componentProps
  } = props;
  return (
    <div className={`w-full ${className}`}>
      <Header
        id={id}
        label={label}
        labelElement={labelElement}
        errors={errors}
        required={required}
      />
      <AntDatePicker
        className={`border border-default-border rounded shadow-none active:border-default-border hover:border-default-border w-full ${datePickerClassName}`}
        allowClear={allowClear}
        autoFocus={autoFocus}
        bordered={bordered}
        disabled={disabled}
        datePickerDropdownClassName={datePickerDropdownClassName}
        inputReadOnly={inputReadOnly}
        locale={locale}
        picker={picker}
        placeholder={placeholder}
        placement={placement}
        size={size}
        status={status}
        format={format}
        showNow={showNow}
        showTime={showTime}
        showToday={showToday}
        value={value}
        onChange={onChange}
        {...componentProps}
      />
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  labelElement: PropTypes.any,
  id: PropTypes.string,
  errors: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  datePickerClassName: PropTypes.string,
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  datePickerDropdownClassName: PropTypes.string,
  inputReadOnly: PropTypes.bool,
  locale: PropTypes.any,
  picker: PropTypes.string,
  placeholder: PropTypes.string,
  placement: PropTypes.string,
  size: PropTypes.string,
  status: PropTypes.string,
  format: PropTypes.string,
  showNow: PropTypes.bool,
  showTime: PropTypes.bool,
  showToday: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default DatePicker;

/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useState, useEffect } from 'react';
import RcPicker from '@byhealth/react-mobile-picker';
import Portal from '~/components/Portal';
import s from './Picker.scss';

export type OptionGroups<T> = { [P in keyof T]?: Array<PickerOption<T[P]>> };
export type ValueGroups<T> = { [P in keyof T]?: T[P] };
export interface PickerOption<T> {
  text: string;
  value: T;
}

interface PickerProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;

  optionGroups: OptionGroups<unknown>;
  valueGroups?: ValueGroups<unknown>;

  onConfirm?: (valueGroups: ValueGroups<unknown>) => void;
  onCancel?: () => void;
  onChange?: (type: string, value: any) => void;
}

const Picker: React.FC<PickerProps> = ({ title, cancelText, confirmText, onConfirm, onCancel, onChange, ...props }) => {
  const [optionGroups, setOptionGroups] = useState<OptionGroups<unknown>>({});
  const [valueGroups, setValueGroups] = useState<ValueGroups<unknown>>({});
  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm(valueGroups);
  }, [onConfirm, valueGroups]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  const handleChange = useCallback(
    (key: string, value: unknown) => {
      setValueGroups((state) => ({
        ...state,
        [key]: value,
      }));

      if (onChange) onChange(key, value);
    },
    [setValueGroups, onChange],
  );

  useEffect(() => {
    if (props.optionGroups) setOptionGroups(props.optionGroups);
  }, [props.optionGroups]);

  useEffect(() => {
    if (props.valueGroups) setValueGroups(props.valueGroups);
  }, [props.valueGroups]);

  return (
    <Portal>
      <div className={s.container}>
        <header className={s.header}>
          {cancelText ? (
            <a className={s.cancel} onClick={handleCancel}>
              {cancelText}
            </a>
          ) : null}
          <div className={s.title}>{title}</div>
          {confirmText ? (
            <a className={s.confirm} onClick={handleConfirm}>
              {confirmText}
            </a>
          ) : null}
        </header>
        <RcPicker optionGroups={optionGroups} valueGroups={valueGroups} onChange={handleChange} />
      </div>
    </Portal>
  );
};

Picker.defaultProps = {
  confirmText: 'OK',
  cancelText: 'Cancel',
};

export default Picker;

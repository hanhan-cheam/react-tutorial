'use client';

// import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TableFilterWidth } from './const/table-filter-width';
import { off, on } from './custom-event';
import { debounce } from './debounce';

// TODO: add clear / reset button

export enum ETableFilterTextFieldEvent {
  UPDATE_VALUE = 'updateTableFilterTextFieldValue',
}

export type TTableFilterTextFieldProps = {
  width?: string;
  label: string;
  labelTooltipsText?: string;
  value: string;
  /**
   * @Default `label`
   */
  id?: string;
  errorText?: string | null;
  disabled?: boolean;
  onChange?: (event: string) => void;
  startIcon?: ReactNode;
  onKeyUp?: (event: KeyboardEvent<HTMLDivElement>) => void;
  errorUIHandler?: (error: unknown) => Promise<void>;
  withDebounce?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
};

const TableFilterTextFieldRaw = ({
  withDebounce = false,
  labelTooltipsText,
  width = TableFilterWidth,
  label,
  value = '',
  id,
  errorText = null,
  disabled = false,
  onChange,
  startIcon,
  onKeyUp,
  errorUIHandler,
  inputRef,
}: TTableFilterTextFieldProps) => {
  const elementId = useMemo(() => id ?? label, [id, label]);

  const [changedValue, setChangedValue] = useState<string>(value);

  const changeMade = useMemo(
    () =>
      debounce(async (currentValue: string) => {
        if (onChange) onChange(currentValue);
      }, 1000),
    [onChange]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (withDebounce) {
        setChangedValue(event.target.value);
        changeMade(event.target.value);
      } else {
        if (onChange) onChange(event.target.value);
      }
    },
    [changeMade, onChange, withDebounce]
  );

  const handleUpdateValue = useCallback(
    (
      evt: CustomEvent<{
        label: string;
        newValue: string;
      }>
    ) => {
      if (!evt.detail) {
        // errorUIHandler(
        //   'Failed to clear, please make sure you passed id to trigger function..'
        // )
        return;
      }

      const { label, newValue } = evt.detail;

      const matchedWithId = label === id;

      if (matchedWithId) {
        setChangedValue(newValue);
        if (onChange) onChange(newValue);
      }
    },
    [id, onChange]
  );

  useEffect(() => {
    on(ETableFilterTextFieldEvent.UPDATE_VALUE, handleUpdateValue as EventListener);

    return () => {
      off(ETableFilterTextFieldEvent.UPDATE_VALUE, handleUpdateValue as EventListener);
    };
  }, [handleUpdateValue]);

  return (
    <TextField
      variant="outlined"
      sx={{ width }}
      id={elementId}
      name={elementId}
      label={
        labelTooltipsText && label ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {label}
            <Tooltip disableInteractive title={labelTooltipsText}>
              <HelpOutlineIcon
                sx={(theme) => ({
                  marginLeft: '4px',
                  fontSize: '20px',
                  color: 'blue',
                  ...theme.applyStyles('dark', {
                    color: 'DodgerBlue',
                  }),
                })}
              />
            </Tooltip>
          </div>
        ) : (
          label
        )
      }
      value={withDebounce ? changedValue : value}
      error={!!errorText}
      helperText={errorText}
      disabled={disabled}
      onChange={handleChange}
      // slotProps={{
      //   inputLabel: {
      //     shrink: true,
      //   },
      //   input: {
      //     inputProps: {
      //       'data-testid': elementId,
      //     },
      //     startAdornment: startIcon && (
      //       <InputAdornment position="start">{startIcon}</InputAdornment>
      //     ),
      //   },
      // }}
      onKeyUp={onKeyUp}
      inputRef={inputRef}
    />
  );
};

export const TableFilterTextField = memo(TableFilterTextFieldRaw);

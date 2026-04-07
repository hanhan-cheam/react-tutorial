'use client';

import { Chip, Paper, Typography } from '@mui/material';
import { AnimatePresence, Variants, motion } from 'motion/react';
import { CSSProperties, ReactNode, useMemo } from 'react';

// import { CopyButton } from '../CopyButton/CopyButton'
import { isNullOrEmptyString } from '../../../utils/type-validation';

export type TViewType = 'normal' | 'chips' | 'status' | 'box';

// type TNormalOrChipsProps = {
//   value?: string | string[] | null
//   viewType?: Extract<TViewType, 'normal' | 'chips'>
// }

// type TStatusProps = {
//   value?: string
//   viewType?: Extract<TViewType, 'status'>
// }

/**
 * @default
 * value = 'N/A'
 * viewType = 'normal'
 */
export type TViewProps = {
  value?: string | string[] | null;
  viewType?: TViewType;
};
// TNormalOrChipsProps | TStatusProps

export type TDetailsAttrFieldCustomStyleProps = {
  root?: {
    minHeight?: CSSProperties['minHeight'];
  };
  viewLabel?: { fontSize?: CSSProperties['fontSize'] };
  viewValue?: {
    normal?: {
      fontSize?: CSSProperties['fontSize'];
      minHeight?: CSSProperties['minHeight'];
      justifyContent?: CSSProperties['justifyContent'];
    };
    chips?: { fontSize: CSSProperties['fontSize'] };
    status?: { fontSize: CSSProperties['fontSize'] };
  };
  copyButton?: {
    size?: CSSProperties['fontSize'];
  };
};

type TDetailsAttrFieldProps = {
  label: string;

  /**
   * @default false
   */
  copyToClipboard?: boolean;

  /**
   * @default 'view'
   */
  mode?: 'view' | 'edit' | 'add';

  /**
   * @default true
   */
  editable?: boolean;

  /**
   * @default false
   */
  hideOnAdd?: boolean;

  /**
   * @description HTML Input component for Edit Mode and Add Mode, or it can be a more customized component
   */
  editComponent?: ReactNode;

  customStyle?: TDetailsAttrFieldCustomStyleProps;

  boxBgColor?: string;

  getColor?: (text: string) => CSSProperties['color'];
  getBackgroundColor?: (text: string) => CSSProperties['backgroundColor'];
} & TViewProps;

const normalVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0, transition: { duration: 0.1 } },
  show: { scaleY: 1, opacity: 1, transition: { duration: 0.1 } },
};

const chipListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
    },
  },
};
const chipItemVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

const statusVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

export const DetailsAttrField = ({
  label,
  value = null,
  viewType = 'normal',
  copyToClipboard = false,
  mode = 'view',
  hideOnAdd = false,
  editable = true,
  editComponent,
  customStyle: customStyleProps = {},
  getColor,
  getBackgroundColor,
}: TDetailsAttrFieldProps) => {
  const {
    root: { minHeight: rootMinHeight = 50 } = {},
    viewLabel: { fontSize: viewLabelFontSize = 12 } = {},
    viewValue: {
      normal: {
        fontSize: normalViewValueFontSize = 16,
        minHeight: normalViewValueMinHeight = 32,
        justifyContent: normalViewJustifyContent = 'start',
      } = {},
      chips: { fontSize: chipsViewValueFontSize = 14 } = {},
      status: { fontSize: statusViewValueFontSize = 20 } = {},
    } = {},
    copyButton: { size: copyButtonSize = 18 } = {},
  } = customStyleProps;

  const isNormalViewType = useMemo(
    () =>
      (value: unknown): value is string | string[] | null => {
        return viewType === 'normal';
      },
    [viewType]
  );

  const isChipsViewType = useMemo(
    () =>
      (value: unknown): value is string | string[] | null => {
        return viewType === 'chips';
      },
    [viewType]
  );

  const isStatusViewType = useMemo(
    () =>
      (value: unknown): value is string | null => {
        return viewType === 'status' && typeof value === 'string';
      },
    [viewType]
  );

  const isBoxViewType = useMemo(
    () =>
      (value: unknown): value is string | null => {
        return viewType === 'box';
      },
    [viewType]
  );

  const normalViewValue = useMemo<string>(() => {
    if (typeof value === 'string' && !isNullOrEmptyString(value)) {
      return value;
    } else if (Array.isArray(value)) {
      if (value.length) {
        return value.join(',');
      } else {
        return `No ${label}`;
      }
    } else {
      return 'N/A';
    }
  }, [label, value]);

  const chipsViewValue = useMemo<string[]>(() => {
    if (Array.isArray(value)) {
      if (value.length) {
        return value;
      } else {
        return [];
      }
    } else if (typeof value === 'string' && !isNullOrEmptyString(value)) {
      return value.split(',');
    } else {
      return [];
    }
  }, [value]);

  if (mode === 'add' && hideOnAdd) return null;

  return (
    <div
      className="flex items-start"
      style={{
        minHeight: rootMinHeight,
      }}
    >
      <AnimatePresence mode="wait">
        {(mode === 'view' || (mode === 'edit' && !editable)) && (
          <motion.div
            data-testid="view-content"
            key="view"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={isStatusViewType(value) ? statusVariants : normalVariants}
            className="overflow-hidden"
          >
            <p
              className="text-xs text-neutral-500 dark:text-neutral-400"
              style={{
                ...{ fontSize: viewLabelFontSize },
              }}
            >
              {isBoxViewType(value) ? '' : label}
            </p>

            {isNormalViewType(value) && (
              <div
                className="flex items-center gap-1 break-all font-semibold tracking-wider text-neutral-500 dark:text-neutral-200"
                style={{
                  ...(getBackgroundColor && {
                    backgroundColor: getBackgroundColor(value as string),
                  }),
                  ...(getColor && { color: getColor(value as string) }),
                  ...{ fontSize: normalViewValueFontSize },
                  ...{ minHeight: normalViewValueMinHeight },
                  ...{ justifyContent: normalViewJustifyContent },
                }}
              >
                {/* {copyToClipboard &&
                  value &&
                  !isNullOrEmptyString(value) &&
                  value !== 'N/A' && (
                    <CopyButton
                      sx={{ fontSize: copyButtonSize }}
                      title={label}
                      textToCopy={normalViewValue}
                    />
                  )} */}
                {normalViewValue}
              </div>
            )}

            {isChipsViewType(value) && (
              <div className="flex items-center gap-1 font-semibold tracking-wider text-neutral-500 dark:text-neutral-200">
                {/* {copyToClipboard && chipsViewValue.length > 0 && (
                  <CopyButton
                    sx={{ fontSize: copyButtonSize }}
                    title={label}
                    textToCopy={chipsViewValue.join(',\n')}
                  />
                )} */}
                {!chipsViewValue.length ? (
                  `No ${label}`
                ) : (
                  <motion.div
                    className="mt-1 flex flex-wrap gap-2"
                    variants={chipListVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {chipsViewValue.map((v, i) => (
                      <motion.div key={i} variants={chipItemVariants}>
                        <Chip
                          sx={{
                            ...(getBackgroundColor && {
                              bgcolor: getBackgroundColor(v),
                            }),
                            ...(getColor && { color: getColor(v) }),
                          }}
                          label={
                            <Typography fontWeight={600} fontSize={chipsViewValueFontSize}>
                              {v}
                            </Typography>
                          }
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {isStatusViewType(value) && (
              <motion.div
                className="rounded-full px-5 py-2 font-semibold tracking-wide text-white dark:text-neutral-800"
                style={{
                  ...(getBackgroundColor && {
                    backgroundColor: getBackgroundColor(value || ''),
                  }),
                  ...{ fontSize: statusViewValueFontSize },
                }}
              >
                {normalViewValue}
              </motion.div>
            )}

            {isBoxViewType(value) && (
              <div className="text-center">
                <Paper
                  elevation={0}
                  sx={(theme) => ({
                    backgroundColor: '#424242', //theme.vars.palette.grey[800],
                    color: theme.palette.getContrastText('#424242'),
                    padding: 1,
                    letterSpacing: '0.025em',
                    fontWeight: '600',
                    fontSize: '20px',
                    minWidth: '100px',
                  })}
                >
                  {normalViewValue}
                </Paper>
                <Typography
                  sx={(theme) => ({
                    marginTop: 1,
                    fontSize: viewLabelFontSize,
                    color: '#737373',
                    ...theme.applyStyles('dark', {
                      color: '#A3A3A3',
                    }),
                  })}
                >
                  {label}
                </Typography>
              </div>
            )}
          </motion.div>
        )}

        {((mode === 'edit' && editable) || mode === 'add') && (
          <motion.div
            data-testid="edit-add-content"
            key="edit-add"
            className="-ml-[14px] mr-[14px] w-full overflow-hidden pt-2"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={isStatusViewType(value) ? statusVariants : normalVariants}
          >
            {editComponent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

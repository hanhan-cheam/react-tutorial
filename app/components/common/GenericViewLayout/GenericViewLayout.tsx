'use client';

import { CircularProgress, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import { DetailsAttrField, TViewType } from '../DetailsAttrField/DetailsAttrField';
import { deepCopy } from '../../../utils/deepClone';

export type TGenericViewLayout<T> = {
  key: keyof T;
  label: string;
  value?: string | null;
  type?: TViewType | 'card' | 'box2';
  showTextFieldColor?: boolean; // if true will get the color from useCustomColor
  hide?: boolean;
  minWidth?: string;
  forcePositionEnd?: boolean;
  backgroundColor?: string;
};

export type TGenericViewHeaderList<T> = TGenericViewLayout<T>[][];

export type TGenericViewLayoutProps<T> = {
  onContextMenu?: (event: React.MouseEvent) => void;
  initLoading: boolean;
  details: TGenericViewHeaderList<T>;
  children?: ReactNode;
  hideDivider?: boolean;
  isDevServer?: boolean;
  getColorByText: (text: string) => string;
};

export const GenericViewLayout = <T,>({
  onContextMenu,
  initLoading,
  details,
  children,
  hideDivider = false,
  isDevServer = false,
  getColorByText,
}: TGenericViewLayoutProps<T>) => {
  const theme = useTheme();

  return (
    <section>
      {!initLoading && details ? (
        <div>
          <div
            className="shadow-card-light dark:shadow-card-dark mt-5 flex min-h-[150px] w-full flex-col gap-2 rounded-lg p-10 dark:bg-neutral-800"
            onContextMenu={isDevServer ? onContextMenu : undefined}
          >
            <div className="grid grid-cols-[80%_20%]">
              <div className="flex flex-col gap-2">
                {details.map((detail, index) => {
                  const colPerRow = Math.max(
                    ...details.map(
                      (childArr) =>
                        childArr.filter(
                          (x) =>
                            x.hide !== true &&
                            (x.forcePositionEnd === false || x.forcePositionEnd === undefined)
                        ).length
                    )
                  );

                  return (
                    <div
                      key={index}
                      className="grid flex-1 gap-7"
                      style={{
                        gridTemplateColumns: `repeat(${colPerRow}, minmax(0, 1fr))`,
                      }}
                    >
                      {detail
                        .filter(
                          (x) =>
                            x.hide !== true &&
                            (x.forcePositionEnd === false || x.forcePositionEnd === undefined)
                        )
                        .map((y, index) => {
                          switch (y.type) {
                            case 'normal':
                              return (
                                <div
                                  key={index}
                                  // style={{ minWidth: y.minWidth || '0px' }}
                                >
                                  <DetailsAttrField
                                    label={y.label}
                                    value={y.value}
                                    viewType={y.type ?? 'normal'}
                                    getColor={y?.showTextFieldColor ? getColorByText : undefined}
                                  />
                                </div>
                              );

                            case 'status':
                              return (
                                <div key={index} style={{ minWidth: y.minWidth || '0px' }}>
                                  <DetailsAttrField
                                    label=""
                                    value={y.value}
                                    viewType="status"
                                    getBackgroundColor={getColorByText}
                                    customStyle={{
                                      viewValue: {
                                        status: {
                                          fontSize: 14,
                                        },
                                      },
                                    }}
                                  />
                                </div>
                              );

                            case 'box2':
                              return (
                                <div
                                  key={index}
                                  className="rounded-md border"
                                  style={{
                                    minWidth: y.minWidth || '0px',
                                    backgroundColor: y.backgroundColor,
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center p-3">
                                    <Typography fontSize={'14px'} fontWeight={700} color="black">
                                      {y.label}
                                    </Typography>
                                    <Typography fontSize={'20px'} color="black" fontWeight={'700'}>
                                      {y.value || 'N/A'}
                                    </Typography>
                                  </div>
                                </div>
                              );

                            case 'card':
                              return (
                                <div key={index} className="flex max-w-[100px] flex-col">
                                  <div className="flex justify-center text-xs text-neutral-500 dark:text-neutral-400">
                                    {y.label}
                                  </div>

                                  <div
                                    className="flex aspect-square items-center justify-center rounded-md border border-solid"
                                    style={{
                                      ...(getColorByText && {
                                        backgroundColor: getColorByText(y.value as string),
                                        // color: 'blue',

                                        color:
                                          getColorByText(y.value as string) === '#FFFFFF'
                                            ? theme.palette.getContrastText('#FFFFFF')
                                            : // : theme.vars.palette.background
                                              //     .paper,
                                              '#bdbdbd',
                                      }),
                                    }}
                                  >
                                    {y.value || 'N/A'}
                                  </div>
                                </div>
                              );

                            default:
                              return (
                                <div
                                  key={index}
                                  // style={{ minWidth: y.minWidth || '0px' }}
                                >
                                  <DetailsAttrField
                                    label={y.label}
                                    value={y.value}
                                    viewType={y.type ?? 'normal'}
                                    getColor={y?.showTextFieldColor ? getColorByText : undefined}
                                  />
                                </div>
                              );
                          }
                        })}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-7">
                {details.map((detail) => {
                  const endDivDetails = deepCopy(detail.filter((x) => x.forcePositionEnd));

                  return (
                    <>
                      {endDivDetails
                        .filter((x) => x.hide !== true)
                        .map((y, index) => {
                          switch (y.type) {
                            case 'normal':
                              return (
                                <div
                                  className="flex flex-row-reverse items-center"
                                  key={index}
                                  // style={{ minWidth: y.minWidth || '0px' }}
                                >
                                  <DetailsAttrField
                                    label={y.label}
                                    value={y.value}
                                    viewType={y.type ?? 'normal'}
                                    getColor={y?.showTextFieldColor ? getColorByText : undefined}
                                  />
                                </div>
                              );

                            case 'status':
                              return (
                                <div
                                  key={index}
                                  className="flex flex-row-reverse items-center"
                                  style={{ minWidth: y.minWidth || '0px' }}
                                >
                                  <DetailsAttrField
                                    label=""
                                    value={y.value}
                                    viewType="status"
                                    getBackgroundColor={getColorByText}
                                    customStyle={{
                                      viewValue: {
                                        status: {
                                          fontSize: 14,
                                        },
                                      },
                                    }}
                                  />
                                </div>
                              );

                            case 'box2':
                              return (
                                <div
                                  key={index}
                                  className="rounded-md border"
                                  style={{
                                    minWidth: y.minWidth || '0px',
                                    backgroundColor: y.backgroundColor,
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center p-3">
                                    <Typography fontSize={'14px'} fontWeight={700} color="black">
                                      {y.label}
                                    </Typography>
                                    <Typography fontSize={'20px'} color="black" fontWeight={'700'}>
                                      {y.value || 'N/A'}
                                    </Typography>
                                  </div>
                                </div>
                              );

                            case 'card':
                              return (
                                <div key={index} className="flex max-w-[100px] flex-col">
                                  <div className="flex justify-center text-xs text-neutral-500 dark:text-neutral-400">
                                    {y.label}
                                  </div>

                                  <div
                                    className="flex aspect-square items-center justify-center rounded-md border border-solid"
                                    style={{
                                      ...(getColorByText && {
                                        backgroundColor: getColorByText(y.value as string),
                                        // color: 'blue',

                                        color:
                                          getColorByText(y.value as string) === '#FFFFFF'
                                            ? theme.palette.getContrastText('#FFFFFF')
                                            : '#bdbdbd',
                                        // : theme.vars.palette.background
                                        //     .paper,
                                      }),
                                    }}
                                  >
                                    {y.value || 'N/A'}
                                  </div>
                                </div>
                              );

                            default:
                              return (
                                <div
                                  key={index}
                                  // style={{ minWidth: y.minWidth || '0px' }}
                                  className="flex flex-row-reverse items-center"
                                >
                                  <DetailsAttrField
                                    label={y.label}
                                    value={y.value}
                                    viewType={y.type ?? 'normal'}
                                    getColor={y?.showTextFieldColor ? getColorByText : undefined}
                                  />
                                </div>
                              );
                          }
                        })}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="py-5">
            {!hideDivider && <Divider />}
            <div>{children}</div>
          </div>
        </div>
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </section>
  );
};

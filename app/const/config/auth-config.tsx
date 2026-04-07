// 'use client'

// import { useErrorHelper } from '@/lib/snackbar/hooks/useErrorHelper'
// import { createAuthProvider } from '@acme/context'
// import {
//   TAuthContext,
//   TMenuWithAccessPermission,
//   TVitroxUserInfo,
// } from '@acme/types'
// import { ReactNode } from 'react'
// import { store, updateMenu, updateVitroxUser } from 'shared-redux'

// import { defaultHomeURL, defaultLoginURL } from '@/const/config/app-url'
// import { TOKEN_NAME } from '@/const/config/token-name'

// import { getMenuPermissionApi } from '@/api/vitrox/users/authentications/authentications.v1.api'
// import { loginApi } from '@/api/vitrox/users/login/login.v1.api'
// import { logoutApi } from '@/api/vitrox/users/logout/logout.v2.api'
// import { getUserInfo } from '@/api/vitrox/users/users.v1.api'
// import { getWorkstationOptionsApi } from '@/api/vitrox/workstations/workstations.v1.api'

// const { AuthProvider: NoErrorCatchAuthProvider, useAuthContext } =
//   createAuthProvider<TVitroxUserInfo>({
//     tokenName: TOKEN_NAME,
//     defaultLoginURL: defaultLoginURL,
//     defaultHomeURL: defaultHomeURL,
//     apis: {
//       login: loginApi,
//       logout: logoutApi,
//       getUserInfo: getUserInfo,
//       getMenuPermission: getMenuPermissionApi,
//     },
//     onUserUpdate: (user) => {
//       store.dispatch(updateVitroxUser(user))
//     },
//     onMenuUpdate: (menus: TMenuWithAccessPermission[]) => {
//       store.dispatch(updateMenu({ menus, homePageURL: defaultHomeURL }))
//     },
//     transformUserResponse: async ({
//       userApiData,
//       getToken,
//     }: {
//       userApiData: Awaited<ReturnType<typeof getUserInfo>>['data']
//       getToken: () => string
//     }) => {
//       const token = getToken()
//       const decoded = JSON.parse(atob(token.split('.')[1]))

//       const { data: workstationOptions } = await getWorkstationOptionsApi()

//       const workstationIsAvailable =
//         workstationOptions.find((x) => x.id === Number(decoded.workstationId))
//           ?.isAvailable ?? false

//       return {
//         id: userApiData.userId,
//         userName: userApiData.userName,
//         fullName: userApiData.fullName,
//         email: userApiData.email,
//         companyName: userApiData.companyName,
//         expiredIn: decoded.exp,
//         operatorId: userApiData.operatorId,
//         platformRoleAccess: userApiData.platformRoleAccess,
//         accessLevelDescription: userApiData.accessLevelDescription,
//         workstationId: Number(decoded.workstationId),
//         workstationNo: decoded.workstationNo,
//         workstationIsAvailable: workstationIsAvailable,
//         operatorLogoUrl: userApiData.operatorLogoUrl,
//       }
//     },
//   })

// const AuthProvider = ({
//   value,
//   children,
// }: {
//   value?: TAuthContext<TVitroxUserInfo>
//   children: ReactNode
// }) => {
//   const { errorUIHandler } = useErrorHelper()
//   return (
//     <NoErrorCatchAuthProvider value={value} errorHandler={errorUIHandler}>
//       {children}
//     </NoErrorCatchAuthProvider>
//   )
// }

// export { AuthProvider, useAuthContext }

const AuthProvider = () => {
  return <></>;
};

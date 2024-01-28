import { BaseResponseType } from "common/types/types"
import { AxiosResponse } from "axios"
import { instance } from "common/api/instance"
import { LoginType, UserType } from "features/auth/api/authApi.types"

export const AuthAPI = {
  login(data: LoginType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<
        BaseResponseType<{
          userId: number
        }>
      >,
      LoginType
    >(`/auth/login`, data)
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponseType<UserType>>(`/auth/me`)
  },
}

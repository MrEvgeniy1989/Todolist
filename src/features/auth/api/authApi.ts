import { ResponseType } from "common/types/types"
import { AxiosResponse } from "axios"
import { instance } from "common/api/instance"
import { LoginType, UserType } from "features/auth/api/authApi.types"

export const AuthAPI = {
  login(data: LoginType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<
        ResponseType<{
          userId: number
        }>
      >,
      LoginType
    >(`/auth/login`, data)
  },
  logOut() {
    return instance.delete<ResponseType>(`/auth/login`)
  },
  me() {
    return instance.get<ResponseType<UserType>>(`/auth/me`)
  },
}

import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useFormik } from "formik"
import { authThunks } from "features/auth/model/authSlice"
import { BaseResponseType } from "common/types/types"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
// type FormikErrorType = Partial<Omit<LoginType, "captcha">>

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Password is required"
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more"
      }

      return errors
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((err: BaseResponseType) => {
          err.fieldsErrors?.forEach((fieldsError) => {
            return formikHelpers.setFieldError(fieldsError.field, fieldsError.error)
          })
        })
    },
  })

  return { formik }
}

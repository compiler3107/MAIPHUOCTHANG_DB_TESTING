import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { default as React } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { userAPI } from "../../api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

Registerform.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup
  .object({
    Name: yup.string().required("Vui lòng nhập tên!"),
    Email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng")
      .required("Vui lòng nhập Email!"),
    Username: yup.string().required("Vui lòng nhập tên đăng nhập!"),
    Password: yup
      .string()
      .required("Vui lòng nhập mật khẩu!")
      .min(6, "Tối thiểu 6 ký tự"),
    RetypePassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu!")
      .oneOf([yup.ref("Password")], "Mật khẩu không trùng khớp"),
  })
  .required();

function Registerform(props) {
  const navigate =    useNavigate();
  const { func ,close} = props;

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // console.log(data);
    const temp = await userAPI.dangky(data);
    enqueueSnackbar("Đăng ký thành công", { variant: "success" });
    func();
    navigate("/")
    close();
    console.log(temp)
  };

  return (
    <Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mt-5">
            <TextField
              {...register("Name", { required: true })}
              label="Tên người dùng"
            />
            <div className="text-red-500 text-sm">{errors.Name?.message}</div>
          </div>
          <div className="my-4 w-full">
            <TextField
              {...register("Email", { required: true })}
              fullWidth
              id="filled-search"
              type="email"
              label="Email"
            />
            <div className="text-red-500 text-sm">{errors.Email?.message}</div>
          </div>

          <div className="my-4 ">
            <TextField
              {...register("Username", { required: true })}
              label="Tài khoản"
            />
            <div className="text-red-500 text-sm">
              {errors.Username?.message}
            </div>
          </div>
          <div className="my-4 flex">
            <div>
              <TextField
                {...register("Password", { required: true })}
                label="Mật khẩu"
                type="password"
              />
              <div className="text-red-500 text-sm">
                {errors.Password?.message}
              </div>
            </div>

            <div className="ml-5 ">
              <TextField
                {...register("RetypePassword", { required: true })}
                label="Nhập lại mật khẩu"
                type="password"
              />
              <div className="text-red-500 text-sm">
                {errors.RetypePassword?.message}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginRight: "10px" }}
          >
            Đăng ký
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Registerform;

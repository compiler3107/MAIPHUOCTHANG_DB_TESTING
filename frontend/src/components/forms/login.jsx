import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { userAPI } from "../../api";
import { useSnackbar } from "notistack";

LoginForm.propTypes = {};

const schema = yup
  .object({
    Username: yup.string().required("Vui lòng nhập tên đăng nhập!"),
    Password: yup.string().required("Vui lòng nhập mật khẩu!"),
  })
  .required();

function LoginForm(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { func } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // console.log(data);
    const temp = await userAPI.dangnhap(data)
        // console.log(temp.data)
        localStorage.setItem("phanquyen", temp.data.Clasify)
        localStorage.setItem("hoten", temp.data.Name)
        localStorage.setItem("email", temp.data.Email)
        localStorage.setItem("id", temp.data._id)
        if (temp.data.Clasify === 0) {
            localStorage.setItem("chucvu", "admin")
        }
        if (temp.data.Clasify === 1) {
            localStorage.setItem("chucvu", "giangvien")
        }
        if (temp.data.Clasify === 2) {
            localStorage.setItem("chucvu", "sinhvien")
        }
    // console.log(localStorage.getItem("chucvu"));
    enqueueSnackbar('Đăng nhập thành công', {variant: 'success'});
    func();
    window.location.reload();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <TextField
            {...register("Username", { required: true })}
            label="Tài khoản"
          />
          <div className="text-red-500 text-sm">{errors.Username?.message}</div>
        </div>
        <div className="my-4">
          <TextField
            {...register("Password", { required: true })}
            label="Mật khẩu"
            type="password"
          />
          <div className="text-red-500 text-sm">{errors.Password?.message}</div>
        </div>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginRight: "10px" }}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;

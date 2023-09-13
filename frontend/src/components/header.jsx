import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Registerform from "./forms/register";
import LoginForm from "./forms/login";
Header.propTypes = {};

function Header(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openLG, setOpenLG] = React.useState(false);
  const handleClickOpenLG = () => {
    openLG(true);
  };

  const handleCloseLG = () => {
    setOpenLG(false);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    
    // console.log(localStorage.getItem("id"));
  };
  const handleLogin = () => {
    setOpen(false);
    setOpenLG(true);
  };

  return (
    <div className="font-bold bg-white  z-10 w-full fixed top-0">
      <div className="text-orange-600 text-2xl  font-mono text-center mt-5 border-2 border-orange-600 w-[400px] h-[50px] border-r-8 border-b-8 mx-auto shadow-lg shadow-orange-500/50">
        Hệ thống thi trắc nghiệm
      </div>
      <div className=" mt-2 flex text-center border-2 border-slate-200 bg-slate-800 text-white my-auto w-full">
        {localStorage.getItem("id") === null && (
          <>
            <div className="w-1/4 p-4 text-center hover:text-orange-600 "></div>
            <div className="w-1/3 p-4 text-center hover:text-orange-600">
              <Link to="/">TRANG CHỦ</Link>
            </div>
            <div
              className="w-1/4 p-4 text-center hover:text-orange-600 flex"
              onClick={handleClickOpen}
            >
              <AccountCircleIcon></AccountCircleIcon>
            </div>
          </>
        )}
        {localStorage.getItem("id") !== null && (
          <>
            {localStorage.getItem("chucvu") !== "admin" ? (
              <div className="w-1/4 p-4 text-center hover:text-orange-600 "></div>
            ) : (
              <div className="w-1/4 p-4 text-center hover:text-orange-600 ">
                <Link to="/quanly">QUẢN LÍ</Link>
              </div>
            )}
            <div className="w-1/3 p-4 text-center hover:text-orange-600">
              <Link to="/">TRANG CHỦ</Link>
            </div>
            <div className="w-1/4 p-4 text-center hover:text-orange-600 inline-block ">
              <div className="w-full mx-auto hover:block relative">
                <div className="peer">
                  <AccountCircleIcon></AccountCircleIcon>
                </div>
                <div className=" text-white absolute  hidden z-1 w-1/2 right-1/4 bg-slate-800  pt-[10px] peer-hover:block hover:block ">
                  
                  <div
                    className="border-b-2 border-solid border-white h-10 p-2 hover:text-orange-600 hover:cursor-pointer"
                    onClick={logout}
                  >
                    Đăng xuất
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Dialog open={open} disableEscapeKeyDown onClose={handleClose}>
        <DialogTitle sx={{ color: "blue" }}>
          <div className="text-center font-xl text-sky-600 font-bold">
            Đăng ký
          </div>
        </DialogTitle>
        <DialogContent>
          <Registerform func={handleLogin} close={handleClose}></Registerform>
          <div className="flex mt-2  w-full text-center">
            <div>Đã có tài khoản?</div>
            <div
              className="text-sky-500 hover:cursor-pointer"
              onClick={handleLogin}
            >
              Đăng nhập
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openLG} disableEscapeKeyDown onClose={handleCloseLG}>
        <DialogTitle sx={{ color: "blue" }}>
          <div className="text-center font-xl text-sky-600 font-bold">
            Đăng nhập
          </div>
        </DialogTitle>
        <DialogContent>
          <LoginForm func={handleCloseLG}></LoginForm>
          <div className="flex mt-2  w-full text-center">
            <div>Chưa có tài khoản?</div>
            <div
              className="text-sky-500 hover:cursor-pointer"
              onClick={handleClickOpen}
            >
              Đăng ký
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseLG}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;

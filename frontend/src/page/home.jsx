import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Markup } from "interweave";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { userAPI } from "../api";


import { TextField } from "@mui/material";
Homepage.propTypes = {};

function Homepage(props) {
  // console.log(localStorage.getItem("chucvu"))

  const [user, setUser] = useState();
  const fetchUser = async () => {
    const item = await userAPI.laythongtincanhan(localStorage.getItem("id"));
    // console.log(item)
    setUser(item.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const [list, setList] = useState();
  const fetchDs = async () => {
    const temp = await userAPI.laymonhoc();
    setList(temp.data);
  };
  useEffect(() => {
    fetchDs();
  }, []);

  const [subject, setSubject] = React.useState();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [addsubject, setAddsubject] = React.useState(false);
  const openaddsubject = () => {
    setAddsubject(true);
  };

  const closeaddsubject = () => {
    setAddsubject(false);
  };
  let obj = {};
  const themmonhocyeuthich = async () => {
    obj = { ...obj, id: user._id, subject: subject };
    console.log(obj);
    const tempt = await userAPI.themmonhocyeuthich(obj);
    console.log(tempt);
    fetchDs();
    handleClose();
  };

  return (
    <div className="mt-[130px]">
      <div className="w-3/4 mx-auto flex">
        <div className="w-3/4 rounded-sm "></div>
        <div className="w-1/4  ml-6 rounded-sm">
          {localStorage.getItem("phanquyen") == 1 && (
            <>
              <div
                className="bg-orange-600 rounded-sm my-10 text-white font-semibold text-center h-10 p-2 hover:cursor-pointer"
                onClick={handleClickOpen}
              >
                Thêm bài viết
              </div>
            </>
          )}
          <div className="bg-white rounded-sm pb-5 mt-10 drop-shadow-xl">
            <div className=" font-bold p-4 text-orange-500">MÔN YÊU THÍCH</div>
            <div>
              {user?.Favorite?.map((index) => {
                return (
                  <div key={index._id} value={index._id}>
                    {index.Name}
                  </div>
                );
              })}
            </div>
            <div>
              <div
                className=" font-bold p-4 text-orange-500"
                onClick={openaddsubject}
              >
                Thêm yêu thích
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-sm drop-shadow-xl">
            <div className=" font-bold p-4 text-orange-500">LỊCH SỬ</div>
            <ul className="pb-5 pl-4"></ul>
          </div>
          <div className="mt-5 bg-white rounded-sm drop-shadow-xl">
            <div className=" font-bold p-4 text-orange-500">
              THÔNG TIN CÁ NHÂN
            </div>
            <div className="mx-4 font-bold ">
              <div>Tên:{user?.Name}</div>
              <div>Tài khoản:{user?.Username}</div>
              <div>Email:{user?.Email}</div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} disableEscapeKeyDown onClose={handleClose} fullScreen>
        <DialogTitle sx={{ color: "blue" }}>
          <div className="text-center font-xl text-sky-600 font-bold"></div>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addsubject}
        onClose={closeaddsubject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thêm môn học yêu thích"}
        </DialogTitle>
        <DialogContent>
          <div className="p-10">
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              {list?.map((monhoc, index) => {
                return (
                  <option key={monhoc._id} value={monhoc._id}>
                    {monhoc.Name}
                  </option>
                );
              })}
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={closeaddsubject}>
            Thoát
          </Button>
          <Button variant="contained" onClick={themmonhocyeuthich} autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Homepage;

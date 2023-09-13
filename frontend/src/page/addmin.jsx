import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../api";
import User from "../components/cards/user";
import AdQuestionform from "../components/forms/addQuestion";

Adminpage.propTypes = {};

function Adminpage(props) {
  const navigate = useNavigate();
  // console.log(localStorage.getItem("chucvu"), "admin")
  if (localStorage.getItem("chucvu") !== "admin") {
    window.location.reload();
    navigate("/");
  }
  const [list, setList] = useState([]);
  const fetchDs = async () => {
    const temp = await userAPI.laytaikhoan();
    setList(temp.data);
    // console.log(listbl)
  };
  useEffect(() => {
    fetchDs();
  }, []);

  return (
    <div className="mt-[130px]">
      <div className="w-3/4 mx-auto flex gap-4">
        <div className="w-2/3  pt-[100px] text-center rounded-md">
          <div className="bg-slate-800 font-bold text-white ">Thêm mới</div>
          <div className="bg-white font-bold w-full ">
            <AdQuestionform></AdQuestionform>
          </div>
        </div>
        <div className="w-1/3 pt-[100px] text-center rounded-md">
          <div>
            <h1 className="bg-slate-800 font-bold text-white ">Danh sách tài khoản</h1>
          </div>
          <div>
            {list.map((item) => {
              return (
                <User
                  key={item._id}
                  id={item._id}
                  username={item.Username}
                  status={item.Locked}
                ></User>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Adminpage;

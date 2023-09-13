import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { userAPI } from "../../api";

User.propTypes = {};

function User(props) {
  const { id, status, username } = props;
  const khoa = async () => {
    await userAPI.khoataikhoan({ id });
  };
  const mokhoa = async () => {
    const temp = await userAPI.mokhoataikhoan({ id });
  };
  return (
    <div className="flex my-2 bg-white">
      <div className="w-2/3">{username}</div>
      {!status && (
        <>
          <div className="w-1/3 font-bold bg-blue-500 rounded text-white">
            <Button
              onClick={khoa}
              type="submit"
              variant="contained"
              className="w-[110px]"
            >
              Khóa
            </Button>
          </div>
        </>
      )}
      {status && (
        <>
          <div className="w-1/3 font-bold bg-blue-500 rounded text-white">
            <Button
              onClick={mokhoa}
              type="submit"
              variant="contained"
              className="w-[110px]"
            >
              Mở Khóa
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default User;

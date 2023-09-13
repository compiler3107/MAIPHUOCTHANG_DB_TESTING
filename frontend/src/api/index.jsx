import axios from "axios";

export function callApi(method, endpoint, data) {
  return axios({
    method: method,
    url: `http://localhost:8080${endpoint}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const userAPI = {
  dangky: (data) => {
    // console.log(data);
    return callApi("post", `/dangky`, data);
  },
  dangnhap: (data) => {
    // console.log(data);
    return callApi("post", `/dangnhap`, data);
  },

  laytatcanhan: () => {
    // console.log(data);
    return callApi("get", `/laynhan`, null);
  },
  laybaiviettheonhan: (id) => {
    // console.log(data);
    return callApi("get", `/lay1nhan/${id}`, id);
  },
  laybvcuagv: (id) => {
    // console.log(data);
    return callApi("get", `/laydanhsachbaiviet/${id}`, id);
  },
  thembaiviet: (data) => {
    // console.log(data);
    return callApi("post", `/thembaiviet`, data);
  },
  laybaiviet: () => {
    // console.log(data);
    return callApi("get", `/laybaiviet`, null);
  },
  laytaikhoan: () => {
    // console.log(data);
    return callApi("get", `/laytaikhoan`, null);
  },
  laybaivietdiendan: () => {
    // console.log(data);
    return callApi("get", `/laybaivietdiendan`, null);
  },
  lay1baiviet: (id) => {
    // console.log(data);
    return callApi("get", `/laybaiviet/${id}`, id);
  },
  thembinhluan: (data) => {
    // console.log(data);
    return callApi("post", `/baiviet/binhluan`, data);
  },
  themtraloi: (data) => {
    // console.log(data);
    return callApi("post", `/baiviet/traloi`, data);
  },
  thembinhluansvpost: (data) => {
    // console.log(data);
    return callApi("post", `/baivietdiendan/binhluan`, data);
  },
  laybinhluan: (id) => {
    // console.log(data);
    return callApi("get", `/baiviet/laybinhluan/${id}`, id);
  },
  laytraloi: (id) => {
    // console.log("id",id);
    return callApi("get", `/findx/${id}`, id);
  },
  thembaivietsv: (data) => {
    // console.log(data);
    return callApi("post", `/sinhvien/thembaiviet`, data);
  },
  phanquyen: (data) => {
    // console.log(data);
    return callApi("post", `/phanquyen`, data);
  },
  khoataikhoan: (data) => {
    console.log(data);
    return callApi("put", `/khoa`, data);
  },

  mokhoataikhoan: (data) => {
    return callApi("put", `/mokhoa`, data);
  },
  themmonhoc: (data) => {
    console.log(data);
    return callApi("post", `/themmonhoc`, data);
  },
  laymonhoc: () => {
    // console.log(data);
    return callApi("get", `/laymonhoc`, null);
  },
  themcauhoi: (data) => {
    // console.log(data);
    return callApi("post", `/themcauhoi`, data);
  },

  laythongtincanhan: (id) => {
    // console.log(data);
    return callApi("get", `/laythongtincanhan/${id}`, id);
  },
  themmonhocyeuthich: (data) => {
    // console.log(data);
    return callApi("post", `/themmonhocyeuthich`, data);
  },
};

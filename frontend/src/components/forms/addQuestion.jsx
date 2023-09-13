import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Checkbox, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
// import { detaiAPI, hockyAPI } from "../../api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { userAPI } from "../../api";

function AdQuestionform(props) {
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  enqueueSnackbar("Đăng ký thành công", { variant: "success" });
  // console.log(list);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [question, setQuestion] = useState("");

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [isCorrectanswer1, setIsCorrectanswer1] = useState(false);
  const [isCorrectanswer2, setIsCorrectanswer2] = useState(false);
  const [isCorrectanswer3, setIsCorrectanswer3] = useState(false);
  const [isCorrectanswer4, setIsCorrectanswer4] = useState(false);
  const [subject, setSubject] = useState("");
  const { register, handleSubmit } = useForm({});
  const [list, setList] = useState([]);
  const fetchDs = async () => {
    const temp = await userAPI.laymonhoc();
    setList(temp.data);
  };
  useEffect(() => {
    fetchDs();
  }, []);

  const listAns = [];
  listAns.push({ Answer: answer1, IsCorrect: isCorrectanswer1 });
  listAns.push({ Answer: answer2, IsCorrect: isCorrectanswer2 });
  listAns.push({ Answer: answer3, IsCorrect: isCorrectanswer3 });
  listAns.push({ Answer: answer4, IsCorrect: isCorrectanswer4 });

  // console.log(listAns)
  const onSubmit = async (values) => {
    let data = { ...values };
    data.question = question;
    data.answer = listAns;
    data.subject = subject;
    // console.log(data);
    const tempt = await userAPI.themcauhoi(data);
    enqueueSnackbar("Thêm thành công", { variant: "success" });
    console.log(tempt);
  };
  const themmonhoc = async () => {
    // console.log(tag);
    const tempt = await userAPI.themmonhoc({ subject: subject });
    console.log(tempt);
    fetchDs();
    handleClose();
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="bg-orange-600 rounded-lg h-10 w-3/4 p-2 m-auto translate-y-6 shadow-lg shadow-blue-500/50 text-white font-bold text-center">
          Thêm câu hỏi
        </div>
        <div className=" m-auto rounded-lg bg-white h-full shadow-lg mb-5">
          <div className="pt-12">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="font-bold text-xl py-5">
                  Câu hỏi nhiều phương án
                </div>
                Câu hỏi
                <input
                  type="test"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className=" py-5 ">
                <div className="font-bold  text-xl pr-5">Đáp án</div>
                <div className="my-2 bg-slate-200">
                  Đáp án 1
                  <input
                    type="test"
                    onChange={(e) => setAnswer1(e.target.value)}
                  />
                  Đáp án đúng
                  <input
                    type="checkbox"
                    onChange={(e) => setIsCorrectanswer1(!isCorrectanswer1)}
                  />
                </div>
                <div className="my-2 bg-slate-200">
                  Đáp án 2
                  <input
                    type="test"
                    onChange={(e) => setAnswer2(e.target.value)}
                  />
                  Đáp án đúng
                  <input
                    type="checkbox"
                    onChange={(e) => setIsCorrectanswer2(!isCorrectanswer2)}
                  />
                </div>
                <div className="my-2 bg-slate-200">
                  Đáp án 3
                  <input
                    type="test"
                    onChange={(e) => setAnswer3(e.target.value)}
                  />
                  Đáp án đúng
                  <input
                    type="checkbox"
                    onChange={(e) => setIsCorrectanswer3(!isCorrectanswer3)}
                  />
                </div>
                <div className="my-2 bg-slate-200">
                  Đáp án 4
                  <input
                    type="test"
                    onChange={(e) => setAnswer4(e.target.value)}
                  />
                  Đáp án đúng
                  <input
                    type="checkbox"
                    onChange={(e) => setIsCorrectanswer4(!isCorrectanswer4)}
                  />
                </div>
              </div>
              <div className="flex py-5 ml-[100px]">
                <div className="font-bold  text-xl pr-5">Môn học</div>
                <div onClick={handleClickOpen}>
                  <AddCircleIcon></AddCircleIcon>
                </div>
              </div>
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
              {/* </div> */}

              <div className="text-center mt-10 pt-5 pb-5 w-full">
                <Button type="submit" variant="contained" className="w-1/2">
                  Thêm câu hỏi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thêm môn học"}</DialogTitle>
        <DialogContent>
          <div className="p-10">
            <TextField
              required
              onChange={(e) => setSubject(e.target.value)}
              id="outlined-required"
              label="Nhập môn học"
              //   defaultValue="Từ khóa..."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="contained" onClick={themmonhoc} autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdQuestionform;

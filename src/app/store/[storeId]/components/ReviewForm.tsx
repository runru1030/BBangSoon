import { userInfoAtoms } from "@app/GlobalProvider";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import { faBreadSlice, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import clsx from "clsx";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
export interface reviewState {
  content: string;
  star: number;
  attach: string | ArrayBuffer;
  nickName: string;
}

const isWriteModeAtom = atom<boolean>(false);

interface props {
  storeId: number;
}

const ReviewForm = ({ storeId }: props) => {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtoms.storeAtom);
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const [isWriteMode, setisWriteMode] = useAtom(isWriteModeAtom);

  /* 리뷰 작성 */
  const [reviewImg, setReviewImg] = useState<File>();
  const [newReview, setNewReview] = useState<reviewState>({
    content: "",
    star: 0,
    attach: "",
    nickName: "익명",
  });
  const onClickStar = (e: React.MouseEvent) => {
    setNewReview({ ...newReview, star: parseInt(e.currentTarget.id) });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("reviewImg", reviewImg || "");
    formData.append("content", newReview.content);
    formData.append("nickName", newReview.nickName);
    formData.append("star", newReview.star.toString());
    formData.append("UserId", userAtom.id + "");
    axios.post(`/store/review/${storeId}`, formData).then((res) => {
      setStoreInfo({ ...storeInfo, ...res.data });
    });
    setNewReview({
      content: "",
      star: 0,
      attach: "",
      nickName: "익명",
    });
    setReviewImg(undefined);
    setisWriteMode(false);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files) {
      const theFile = files[0];
      setReviewImg(files[0]);

      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setNewReview({
          ...newReview,
          attach: finishedEvent.target?.result || "",
        });
      };
      reader.readAsDataURL(theFile);
    }
  };

  return (
    <div className={clsx(isWriteMode ? "visible" : "hidden")}>
      <Form onSubmit={onSubmit} className="col-container justify-center w-full">
        {newReview.attach && <img src={newReview.attach + ""} width="60%" />}
        <StarContainer className="row-container items-center">
          {Array.from({ length: 5 }, (v, i) => i).map((it) => (
            <FontAwesomeIcon
              id={it + 1 + ""}
              icon={faBreadSlice}
              onClick={onClickStar}
              color={newReview.star >= it + 1 ? "#e2c26e" : "#cabfa3"}
            />
          ))}
          <span className="text-2xl font-semibold text-brown ml-2">
            {newReview.star}
          </span>
          <ButtonGroup className="wrapper row-container">
            <label
              htmlFor="file"
              className="bg-brown-2 text-white px-3 py-2 rounded-l-lg"
            >
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <button
              type="submit"
              id="sbm-btn"
              className="bg-brown-2 text-white px-3 py-2 rounded-r-lg"
            >
              <span>작성</span>
            </button>
          </ButtonGroup>
        </StarContainer>
        <TextareaAutosize
          id="textArea"
          placeholder="최대 300자 / 이미지 최대 1장"
          value={newReview.content}
          onChange={(event) =>
            setNewReview({
              ...newReview,
              content: event.target.value.substring(0, 300),
            })
          }
        />
        <input
          id="file"
          type="file"
          style={{ display: "none" }}
          onChange={onFileChange}
          accept="image/png, image/jpeg"
        />
      </Form>
    </div>
  );
};

const WriteBtn = () => {
  const router = useRouter();
  const [isWriteMode, setisWriteMode] = useAtom(isWriteModeAtom);
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  return (
    <button
      onClick={() => {
        !userAtom.id
          ? setisWriteMode(!isWriteMode)
          : router.push("/auth/login");
      }}
      className="text-sm text-orange"
    >
      {isWriteMode ? "취소" : "작성하기"}
    </button>
  );
};
ReviewForm.triggerBtn = WriteBtn;
export default ReviewForm;

const Form = styled.form`
  width: 90%;
  font-size: medium;
  padding: 15px;
  #textArea {
    all: unset;
    margin-top: 30px;
    width: 100%;
    overflow: hidden;
    resize: none;
    padding: 10px 4px;
    position: relative;
  }
`;
const StarContainer = styled.span`
  font-size: xx-large;
  text-align: center;
  align-items: center;
  gap: 3px;
  margin-top: 30px;
`;
const ButtonGroup = styled.div`
  font-size: small;
  flex: 1;
  justify-content: flex-end;
  #sbm-btn {
    border-left: white solid thin;
  }
`;

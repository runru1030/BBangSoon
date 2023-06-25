import { userInfoAtoms } from "@app/GlobalProvider";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import { faBreadSlice, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { strapiReviewsApi } from "@lib/apis/ReviewsApis";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
export interface reviewState {
  content: string;
  star: number;
  auth_user: number;
  store: number;
}

const isWriteModeAtom = atom<boolean>(false);

const ReviewForm = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const [isWriteMode, setisWriteMode] = useAtom(isWriteModeAtom);

  const [reviewImg, setReviewImg] = useState<ArrayBuffer | string>();
  const [review, setReview] = useState<reviewState>({
    content: "",
    star: 0,
    auth_user: userAtom.id,
    store: storeInfo.id,
  });

  const postReview = useMutation({
    mutationFn: async (reviewFormData: FormData) =>
      await strapiReviewsApi.postReview(reviewFormData),
    onSuccess: () => {
      setReview({
        content: "",
        star: 0,
        auth_user: userAtom.id,
        store: storeInfo.id,
      });
      setReviewImg(undefined);
      setisWriteMode(false);
    },
    onError: (err) => {
      console.error(err);
      alert("리뷰 작성에 실패했습니다.");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(review));
    formData.append("files.img", (event.target as any).elements.img.files[0]);
    postReview.mutate(formData);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setReviewImg(finishedEvent.target?.result || "");
      };
      reader.readAsDataURL(theFile);
    }
  };

  return (
    <div className={clsx(isWriteMode ? "visible" : "hidden")}>
      <Form onSubmit={onSubmit} className="col-container justify-center w-full">
        {reviewImg && <img src={reviewImg + ""} width="60%" />}

        <StarContainer className="row-container items-center">
          {Array.from({ length: 5 }, (v, i) => i).map((it) => (
            <FontAwesomeIcon
              key={it}
              id={it + 1 + ""}
              icon={faBreadSlice}
              onClick={(e: React.MouseEvent) => {
                setReview({ ...review, star: parseInt(e.currentTarget.id) });
              }}
              color={review.star >= it + 1 ? "#e2c26e" : "#cabfa3"}
            />
          ))}
          <span className="text-2xl font-semibold text-brown ml-2">
            {review.star}
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
          value={review.content}
          maxLength={300}
          onChange={(event) =>
            setReview({
              ...review,
              content: event.target.value.substring(0, 300),
            })
          }
        />
        <input
          id="file"
          type="file"
          name="img"
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
  const user = useAtomValue(userInfoAtoms.userAtom);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <button
      onClick={() => {
        user.email ? setisWriteMode(!isWriteMode) : router.push("/auth/login");
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

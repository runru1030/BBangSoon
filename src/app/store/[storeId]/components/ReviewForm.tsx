import { userInfoAtoms } from "@app/GlobalProvider";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import { faBreadSlice, faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { strapiReviewsApi } from "@lib/apis/ReviewsApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
export interface reviewState {
  content: string;
  star: number;
  auth_user: number;
  store: number;
  store_imgs?: string;
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
  const queryClient = useQueryClient();
  const postReview = useMutation({
    mutationFn: async ({
      imgFormData,
      reviewData,
    }: {
      imgFormData: FormData;
      reviewData: reviewState;
    }) => {
      if (reviewImg) {
        const res = await strapiReviewsApi.postReviewImg(imgFormData);

        await strapiReviewsApi.postReview({
          ...reviewData,
          store_imgs: res?.data.data.id,
        });
      } else {
        await strapiReviewsApi.postReview(reviewData);
      }
    },
    onSuccess: () => {
      setReview({
        content: "",
        star: 0,
        auth_user: userAtom.id,
        store: storeInfo.id,
      });
      setReviewImg(undefined);
      setisWriteMode(false);
      queryClient.invalidateQueries(["getStoreReviews"]);
    },
    onError: (err) => {
      console.error(err);
      alert("리뷰 작성에 실패했습니다.");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imgFormData = new FormData();
    imgFormData.append("data", JSON.stringify({ store: storeInfo.id }));
    imgFormData.append(
      "files.img",
      (event.target as any).elements.img.files[0]
    );
    postReview.mutate({ imgFormData, reviewData: review });
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
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full gap-5 p-4 relative"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-1 text-3xl">
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
          </div>
          <button
            type="submit"
            id="sbm-btn"
            className="bg-brown text-white px-3 py-2 rounded-lg"
          >
            <span>작성하기</span>
          </button>
        </div>

        {!reviewImg && (
          <label
            htmlFor="file"
            className="w-fit flex items-center gap-1 px-3 py-2 rounded-lg border border-dashed border-gray-300"
          >
            <FontAwesomeIcon icon={faCamera} color="#42454E" />
            <span className="flex items-center gap-1 text-gray-300">
              사진 추가 <span className="text-xs text-gray-700">최대 1장</span>
            </span>
          </label>
        )}
        {reviewImg && (
          <div className="relative border border-gray-1000 w-48 h-48 overflow-hidden flex items-center justify-center">
            <img src={reviewImg + ""} width="100%" />
            <FontAwesomeIcon
              icon={faX}
              color="#565656"
              className="absolute right-0 top-0 p-1"
              onClick={() => {
                setReviewImg(undefined);
              }}
            />
          </div>
        )}

        <StyledTextArea
          id="textArea"
          placeholder="리뷰 작성하기"
          value={review.content}
          maxLength={300}
          onChange={(event) =>
            setReview({
              ...review,
              content: event.target.value.substring(0, 300),
            })
          }
        />
        <span className="absolute right-5 bottom-5 text-sm text-gray-300">
          {review.content.length}
          <span className="text-gray-800"> / 300</span>
        </span>
        <input
          id="file"
          type="file"
          name="img"
          style={{ display: "none" }}
          onChange={onFileChange}
          accept="image/png, image/jpeg"
        />
      </form>
    </div>
  );
};

const WriteBtn = () => {
  const router = useRouter();
  const [isWriteMode, setisWriteMode] = useAtom(isWriteModeAtom);
  const user = useAtomValue(userInfoAtoms.userAtom);

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

const StyledTextArea = styled(TextareaAutosize)`
  all: unset;
  width: auto;
  min-height: 100px;
  overflow: hidden;
  resize: none;
  padding: 12px;
  border-radius: 8px;
  position: relative;
  background-color: #f4f6f9;
  font-size: medium;
  transition: 0.3s;
  &::placeholder {
    color: #b2bcd0;
  }
  &:focus {
    background-color: white;
    border: solid thin #ff9900;
  }
`;

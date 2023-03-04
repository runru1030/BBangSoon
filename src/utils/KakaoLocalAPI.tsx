import axios from "axios";
import { resultState } from "../app/home/page";
import { StoreState } from "../app/store/[storeId]/page";

export const getStore = async (
  page: number,
  storeArr: resultState[],
  search: string
) => {
  let arr: resultState[];
  let isEnd: boolean;
  console.log(page);

  await axios
    .get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
        },
        params: {
          page: page,
          category_group_code: "CE7, FD6",
        },
      }
    )
    .then((res) => {
      arr = res.data.documents.filter(
        (it: resultState) =>
          it.category_group_code == "CE7" ||
          it.category_name.split(" > ")[1] == "간식"
      );
      isEnd = res.data.meta.is_end;
      if (page != 1) {
        arr = [...storeArr, ...arr];
      }
    });
  return new Promise((resolve, reject) => {
    resolve({ isEnd: isEnd, resultArr: arr });
  });
};
export const getStoreList = (
  storeArr: resultState[],
  setArr: React.Dispatch<React.SetStateAction<resultState[]>>
) => {
  axios
    .post(
      "/store/list",
      storeArr.map((store: resultState) => ({ id: store.id }))
    )
    .then((res) => {
      const resArr = storeArr.map((store: resultState, idx: number) => ({
        ...store,
        ...res.data[idx],
      }));
      setArr(resArr);
      resArr.forEach(async (element: resultState, i: number) => {
        if (element.avgStar === null) {
          await axios
            .post("/storeCrawl/count", {
              id: element.id,
              url: element.place_url,
            })
            .then((res) => {
              resArr[i] = { ...resArr[i], ...res.data };
              setArr([...resArr]);
            });
        }
      });
    });
};
export const getStoreMap = async (
  page: number,
  markerArr: resultState[],
  loc: StoreState["loc"]
) => {
  let arr: resultState[];
  let isEnd: boolean;
  await axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=디저트`, {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
      },
      params: {
        y: loc.y,
        x: loc.x,
        category_group_code: "CE7, FD6",
        page: page,
        size: 15,
        radius: 500,
        sort: "distance",
      },
    })
    .then((res) => {
      arr = res.data.documents.filter(
        (it: resultState) =>
          (it.category_group_code == "CE7" &&
            it.category_name.split(" > ")[2] != "커피전문점") ||
          it.category_name.split(" > ")[1] == "간식"
      );
      isEnd = res.data.meta.is_end;
      if (page != 1) {
        arr = [...markerArr, ...arr];
      }
    });
  return new Promise((resolve, reject) => {
    resolve({ isEnd: isEnd, resultArr: arr });
  });
};

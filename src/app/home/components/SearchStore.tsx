import StoreItem from "@components/StoreItem";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { getStore } from "src/utils/KakaoLocalAPI";
import styled from "styled-components";
import { resultState } from "../PageContent";
const SearchStore = () => {
  const [resultArr, setResultArr] = useState<resultState[]>([]);
  const [search, setSearch] = useState("");
  const [searchResultInfo, setSearchResultInfo] = useState({
    isEnd: true,
    currPage: 1,
  });
  const getStoreKakao = (page: number) => {
    getStore(page, resultArr, search).then((res: any) => {
      setSearchResultInfo((p) => ({
        isEnd: res.isEnd,
        currPage: p.currPage + 1,
      }));
      setResultArr(res.resultArr);
      // getStoreList(res.resultArr, setResultArr);
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultArr([]);
    getStoreKakao(1);
  };
  return (
    <div className="relative">
      <form
        onSubmit={onSubmit}
        className="flex items-center px-3 py-6 relative"
      >
        <input
          type="text"
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
            if (target.value === "") setResultArr([]);
          }}
          placeholder="매장 검색"
          className="general-input border w-full border-blue "
        />
        <button
          type="submit"
          className="absolute right-6 text-blue"
          disabled={search === ""}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      <div
        className={clsx(
          "w-full mb-[100px] absolute bg-white",
          resultArr.length === 0 ? "hidden" : "visible"
        )}
      >
        <div>
          {resultArr.map((result: resultState) => (
            <StoreItem store={result} key={result.id} />
          ))}
        </div>
        {!searchResultInfo.isEnd && (
          <Button onClick={() => getStoreKakao(searchResultInfo.currPage)}>
            더 보기
          </Button>
        )}
      </div>
    </div>
  );
};
export default SearchStore;

export const Form = styled.form`
  margin: 20px 0;
  justify-content: center;
`;

const Button = styled.button`
  align-items: center;
  width: 100%;
  height: 32px;
  text-align: center;
  flex: 1;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
  padding: 10px 0;
  font-size: small;
`;

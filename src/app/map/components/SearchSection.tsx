import { resultState } from "@app/home/PageContent";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import clsx from "clsx";
import { atom, useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import styled from "styled-components";
import { mapLocationAtom } from "../PageContent";

const serachEventAtom = atom<{ isSerachMode: boolean }>({
  isSerachMode: false,
});

const SearchSection = () => {
  const setMapLocation = useSetAtom(mapLocationAtom);
  const [serachEvent, setSerachEvent] = useAtom(serachEventAtom);
  const [search, setSearch] = useState("");
  const [addressList, setAddressList] = useState<resultState[]>([]); //위치 검색 결과 arr

  const onClickResult = (store: resultState) => {
    setMapLocation({
      title: store.name,
      y: store.loc_y || 0,
      x: store.loc_x || 0,
    });
    setAddressList([]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
          },
          params: { size: 15 },
        }
      )
      .then((res) => {
        setAddressList(res.data.documents);
      });
    // setSerachEvent({ isSerachMode: false });
  };

  return (
    <div
      className={clsx(
        !serachEvent.isSerachMode ? "hidden" : "visible",
        "absolute top-0 z-10 w-full"
      )}
    >
      <form
        onSubmit={onSubmit}
        className="flex items-center px-3 py-6 relative w-full"
      >
        <input
          type="text"
          value={search}
          placeholder="위치 검색"
          onChange={(event) => setSearch(event.target.value)}
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
          addressList.length === 0 ? "hidden" : "visible",
          "absolute bg-white w-full"
        )}
      >
        {addressList.map((store: resultState, idx: number) => (
          <div
            id={store.storeId + ""}
            onClick={() => onClickResult(store)}
            className="w-full flex items-center p-5 h-8 border-t border-gray-1000"
          >
            {store.name}
          </div>
        ))}
      </div>
    </div>
  );
};
const SerachBtn = () => {
  const [serachEvent, setSerachEvent] = useAtom(serachEventAtom);
  return (
    <StyledButton
      onClick={() => {
        setSerachEvent({ isSerachMode: !serachEvent.isSerachMode });
      }}
    >
      위치 검색
    </StyledButton>
  );
};

const StyledButton = styled.button`
  all: unset;
  font-size: x-small;
  font-weight: normal;
  flex: 1;
  text-align: end;
  color: ${(props) => props.theme.color.blue};
`;

SearchSection.triggerBtn = SerachBtn;
export default SearchSection;

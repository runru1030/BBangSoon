import { resultState } from "@app/home/page";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

interface props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressList: React.Dispatch<React.SetStateAction<resultState[]>>;
}
const Search: React.FC<props> = ({ setIsOpen, setAddressList }) => {
  const [search, setSearch] = useState("");
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${search}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
          },
          params: { size: 15 },
        }
      )
      .then((res) => {
        setAddressList(res.data.documents);
      });
    setIsOpen(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        value={search}
        placeholder="위치 검색"
        onChange={(event) => setSearch(event.target.value)}
      />
      <input type="submit" id="search" style={{ display: "none" }} />
      <Button htmlFor="search">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Form>
  );
};
export default Search;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 99;
  margin-top: 10px;
  input[type="text"] {
    border: ${(props) => `solid thin` + props.theme.color.blue};
    border-radius: 5px;
    padding: 10px 20px;
    box-shadow: 2px 2px 10px 2px #46a6ff1e;
    width: 85%;
    background-color: white;
  }
`;
const Button = styled.label`
  position: absolute;
  transform: translate(42vw, 50%);
  color: ${(props) => props.theme.color.blue};
`;

import { StoreType } from '@components/StoreList';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';

export interface resultState extends StoreType {
  category_group_code: string,
  category_name: string

}
interface props {
  search:string, 
  setSearch:React.Dispatch<React.SetStateAction<string>>,
  setResultArr: React.Dispatch<React.SetStateAction<resultState[]>>,
  getStoreKakao: Function
}
const Search: React.FC<props> = ({ search, setSearch, setResultArr, getStoreKakao}) => {
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setSearch(value);
    if (value == "") setResultArr([]);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultArr([]);
    getStoreKakao(1);
  }
  return (
    <Form onSubmit={onSubmit} className="container">
      <input type="text" value={search} onChange={onChange} placeholder="매장 검색" />
      <input type="submit" id="search" style={{ "display": "none" }} />
      <Button htmlFor="search"><FontAwesomeIcon icon={faSearch} /></Button>
    </Form>
  )
}
export default Search;

export const Form=styled.form`
  margin: 20px 0;
  justify-content: center;
  input[type=text]{
      border: ${props=>`solid thin`+props.theme.color.blue};
      border-radius: 5px;
      padding: 10px 20px ;
      box-shadow: 2px 2px 10px 2px #46a6ff1e;
      width: 85%;
      background-color: white;
  }
`
const Button=styled.label`
  position: absolute;
  transform: translate(42vw);
  color: ${props=>props.theme.color.blue};
`
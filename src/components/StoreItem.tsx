import {
  StrapiStoreType,
  storeInfoAtoms,
} from "@app/store/[storeId]/StoreInfoProvider";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";
import styled from "styled-components";
interface StoreListProps {
  store: StrapiStoreType;
}
const StoreItem = ({
  store,
  children,
}: React.PropsWithChildren<StoreListProps>) => {
  const router = useRouter();
  const setStoreInfo = useSetAtom(storeInfoAtoms.storeAtom);

  return (
    <Store
      onClick={() => {
        setStoreInfo(store);
        router.push(`/store/${store.id}`);
      }}
    >
      {children}
      <StoreName>{store.name}</StoreName>
      <Wrapper className="row-container">
        {/* <Block>
          <span>
            {store.avgStar == null ? (
              <FontAwesomeIcon icon={faSpinner} />
            ) : (
              store.reviewCnt
            )}
          </span>
          <span className="text-sm">리뷰</span>
        </Block>
        <Block>
          <span>
            {store.avgStar == null ? (
              <FontAwesomeIcon icon={faSpinner} />
            ) : (
              store.avgStar.toFixed(1)
            )}
          </span>
          <span className="text-sm">평점</span>
        </Block> */}
      </Wrapper>
    </Store>
  );
};
export default StoreItem;
const Store = styled.div`
  width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  height: 30px;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: #636363;
`;
const Wrapper = styled.div`
  gap: 20px;
  margin-right: 20px;
`;
const StoreName = styled.span`
  flex: 1;
  margin-left: 20px;
`;

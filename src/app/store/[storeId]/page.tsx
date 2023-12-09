"use client";
import Header from "./components/Header";
import PageContent from "./PageContent";
import StoreInfoProvider from "./StoreInfoProvider";
const Page = ({ params: { storeId } }: { params: { storeId: string } }) => {
  return (
    <StoreInfoProvider {...{ storeId }}>
      <div>
        <Header />
        <PageContent />
      </div>
    </StoreInfoProvider>
  );
};
export default Page;

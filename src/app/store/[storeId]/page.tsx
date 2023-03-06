"use client";
import Nav from "../../../components/Nav";
import Header from "./components/Header";
import PageContent from "./PageContent";
import StoreInfoProvider from "./StoreInfoProvider";
const Page = () => {
  return (
    <StoreInfoProvider>
      <div>
        <Header />
        <PageContent />
        <Nav />
      </div>
    </StoreInfoProvider>
  );
};
export default Page;

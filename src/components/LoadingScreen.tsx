import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center mt-[150px]">
      <span className="font-light mb-20 text-lg">
        빵순이를 위한 빵지순례 도우미 웹앱
      </span>
      <Image src="/assets/logo.png" width="60" height="60" alt="logo" />
      <span className="font-light absolute bottom-[50px] text-sm">
        &copy; 2021 . keeper . all right reserved
      </span>
    </div>
  );
};
export default LoadingScreen;

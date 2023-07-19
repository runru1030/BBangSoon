import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
interface props {
  reviewStar: number;
}
const StarCmp: React.FC<props> = ({ reviewStar }) => {
  return (
    <div className="flex items-center gap-[3px] text-lg">
      {Array.from({ length: 5 }, (v, i) => i).map((it) => (
        <FontAwesomeIcon
          key={it}
          icon={faBreadSlice}
          color={reviewStar >= it + 1 ? "#e2c26e" : "#cabfa3"}
        />
      ))}
    </div>
  );
};
export default StarCmp;

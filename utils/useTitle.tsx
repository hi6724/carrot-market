import { useEffect, useState } from "react";

export const useTitle = (initTitle: string) => {
  const [title, setTitle] = useState(initTitle);
  const updateTime = () => {
    const htmlTitle = document.querySelector("title");
    if (htmlTitle !== null) {
      htmlTitle.innerText = title;
    }
  };
  useEffect(updateTime, [title]);
  return setTitle;
};

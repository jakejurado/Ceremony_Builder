import React, { useContext, useState } from "react";
import { GlobalContext } from "./App";

  //sidebar copy to clipboard.
function SidebarCopy() {
  const { templates, templateTitle, names } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState(null);

  async function handleClick() {
    const res = await copyToClipboard();
    copyToClipboard2(res);
  }

  function copyToClipboard2(text) {
    navigator.clipboard.writeText(text).then(function() {
        setNotifications('Copying to clipboard was successful!');
    }, function(err) {
        setNotifications('Could not copy text: ', err);
    });
}

  function copyToClipboard(){ 
    const template = templates[ templateTitle]


    const words = template.order.reduce((acc, cul) => {
      const sec = template[cul[0]]
      const secTitle = sec.title
      const secWords = sec.script[cul[1]]

      acc += acc + `\n${secTitle}\n${secWords}\n`
      return acc

    }, '')
    return words
  }

  return (
    <div className="sidebarElements">
      <button className="boxButton" onClick={handleClick}>
        Copy
      </button>
      <ul className='saveNotificataions'>
        {notifications}
      </ul>
    </div>
  );
}

export default SidebarCopy;

import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";
function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-white h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
      {/* gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>




      {/* body */}
      <div
        className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
      "
      >
        <div className="uppercase font-extrabold text-black text-xl text-center mb-14 mx-auto">
          {/* header */}
          <img className="w-[150px] mx-auto" src="https://2.bp.blogspot.com/-sk1DC6JZT-0/XFWtXLIWxeI/AAAAAAAAGGo/GNdcu4n4p4kKvXTdxepFRDvRwyVLCWbnQCLcBGAs/s1600/JASHORE%2BUNIVERSITY%2BOF%2BSCIENCE%2B%2526%2BTECHNOLOGY%2B%2528JUST%2529%2B%2Bjust%2BNew%2B%2BLogo.png" alt="jessore university of science and technology" />
          <p className="mt-6 ">Department of Marketing</p>
          <span className="capitalize text-sm font-normal ">This website is for helping the students with their study by answering their questions.</span>
        </div>
        {/* header ends */}
        <ChatBody chat={chat} />
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}

export default App;

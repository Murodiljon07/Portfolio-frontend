import React from "react";

import bg from "@/assets/videoframe_2541.png";

function statusPage() {
  return (
    <div className="relative">
      <img
        src={bg.src}
        alt=""
        className="status-bg overflow-hidden bg-green-400 h-screen w-screen"
      />

      <span className="absolute top-1/4 right-1/4 text-5xl text-white font-bold text-center">
        <b className="text-red-600">404 !</b> <br />
        NOT FOUND
      </span>
    </div>
  );
}

export default statusPage;

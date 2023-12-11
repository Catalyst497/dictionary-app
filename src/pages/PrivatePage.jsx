import React from "react";
import { Link } from "react-router-dom";

function PrivatePage() {
  return (
    <>
      <div className="text-[2rem]">
        This page is private. You should not see it if you are not logged in.
      </div>
      <Link className="underline" to={"/"}>Return to Homepage</Link>
    </>
  );
}

export default PrivatePage;

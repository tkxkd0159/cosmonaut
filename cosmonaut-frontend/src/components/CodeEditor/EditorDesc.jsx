import React from "react";

function EditorDesc(props) {
  return (
    <>
      <div class="w-full h-[90vh] lg:w-2/5 md:mx-0">
        <div class="bg-indigo-900 rounded-2xl h-full overflow-y-auto px-6 md:p-10 py-6">
          {props.children}
        </div>
      </div>
    </>
  );
}

export default EditorDesc;

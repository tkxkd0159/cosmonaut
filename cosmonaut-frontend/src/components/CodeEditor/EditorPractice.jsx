import React from "react";
import Editor, { loader } from "@monaco-editor/react";
import { useFormat } from "../../core/api/postFmt";

loader.config({
  paths: {
    vs: "/monaco-editor/min/vs",
  },
});

export default function EditorPractice({
  path,
  defaultLanguage,
  files,
  onChange,
  onMount,
  exCode,
  readOnly,
}) {
  const tab = path.slice(0, -1);
  const formatFile = {
    [tab]: files[tab],
  };
  const [formatResponse, formatSuccess, postFormat] = useFormat(formatFile);
  const formatButton = async () => {
    await postFormat();
    if (formatSuccess) {
      sessionStorage.setItem(path, formatResponse[tab]);
    }
  };
  const userCode = () => {
    if (
      !sessionStorage[path] ||
      sessionStorage[path] === "undefined" ||
      sessionStorage[path] === ""
    ) {
      return exCode;
    } else {
      return sessionStorage[path];
    }
  };

  return (
    <>
      <Editor
        height="80vh"
        theme="vs-dark"
        path={path}
        onChange={onChange}
        onMount={onMount}
        defaultLanguage={defaultLanguage}
        value={userCode()}
        options={{ minimap: { enabled: false }, readOnly: readOnly }}
      />
      <div class="flex justify-end px-2 mt-1">
        <button
          onClick={formatButton}
          class="transform transition ease-in-out hover:scale-105 hover:text-yellow-500 font-heading text-orange-400 rounded-full py-1 text-sm text-center"
        >
          Click to Format
        </button>
      </div>
    </>
  );
}

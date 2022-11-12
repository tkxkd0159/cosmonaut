import React from "react";
import Editor, { loader } from "@monaco-editor/react";
import { useFormat } from "../../core/api/postFmt";

loader.config({
  paths: {
    vs: "/monaco-editor/min/vs",
  },
});

export default function EditorResult({
  read,
  defaultLanguage,
  difSuccess,
  exCode,
  path,
  index,
  onChange,
  onMount,
  files,
}) {
  const [formatResponse, formatSuccess, postFormat] = useFormat(files);
  const formatButton = async () => {
    await postFormat();
    if (formatSuccess) {
      sessionStorage.setItem(index, formatResponse[index]);
    }
  };

  const userCode = () => {
    if (
      !sessionStorage[index] ||
      sessionStorage[index] === "undefined" ||
      sessionStorage[index] === "" ||
      difSuccess
    ) {
      return exCode;
    } else {
      return sessionStorage[index];
    }
  };

  function handleEditorWillMount(monaco) {
    monaco.editor.getModels().forEach((model) => model.dispose());
  }

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
        beforeMount={handleEditorWillMount}
        options={{ minimap: { enabled: false }, readOnly: read }}
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

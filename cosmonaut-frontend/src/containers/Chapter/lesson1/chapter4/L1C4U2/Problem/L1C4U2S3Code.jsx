import React, { useEffect, useRef, useState } from "react";
import { AnsTabAble } from "../../../../../../components/CodeEditor/AnsTabAble";
import { AnsTabDis } from "../../../../../../components/CodeEditor/AnsTabDis";
import EditorCode from "../../../../../../components/CodeEditor/EditorCode";
import EditorCodeHeader from "../../../../../../components/CodeEditor/EditorCodeHeader";
import EditorDesc from "../../../../../../components/CodeEditor/EditorDesc";
import EditorResult from "../../../../../../components/CodeEditor/EditorResult";
import { MobileEnv } from "../../../../../../components/CodeEditor/MobileEnv";
import { ProblemTab } from "../../../../../../components/CodeEditor/ProblemTab";
import { Loading } from "../../../../../../components/Common/Loading";
import BasicP from "../../../../../../components/Contents/BasicP";
import CodeBlock from "../../../../../../components/Contents/CodeBlock";
import Hint from "../../../../../../components/Contents/Hint";
import HintButton from "../../../../../../components/Contents/HintButton";
import ListStyle from "../../../../../../components/Contents/ListStyle";
import Problem from "../../../../../../components/Contents/Problem";
import ProblemSection from "../../../../../../components/Contents/ProblemSection";

const L1C4U2S3Code = ({ ex, difRes, difLoading, difSuccess }) => {
  const [hide, setHide] = useState(true);
  const [tab, setTab] = useState("problem");
  const editorRef = useRef(null);

  const [code, setCode] = useState("");
  const [files, setFiles] = useState({});
  useEffect(() => {
    setFiles({ ...files, [tab]: btoa(code) });
  }, [code]);
  console.log(files);

  return (
    <>
      <EditorDesc>
        <ProblemSection>
          <Problem>Problem</Problem>
          <BasicP>
            Let's write the <CodeBlock>filter</CodeBlock> condition.
          </BasicP>
        </ProblemSection>

        <HintButton onClick={async () => setHide(!hide)}>
          <Hint hide={hide} />
          {hide ? null : (
            <>
              <ListStyle>
                <li>
                  If the <CodeBlock>include_expired</CodeBlock> is true, it must
                  include expired approvals. And if false, it must not.
                </li>
              </ListStyle>
            </>
          )}
        </HintButton>
      </EditorDesc>

      {/* Code Editor */}
      <div class="w-full lg:w-3/5 md:mx-0 ">
        <MobileEnv />
        <EditorCode>
          {difLoading ? (
            <Loading />
          ) : (
            <div class="mb-1 px-4">
              <EditorCodeHeader>
                {difSuccess ? (
                  <AnsTabAble
                    disabled={tab === "answer"}
                    onClick={async e => {
                      e.preventDefault();
                      setTab("answer");
                    }}
                  />
                ) : (
                  <ProblemTab
                    disabled={tab === "problem"}
                    onClick={async e => {
                      e.preventDefault();
                      setTab("problem");
                    }}
                  >
                    Problem
                  </ProblemTab>
                )}
              </EditorCodeHeader>
              <div class="mx-auto mb-1">
                {/* Mobile Version */}
                <div class="md:hidden block w-full bg-black py-4 px-5 h-quiz">
                  <h2 class="text-xl font-extrabold text-blue-500">
                    Mobile Environment not supported
                  </h2>
                </div>

                {/* Editor */}
                <EditorResult
                  defaultLanguage="rust"
                  defaultValue={ex}
                  answer={difRes}
                  path={tab}
                  onChange={async e => await setCode(e)}
                  onMount={editor => (editorRef.current = editor)}
                  files={files}
                  difSuccess={difSuccess}
                  // onBuild={onBuild}
                />
              </div>
            </div>
          )}
        </EditorCode>
      </div>
    </>
  );
};

export default L1C4U2S3Code;

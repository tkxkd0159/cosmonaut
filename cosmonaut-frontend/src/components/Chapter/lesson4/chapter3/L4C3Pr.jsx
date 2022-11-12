import React, { useEffect, useRef, useState } from "react";
import PracticePart from "../../../../components/CodeEditor/PracticePart";
import BgV4 from "../../../../assets/images/bg-v4.svg";
import EditorDesc from "../../../../components/CodeEditor/EditorDesc";
import ProblemSection from "../../../../components/Contents/ProblemSection";
import Problem from "../../../../components/Contents/Problem";
import ListStyle from "../../../../components/Contents/ListStyle";
import CodeBlock from "../../../../components/Contents/CodeBlock";
import BasicP from "../../../../components/Contents/BasicP";
import HintButton from "../../../../components/Contents/HintButton";
import Hint from "../../../../components/Contents/Hint";
import Markdown from "../../../../components/Contents/Markdown";
import { useNavigate, useParams } from "react-router-dom";
import PracticeCode from "../../../../components/CodeEditor/PracticeCode";
import { Loading } from "../../../../components/Common/Loading";
import EditorPr from "../../../../components/CodeEditor/EditorPr";
import ResultTab from "../../../../components/CodeEditor/ResultTab";
import TabHeader from "../../../../components/Practice/TabHeader";
import PracticeName from "../../../../components/Practice/PracticeName";
import CodeStart from "../../../../components/CodeEditor/CodeStart";
import { Base64 } from "js-base64";
import { useBuild } from "../../../../core/hook/useBuild";
import { useTargetCode } from "../../../../core/hook/useTartgetCode";
import { BuildButton, NextButton } from "../../../Common/buttons";

export const L4C3Pr = () => {
  const { lessonID, chID } = useParams();
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [tab, setTab] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [getTargetCode, example, exLoading] = useTargetCode();
  const key = tab + lessonID;
  let initCode = "";
  if (sessionStorage.getItem(key)) {
    initCode = sessionStorage.getItem(key);
  } else if (example) {
    initCode = example[tab];
  } else {
    initCode = "";
  }
  const [code, setCode] = useState(initCode);
  const [files, setFiles] = useState({});
  useEffect(() => {
    setFiles({ ...files, [tab]: Base64.encode(code) });
    sessionStorage.setItem(key, code);
  }, [code]);
  let executeCode = sessionStorage.getItem("execute.rs4");
  let file = {
    "execute.rs": Base64.encode(executeCode),
  };

  const { postBuild, runSuccess, runError, runLoading, executeRes, queryRes } =
    useBuild();

  const handleNextLesson = () => {
    navigate(`/lesson/4/chapter/3/unit/2`);
  };
  const handleBuildButton = async () => {
    await postBuild(lessonID, chID, file);
  };
  const handleTargetCode = async () => {
    setTab("execute.rs");
    await getTargetCode(lessonID, chID);
  };

  let Button;
  if (executeRes.result === "success" && queryRes.result === "success") {
    Button = (
      <NextButton onClick={handleNextLesson} content={"Jump to Next Lesson"} />
    );
  } else {
    Button = (
      <BuildButton onClick={handleBuildButton} content={"Deploy the code"} />
    );
  }
  return (
    <>
      <PracticeName color={"rgba(86, 84, 141, 1)"} />
      <div
        style={{ backgroundImage: `url(${BgV4})` }}
        class="pt-8 pb-20 md:px-6 px-4 lg:px-10 bg-black bg-cover bg-center md:pt-8"
      >
        <PracticePart lesson={lessonID} />
        {runError && !runSuccess ? (
          <ResultTab executeState={"error"} executeError={executeRes} />
        ) : null}
        {runSuccess && (
          <ResultTab
            executeState={executeRes?.result}
            queryState={queryRes?.result}
            executeIncorrect={executeRes?.differences}
            queryIncorrect={queryRes?.differences}
            executeError={executeRes?.errors}
            queryError={queryRes?.errors}
          />
        )}
        <div class="flex container w-full mx-auto">
          {/* Problem Part */}
          <div class="flex flex-wrap h-auto bg-indigo-900 rounded-2xl">
            <EditorDesc>
              <ProblemSection>
                <Problem>Question 1.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Query <CodeBlock>NftInfo</CodeBlock> from{" "}
                  <CodeBlock>config.spaceship_cw721_contract</CodeBlock>.
                </BasicP>
                <BasicP>
                  Save the response to <CodeBlock>nft_info</CodeBlock>:{" "}
                  <CodeBlock>{nftmeta}</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use{" "}
                          <CodeBlock>deps.querier.query_wasm_smart</CodeBlock>{" "}
                          to make the query.{" "}
                        </li>
                        <Markdown code={code1} />
                        <li>
                          Use <CodeBlock>{nftinfo}</CodeBlock> to query
                          information of <CodeBlock>token_id</CodeBlock> NFT.
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Question 2.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Sum up every freight’s <CodeBlock>amount</CodeBlock> in{" "}
                  <CodeBlock>nft_info</CodeBlock>, weighted by
                  <CodeBlock>unit_weight</CodeBlock>.
                </BasicP>
                <BasicP>
                  Save the result to variable named{" "}
                  <CodeBlock>total_freight_weight</CodeBlock>.
                </BasicP>
              </ProblemSection>
              <ProblemSection>
                <Problem>Question 3.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>msg.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Return the simple random number calculated by{" "}
                  <CodeBlock>timestamp_int_nanos% MAX_FREIGHT_WEIGHT</CodeBlock>
                  .
                </BasicP>
              </ProblemSection>
              <ProblemSection>
                <Problem>Question 4.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Fill in the blank in <CodeBlock>for</CodeBlock> loop.
                </BasicP>
                <BasicP>
                  Do loop from zero to <CodeBlock>epoch</CodeBlock>.
                </BasicP>
              </ProblemSection>
              <ProblemSection>
                <Problem>Question 5.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Create the message to burn fuel as much as{" "}
                  <CodeBlock>FUEL_PER_GAME * epoch</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use <CodeBlock>Cw721ExecuteMsg::BurnFuel</CodeBlock>{" "}
                          as follow:
                        </li>
                        <Markdown code={code2} />
                        <li>Check overflow.</li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
            </EditorDesc>
            {/* Code Editor Part */}
            <PracticeCode>
              <div class="mb-1 px-4">
                <TabHeader>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-purple-500 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("execute.rs");
                      setReadOnly(false);
                    }}
                  >
                    execute.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("contract.rs");
                      setReadOnly(true);
                    }}
                  >
                    contract.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("error.rs");
                      setReadOnly(true);
                    }}
                  >
                    error.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("lib.rs");
                      setReadOnly(true);
                    }}
                  >
                    lib.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("msg.rs");
                      setReadOnly(true);
                    }}
                  >
                    msg.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("query.rs");
                      setReadOnly(true);
                    }}
                  >
                    query.rs
                  </button>
                  <button
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1 bg-orange-400 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("state.rs");
                      setReadOnly(true);
                    }}
                  >
                    state.rs
                  </button>
                </TabHeader>
                <div class="mx-auto mb-1">
                  {exLoading && <CodeStart onClick={handleTargetCode} />}
                  {runLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <EditorPr
                        defaultLanguage="rust"
                        exCode={example[tab]}
                        path={key}
                        onChange={(e) => setCode(e)}
                        onMount={(editor) => (editorRef.current = editor)}
                        files={file}
                        readOnly={readOnly}
                      />
                    </>
                  )}
                </div>
              </div>
            </PracticeCode>
          </div>
        </div>
        {Button}
      </div>
    </>
  );
};

const nftmeta = "NftInfoResponse<Metadata>";
const nftinfo = "Cw721QueryMsg::NftInfo {token_id}";
const code1 = `
\`\`\`rust
DecreaseHealth {
    token_id: String,
    value: u128,
},
\`\`\``;
const code2 = `
\`\`\`rust
BurnFuel {
    token_id: String,
    amount: Uint128,
},
\`\`\``;

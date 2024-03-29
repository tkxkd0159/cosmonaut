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
import EditorPractice from "../../../../components/CodeEditor/EditorPractice";
import ResultTab from "../../../../components/CodeEditor/ResultTab";
import TabHeader from "../../../../components/Practice/TabHeader";
import PracticeName from "../../../../components/Practice/PracticeName";
import CodeStart from "../../../../components/CodeEditor/CodeStart";
import { Base64 } from "js-base64";
import { useBuild } from "../../../../core/hook/useBuild";
import { useTargetCode } from "../../../../core/hook/useTartgetCode";
import { BuildButton, NextButton } from "../../../Common/buttons";

export const L3C3Pr = () => {
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
  let contractCode = sessionStorage.getItem("contract.rs3");
  let executeCode = sessionStorage.getItem("execute.rs3");
  let queryCode = sessionStorage.getItem("query.rs3");
  let file = {
    "contract.rs": Base64.encode(contractCode),
    "execute.rs": Base64.encode(executeCode),
    "query.rs": Base64.encode(queryCode),
  };

  const [postBuild, runSuccess, runError, runLoading, executeRes, queryRes] =
    useBuild();

  const handleNextLesson = () => {
    navigate(`/lesson/3/chapter/3/unit/2`);
  };
  const handleBuildButton = async () => {
    await postBuild(lessonID, chID, file);
  };
  const handleTargetCode = async () => {
    setTab("contract.rs");
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
                <Problem>Practice 1.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>contract.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Add submessages created above through{" "}
                  <CodeBlock>add_submessages</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Here are three submessages;
                          <CodeBlock>instantiate_cw20_money_contract</CodeBlock>
                          ,<CodeBlock>instantiate_cw20_fuel_contract</CodeBlock>
                          , and
                          <CodeBlock>
                            instantiate_cw721_spaceship_contract
                          </CodeBlock>
                          .
                        </li>
                        <li>
                          <CodeBlock>Struct CosmWasm_std::Response</CodeBlock>{" "}
                          has a method
                          <CodeBlock>add_submessages</CodeBlock> as follow:
                        </li>
                        <Markdown code={code1} />
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 2.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>contract.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Update the address of{" "}
                  <CodeBlock>spaceship_cw721_contract</CodeBlock> in{" "}
                  <CodeBlock>CONFIG</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Refer to the{" "}
                          <CodeBlock>
                            handle_cw20_money_instantiate_reply
                          </CodeBlock>{" "}
                          and
                          <CodeBlock>
                            handle_cw20_fuel_instantiate_reply
                          </CodeBlock>{" "}
                          functions.
                        </li>
                        <li>
                          Use{" "}
                          <CodeBlock>parse_reply_instantiate_data</CodeBlock>{" "}
                          first, then update.
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 3.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Query balance of <CodeBlock>info.sender</CodeBlock> from{" "}
                  <CodeBlock>config.money_cw20_contract</CodeBlock>.
                </BasicP>
                <BasicP>
                  Save the response to variable named{" "}
                  <CodeBlock>token_balance</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use{" "}
                          <CodeBlock>deps.querier.query_wasm_smart</CodeBlock>
                          to make the query.
                        </li>
                        <Markdown code={code2} />
                        <li>
                          Use <CodeBlock>QueryMsg::Balance {address}</CodeBlock>{" "}
                          to query balance of
                          <CodeBlock>address</CodeBlock>.
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 4.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Check whether <CodeBlock>amount</CodeBlock> multiplied by{" "}
                  <CodeBlock>unit_weight</CodeBlock> is bigger than
                  <CodeBlock>MAX_FREIGHT_WEIGHT</CodeBlock>.
                </BasicP>
                <BasicP>
                  If it's true, return{" "}
                  <CodeBlock>ContractError::FrightOverloaded</CodeBlock>
                  error.
                </BasicP>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 5.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  From <CodeBlock>config</CodeBlock>, find an address of{" "}
                  <CodeBlock>freight_contract</CodeBlock> whose denom is same as
                  this function’s parameter one.
                </BasicP>
                <BasicP>
                  There are many addresses in{" "}
                  <CodeBlock>freight_contracts</CodeBlock> in{" "}
                  <CodeBlock>config</CodeBlock>, so you need to find it among
                  them.
                </BasicP>
                <BasicP>
                  If there is no <CodeBlock>target_contract_addr</CodeBlock>,
                  return
                  <CodeBlock>ContractError::TokenNotFound error</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use the one of <CodeBlock>iter-series</CodeBlock> to
                          iterate.
                        </li>
                        <li>
                          Use <CodeBlock>find</CodeBlock> to get an element that
                          satisfy the condition.
                        </li>
                        <li>
                          Check <CodeBlock>target_contract_addr</CodeBlock> is
                          none.
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 6.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Add messages created above through{" "}
                  <CodeBlock>add_messages</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Here are two messages;{" "}
                          <CodeBlock>burn_cw20_token_msg_wrap</CodeBlock>, and
                          <CodeBlock>load_freight_msg_wrap</CodeBlock>.
                        </li>
                        <li>
                          Struct cosmwasm_std::Response has a method
                          add_messages as follow:
                          <Markdown code={code3} />
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 7.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Create the message to mint freight tokens to{" "}
                  <CodeBlock>info.sender</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Wrap{" "}
                          <CodeBlock>
                            cw20_base::msg::ExecuteMsg::Mint
                          </CodeBlock>
                          into
                          <CodeBlock>WasmMsg::Execute</CodeBlock>.
                        </li>
                        <li>
                          <CodeBlock>WasmMsg</CodeBlock>'s{" "}
                          <CodeBlock>Execute</CodeBlock> dispatches a call to
                          another contract.
                          <Markdown code={code4} />
                        </li>
                        <li>
                          <CodeBlock>ExecuteMsg::Mint</CodeBlock> has two
                          fields; <CodeBlock>recipient</CodeBlock> and{" "}
                          <CodeBlock>amount</CodeBlock>.
                          <Markdown code={code5} />
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 8.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>execute.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Find Atom, whose denom is <CodeBlock>uatom</CodeBlock>, from{" "}
                  <CodeBlock>info.funds</CodeBlock>.
                </BasicP>
                <BasicP>
                  Then save it to variable named{" "}
                  <CodeBlock>atom_income</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use <CodeBlock>income_asset</CodeBlock> instead of{" "}
                          <CodeBlock>info.funds</CodeBlock>.
                        </li>
                        <li>
                          Use the one of <CodeBlock>iter-series</CodeBlock> to
                          iterate.
                        </li>
                        <li>
                          Use <CodeBlock>find</CodeBlock> to get an element that
                          satisfy the condition.
                        </li>
                        <li>
                          If there is no uatom given to the message, set
                          <CodeBlock>atom_income</CodeBlock> to zero.
                        </li>
                      </ListStyle>
                    </>
                  )}
                </HintButton>
              </ProblemSection>
              <ProblemSection>
                <Problem>Practice 9.</Problem>
                <ListStyle>
                  <li>
                    <b>
                      Where to Implement: <CodeBlock>query.rs</CodeBlock>
                    </b>
                  </li>
                </ListStyle>
                <BasicP>
                  Return <CodeBlock>FreightTokenBalanceResponse</CodeBlock> with
                  symbol and zero balance, if balance of{" "}
                  <CodeBlock>target_contract_addr</CodeBlock> is{" "}
                  <CodeBlock>None</CodeBlock>.
                </BasicP>
                <HintButton onClick={() => setHide(!hide)}>
                  <Hint hide={hide} />
                  {hide ? null : (
                    <>
                      <ListStyle>
                        <li>
                          Use <CodeBlock>FreightTokenBalanceResponse</CodeBlock>{" "}
                          as follow:
                        </li>
                        <Markdown code={code6} />
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
                      setTab("contract.rs");
                      setReadOnly(false);
                    }}
                  >
                    contract.rs
                  </button>
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
                    class="block mr-[1px] py-3 px-2 md:px-4 md:mb-0 mb-1  bg-purple-500 font-bold text-xs rounded-t-md transform transition ease-in-out focus:scale-105 focus:text-gray-900 hover:scale-110"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("query.rs");
                      setReadOnly(false);
                    }}
                  >
                    query.rs
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
                      <EditorPractice
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
        <div class="flex items-center justify-center md:mt-8 mt-3 ">
          {Button}
        </div>
      </div>
    </>
  );
};

const code1 = `
  \`\`\`rust
  pub fn add_submessages(self, msgs: impl IntoIterator<Item = SubMsg<T>>) -> Self
  \`\`\``;
const code2 = `
  \`\`\`rust
  pub fn query_wasm_smart<T: DeserializeOwned, U: Serialize, V: Into<String>>(
    &self,
    contract_addr: V,
    msg: &U
) -> StdResult<T>
  \`\`\``;
const code3 = `
  \`\`\`rust
  pub fn add_messages<M: Into<CosmosMsg<T>>>(
    self,
    msgs: impl IntoIterator<Item = M>
) -> Self
  \`\`\``;
const code4 = `
  \`\`\`rust
  Execute {
    contract_addr: String,
    msg: Binary,
    funds: Vec<Coin>,
},
  \`\`\``;
const code5 = `
  \`\`\`rust
  ExecuteMsg::Mint { recipient, amount }
  \`\`\``;
const code6 = `
  \`\`\`rust
  #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct FreightTokenBalanceResponse {
    pub symbol: String,
    pub balance: Uint128,
}
  \`\`\``;
const address = "{address}";

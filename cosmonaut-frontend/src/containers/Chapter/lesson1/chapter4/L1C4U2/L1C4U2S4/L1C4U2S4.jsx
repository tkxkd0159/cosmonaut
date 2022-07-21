import React from "react";
import tw from "tailwind-styled-components";
import CodeEditor from "../../../../../../components/CodeEditor/CodeEditor";
import BasicP from "../../../../../../components/Contents/BasicP";
import CodeBlock from "../../../../../../components/Contents/CodeBlock";
import ContentsBox from "../../../../../../components/Contents/ContentsBox";
import GreenID from "../../../../../../components/Contents/GreenID";
import Header from "../../../../../../components/Contents/Header";
import Markdown from "../../../../../../components/Contents/Markdown";
import L1C4U2S4Code from "./L1C4U2S4Code";

const Contents = tw.section`bg-black`;
const ContentTitle = tw.div`mb-4 lg:mb-8`;
const ContentDesc = tw.div`mb-3`;

const code1 = `
\`\`\`rust
QueryMsg::AllOperators {
  owner,
  include_expired,
  start_after,
  limit,
} => to_binary(&self.operators(
  deps,
  env,
  owner,
  include_expired.unwrap_or(false),
  start_after,
  limit,
)?),
\`\`\``;

function L1C4U2S4() {
  return (
    <>
      {/* Contents Part */}
      <Contents>
        <ContentsBox>
          <GreenID>4</GreenID>
          <div class="lg:w-1/2 w-full md:w-2/3">
            <ContentTitle>
              <div class="flex sm:flex-nowrap">
                <div class="w-full lg:w-auto lg:pt-3 pt-2 pb-2 lg:pb-0">
                  <Header>AllOperators</Header>
                </div>
              </div>
            </ContentTitle>
            <ContentDesc>
              <Markdown code={code1} />
              <BasicP>
                Returns all <CodeBlock>operators</CodeBlock> approved by the
                owner.
              </BasicP>
            </ContentDesc>
          </div>
        </ContentsBox>
      </Contents>

      {/* Editor Part */}
      <CodeEditor>
        <L1C4U2S4Code />
      </CodeEditor>
    </>
  );
}

export default L1C4U2S4;
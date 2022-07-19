import React from "react";
import tw from "tailwind-styled-components";
import CodeEditor from "../../../../../../components/CodeEditor/CodeEditor";
import BasicP from "../../../../../../components/Contents/BasicP";
import BlueID from "../../../../../../components/Contents/BlueID";
import CodeBlock from "../../../../../../components/Contents/CodeBlock";
import ContentsBox from "../../../../../../components/Contents/ContentsBox";
import Header from "../../../../../../components/Contents/Header";
import Markdown from "../../../../../../components/Contents/Markdown";
import { L2C6U3S1Code } from "./L2C6U3S1Code";

const Contents = tw.section`bg-black`;
const ContentTitle = tw.div`mb-4 lg:mb-8`;
const ContentDesc = tw.div`mb-3`;

const code1 = `
\`\`\`rust
QueryMsg::Balance { address } => to_binary(&query_balance(deps, address)?),
\`\`\``;

function L2C6U3S1() {
  return (
    <>
      {/* Contents Part */}
      <Contents>
        <ContentsBox>
          <BlueID>1</BlueID>
          <div class="lg:w-1/2 w-full md:w-2/3">
            <ContentTitle>
              <div class="flex sm:flex-nowrap">
                <div class="w-full lg:w-auto lg:pt-3 pt-2 pb-2 lg:pb-0">
                  <Header>Balance</Header>
                </div>
              </div>
            </ContentTitle>
            <ContentDesc>
              <Markdown code={code1} />
              <BasicP>
                Returns balance information for the requested address.
              </BasicP>
              <BasicP>
                The balance information is in <CodeBlock>BALANCE</CodeBlock>, so
                you can get the value using the address as the key.
              </BasicP>
            </ContentDesc>
          </div>
        </ContentsBox>
      </Contents>

      {/* Editor Part */}
      <CodeEditor>
        <L2C6U3S1Code />
      </CodeEditor>
    </>
  );
}

export default L2C6U3S1;

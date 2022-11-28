import React from "react";
import Markdown from "../../../Contents/Markdown";
import BasicP from "../../../Contents/BasicP";
import CodeBlock from "../../../Contents/CodeBlock";

const L0C3U3 = () => {
  const code1 = `
\`\`\`javascript
// Create or load account
const mnemonic = loadOrCreateMnemonic('fred.key')
mnemonicToAddress(mnemonic)

const {address, client} = await connect(mnemonic, {})
address

client.getAccount()
// if empty - this only works with CosmWasm
hitFaucet(defaultFaucetUrl, address, 'PEBBLE')
client.getAccount()
\`\`\``;

  return (
    <>
      <BasicP>
        <CodeBlock>CosmJS</CodeBlock>, a type script library, allows you to
        process queries and transaction registrations. There is also{" "}
        <CodeBlock>@cosmjs/cli</CodeBlock> which is similar to a Node console.
      </BasicP>
      <BasicP>
        Let's use the <CodeBlock>REPL</CodeBlock> environment to do the same
        thing as the <CodeBlock>Go CLI</CodeBlock> above.
      </BasicP>
      <Markdown code={code1} />
    </>
  );
};

export default L0C3U3;

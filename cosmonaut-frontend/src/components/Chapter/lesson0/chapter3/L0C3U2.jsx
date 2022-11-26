import React from "react";
import Markdown from "../../../Contents/Markdown";
import BasicP from "../../../Contents/BasicP";
import ListStyle from "../../../Contents/ListStyle";
import CodeBlock from "../../../Contents/CodeBlock";

const L0C3U2 = () => {
  const code1 = `
\`\`\`bash
$ source <(curl -sSL https://raw.githubusercontent.com/CosmWasm/testnets/master/malaga-420/defaults.env)

# add wallets for testing
$ wasmd keys add wallet
$ wasmd keys add wallet2
\`\`\``;
  const code2 = `
\`\`\`bash
⛔️ If you are using Fish shell, use source (curl -sSL https://raw.githubusercontent.com/CosmWasm/testnets/master/malaga-420/defaults.env | psub) instead of the command above.
\`\`\``;
  const code3 = `
\`\`\`bash
# add wallets for testing
$ wasmd keys add wallet
$ wasmd keys add wallet2
\`\`\``;
  const code4 = `
\`\`\`bash
$ JSON=$(jq -n --arg addr $(wasmd keys show -a wallet) '{"denom":"umlg","address":$addr}')
$ curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.malaga-420.cosmwasm.com/credit

$ JSON=$(jq -n --arg addr $(wasmd keys show -a wallet2) '{"denom":"umlg","address":$addr}')
$ curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.malaga-420.cosmwasm.com/credit
$ JSON=$(jq -n --arg addr $(wasmd keys show -a wallet) '{"denom":"umlg","address":$addr}')
$ curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.malaga-420.cosmwasm.com/credit

$ JSON=$(jq -n --arg addr $(wasmd keys show -a wallet2) '{"denom":"umlg","address":$addr}')
$ curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.malaga-420.cosmwasm.com/credit
\`\`\``;
  const code5 = `
\`\`\`bash
⛔️ If you are using Fish shell, use set JSON $(jq -n --arg addr $(wasmd keys show -a wallet) '{"denom":"umlg","address":$addr}') instead of the command JSON=$(jq -n --arg addr $(wasmd keys show -a wallet).
   Similarly, use set JSON $(jq -n --arg addr $(wasmd keys show -a wallet2) '{"denom":"umlg","address":$addr}') instead of the command JSON=$(jq -n --arg addr $(wasmd keys show -a wallet2). 
\`\`\``;
  const code6 = `
\`\`\`bash
⛔️ If jq: command not found occurs, try installing jq via apt install jq. If you are a Mac user, try using brew install jq instead (Homebrew required).
\`\`\``;

  return (
    <>
      <BasicP>
        If the wallet registration for the test was successfully done, wasmd
        would print out the information. Although it is a testnet, keep the
        mnemonic separately in a safe place in case of losing a password.
      </BasicP>
      <BasicP>
        As you know, all activities on the blockchain cost a fee. So you will
        need some tokens for interaction.
      </BasicP>
      <BasicP>There are two native tokens here.</BasicP>
      <BasicP>
        <ListStyle>
          <li>ROCK (urock): Used to be a validator.</li>
          <li>PEBBLE (upebble): Used to pay fees.</li>
        </ListStyle>
      </BasicP>
      <Markdown code={code1} />
      <Markdown code={code2} />
      <Markdown code={code3} />
      <BasicP>
        We want a fee to publish transaction, so we need to ask for an upebble.
      </BasicP>
      <BasicP>
        The following command requests some tokens from the faucet. Note that
        <CodeBlock>denom</CodeBlock> is upebble.
        <ListStyle>
          <li>
            Set the environment variable named <CodeBlock>JSON</CodeBlock>.
          </li>
          <li>
            Use <CodeBlock>JSON</CodeBlock> as <CodeBlock>data</CodeBlock> when
            calling
            <CodeBlock>
              https://faucet.malaga-420.cosmwasm.com/credit
            </CodeBlock>{" "}
            via <CodeBlock>curl</CodeBlock>.
          </li>
        </ListStyle>
      </BasicP>
      <Markdown code={code4} />
      <Markdown code={code5} />
      <Markdown code={code6} />
    </>
  );
};

export default L0C3U2;

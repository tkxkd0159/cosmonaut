import React from "react";
import BasicA from "../../../Contents/BasicA";
import BasicP from "../../../Contents/BasicP";
import CodeBlock from "../../../Contents/CodeBlock";

const L0C3U1 = () => {
  return (
    <>
      <BasicP>
        It would help if you also had an environment where the contract runs.
        You can build a local network to deploy and test the contracts you have
        created, but you can also use a network that already exists publically.
      </BasicP>
      <BasicP>
        Currently, The Malaga testnet is running actively. You can find out
        whether it is working well or not from the following URL.
      </BasicP>
      <BasicA>
        <a
          target="_blank"
          href="https://rpc.malaga-420.cosmwasm.com/status"
          rel="noreferrer"
        >
          rpc.malaga-420.cosmwasm.com
        </a>
      </BasicA>
      <BasicA>
        <a
          target="_blank"
          href="https://faucet.malaga-420.cosmwasm.com/status"
          rel="noreferrer"
        >
          faucet.malaga-420.cosmwasm.com
        </a>
      </BasicA>
      <BasicP>Also, you can check the details through Block Explorer:</BasicP>
      <BasicA>
        <a
          target="_blank"
          href="https://block-explorer.malaga-420.cosmwasm.com"
          rel="noreferrer"
        >
          block-explorer.malaga-420.cosmwasm
        </a>
      </BasicA>
      <BasicP>
        You can use <CodeBlock>wasmd</CodeBlock> or{" "}
        <CodeBlock>Node REPL</CodeBlock> to communicate with this network.
      </BasicP>
    </>
  );
};

export default L0C3U1;

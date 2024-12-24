import test from "node:test";
import assert from "node:assert";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { Client } from "@ghasemkiani/web3";

test("web3 field member should be created", async (t) => {
  let client = new Client();
  let { web3 } = client;
  assert.ok(web3);
});

test("toGetChainId$", async (t) => {
  let client = new Client();
  let id$ = await client.toGetChainId$();
  assert.ok(id$);
});

test("toGetChainId", async (t) => {
  let client = new Client();
  let id = await client.toGetChainId();
  assert.ok(id);
});

test("toGetGasPrice$", async (t) => {
  let client = new Client();
  let gasPrice$ = await client.toGetGasPrice$();
  assert.ok(gasPrice$);
});

test("toGetGasPrice", async (t) => {
  let client = new Client();
  let gasPrice = await client.toGetGasPrice();
  assert.ok(gasPrice);
});

test("toGetGasLimit$", async (t) => {
  let client = new Client();
  let gasLimit$ = await client.toGetGasLimit$();
  assert.ok(gasLimit$);
});

test("toGetGasLimit", async (t) => {
  let client = new Client();
  let gasLimit = await client.toGetGasLimit();
  assert.ok(gasLimit);
});

test("toGetBlockNumber$", async (t) => {
  let client = new Client();
  let blockNumber$ = await client.toGetBlockNumber$();
  assert.ok(blockNumber$);
});

test("toGetBlockNumber", async (t) => {
  let client = new Client();
  let blockNumber = await client.toGetBlockNumber();
  assert.ok(blockNumber);
});

test("toGetBlock - empty arg", async (t) => {
  let client = new Client();
  let block = await client.toGetBlock();
  assert.ok(block);
});

test("toGetBlock - latest", async (t) => {
  let client = new Client();
  let block = await client.toGetBlock("latest");
  assert.ok(block);
});

test("toGetBlock - 0", async (t) => {
  let client = new Client();
  let block = await client.toGetBlock(0);
  assert.ok(block);
});

test("toEstimateGas$", async (t) => {
  let client = new Client();
  let tx = {
    // from: "0x009a711364f8127ef4c20a7aa81323b78e976b46",
    from: null,
    to: "0x9ae928c5500ee2645c54a98288986d7b14bec037",
    value: 1e22,
  };
  let gas$ = await client.toEstimateGas$(tx);
  assert.ok(gas$);
});

test("toEstimateGas", async (t) => {
  let client = new Client();
  let tx = {
    // from: "0x009a711364f8127ef4c20a7aa81323b78e976b46",
    from: null,
    to: "0x9ae928c5500ee2645c54a98288986d7b14bec037",
    value: 1e22,
  };
  let gas = await client.toEstimateGas(tx);
  assert.ok(gas);
});


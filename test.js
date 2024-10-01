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

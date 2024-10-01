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

test("toGetChainId", async (t) => {
  let client = new Client();
  let id$ = await client.toGetChainId$();
  assert.ok(id$);
});

test("toGetGasPrice", async (t) => {
  let client = new Client();
  let gasPrice$ = await client.toGetGasPrice$();
  assert.ok(gasPrice$);
});


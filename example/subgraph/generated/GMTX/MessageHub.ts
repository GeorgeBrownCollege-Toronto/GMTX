// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class GMTXReceived extends EthereumEvent {
  get params(): GMTXReceived__Params {
    return new GMTXReceived__Params(this);
  }
}

export class GMTXReceived__Params {
  _event: GMTXReceived;

  constructor(event: GMTXReceived) {
    this._event = event;
  }

  get hash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class NewMessage extends EthereumEvent {
  get params(): NewMessage__Params {
    return new NewMessage__Params(this);
  }
}

export class NewMessage__Params {
  _event: NewMessage;

  constructor(event: NewMessage) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get message(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class MessageHub__domainResultValue0Struct extends EthereumTuple {
  get name(): string {
    return this[0].toString();
  }

  get version(): string {
    return this[1].toString();
  }

  get chainId(): BigInt {
    return this[2].toBigInt();
  }

  get verifyingContract(): Address {
    return this[3].toAddress();
  }
}

export class MessageHub extends SmartContract {
  static bind(address: Address): MessageHub {
    return new MessageHub("MessageHub", address);
  }

  EIP712DOMAIN_TYPEHASH(): Bytes {
    let result = super.call("EIP712DOMAIN_TYPEHASH", []);

    return result[0].toBytes();
  }

  try_EIP712DOMAIN_TYPEHASH(): CallResult<Bytes> {
    let result = super.tryCall("EIP712DOMAIN_TYPEHASH", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  GMTX_TYPEHASH(): Bytes {
    let result = super.call("GMTX_TYPEHASH", []);

    return result[0].toBytes();
  }

  try_GMTX_TYPEHASH(): CallResult<Bytes> {
    let result = super.tryCall("GMTX_TYPEHASH", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  chainID(): BigInt {
    let result = super.call("chainID", []);

    return result[0].toBigInt();
  }

  try_chainID(): CallResult<BigInt> {
    let result = super.tryCall("chainID", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  domain(): MessageHub__domainResultValue0Struct {
    let result = super.call("domain", []);

    return result[0].toTuple() as MessageHub__domainResultValue0Struct;
  }

  try_domain(): CallResult<MessageHub__domainResultValue0Struct> {
    let result = super.tryCall("domain", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      value[0].toTuple() as MessageHub__domainResultValue0Struct
    );
  }

  gmtx_mirror(): Address {
    let result = super.call("gmtx_mirror", []);

    return result[0].toAddress();
  }

  try_gmtx_mirror(): CallResult<Address> {
    let result = super.tryCall("gmtx_mirror", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  gmtx_nonce(param0: Address): BigInt {
    let result = super.call("gmtx_nonce", [EthereumValue.fromAddress(param0)]);

    return result[0].toBigInt();
  }

  try_gmtx_nonce(param0: Address): CallResult<BigInt> {
    let result = super.tryCall("gmtx_nonce", [
      EthereumValue.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  gmtx_replay(param0: Bytes): boolean {
    let result = super.call("gmtx_replay", [
      EthereumValue.fromFixedBytes(param0)
    ]);

    return result[0].toBoolean();
  }

  try_gmtx_replay(param0: Bytes): CallResult<boolean> {
    let result = super.tryCall("gmtx_replay", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", []);

    return result[0].toString();
  }

  try_name(): CallResult<string> {
    let result = super.tryCall("name", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toString());
  }

  version(): string {
    let result = super.call("version", []);

    return result[0].toString();
  }

  try_version(): CallResult<string> {
    let result = super.tryCall("version", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ReceiveMetaTxCall extends EthereumCall {
  get inputs(): ReceiveMetaTxCall__Inputs {
    return new ReceiveMetaTxCall__Inputs(this);
  }

  get outputs(): ReceiveMetaTxCall__Outputs {
    return new ReceiveMetaTxCall__Outputs(this);
  }
}

export class ReceiveMetaTxCall__Inputs {
  _call: ReceiveMetaTxCall;

  constructor(call: ReceiveMetaTxCall) {
    this._call = call;
  }

  get _metatx(): ReceiveMetaTxCall_metatxStruct {
    return this._call.inputValues[0].value.toTuple() as ReceiveMetaTxCall_metatxStruct;
  }

  get _signature(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ReceiveMetaTxCall__Outputs {
  _call: ReceiveMetaTxCall;

  constructor(call: ReceiveMetaTxCall) {
    this._call = call;
  }
}

export class ReceiveMetaTxCall_metatxStruct extends EthereumTuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get data(): Bytes {
    return this[1].toBytes();
  }

  get value(): BigInt {
    return this[2].toBigInt();
  }

  get nonce(): BigInt {
    return this[3].toBigInt();
  }

  get expiry(): BigInt {
    return this[4].toBigInt();
  }

  get salt(): Bytes {
    return this[5].toBytes();
  }
}

export class PublishCall extends EthereumCall {
  get inputs(): PublishCall__Inputs {
    return new PublishCall__Inputs(this);
  }

  get outputs(): PublishCall__Outputs {
    return new PublishCall__Outputs(this);
  }
}

export class PublishCall__Inputs {
  _call: PublishCall;

  constructor(call: PublishCall) {
    this._call = call;
  }

  get message(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class PublishCall__Outputs {
  _call: PublishCall;

  constructor(call: PublishCall) {
    this._call = call;
  }
}
var Testing = artifacts.require('Testing');

// const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { TypedDataUtils } = require('eth-sig-util')
const tools              = require('../utils/tools');
const wallets            = require('../utils/wallets');

Object.extract = (obj, keys) => keys.map(key => obj[key]);

function extractEvents(txMined, address, name)
{
	return txMined.logs.filter((ev) => { return ev.address == address && ev.event == name });
}

contract('Main', async (accounts) => {

	/***************************************************************************
	 *                        Environment configuration                        *
	 ***************************************************************************/
	before('configure', async () => {
		console.log('# web3 version:', web3.version);

		/**
		 * Retreive deployed contracts
		 */
		TestingInstance = await Testing.deployed();
	});

	describe('pre flight check', async () => {
		it('domain', async () => {
			domain = await TestingInstance.domain();
			assert.equal(domain.name,              'GeneralizedMetaTX'    );
			assert.equal(domain.version,           '0.0.1-beta.1'         );
			assert.equal(domain.chainId,           '1'                    ); // TODO: wait for ganache fix
			assert.equal(domain.verifyingContract, TestingInstance.address);
		});

		it('typehash', async () => {
			assert.equal(await TestingInstance.EIP712DOMAIN_TYPEHASH(), web3.utils.keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'));
			assert.equal(await TestingInstance.GMTX_TYPEHASH(),         web3.utils.keccak256('GMTX(address sender,bytes data,uint256 value,uint256 nonce,uint256 expiry,bytes32 salt)'));
			assert.equal(await TestingInstance.EIP712DOMAIN_TYPEHASH(), '0x'+TypedDataUtils.hashType('EIP712Domain', tools.TYPES).toString('hex'));
			assert.equal(await TestingInstance.GMTX_TYPEHASH(),         '0x'+TypedDataUtils.hashType('GMTX',         tools.TYPES).toString('hex'));
		});
	});

	describe('testing', async () => {
		describe('direct call', async () => {
			it('tx', async () => {
				txMined = await TestingInstance.publish('direct-call-test', { from: accounts[0] });

				events = extractEvents(txMined, TestingInstance.address, 'NewMessage');
				assert.equal(events.length,          1);
				assert.equal(events[0].args.sender,  accounts[0]);
				assert.equal(events[0].args.message, 'direct-call-test');
			});
		});

		describe('relayed call', async () => {
			it('prepare gmtx', async () => {
				gmtx = {
					sender: accounts[1],
					data:   TestingInstance.contract.methods.publish('relayed-call-test').encodeABI(),
					value:  0,
					nonce:  0,
					expiry: 0,
					salt:   web3.utils.randomHex(32),
				};
				sign = await tools.sign(gmtx, TestingInstance, wallets.privateKeys[accounts[1].toLowerCase()]);

				// Only for testing purposes
				_digest = '0x'+TypedDataUtils.sign({
					domain:      domain,
					types:       tools.TYPES,
					primaryType: 'GMTX',
					message:     gmtx,
				}).toString('hex');
			});

			it('before', async () => {
				assert.equal(await TestingInstance.gmtx_nonce(accounts[1]), 0);
				assert.equal(await TestingInstance.gmtx_replay(_digest), false);
			});

			it('tx', async () => {
				txMined = await TestingInstance.receiveMetaTx(gmtx, sign, { from: accounts[0] });

				events = extractEvents(txMined, TestingInstance.address, 'NewMessage');
				assert.equal(events.length,          1);
				assert.equal(events[0].args.sender,  accounts[1]);
				assert.equal(events[0].args.message, 'relayed-call-test');

				events = extractEvents(txMined, TestingInstance.address, 'GMTXReceived');
				assert.equal(events[0].args.hash, _digest);
			});

			it('after', async () => {
				assert.equal(await TestingInstance.gmtx_nonce(accounts[1]), 1);
				assert.equal(await TestingInstance.gmtx_replay(_digest), true);
			});
		});
	});

});

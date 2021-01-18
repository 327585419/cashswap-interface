/* eslint-disable no-unused-vars */

import * as helper from "./helper";
import ecdsa from "./ecdsa";
import axios from "axios";

// contract initial state
const contractCurrentByteData =
  "04c40900000440787d01204de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf547a547a2103881e40b245bfe178ba2cf32b8baef4fda06377ea0bf6edc1d89459c794398b777c7601417e527a6e6d77527a76a8527a537a527a527abb760280007f587f7c81557a8176577a8196527a88527a01697f517f7c01a988517f7701147f01878877527a547f7c04ffffffff8801207f547f044100000088040000000088557a76a9537a88557a76aa537a885a7f77013f7f01207f75587f7c547f75817c527f7c0217a98801157f018788517f77527a5d7f7c0d04534c500001010453454e44208801207f7c577a88597f7c557f7c75bc8177567a7601aa87637576557a7c96537a88527a557f777c82518763030000007e67825287630200007e678253876301007e6782548763676868687c7e547c7ea988516701ab88686877";

const hashOfContractCurrentByteData = helper.ripemdWithSha(contractCurrentByteData);

// contract initialstate UTXO
const contractUTXO = "17165add9b48bf23241667eccc54f047d524bdffa05ff02bcc362c06d7c0497f";
const contractUTXOReversed = "7f49c0d7062c36cc2bf05fa0ffbd24d547f054ccec67162423bf489bdd5a1617";
const contractUTXOIndex = "05000000";

//contract PKI
const contractPrivateKey = "05c54c20c8041e105f3f38feb65c335a63cbc4be9bd285b729e3c286079e9463";
const contractPublicKey = "03881E40B245BFE178BA2CF32B8BAEF4FDA06377EA0BF6EDC1D89459C794398B77";

// contract initialState SPICE-BTH amounts
const contractCurrentBCHBalanceLittleEndian = "1027000000000000";
const contractCurrentBCHBalanceNumber = 10000;
const contractSPICETokenData = contractCurrentByteData.substring(2, 10);
const reversedContractSPICETokenData = helper.reverseDigits(contractSPICETokenData);
const contractSPICETokenAmountNumber = parseInt(reversedContractSPICETokenData, 16);

// User UTX0 Sets
const BCHUTXOTransactionId = "7cc42066826a2b1fe920964104a6b04d0ebb65ec6bfe9bbcfc251706b022469d";
const BCHUTXOTransactionIdReversed = "4cddb0b2c6162fdcfe85c54754be9d7b015ed04ad61df046224e79db271d425f";
const BCHUTXOIndex = "00000000";
const userUTXOBCHBalance = "8813000000000000";
const userOutputBCHBalance = "2202000000000000";

// USER PKI
const userPrivateKey = "04AF566DC2E3FCFD8BBE42AC6961A7FBF481D94ECBCEED99BCA718E9AE635913";
const userPublicKey = "03C94932502939D228C483AF9597C16FE53636DD0735F293508B9F05892B1644D7";

const swap = (spiceTokenAmount, bchAmount) => {
  const newSPICETokenAmountNumber = contractSPICETokenAmountNumber - spiceTokenAmount;
  const newSPICETokenAmountHex = newSPICETokenAmountNumber.toString(16);

  const willEditedSPICETokenAmountHex = helper.reverseDigits(helper.convert4Byte(newSPICETokenAmountHex));
  const newContractDataHex = contractCurrentByteData.replace(contractSPICETokenData, willEditedSPICETokenAmountHex);
  const hashOfNewContractData = helper.ripemdWithSha(newContractDataHex);

  const userPublicKeyHash = helper.ripemdWithSha(userPublicKey);

  const contractOutputBCHBalance = contractCurrentBCHBalanceNumber + bchAmount;
  const contractOutputBCHBalanceHex = contractOutputBCHBalance.toString(16);
  const contractOutputBCHBalanceLittleEndian = helper.reverseDigits(helper.convert8byte(contractOutputBCHBalanceHex));
  const contractOutputSPICEBalance = helper.convert8byte(newSPICETokenAmountHex);
  const userOutputSPICEBalance = helper.convert8byte(spiceTokenAmount.toString(16));

  // Transaction Components
  const transactionInputFieldsConcat = contractUTXOReversed + contractUTXOIndex + BCHUTXOTransactionIdReversed + BCHUTXOIndex;
  const transactionInputFieldsConcatHash = helper.doubleSha(transactionInputFieldsConcat);

  const transactionFirstOutput =
    "0000000000000000406a04534c500001010453454e44204de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf08" + contractOutputSPICEBalance + "08" + userOutputSPICEBalance;
  const transactionSecondOutput = contractOutputBCHBalanceLittleEndian + "17a914" + hashOfNewContractData + "87";

  const transactionThirdOutput = userOutputBCHBalance + "1976a914" + userPublicKeyHash + "88ac";
  const transactionOutputsConcat = transactionFirstOutput + transactionSecondOutput + transactionThirdOutput;
  const hashOfTransactionOutputFields = helper.doubleSha(transactionOutputsConcat);

  //Constructing Sighash Preimage for first input:
  const sighashPreimageForFirstInput = constructSighashForContractInput(transactionInputFieldsConcatHash, hashOfTransactionOutputFields);

  //Sign for contract
  const contractSign = ecdsa.signMessage("0x" + sighashPreimageForFirstInput.sighashPreimageConcatHash, "0x" + contractPrivateKey);

  // DER Encode for contract
  const derEncodeForContractSign = derEncodeForSign(contractSign, "contract");

  //Constructing Sighash Preimage for second input:
  const sighashPreimageForSecondInput = constructSighashForUserInput(transactionInputFieldsConcatHash, userPublicKeyHash, hashOfTransactionOutputFields);

  //Sign for user
  const userSign = ecdsa.signMessage("0x" + sighashPreimageForSecondInput, "0x" + userPrivateKey);

  // DER Encode for user
  const derEncodeForUserSign = derEncodeForSign(userSign, "user");

  console.log("second", derEncodeForUserSign);

  //  ************* final ************* //
  const transactionText =
    "02000000" +
    "02" +
    contractUTXOReversed +
    contractUTXOIndex +
    // "fd2704" +
    "fd" +
    helper.reverseDigits(
      helper.convert2Byte(
        helper.hexLength(
          "01aa" +
            "4c8b" +
            transactionOutputsConcat +
            "4d4a01" +
            contractCurrentByteData +
            "4cb4" +
            sighashPreimageForFirstInput.sighashPreimageConcat +
            helper.hexLength(derEncodeForContractSign) +
            derEncodeForContractSign +
            "4d4a01" +
            contractCurrentByteData
        )
      )
    ) +
    "01aa" +
    "4c" +
    helper.hexLength(transactionOutputsConcat) +
    transactionOutputsConcat +
    "4d4a01" +
    contractCurrentByteData +
    "4c" +
    helper.hexLength(sighashPreimageForFirstInput.sighashPreimageConcat) +
    sighashPreimageForFirstInput.sighashPreimageConcat +
    helper.hexLength(derEncodeForContractSign) +
    derEncodeForContractSign +
    "4d4a01" +
    contractCurrentByteData +
    "ffffffff" +
    BCHUTXOTransactionIdReversed +
    BCHUTXOIndex +
    helper.hexLength("00" + derEncodeForUserSign + "4121" + userPublicKey) +
    helper.hexLength(derEncodeForUserSign + "41") +
    derEncodeForUserSign +
    "41" +
    helper.hexLength(userPublicKey) +
    userPublicKey +
    "ffffffff" +
    "03" +
    transactionOutputsConcat +
    "00000000";

  axios.post("https://api.fullstack.cash/v4/electrumx/tx/broadcast", { txHex: transactionText }).then((val) => {
    window.open(`https://explorer.bitcoin.com/bch/tx/${val.data.txid}`, "_blank");
  });
};

// First input
const constructSighashForContractInput = (transactionInputFieldsConcatHash, hashOfTransactionOutputFields) => {
  const sighashPreimageConcat =
    "02000000" +
    transactionInputFieldsConcatHash +
    "752adad0a7b9ceca853768aebb6965eca126a62965f698a0c1bc43d83db632ad" +
    contractUTXOReversed +
    contractUTXOIndex +
    "17a914" +
    hashOfContractCurrentByteData +
    "87" +
    contractCurrentBCHBalanceLittleEndian +
    "ffffffff" +
    hashOfTransactionOutputFields +
    "00000000" +
    "41000000";

  const sighashPreimageConcatHash = helper.doubleSha(sighashPreimageConcat);

  return { sighashPreimageConcatHash, sighashPreimageConcat };
};

// First input
const constructSighashForUserInput = (transactionInputFieldsConcatHash, userPublicKeyHash, hashOfTransactionOutputFields) => {
  const sighashPreimageConcat =
    "02000000" +
    transactionInputFieldsConcatHash +
    "752adad0a7b9ceca853768aebb6965eca126a62965f698a0c1bc43d83db632ad" +
    BCHUTXOTransactionIdReversed +
    BCHUTXOIndex +
    "1976a914" +
    userPublicKeyHash +
    "88ac" +
    userUTXOBCHBalance +
    "ffffffff" +
    hashOfTransactionOutputFields +
    "00000000" +
    "41000000";

  const sighashPreimageConcatHash = helper.doubleSha(sighashPreimageConcat);

  return sighashPreimageConcatHash;
};

const derEncodeForSign = (sign, type) => {
  const minLimit = 57896044600000000000000000000000000000000000000000000000000000000000000000000;
  const maxLimit = 115792089000000000000000000000000000000000000000000000000000000000000000000000;
  let rValue = sign[1];
  let sValue = sign[2];

  const rValueDecimal = parseInt(rValue, 16);
  const sValueDecimal = parseInt(sValue, 16);

  if (minLimit < rValueDecimal && rValueDecimal < maxLimit) {
    rValue = "022100" + rValue;
  } else {
    rValue = "0220" + rValue;
  }

  if (minLimit < sValueDecimal && sValueDecimal < maxLimit) {
    sValue = "022100" + sValue;
  } else {
    sValue = "0220" + sValue;
  }

  const preStringLegthHex = helper.hexLength(rValue + sValue);
  return "30" + preStringLegthHex + rValue + sValue;
};

export { swap };

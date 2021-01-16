import CryptoJS from "crypto-js";

const currentDataHex =
  "04c40900000440787d01209fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11547a547a2103881e40b245bfe178ba2cf32b8baef4fda06377ea0bf6edc1d89459c794398b777c7601417e527a6e6d77527a76a8527a537a527a527abb760280007f587f7c81557a8176577a8196527a88527a01697f517f7c01a988517f7701147f01878877527a547f7c04ffffffff8801207f547f044100000088040000000088557a76a9537a88557a76aa537a885a7f77013f7f01207f75587f7c547f75817c527f7c0217a98801157f018788517f77527a5d7f7c0d04534c500001010453454e44208801207f7c577a88597f7c557f7c75bc8177567a7601aa87637576557a7c96537a88527a557f777c82518763030000007e67825287630200007e678253876301007e6782548763676868687c7e547c7ea988516701ab88686877";
const contractValue = 25000000;
const contractBchData = currentDataHex.substring(2, 10);

const currentDataHexFirstByte = contractBchData.substring(0, 2);
const currentDataHexSecondByte = contractBchData.substring(3, 4);
const currentDataDecimal = parseInt(currentDataHexSecondByte + currentDataHexFirstByte, 16);

const swap = (swapAmount) => {
  const currentValue = currentDataDecimal + swapAmount;
  const currentValueHex = currentValue.toString(16);
  const editedCurrentValueHex = currentValueHex.slice(1, 3) + "0" + currentValueHex.slice(0, 1);
  const willEditedHex = editedCurrentValueHex + "0000";

  const hashOfCovenantCurrentByteDataSha = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(currentDataHex));

  const hashOfCovenantCurrentByteData = CryptoJS.RIPEMD160(hashOfCovenantCurrentByteDataSha).toString();

  const newDataHex = currentDataHex.replace(contractBchData, willEditedHex);

  const hashOfCovenantNewByteDataSha = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(newDataHex));

  const hashOfCovenantNewByteData = CryptoJS.RIPEMD160(hashOfCovenantNewByteDataSha).toString();

  return { newDataHex, hashOfCovenantCurrentByteData, hashOfCovenantNewByteData };
};

export { swap };

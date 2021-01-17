import CryptoJS from "crypto-js";

const ripemdWithSha = (data) => {
  const dataWithSha256Hashed = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data));
  const dataWithRipemd160Hashed = CryptoJS.RIPEMD160(dataWithSha256Hashed).toString();

  return dataWithRipemd160Hashed;
};

const doubleSha = (data) => {
  const firstSHAHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data));
  const secondSHAHash = CryptoJS.SHA256(firstSHAHash).toString();

  return secondSHAHash;
};

const reverseDigits = (data) => {
  if (data.length % 2 === 0) {
    let str = "";
    for (let i = data.length; i > 0; i -= 2) {
      str += data.substring(i - 2, i);
    }

    return str;
  } else {
    console.warn("its odd");
  }
};

const convert2Byte = (data) => {
  let str = "";
  const loopLimit = 3 - data.length;
  for (let i = 0; i <= loopLimit; i++) {
    str += "0";
  }
  return str + data;
};

const convert4Byte = (data) => {
  let str = "";
  const loopLimit = 7 - data.length;
  for (let i = 0; i <= loopLimit; i++) {
    str += "0";
  }
  return str + data;
};

const convert8byte = (data) => {
  let str = "";
  const loopLimit = 15 - data.length;
  for (let i = 0; i <= loopLimit; i++) {
    str += "0";
  }

  return str + data;
};

const hexLength = (data) => {
  const dataByteLength = data.length / 2;

  return dataByteLength.toString(16);
};

export { ripemdWithSha, doubleSha, reverseDigits, convert4Byte, convert8byte, hexLength, convert2Byte };

// const willEditedSPICETokenAmountHex = newSPICETokenAmountHex.slice(1, 3) + "0" + newSPICETokenAmountHex.slice(0, 1) + "0000";

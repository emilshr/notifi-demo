import {
  decryptData,
  encryptData,
  generateNewTokenSecret,
} from "../sign-hash.service";

describe("Testing data encryption methods", () => {
  it("The decrypted text should be equal", () => {
    const sampleText = generateNewTokenSecret();
    const sampleKey = generateNewTokenSecret();

    const encryptedText = encryptData(sampleText, sampleKey);
    const decryptedText = decryptData(encryptedText, sampleKey);
    console.log({ encryptedText, decryptedText, sampleText });
    expect(decryptedText).toEqual(sampleText);
  });
});

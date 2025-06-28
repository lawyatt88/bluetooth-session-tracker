import { replaceInFile } from "replace-in-file";

const epoch = Math.floor(Date.now() / 1000);

(async () => {
  try {
    const results = await replaceInFile({
      files: "build/firmware.js",
      from: /^\/\/ SET_TIME_MARKER.*$/m,
      to: `setTime(${epoch});`,
    });
    console.log(`Epoch ${epoch} injected into build/firmware.js`);
  } catch (error) {
    console.error("Error injecting epoch time:", error);
  }
})();

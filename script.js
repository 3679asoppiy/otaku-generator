document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const output = document.getElementById("output");
  const probability = document.getElementById("probability");
  const probabilityValue = document.getElementById("probabilityValue");
  const style = document.getElementById("style");
  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const copyBtn = document.getElementById("copyBtn");
  const charCount = document.getElementById("charCount");

  const effects = {
    normal: [
      "（メガネｽﾁｬｧ）",
      "（ｶﾀｶﾀ）",
      "（ﾒｶﾞﾈｸｲｯ）",
      "（小声）",
      "（ﾆｯｺﾘ）"
    ],
    otaku: [
      "（メガネｽﾁｬｧ）",
      "（ｶﾀｶﾀ）",
      "（ﾒｶﾞﾈｸｲｯ）",
      "（ﾆﾁｬｧ）",
      "（早口）",
      "（迫真）",
      "（小声）",
      "（ﾆｯｺﾘ）",
      "（突然饒舌になる）",
      "（謎の間）",
      "（ここ重要）",
      "（椅子ｷﾞｼｯ）"
    ],
    extreme: [
      "（メガネｽﾁｬｧ）",
      "（ｶﾀｶﾀｶﾀｶﾀ）",
      "（ﾒｶﾞﾈｸｲｯ）",
      "（ﾆﾁｬｧ）",
      "（早口）",
      "（限界早口）",
      "（迫真）",
      "（小声）",
      "（突然饒舌になる）",
      "（謎の間）",
      "（ここ重要）",
      "（ここテストに出ます）",
      "（椅子ｷﾞｼｯ）",
      "（満面の笑み）",
      "（ﾊｧﾊｧ）",
      "（知識を披露し始める）"
    ]
  };

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function makeOtaku(text) {
    const rate = Number(probability.value) / 100;
    const pool = effects[style.value];

    return text.replace(/[。！？!?]/g, (match) => {
      return Math.random() < rate ? match + randomItem(pool) : match;
    });
  }

  function updateCharCount() {
    charCount.textContent = `${inputText.value.length}文字`;
  }

  probability.addEventListener("input", () => {
    probabilityValue.textContent = `${probability.value}%`;
  });

  inputText.addEventListener("input", updateCharCount);

  generateBtn.addEventListener("click", () => {
    const text = inputText.value.trim();

    if (!text) {
      output.textContent = "まず文章を入力してね🤓";
      output.classList.remove("empty");
      copyBtn.disabled = true;
      inputText.focus();
      return;
    }

    const converted = makeOtaku(text);
    output.textContent = `🤓「${converted}」`;
    output.classList.remove("empty");
    copyBtn.disabled = false;
  });

  clearBtn.addEventListener("click", () => {
    inputText.value = "";
    updateCharCount();
    output.textContent = "ここに変換結果が表示されます";
    output.classList.add("empty");
    copyBtn.disabled = true;
    inputText.focus();
  });

  copyBtn.addEventListener("click", async () => {
    if (copyBtn.disabled) return;

    const text = output.textContent;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }

    copyBtn.textContent = "コピーした！";
    setTimeout(() => {
      copyBtn.textContent = "コピー";
    }, 1200);
  });

  inputText.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      generateBtn.click();
    }
  });

  updateCharCount();
});
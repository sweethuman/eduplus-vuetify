let UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;

function subscript(state, silent) {
  let found,
    content,
    token,
    max = state.posMax,
    start = state.pos;

  if (state.src.charCodeAt(start) !== 0x21 || state.src.charCodeAt(start + 1) !== 0x21 /* | */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 3 >= max) {
    return false;
  }

  state.pos = start + 2;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x21 && state.src.charCodeAt(state.pos - 1) === 0x21 /* | */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 2 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 2, state.pos - 1);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("fill_word_open", "fill-word", 1);
  token.markup = "!!";
  token.attrPush(["text", content.replace(UNESCAPE_RE, "$1")]);

  token = state.push("fill_word_close", "fill-word", -1);
  token.markup = "!!";

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}

export default function sub_plugin(md) {
  md.inline.ruler.after("emphasis", "custom_word", subscript);
}

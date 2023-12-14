let json = '{"a":{"aa":111,"bb":1},"exp":/^hello/,"b1":true,"b2":false,"n1":1,"n2":2.1,"arr":[1,2,4],"null":null,"str":"aaa"}';
let i = 0;

function parseValue() {
  skipWhitespace();
  if (json[i] === '{') {
    return parseObject();
  } else if (json[i] === '[') {
    return parseArray();
  } else if (json[i] === '"') {
    return parseString();
  } else if (json[i] === 't' || json[i] === 'f') {
    return parseBool();
  } else if (json[i] === 'n') {
    return parseNull();
  } else if (isNumberchar(json[i])) {
    return parseNumber();
  } else if (json[i] === '/') {
    return parseRegExp();
  } else {
    throw new Error('parse error');
  }
}

function parseObject() {
  let res = {};
  i++;
  while (json[i] !== '}') {
    let key = parseString();
    i++;
    let value = parseValue();
    res[key] = value;
    if (json[i] === ',') {
      i++;
    }
    skipWhitespace();
  }
  i++;
  return res;
}

function parseArray() {
  let res = [];
  i++;
  while (json[i] !== ']') {
    res.push(parseValue());
    if (json[i] === ',') {
      i++;
    }
    skipWhitespace();
  }
  i++;
  return res;
}

function parseString() {
  let res = "";
  i++;
  while (json[i] !== '"') {
    res += json[i];
    i++;
  }
  skipWhitespace();
  i++;
  return res;
}

function parseBool() {
  let s4 = json.substr(i, 4);
  let s5 = json.substr(i, 5);
  if (s4 === 'true') {
    i += 4;
    return true;
  } else if (s5 === 'false') {
    i += 5;
    return false;
  } else {
    throw new Error('parse bool error');
  }
}

function parseNull() {
  let s4 = json.substr(i, 4);
  if (s4 === 'null') {
    i += 4;
    return null;
  } else {
    throw new Error('parse null error');
  }
}

function parseNumber() {
  let res = '';
  while (isNumberchar(json[i])) {
    res += json[i];
    i++;
  }
  return parseFloat(res);
}

function isNumberchar() {
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-', '+', 'e', 'E'].some(j => json[i] === j);
}

function skipWhitespace() {
  while (json[i] === ' ' || json[i] === '\n' || json[i] === '\r' || json[i] === '\t') {
    i++;
  }
}

function parseRegExp() {
  let res = '';
  i++; // 跳过开头的斜杠
  while (json[i] !== '/') {
    res += json[i];
    i++;
  }
  i++; // 跳过结尾的斜杠
  while (json[i] >= 'a' && json[i] <= 'z') { // 解析标志部分（如 g、i、m 等）
    res += json[i];
    i++;
  }
  skipWhitespace(); // 跳过可能的空白字符
  return new RegExp(res); // 创建正则表达式对象并返回
}

function parseJSON() {
  i = 0;
  return parseValue();
}

console.log(parseJSON());
const Queen = {
  // https://www.youtube.com/watch?v=cZkGeR9CWbk&t=227s
  lunar: {
    add(s1, s2) {
      let tmp = "";
      for (let i = 0; i < s1.length; i++) {
        Number(s1[i]) >= Number(s2[i]) ? (tmp += s1[i]) : (tmp += s2[i]);
      }
      return tmp;
    },
    // [ ] need to fix
    // mult(s1: string, s2: string): string {
    //   let tmp = "";
    //   let length: number = 0;
    //   if (s1.length >= s2.length) {
    //     length = s1.length;
    //   } else {
    //     length = s2.length;
    //   }
    //   for (let i = 0; i < length; i++) {
    //     Number(s1[i]) >= Number(s2[i]) ? (tmp += s2[i]) : (tmp += s1[i]);
    //     console.log(tmp);
    //   }
    //   return tmp;
    // },
  },
  matrix: {
    create(rows, cols) {
      const m = [];
      for (let i = 0; i < rows; i++) {
        m[i] = [];
        for (let j = 0; j < cols; j++) {
          m[i][j] = 0;
        }
      }
      return { rows: rows, cols: cols, m: m };
    },
    add(m, n) {
      const newMat = Object.assign(m);
      for (let i = 0; i < newMat.rows; i++) {
        for (let j = 0; j < newMat.cols; j++) {
          newMat.m[i][j] += n;
        }
      }
      return newMat;
    },
    randomize(m, n) {
      const newMat = Object.assign(m);
      for (let i = 0; i < newMat.rows; i++) {
        for (let j = 0; j < newMat.cols; j++) {
          newMat.m[i][j] = Math.floor(Math.random() * n);
        }
      }
      return newMat;
    },
    multiply(m, multiplier) {
      const newMat = Object.assign(m);
      for (let i = 0; i < newMat.rows; i++) {
        for (let j = 0; j < newMat.cols; j++) {
          newMat.m[i][j] *= multiplier;
        }
      }
      return newMat;
    },
    elementwise(m, n) {
      // return vec1.map((elem, i) => elem + vec2[i]);
      const newMat = Object.assign(m);
      for (let i = 0; i < newMat.rows; i++) {
        for (let j = 0; j < newMat.cols; j++) {
          newMat.m[i][j] = m.m[i][j] + n.m[i][j];
        }
      }
      return newMat;
    },
  },
  utils: {
    checkInputIsNonNegativeInt(n) {
      if (n < 0 || !Number.isInteger(n)) {
        throw Error("input must be integer more than 0");
      }
      return true;
    },
    checkInputIsInt(n) {
      if (!Number.isInteger(n)) {
        throw Error("input must be integer");
      }
      return true;
    },
    checkInputIsNat(n) {
      if (n < 0 || !Number.isInteger(n)) {
        throw Error("input must be natural number");
      }
      return true;
    },
    getIntArrayFromInt(num) {
      this.checkInputIsInt(num);
      return num
        .toString()
        .split("")
        .map((elem) => parseInt(elem));
    },
    iota(min, max) {
      this.checkInputIsInt(min);
      this.checkInputIsInt(max);
      const length = max - min + 1;
      return new Array(length).fill(0).map((elem, i) => min + i);
    },
    digitsToBinary(num) {
      let result = "";
      let index = 0;
      while (2 ** (index + 1) <= num) {
        index = index + 1;
      }
      for (let i = index; i >= 0; i--) {
        let tmp = num - 2 ** i;
        if (tmp >= 0) {
          result += "1";
          num = tmp;
        } else {
          result += "0";
        }
      }
      return result;
    },
  },
  divOf(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = [];
    for (let i = 1; i < num + 1; i++) {
      if (num % i === 0) {
        arr.push(i);
      }
    }
    return arr;
  },
  numOfDiv(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    return this.divOf(num).length;
  },
  divSum(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    return this.divOf(num).reduce((a, c) => a + c, 0);
  },
  divProduct(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    return this.divOf(num).reduce((a, c) => a * c, 1);
  },
  divisorsExceptSelf(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.divOf(num);
    return arr.slice(0, arr.length - 1);
  },
  numOfDivExceptSelf(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    return this.divisorsExceptSelf(num).length;
  },
  divSumExceptSelf(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    return this.divisorsExceptSelf(num).reduce((a, c) => a + c, 0);
  },
  divGroup(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    if (this.divSumExceptSelf(num) === num) {
      return "perfect";
    } else if (this.divSumExceptSelf(num) > num) {
      return "surplus";
    } else if (this.divSumExceptSelf(num) < num) {
      return "deficient";
    }
    return "unexpected input";
  },
  perfectNumSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(1, num);
    return arr.filter((elem) => this.divGroup(elem) === "perfect");
  },
  surplusNumSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(1, num);
    return arr.filter((elem) => this.divGroup(elem) === "surplus");
  },
  deficientNumSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(1, num);
    return arr.filter((elem) => this.divGroup(elem) === "deficient");
  },
  isPrime(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    if (num === 1) {
      return false;
    }
    const arr = this.utils.iota(2, num - 1);
    for (const item of arr) {
      if (num % item === 0) {
        return false;
      }
    }
    return true;
  },
  primeSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(1, num);
    return arr.filter((elem) => this.isPrime(elem));
  },
  compositeSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(1, num);
    return arr.filter((elem) => !this.isPrime(elem));
  },
  isHighlyComposite(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    if (Queen.isPrime(num)) {
      return false;
    }
    // 配列に引数のnumを含まないように処理
    const arr = this.compositeSeq(num).slice(
      0,
      this.compositeSeq(num).length - 1
    );
    const allDivisors = this.numOfDiv(num);
    let numOfDivisorsUnderTarget = 0;
    arr.forEach((elem) => {
      if (this.numOfDiv(elem) > numOfDivisorsUnderTarget) {
        numOfDivisorsUnderTarget = this.numOfDiv(elem);
      }
    });
    if (allDivisors > numOfDivisorsUnderTarget) {
      return true;
    }
    return false;
  },
  highlyCompositeSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.compositeSeq(num);
    return arr.filter((elem) => this.isHighlyComposite(elem));
  },
  isTriangularNum(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const tmp = (-1 + Math.sqrt(1 + 8 * num)) / 2;
    if (Number.isInteger(tmp)) {
      return true;
    }
    return false;
  },
  triangleNumSeq(num) {
    this.utils.checkInputIsNonNegativeInt(num);
    const arr = this.utils.iota(0, num);
    return arr.filter((elem) => this.isTriangularNum(elem));
  },
  sigma(initial, final, body) {
    // [ ] type check
    if (initial > final) {
      return 0;
    }
    return body(initial) + this.sigma(initial + 1, final, body);
    // どうやったらこのコードが使えるようになるかな。。
    // const arr = Queen.iota(initial, final);
    // return arr.reduce(body, 0);
  },
  id(num) {
    return num;
  },
  fact(num) {
    let result = 1;
    if (num === 0 || num === 1) {
      return result;
    }
    for (let i = num; i > 0; i--) {
      result = result * i;
    }
    return result;
  },
  sumOfPrimesUnder(num) {
    return this.primeSeq(num).reduce((a, c) => a + c, 0);
  },
  isTriangle(a, b, c) {
    if (a < b + c && b < c + a && c < a + b) {
      return true;
    }
    return false;
  },
  // fib(n: number): number {
  //   if (n === 0) {
  //     return 0;
  //   }
  //   if (n === 1) {
  //     return 1;
  //   } else {
  //     return this.fib(n - 1) + this.fib(n - 2);
  //   }
  // },
  // fibSeq(n: number): number[] {
  //   return Queen.iota(0, n).map((elem) => this.fib(elem));
  // },
  // A003422
  // テスト通らない
  // !0の時に0になるようにiotaやsigmaの範囲設定をするか、あるいは分岐を入れるか。。g
  //  leftFact(num: number): number[] {
  //   const arr = Queen.iota(0, num);
  //   return arr.map((elem) => this.sigma(0, elem, this.fact));
  // }
  // https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%95%E3%82%A3%E3%83%BC%E3%83%BB%E3%82%B8%E3%82%A7%E3%83%AB%E3%83%9E%E3%83%B3%E7%B4%A0%E6%95%B0
  isSophieGermanPrime(num) {
    if (!this.isPrime(num)) {
      return false;
    }
    const result = 2 * num + 1;
    if (this.isPrime(result)) {
      return true;
    }
    return false;
  },
  divisorFunction(powers, num) {
    const divisors = this.divOf(num);
    return divisors
      .map((elem) => Math.pow(elem, powers))
      .reduce((a, c) => a + c, 0);
  },
  // A000225
  isMersenneNumber(n) {
    this.utils.checkInputIsNat(n);
    return Number.isInteger(Math.log2(n + 1));
  },
  //  isMersennePrime(num: number): boolean {
  //   if (num )
  //   if (!this.isPrime(num)) {
  //     return false;
  //   }
  //   const mersenneNum = num ** 2 - 1;
  //   if (this.isPrime(mersenneNum)) {
  //     return true;
  //   }
  //   return false;
  // }
  isSquare(num) {
    const result = Number.isInteger(Math.sqrt(num)) ? true : false;
    return result;
  },
  isSquareFree(num) {
    if (num === 1) {
      return true;
    }
    for (let i = 2; i < num + 1; i++) {
      if (num % i ** 2 === 0) return false;
    }
    return true;
  },
  collatz(num) {
    if (num === 1) {
      return [1, 4, 2, 1];
    }
    let result = [num];
    while (num !== 1) {
      if (num % 2 === 0) {
        num = num / 2;
        result.push(num);
      } else {
        num = num * 3 + 1;
        result.push(num);
      }
    }
    return result;
  },
  primeFactor(num) {
    const obj = {};
    let divisor = 2;
    while (num >= 2) {
      if (num % divisor === 0) {
        if (obj[divisor] === undefined) {
          obj[divisor] = 1;
        } else {
          obj[divisor] += 1;
        }
        num = num / divisor;
      } else {
        divisor++;
      }
    }
    return obj;
  },
  primeFactorArr(num) {
    if (num === 1) {
      return [1];
    }
    const arr = [];
    let divisor = 2;
    while (num >= 2) {
      if (num % divisor === 0) {
        arr.push(divisor);
        num = num / divisor;
      } else {
        divisor++;
      }
    }
    return arr;
  },
  isPalindrome(num) {
    if (!Number.isInteger(num)) {
      throw Error("the argument must be integer");
    }
    const str = num.toString();
    let former;
    let latter;
    if (str.length % 2 === 0) {
      former = str.substring(Math.floor(str.length / 2), str.length);
      latter = str.substring(0, Math.floor(str.length / 2));
    } else {
      former = str.substring(0, Math.floor(str.length / 2));
      latter = str.substring(Math.floor(str.length / 2) + 1, str.length);
    }
    if (former === latter.split("").reverse().join("")) {
      return true;
    }
    return false;
  },
  getQuotient(num, divisor) {
    if (!Number.isInteger(num) || !Number.isInteger(divisor)) {
      throw Error("the argument must be integers");
    }
    if (divisor === 0) {
      throw Error("division by 0");
    }
    return Math.floor(num / divisor);
  },
  genNthPolygon(n) {
    if (!Number.isInteger(n) || n < 3) {
      throw Error(
        "the argument must be a natural number which is bigger than 3"
      );
    }
    return {
      vertex: n,
      edge: n,
    };
  },
  isPowersOf(n, p) {
    if (n === 1) {
      return true;
    }
    return this.primeFactorArr(n).every((elem) => elem === p);
  },
};
export default Queen;

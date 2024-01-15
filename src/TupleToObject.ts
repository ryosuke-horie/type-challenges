/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #初級 #object-keys

  ### 質問

  タプルを受け取り、その各値のkey/valueを持つオブジェクトの型に変換する型を実装します。

  例えば：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > GitHubで確認する：https://tsch.js.org/11/ja
*/

/* _____________ ここにコードを記入 _____________ */
// 参考解答：https://github.com/type-challenges/type-challenges/issues/2737

// Given:
// type TupleToObject<T extends readonly any[]> = any

// 最初にanyを排除する必要がある。
// 入力される配列は`Readonly`であり、文字列である。つまり、、、
// type TuppleToObject<T extends readlonly string[]> = any;

// 配列のリテラル型をオブジェクト型に変換する必要がある。
// Mapped Typeが利用できる
// in キーワードを利用
// type TuppleToObject<T extends readonly string[]> = {
// 	[P in <somehow get T values>]: P
// }

// 値を取得するためにインデックス付きアクセスを利用する
type TuppleToObject<T extends readonly string[]> = {
	[P in T[number]]: P
}

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1, 2: 2, 3: 3, 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1, [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1, '2': '2', 3: 3, '4': '4', [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/11/answer/ja
  > 解答を見る：https://tsch.js.org/11/solutions
  > その他の課題：https://tsch.js.org/ja
*/

****Mapped Types****

<https://typescriptbook.jp/reference/type-reuse/mapped-types>

Mapped Typesは主にユニオン型と組み合わせて使用する。

```tsx
// システムがサポートする言語を定義
type SystemSupportLanguage = "en" | "fr" | "it" | "es";

// インデックス型と同じようにキーの制約として使用する
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};

// 次のようにButterflyを定義するとシステムがサポートしない言語をはじくことができる。（de）
const butterflies: Butterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
  de: "Schmetterling",
};
```

Mapped Typesには追加のプロパティは書けない。もし追加するなら、追加分をオブジェクトの型として定義したのち、Mapped Typesとインターセクション型をなす。

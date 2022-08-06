## 1. Rediscovering Simplicity

### Preface

소프트웨어 설계에서 작은 구성요소(함수, 클래스, ...)부터 큰 것(프로그램, 클러스터를 구성하고 있는 프로그램들)까지 항상 설계에서 trade-off가 존재한다.
작은 단위의 구성요소 설계 방법은 바로 이 책 (99 bottles of OOP), 큰 단위의 구성요소 설계 방법은 Software Architecture 관련 서적들에서 다룬다.

참조: Software Architecture: The Hard
Parts (https://www.amazon.com/Software-Architecture-Trade-Off-Distributed-Architectures/dp/1492086894)

#### 추상화는 어렵다

- 내가 작성한 코드를 다른 사람이 모두 읽어보지 않고도 그 코드를 사용할 수 있으면 OK
- 하지만 적절한 추상화 정도를 딱 찾기란 쉽지 않음
- 추상화가 잘 된 예시: apps/luaeb-admin/src/components/product-item-option-table/product-item-options.ts:59
    - 복잡한 코드이지만 함수를 실행시키는데 인자값이 1개 밖에 없고, 함수를 호출하는데 어려움이 없음

### 1.1. Simplifying Code

#### 1.1.1. Incomprehensibly Concise

+ 일관성
    + `n === 0 ? 'No more' : n`
    + `n-1 < 0 ? 99 : n-1 === 0 ? 'no more' : n-1`
        + 삼항 연산자 가독성도 해침
+ 코드 중복
    + 코드 중복제거 필요함
    + 그러나 간혹 중복이 괜찮을 때가 있음
        + 절대로 코드가 변하지 않을 것이라는 확신이 있을 때
        + 중복된 코드가 읽는 사람이 단번에 파악 가능한 수준으로 붙어 있을 때
+ 변수명 잘 짓기

#### 코드에 대한 평가

+ 얼마나 작성하기 어려운가?
+ 얼마나 이해하기 어려운가?
+ 코드를 변경하는데 얼마나 많은 비용이 들어가는가?

#### 99 bottles 의 문제를 해결하는 관점에서 (여기서 문제는 99bottles 가사를 프로그램으로 작성하는 문제임)

+ 얼마나 다양한 verse가 있는가?
+ 어떤 verse 가 가장 비슷한가?
+ 어떤 verse가 다른가?
+ 다음 verse가 어떤 규칙에 의해 결정되는가?

---

#### 1.1.2. Speculatively General

```javascript
const NoMore = verse =>
    'No more bottles of beer on the wall, ' + 'no more bottles of beer.\n' + 'Go to the store and buy some more, ' + '99 bottles of beer on the wall.\n';

const LastOne = verse =>
    '1 bottle of beer on the wall, ' + '1 bottle of beer.\n' + 'Take it down and pass it around, ' + 'no more bottles of beer on the wall.\n';

const Penultimate = verse =>
    '2 bottles of beer on the wall, ' + '2 bottles of beer.\n' + 'Take one down and pass it around, ' + '1 bottle of beer on the wall.\n';

const Default = verse =>
    `${verse.number} bottles of beer on the wall, ` + `${verse.number} bottles of beer.\n` + 'Take one down and pass it around, ' + `${verse.number - 1} bottles of beer on the wall.\n`;

class Bottles {
    song() {
        return this.verses(99, 0);
    }

    verses(finish, start) {
        return downTo(finish, start).map(verseNumber => this.verse(verseNumber)).join('\n');
    }

    verse(number) {
        return this.verseFor(number).text();
    }

    verseFor(number) {
        switch (number) {
            case 0:
                return new Verse(number, NoMore);
            case 1:
                return new Verse(number, LastOne);
            case 2:
                return new Verse(number, Penultimate);
            default:
                return new Verse(number, Default);
        }
    }
}

class Verse {
    constructor(number, lyrics) {
        this.number = number;
        this.lyrics = lyrics;
    }

    number() {
        return this.number;
    }

    text() {
        return this.lyrics(this);
    }
}
```

하지만 불필요하게 template을 선택하고 렌더링하는 과정이 불필요하고 복잡하다.

+ 얼마나 작성하기 어려운가?
    + 불필요하게 Verse 클래스 코드를 작성해야 함
+ 얼마나 이해하기 어려운가?
    + Verse 클래스 코드의 의도를 이해하기 어려움
+ 코드를 변경하는데 얼마나 많은 비용이 들어가는가?
    + 불필요한 case 0, case 1, ... 에 다른 개발자에 의해 또다른 케이스가 추가될 것이고 점점 늘어날수록 수정이 어려워짐

+ 얼마나 다양한 verse가 있는가?
    + 총 4가지
+ 어떤 verse 가 가장 비슷한가?
    + 3-99가 비슷하고, 나머지(0, 1, 2)는 각각 다른 문구

---

#### 1.1.3. Concretely Abstract

```javascript
class Bottles {

    song() {
        return this.verses(99, 0);
    }

    verses(bottlesAtStart, bottlesAtEnd) {
        return downTo(bottlesAtStart, bottlesAtEnd).map(bottles => this.verse(bottles)).join('\n');
    }

    verse(bottles) {
        return new Round(bottles).toString();
    }

}

class Round {

    constructor(bottles) {
        this.bottles = bottles;

    }

    toString() {
        return this.challenge() + this.response();
    }

    challenge() {
        return (capitalize(this.bottlesOfBeer()) + ' ' + this.onWall() + ', ' + this.bottlesOfBeer() + '.\n');
    }

    response() {
        return (this.goToTheStoreOrTakeOneDown() + ', ' + this.bottlesOfBeer() + ' ' + this.onWall() + '.\n');
    }

    bottlesOfBeer() {
        return (this.anglicizedBottleCount() + ' ' + this.pluralizedBottleForm() + ' of ' + this.beer());
    }

    beer() {
        return 'beer';
    }

    onWall() {
        return 'on the wall';
    }

    pluralizedBottleForm() {
        return this.isLastBeer() ? 'bottle' : 'bottles';
    }

    anglicizedBottleCount() {
        return this.isAllOut() ? 'no more' : this.bottles.toString();
    }

    goToTheStoreOrTakeOneDown() {

        if (this.isAllOut()) {
            this.bottles = 99;
            return this.buyNewBeer();
        } else {
            const lyrics = this.drinkBeer();
            this.bottles--;
            return lyrics;
        }

    }

    buyNewBeer() {
        return 'Go to the store and buy some more';
    }

    drinkBeer() {
        return `Take ${this.itOrOne()} down and pass it around`;
    }

    itOrOne() {
        return this.isLastBeer() ? 'it' : 'one';
    }

    isAllOut() {
        return this.bottles === 0;
    }

    isLastBeer() {
        return this.bottles === 1;
    }

}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
```

- 각 함수의 의도는 명확하지만 전체 코드를 봤을 때 가독성이 매우 떨어진다.
- 지나치게 DRY principle 을 적용

---

#### 1.1.4. Shameless Green

```javascript
class Bottles {
    song() {
        return this.verses(99, 0);
    }

    verses(upper, lower) {
        return downTo(upper, lower).map(i => this.verse(i)).join('\n');
    }

    verse(number) {
        switch (number) {
            case 0:
                return ('No more bottles of beer on the wall, ' + 'no more bottles of beer.\n' + 'Go to the store and buy some more, ' + '99 bottles of beer on the wall.\n');
            case 1:
                return ('1 bottle of beer on the wall, ' + '1 bottle of beer.\n' + 'Take it down and pass it around, ' + 'no more bottles of beer on the wall.\n');
            case 2:
                return ('2 bottles of beer on the wall, ' + '2 bottles of beer.\n' + 'Take one down and pass it around, ' + '1 bottle of beer on the wall.\n');
            default:
                return (`${number} bottles of beer on the wall, ` + `${number} bottles of beer.\n` + 'Take one down and pass it around, ' + `${number - 1} bottles of beer on the wall.\n`);
        }

    }

}
```

---
#### 1.2.1. Evaluating Code Based on Opinion
#### 1.2.2. Evaluating Code Based on Facts

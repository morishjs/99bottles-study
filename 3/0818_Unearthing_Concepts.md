## 3. Unearthing Concepts

### 3.1. Listening to Change
#### 새로운 요구사항
- `6 bottles` 텍스트를 `six-pack`으로 변경
- Naive solution 참조

### 3.2. Starting With the Open/Closed Principle & 3.3. Recognizing Code Smells
- 확장에는 열려있고 수정에는 닫혀있어야 한다? -> 기존에 존재하는 코드를 수정하지 않고도 (수정에는 닫혀있고) 새로운 코드를 작성할 수 있어야 한다.
  + 왜 Listing 3.1 코드는 확장에 open 이 아닌가요? 
- Open 되어있는지 판단하고 리팩토링 후 Open/Close Principle 을 적용하면 된다고 하는데...
  + 안타깝지만 항상 Happy path만 있는 것이 아니다.
  + 일단 잘 모르겠지만 code smell 부터 제거하면 (책에서는 duplication) 힌트를 얻을 수 있다.

참조: 
1. https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599/ref=sr_1_1?crid=12D27Y014O11A&keywords=refactoring&qid=1660824282&sprefix=refactorin%2Caps%2C265&sr=8-1
2. https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?crid=3S61HXN630S3A&keywords=clean+code&qid=1660824315&sprefix=clean+co%2Caps%2C244&sr=8-1 

### 3.4. Identifying the Best Point of Attack
- 현재 코드의 큰 문제점은 switch 의 일부 브랜치들이 bottle / bottles 같은 word만 다르고 내용이 거의 같다 -> 코드 중복이 존재
- 코드 중복을 제거하는 것과 코드에 OCP를 적용할 수 있게 하는 것과는 직접적인 관계가 없다.

### 3.5. Refactoring Systematically
- 리팩토링을 한다는 것은 수정하는 대상(함수, 클래스 등)의 행동을 변경하는 것이 아니다
- 행동이 변경되어서 테스트가 깨진다면 그건 리팩토링을 하고 있는 것이 아니다.
- 테스트 코드를 작성하지 않는다면? -> 리팩토링을 제대로 하고 있는지 알 수 없음
- 안타깝지만... 한국 한정 대부분 회사에서 테스트 코드를 작성하지 않고 있다. 그러면 그런 프로젝트에 투입되었을 때 내가 할 수 있는 최선의 방법은?
  + 참조: https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052/ref=sr_1_1?crid=1MOS5O42JWM11&keywords=legacy+code&qid=1660826009&sprefix=legaacy+cod%2Caps%2C256&sr=8-1

### 3.6. Following the Flocking Rules
1. 가장 비슷한 코드를 찾고
2. 비슷한 코드에서 다른 부분을 찾아서
3. 다른 부분을 제거해라
   - 3번의 과정은 다음 장에서 자세히 소개

- Flocking rules 따를 때
  - 한줄씩 수정하고, 테스트 코드를 실행
  - 테스트 코드를 실행했을 때 실패한다면 (동작이 의도치 않게 변경되었다) 다시 되돌려서 다른 방법을 고안한다.

### 3.7. Converging on Abstractions
- 코드를 비교할 때 동일한 것을 찾기가 더 쉽지만 다른 부분을 찾는 것이 더 의미있다.
  - 코드의 비슷한 부분을 공유하고 있다는 것은 같은 추상성을 갖고 있다는 것이고 다른 부분은 각각의 다른 작은 추상성 내포하고 있다.
  - 이러한 다름을 같음으로 리팩토링 하는 것은 문제 (case 6, case 7 and default case) 를 구성 성분으로 분해 (결국 case 6, case 7은 default case로 머지 됨) 된다.


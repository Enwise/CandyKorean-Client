# CandyKorean
**외국인들을 대상으로 하는 한국어 교육 어플리케이션**

총 3개의 난이도로 레벨이 구성되어 있고, 각 레벨에는 튜터와 각 튜터가 맡은 코스가 있습니다. 사용자는 원하는 코스를 선택하여 코스의 강의를 수강한 후, 퀴즈를 통해 본인의 한국어 능력을 시험해볼 수 있습니다. 또한, Premium 과정을 통해 튜터와의 1대1 Private Class를 수강할 수도 있습니다.

구글 개발자 계정을 통해 완성된 앱을 플레이스토어의 심사를 거친 후에 배포하였습니다. 인앱 결제 기능을 구현하면서, JavaScript의 콜백함수, async 와 await 의 활용력을 기를 수 있었고, 실제 앱 배포를 통해 안드로이드 앱 개발에 필요한 빌드 능력을 갖출 수 있었습니다.

# 기술 스택
HTML, CSS, JavaScript, React Native와 Expo를 기반으로 프론트엔드 개발을 진행하였습니다.

# 플레이스토어 링크
https://play.google.com/store/apps/details?id=com.candykorean.candykoreanapp&hl=ko

# 구현 핵심 기능 : 인앱 결제
구글 플레이 콘솔 내에서 개발자 계정을 생성하여 결제 가능한 수업들을 계정 내에 등록하였고, Expo 프레임워크 기반의 InAppPurchases 라이브러리를 통해 수업을 결제할 수 있는 인앱 결제 기능을 구현하였습니다.

Expo 프레임워크를 사용하였기 때문에, Expo 내에서 작동하는 인앱 결제 라이브러리를 사용해야 했습니다. 구글 플레이 콘솔 내에 있는 상품을 불러오기 위해 getProductsAsync() 함수를 사용하였고, 인앱 결제 프로세스를 띄어주기 위해 purchaseItemAsync() 함수를 코드에 작성하였습니다. setPurchaseListener 콜백함수를 구현함으로써 결제 성공 혹은 실패에 대한 처리 과정을 구현하였습니다. 결제를 성공적으로 마쳤으면 DB에 구매한 수업을 저장해주는 로직과 결제 프로세스를 끝내주는 finishTransactionAsync() 함수가 실행되게 하였습니다. 결제 실패 시, disconnectAsync() 함수를 통해 결제 프로세스를 강제로 종료되게 하였습니다.

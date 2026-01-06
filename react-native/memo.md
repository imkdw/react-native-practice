### 에뮬 목록 조회
```bash
emulator -list-avds
```

<br>

### 에뮬 바로 실행
```bash
emulator -avd {emulator_name}
```

<br>

### 자바설치
```bash
brew install --cask zulu@17
brew info --cask zulu@17
open /opt/homebrew/Caskroom/zulu@17/<version number> # 이후 설치 필요
```

<br>

### 환경변수 저장
```bash
echo '
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
' >> ~/.zshrc

source ~/.zshrc
```
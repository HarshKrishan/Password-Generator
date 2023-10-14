import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import React,{useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {passwordStrength} from 'check-password-strength';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [strength, setStrength] = useState('')
  const [warning, setWarning] = useState('Please select atleast one option')
  const [selectCount, setSelectCount] = useState(0)
  const generatePassword = (passwordLength)=>{
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+='

    let characters = []

    if(includeLowercase){
      characters += lowercase
    }
    if(includeUppercase){
      characters += uppercase
    }
    if(includeNumbers){
      characters += numbers
    }
    if(includeSymbols){
      characters += symbols
    }

    const password = createPassword(characters,passwordLength)
    setPassword(password)
    const res = checkStrength(password);
    setStrength(res);
    setIsPasswordGenerated(true)

    
  }

  const createPassword = (characters,length)=>{
    let pwd = ''
    for(let i=0;i<length;i++){
      pwd += characters.charAt(Math.floor(Math.random()*characters.length))
    }
    return pwd
  }

  const checkStrength = (password)=>{
    return passwordStrength(password).value
  }

  const resetPassword = ()=>{
    setPassword('')
    setIsPasswordGenerated(false)
    setIncludeLowercase(false)
    setIncludeUppercase(false)
    setIncludeNumbers(false)
    setIncludeSymbols(false)
  }
  const writeToClipboard=() => {
    Clipboard.setString(password);
    ToastAndroid.show('Text copied to clipboard!', ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Password Generator </Text>
      <View style={styles.passwordContainer}>
        {selectCount != 0 ? (
          <>
            {isPasswordGenerated ? (
              <>
                <Text style={styles.password}>{password}</Text>
                <TouchableOpacity
                  onPress={() => {
                    writeToClipboard();
                  }}>
                  <Image
                    source={require('./icons/copy.png')}
                    style={styles.lock}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Text style={styles.warning}>{warning}</Text>
          </>
        )}
      </View>
      <View style={styles.bottom}>
        <View>
          <View style={styles.sliderContainer}>
            <Text style={styles.characterLen}>Character Length</Text>
            <Text style={styles.passLen}>{passwordLength}</Text>
          </View>

          <Slider
            value={passwordLength}
            minimumValue={4}
            maximumValue={32}
            step={1}
            trackClickable={true}
            onValueChange={setPasswordLength}
            thumbTintColor="#34e678"
            minimumTrackTintColor="#34e678"
          />
        </View>
        <View>
          <BouncyCheckbox
            disableBuiltInState
            isChecked={includeUppercase}
            iconStyle={{
              borderRadius: 8,
            }}
            innerIconStyle={{
              borderRadius: 8,
            }}
            text="Include UpperCase Letters"
            textStyle={{
              color: '#fff',
              textDecorationLine: 'none',
              fontSize: 18,
            }}
            onPress={() => {
              setIncludeUppercase(!includeUppercase);
              if (includeUppercase) {
                setSelectCount(selectCount - 1);
                if (selectCount == 0) {
                  setIsPasswordGenerated(false);
                  setPassword('');
                }
              } else {
                setSelectCount(selectCount + 1);
              }
            }}
            style={styles.checkbox}
          />
          <BouncyCheckbox
            disableBuiltInState
            isChecked={includeLowercase}
            iconStyle={{
              borderRadius: 8,
            }}
            innerIconStyle={{
              borderRadius: 8,
            }}
            text="Include LowerCase Letters"
            textStyle={{
              color: '#fff',
              textDecorationLine: 'none',
              fontSize: 18,
            }}
            onPress={() => {
              setIncludeLowercase(!includeLowercase);
              if (includeLowercase) {
                setSelectCount(selectCount - 1);
                if (selectCount == 0) {
                  setIsPasswordGenerated(false);
                  setPassword('');
                }
              } else {
                setSelectCount(selectCount + 1);
              }
            }}
            style={styles.checkbox}
          />
          <BouncyCheckbox
            disableBuiltInState
            isChecked={includeNumbers}
            iconStyle={{
              borderRadius: 8,
            }}
            innerIconStyle={{
              borderRadius: 8,
            }}
            text="Include Numbers"
            textStyle={{
              color: '#fff',
              textDecorationLine: 'none',
              fontSize: 18,
            }}
            onPress={() => {
              setIncludeNumbers(!includeNumbers);
              if (includeNumbers) {
                setSelectCount(selectCount - 1);
                if (selectCount == 0) {
                  setIsPasswordGenerated(false);
                  setPassword('');
                }
              } else {
                setSelectCount(selectCount + 1);
              }
            }}
            style={styles.checkbox}
          />
          <BouncyCheckbox
            disableBuiltInState
            isChecked={includeSymbols}
            iconStyle={{
              borderRadius: 8,
            }}
            innerIconStyle={{
              borderRadius: 8,
            }}
            text="Include Symbols"
            textStyle={{
              color: '#fff',
              textDecorationLine: 'none',
              fontSize: 18,
            }}
            onPress={() => {
              setIncludeSymbols(!includeSymbols);
              if (includeSymbols) {
                setSelectCount(selectCount - 1);
                if (selectCount == 0) {
                  setIsPasswordGenerated(false);
                  setPassword('');
                }
              } else {
                setSelectCount(selectCount + 1);
              }
            }}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.strengthBox}>
          <Text style={styles.strength}>Strength</Text>
          {strength == 'Weak' ? (
            <Text style={styles.Weak}>{strength}</Text>
          ) : (
            <></>
          )}
          {strength == 'Medium' ? (
            <Text style={styles.Medium}>{strength}</Text>
          ) : (
            <></>
          )}
          {strength == 'Strong' ? (
            <Text style={styles.Strong}>{strength}</Text>
          ) : (
            <></>
          )}

          {/* <Text style={styles.strengthValue}>{strength}</Text> */}
        </View>
        <TouchableOpacity
          style={styles.generateBox}
          onPress={() => {
            generatePassword(passwordLength);
          }}>
          <Text style={styles.generateText}>Generate</Text>
          <Image source={require('./icons/lock.png')} style={styles.lock} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  generateBox: {
    backgroundColor: '#34e678',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
    backgroundColor: '#626262',
    borderRadius: 10,
    padding: 20,
  },
  password: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  lock: {
    width: 30,
    height: 30,
  },
  bottom: {
    width: '90%',
    height: '73%',
    backgroundColor: '#626262',
    borderRadius: 30,
    padding: 20,
  },
  characterLen: {
    color: '#fff',
    fontSize: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  passLen: {
    color: '#34e678',
    fontSize: 20,
  },
  generateText: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
  checkbox: {
    marginVertical: 8,
  },
  strengthBox: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  strength: {
    color: '#7f7f7f',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  strengthValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 30,
  },
  warning:{
    color:'red',
    fontSize:20,
    fontWeight:'bold',
  },
  Weak:{
    color:'red',
    fontSize:20,
    fontWeight:'bold',
    
  },
  Medium:{
    color:'yellow',
    fontSize:20,
    fontWeight:'bold',
    
  },
  Strong:{
    color:'green',
    fontSize:20,
    fontWeight:'bold',
    
  }
});
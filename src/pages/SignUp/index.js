import React from 'react';
import { KeyboardAvoidingView, FlatList, TouchableWithoutFeedback, Modal, Platform, View, Text, ScrollView, TouchableOpacity,Image, TextInput, TouchableOpacityBase, TouchableWithoutFeedbackBase } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, FONTS, icons, images } from '../../constants';
import { useState } from 'react';
import { useEffect } from 'react';



// import { Container } from './styles';

const SignUp = () => {
    const [showPass, setShowpass] = useState(false);
    const [areaSelecteds, setAreaSelected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [area, setArea] = useState([]);

    useEffect(()=> {
        function loadCountries(){
           fetch('https://restcountries.eu/rest/v2/all')
           .then(response => response.json())
           .then(data => {
               let areaData = data.map(item => {
                   return {
                       code: item.alpha2Code,
                       name: item.name,
                       callingCode: `+${item.callingCodes[0]}`,
                       flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
                   }
               })
               setArea(areaData);

                if(areaData.length > 0){
                    let defaultData = areaData.filter(a => a.code == 'US')

                    if(defaultData.length > 0){
                        setAreaSelected(defaultData[0])
                    }
                }
           })
        }
        loadCountries();
    }, [])


    const renderHeader = () => {
      return (
        <TouchableOpacity
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.padding * 6,
            paddingHorizontal: SIZES.padding * 2
        }}
        >  
         <Image 
                source={icons.back}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />

            <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4}}>Criar conta</Text>
        </TouchableOpacity>
           
      )
    }

    const renderLogo = () => {
        return (
           <View style={{
               marginTop: SIZES.padding * 5,
               height: 100,
               alignItems: 'center',
               justifyContent: 'center'
           }}>
               <Image 
                source={images.wallieLogo}
                resizeMode='contain'
                style={{
                    width: '60%'
                }}
               />
           </View> 
        )
    }

    const renderForm = () => {
        return (
            <View style={{
                marginTop: SIZES.padding * 3,
                marginHorizontal: SIZES.padding * 3,
            }}>
                <View style={{marginTop: SIZES.padding * 3}}>
                    <Text style={{
                        color: COLORS.lightGreen,
                        ...FONTS.body3
                    }}>Nome Copleto</Text>
                    <TextInput
                        placeholder='Preencha seu nome'
                        placeholderTextColor='#fff'
                        selectionColor='#fff'
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: '#fff',
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                    />
                </View>
                <View style={{marginTop: SIZES.padding * 2}}>
                    <Text style={{color: COLORS.lightGreen}}>Telefone</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: '#fff',
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                ...FONTS.body2
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                           <View style={{justifyContent: 'center'}}>
                           <Image 
                                source={icons.down}
                                style={{
                                    width: 10,
                                    height: 10,
                                    tintColor: COLORS.white
                                }}
                            />
                           </View>
                           <View style={{justifyContent: 'center', marginLeft: 5}}>
                                <Image 
                                    source={{uri: areaSelecteds?.flag}}
                                    resizeMode='contain'
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                           </View>
                           <View style={{justifyContent: 'center', marginLeft: 5}}>
                                    <Text style={{color: '#fff', ...FONTS.body3}}>{areaSelecteds?.callingCode}</Text>
                           </View>
                        </TouchableOpacity>
                        <TextInput 
                            style={{
                                flex:1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: '#fff',
                                borderBottomWidth: 1,
                                height: 40,
                                color : '#fff',
                                ...FONTS.body3
                            }}
                            placeholder='Número de telefone'
                            placeholderTextColor='#fff'
                        
                        />
                    </View>
                </View>
                    <View style={{marginTop: SIZES.padding * 2  }}>
                        <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>Senha</Text>
                    <TextInput 
                            style={{
                                flex:1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: '#fff',
                                borderBottomWidth: 1,
                                height: 40,
                                color : '#fff',
                                ...FONTS.body3
                            }}
                            placeholder='Coloque a senha'
                            placeholderTextColor='#fff'
                            secureTextEntry={!showPass}
                        
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 30,
                              width: 30,
                            }}
                            onPress={() => setShowpass(!showPass)}
                        >
                           <View style={{justifyContent: 'center'}}>
                           <Image 
                                source={showPass ? icons.disable_eye : icons.eye}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.white
                                }}
                            />
                           </View>
                       
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

    const renderCodeArea = () => {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{padding: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between'}}
                    onPress={() => {
                        setAreaSelected(item)
                        setModalVisible(false)
                    }}
                >

                    <Image 
                        source={{uri: item.flag}}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    
                    />
                    <View style={{width: 150, alignItems: 'center'}}>
                        <Text style={{...FONTS.body4}}>{item.name}</Text>
                    </View>
                    <Text style={{color: 'rgba(0,0,0,0.3)'}}>{item.callingCode}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            height: 600,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.lightGreen,
                            borderRadius: 8,
                        }}>


                            <FlatList 
                            data={area}
                            keyExtractor={item => item.key}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            style={{
                                padding: SIZES.padding * 2,
                                marginBottom: SIZES.padding * 2,

                            }}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
  return (
      <KeyboardAvoidingView
            Platform={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}
      >
        <LinearGradient
            colors={[COLORS.lime, COLORS.emerald]}
            style={{flex: 1}}
        >
            <ScrollView>
                {renderHeader()}
                {renderLogo()}
                {renderForm()}
            </ScrollView>

        </LinearGradient>
                {renderCodeArea()}
      </KeyboardAvoidingView>
  )
}

export default SignUp;
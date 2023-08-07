import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import 'expo-dev-client';

import { useAuth } from '../providers/AuthProvider';
import { AuthStackParamList } from '../types';

WebBrowser.maybeCompleteAuthSession();

export const Login = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'Login'>) => {
  const { setUser } = useAuth();
  const [accessToken, setAccessToken] = useState<string>('');
  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      clientId:
        '100268653416-okofa3hn17gfh9rh53icff1muu0vbprb.apps.googleusercontent.com',
      androidClientId:
        '100268653416-31m7dl4hcmrg8hhrgd1hcovedhdi2qkk.apps.googleusercontent.com',
      iosClientId:
        '100268653416-r7dvitlv6bh23439lfsmlnb6am8deb0d.apps.googleusercontent.com',
    });

  const [facebookRequest, facebookResponse, facebookPromptAsync] =
    Facebook.useAuthRequest({
      clientId: '1142378370499366',
    });

  const fetchFacebookUserInfo = async (token) => {
    const userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`
    );

    const userInfo = await userInfoResponse.json();

    setUser(userInfo);
  };

  useEffect(() => {
    if (googleResponse?.type === 'success' && googleResponse.authentication) {
      setAccessToken(googleResponse.authentication.accessToken);

      const fetchGoogleUserInfo = async () => {
        const response = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: {
              Authorization: `Bearer ${googleResponse.authentication.accessToken}`,
            },
          }
        );

        const userinfo = await response.json();
        setUser(userinfo);
      };

      fetchGoogleUserInfo();
    }
  }, [googleResponse]);

  useEffect(() => {
    if (
      facebookResponse?.type === 'success' &&
      facebookResponse.authentication
    ) {
      const fetchFacebookUserInfo = async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${facebookResponse.authentication.accessToken}&fields=id,name,email`
        );

        const userInfo = await userInfoResponse.json();

        setUser(userInfo);
      };

      fetchFacebookUserInfo();
    }
  }, [facebookResponse]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>
        <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 15 }}>
          Welcome
        </Text>
        <TouchableOpacity
          disabled={!googleRequest}
          onPress={() => {
            googlePromptAsync();
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 250,
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Image
              source={require('/assets/google-icon.png')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 15 }}>Sign in Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!facebookRequest}
          onPress={() => facebookPromptAsync()}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 250,
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Image
              source={require('/assets/facebook-icon.png')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 15 }}>Sign in Facebook</Text>
          </View>
        </TouchableOpacity>
      </>
    </View>
  );
};

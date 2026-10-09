import * as WebbBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'


WebbBrowser.maybeCompleteAuthSession();

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL

export type SocialProvider = 'google' | 'facebook';

export interface SocialAuthResponse {

    token: string;
    user: {
        id: string;
        name: string;
        surname: string;
        username: string;
        email: string;
        profile_photo: string | null;
    };

}

export const socialAuth = async (provider: SocialProvider): Promise<SocialAuthResponse> => {
    if (!API_URL) {
        throw new Error('API adresi tanımlı değil.');
    }

    const redirectURI = AuthSession.makeRedirectUri({
        scheme: 'musicroom',
        path: "/auth/" + provider,
    });

    const result = await WebbBrowser.openAuthSessionAsync(
        API_URL + "/auth/" + provider + "?redirect_uri=" + encodeURIComponent(redirectURI),
        redirectURI
    );

    if (result.type !== 'success') {
        throw new Error(
            (provider === 'google' ? 'Google' : 'Facebook') + ' ile giriş başarısız.'
        );
    }

    const url = new URL(result.url);
    const token = url.searchParams.get('token');
    const userData = url.searchParams.get('user');

    if (!token || !userData) {
        throw new Error(`${provider === 'google' ? 'Google' : 'Facebook'} bilgileri alınamadı.`);
    }

    try {
        return { token, user: JSON.parse(userData) };

    } catch {
        throw new Error(`${provider === 'google' ? 'Google' : 'Facebook'} kullanıcı bilgileri okunamadı.`);
    }

};

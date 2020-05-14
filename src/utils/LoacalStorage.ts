import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {
  public set = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  public get = async (key: string): Promise<string | null> => {
    return await AsyncStorage.getItem(key);
  };

  public reset = async (): Promise<void> => {
    await AsyncStorage.clear();
  };

  public clearUserData = async (): Promise<void> => {
    await AsyncStorage.removeItem(LocalStorageKeys.TOKEN);
  };
}

export const LocalStorageKeys = {
  TOKEN: '@token',
  IS_ONBOARDED: '@isOnboarded',
};

const localStorage = new LocalStorage();
export {localStorage as LocalStorage};

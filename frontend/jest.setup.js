require('@testing-library/jest-native');

jest.mock('react-native-reanimated', function () {
  var Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = function () {};
  return Reanimated;
});

jest.mock('expo-secure-store', function () {
  return {
    getItemAsync: jest.fn(),
    setItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
    WHEN_UNLOCKED: 'WHEN_UNLOCKED',
  };
});

jest.mock('react-native-mmkv', function () {
  function MMKVMock() {
    this._store = {};
  }
  MMKVMock.prototype.getString = function (key) {
    return this._store[key] !== undefined ? this._store[key] : undefined;
  };
  MMKVMock.prototype.set = function (key, value) {
    this._store[key] = value;
  };
  MMKVMock.prototype.remove = function (key) {
    delete this._store[key];
  };
  MMKVMock.prototype.delete = function (key) {
    delete this._store[key];
  };
  MMKVMock.prototype.contains = function (key) {
    return key in this._store;
  };
  MMKVMock.prototype.clearAll = function () {
    this._store = {};
  };
  return {
    MMKV: MMKVMock,
    createMMKV: function (config) {
      return new MMKVMock();
    },
  };
});

jest.mock('@react-native-community/netinfo', function () {
  return {
    addEventListener: jest.fn(function () {
      return jest.fn();
    }),
    fetch: jest.fn(function () {
      return Promise.resolve({
        isConnected: true,
        isInternetReachable: true,
        type: 'wifi',
      });
    }),
  };
});

jest.mock('expo-haptics', function () {
  return {
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    ImpactFeedbackStyle: {},
    NotificationFeedbackType: {},
  };
});

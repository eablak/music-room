import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export type ConnectionType = 'wifi' | 'cellular' | 'ethernet' | 'bluetooth' | 'unknown' | 'none';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: ConnectionType;
  isChecking: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
    isChecking: true,
  });

  useEffect(() => {
    let mounted = true;

    const mapState = (state: NetInfoState): NetworkStatus => {
      const type = ((): ConnectionType => {
        switch (state.type) {
          case 'wifi':
            return 'wifi';
          case 'cellular':
            return 'cellular';
          case 'ethernet':
            return 'ethernet';
          case 'bluetooth':
            return 'bluetooth';
          case 'none':
            return 'none';
          case 'unknown':
          default:
            return 'unknown';
        }
      })();

      return {
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
        type,
        isChecking: false,
      };
    };

    NetInfo.fetch().then((state) => {
      if (mounted) setStatus(mapState(state));
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted) setStatus(mapState(state));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return status;
}

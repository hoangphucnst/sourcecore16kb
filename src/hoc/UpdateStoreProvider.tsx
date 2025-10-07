import {Linking, Modal, Platform, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AppTheme} from '~/styles/Theme';
import {useAppStyles} from '~/hooks';
import AppText from '~/components/AppText';
import StyledFilterContainer from '~/screens/components/StyledFilterContainer';
import AppButton from '~/components/AppButton';
import {FONTSFAMILY} from '~/styles/FontsFamily';
import {scale, scaleFont} from '~/utils/scaleScreen';
import AppImage from '~/components/AppImage';
import {Icons} from '~/assets';
import VersionCheck from 'react-native-version-check';

const UpdateStoreProvider = ({children}: {children}) => {
  const {THEME} = useAppStyles();
  const styles = useCallback(styleWithTheme, [THEME])(THEME);
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);
  const [linkStore, setLinkStore] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    checkVersionStore();
    checkNeedUpdate();
  }, []);

  const checkVersionStore = async () => {
    if (__DEV__) {
      return;
    }
    if (Platform.OS === 'ios') {
      VersionCheck.getLatestVersion({
        provider: 'appStore', // for iOS
      }).then(lastVer => {
        setLatestVersion(lastVer);
      });
    } else {
      VersionCheck.getLatestVersion({
        provider: 'playStore', // for Android
      }).then(lastVer => {
        setLatestVersion(lastVer);
      });
    }
  };

  const checkNeedUpdate = async () => {
    if (__DEV__) {
      return;
    }
    VersionCheck.needUpdate().then(async res => {
      if (res?.isNeeded) {
        setIsNeedUpdate(res?.isNeeded);
        setLinkStore(res?.storeUrl);
      }
    });
  };

  const oUpdateNoew = () => {
    Linking.openURL(linkStore);
  };

  return (
    <React.Fragment>
      {children}
      <Modal transparent animationType="slide" visible={isNeedUpdate}>
        <StyledFilterContainer
          enableTouchCloseOverlay={false}
          showBottom={false}
          showHeader={false}>
          <View style={{gap: scale(10)}}>
            <AppText style={styles.title}>Cập nhật ứng dụng</AppText>
            <AppImage
              source={Icons.icLoudSpeaker}
              style={styles.icon}
              resizeMode="contain"
            />
            <AppText style={styles.message}>
              {`Phiên bản ${latestVersion} mới đã sẵn sàng.\nVui lòng cập nhật để tiếp tục sử dụng.`}
            </AppText>
            <AppButton
              onPress={oUpdateNoew}
              title="Cập nhật ngay"
              styleTitle={{color: THEME.colors.white}}
            />
          </View>
        </StyledFilterContainer>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateStoreProvider;

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    container: {
      backgroundColor: THEME.colors.white,
    },
    title: {
      fontFamily: FONTSFAMILY.NunitoBold,
      fontSize: scaleFont(18),
      marginBottom: scale(5),
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      marginBottom: scale(20),
    },
    icon: {
      width: scale(64),
      height: scale(64),
      alignSelf: 'center',
    },
  });

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import AuthStack from '../navigation/stacks/AuthStack';
import WalkThrough from '../screens/WalkThrough';
import MainFlow from './BottomTabs';
import AddContact from '../screens/App/ContactTab/AddContact';
import DialPad from '../screens/App/ContactTab/DialPad';
import VoiceCallHistory from '../screens/App/ContactTab/VoiceCallHistory';
import VideoCallHistory from '../screens/App/ContactTab/VideoCallHistory';
import Chat from '../screens/AppScreen/Chat';
import Inbox from '../screens/AppScreen/Inbox/Inbox';
import Store from '../screens/App/HomeTab/Store';
import {Provider as PaperProvider} from 'react-native-paper';
import {themeSelector} from '../shared/exporter';
import {useSelector} from 'react-redux';
import EditProfile from '../screens/App/SettingsTab/EditProfile';
import UpdateEmail from '../screens/App/SettingsTab/UpdateEmail';
import AffiliateLinks from '../screens/App/HomeTab/AfilliateLink';
import PaymentMethods from '../screens/App/SettingsTab/Payments/PaymentMethods';
import PaymentCardList from '../screens/App/SettingsTab/Payments/PaymentCardList';
import AddCard from '../screens/App/SettingsTab/Payments/AddCard';
import TransactionDetail from '../screens/App/SettingsTab/Payments/TransactionDetail';
import EditCard from '../screens/App/SettingsTab/Payments/EditCard';
import Wallet from '../screens/App/SettingsTab/Payments/Wallet';
import TransactionHistory from '../screens/App/SettingsTab/Payments/TransactionHistory';
import ContactDetail from '../screens/App/ContactTab/ContactDetail';
import CreateGroup from '../screens/App/ContactTab/CreateGroup';
import GroupDetail from '../screens/App/ContactTab/GroupDetail';
import AddPeoples from '../screens/App/ContactTab/AddPeoples';
import AddNewContact from '../screens/App/ContactTab/AddNewContact';
import Checkout from '../screens/App/SettingsTab/Payments/Checkout';
import PaymentSuccess from '../screens/App/SettingsTab/Payments/PaymentSuccess';
import GenerateNumber from '../screens/App/ContactTab/GenerateNumber';
import AddBankAccount from '../screens/App/SettingsTab/Payments/AddBankAccount';
import WalletCards from '../screens/App/SettingsTab/Payments/WalletCards';
import AddWalletAmount from '../screens/App/SettingsTab/Payments/AddWalletAmount';
import WalletAccount from '../screens/App/SettingsTab/Payments/WalletAccount';
import Terms from '../screens/AppScreen/Terms';
import Faqs from '../screens/AppScreen/Faqs';
import Privacy from '../screens/AppScreen/Privacy';
import Support from '../screens/AppScreen/Support';
import CreateTicket from '../screens/AppScreen/CreateTicket';
import SupportDetail from '../screens/AppScreen/SupportDetail';
import ChangeCountry from '../screens/App/SettingsTab/ChangeCountry';
import VideoCall from '../screens/AppScreen/VideoCall';
import VoiceCall from '../screens/AppScreen/VoiceCall';
import TranslateLang from '../screens/AppScreen/TranslateLang';
import PaymentBankList from '../screens/App/SettingsTab/Payments/PaymentBankList';
import EditBankAccount from '../screens/App/SettingsTab/Payments/EditBankAccount';
import IncomingCall from '../screens/AppScreen/IncomingCall';
import GroupVideoCall from '../screens/AppScreen/GroupVideoCall';
import GroupVoiceCall from '../screens/AppScreen/GroupVoiceCall';

const AppStack = createStackNavigator();

const MainAppNav = () => {
  const {app_theme} = useSelector(state => state.persistReducer);

  return (
    <PaperProvider theme={themeSelector(app_theme)}>
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <AppStack.Screen name={'Splash'} component={Splash} />
          <AppStack.Screen name={'Auth'} component={AuthStack} />
          <AppStack.Screen name={'Walkthrough'} component={WalkThrough} />
          <AppStack.Screen name={'App'} component={MainFlow} />
          <AppStack.Screen name="AddContact" component={AddContact} />
          <AppStack.Screen name="ContactDetail" component={ContactDetail} />
          <AppStack.Screen name="EditProfile" component={EditProfile} />
          <AppStack.Screen name="UpdateEmail" component={UpdateEmail} />
          <AppStack.Screen name="DialPad" component={DialPad} />
          <AppStack.Screen name="AffiliateLink" component={AffiliateLinks} />
          <AppStack.Screen name="PaymentMethods" component={PaymentMethods} />
          <AppStack.Screen name="PaymentCardList" component={PaymentCardList} />
          <AppStack.Screen name="AddCard" component={AddCard} />
          <AppStack.Screen name="EditCard" component={EditCard} />
          <AppStack.Screen name="Wallet" component={Wallet} />
          <AppStack.Screen name="CreateGroup" component={CreateGroup} />
          <AppStack.Screen name="GroupDetail" component={GroupDetail} />
          <AppStack.Screen name="GenerateNumber" component={GenerateNumber} />
          <AppStack.Screen name="AddPeoples" component={AddPeoples} />
          <AppStack.Screen name="AddNewContact" component={AddNewContact} />
          <AppStack.Screen name="Checkout" component={Checkout} />
          <AppStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          <AppStack.Screen name="AddBankAccount" component={AddBankAccount} />
          <AppStack.Screen name="EditBankAccount" component={EditBankAccount} />

          <AppStack.Screen name="AddWalletAmount" component={AddWalletAmount} />
          <AppStack.Screen name="WalletCards" component={WalletCards} />
          <AppStack.Screen name="WalletAccounts" component={WalletAccount} />
          <AppStack.Screen name="PaymentBankList" component={PaymentBankList} />

          <AppStack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <AppStack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
          />

          <AppStack.Screen
            name="VoiceCallHistory"
            component={VoiceCallHistory}
          />
          <AppStack.Screen
            name="VideoCallHistory"
            component={VideoCallHistory}
          />
          <AppStack.Screen name="Chat" component={Chat} />
          <AppStack.Screen name="VideoCall" component={VideoCall} />
          <AppStack.Screen name="VoiceCall" component={VoiceCall} />
          <AppStack.Screen name="TranslateLang" component={TranslateLang} />
          <AppStack.Screen name="Inbox" component={Inbox} />
          <AppStack.Screen name="Store" component={Store} />
          <AppStack.Screen name="TermsCondition" component={Terms} />
          <AppStack.Screen name="Privacy" component={Privacy} />
          <AppStack.Screen name="Faqs" component={Faqs} />
          <AppStack.Screen name="Support" component={Support} />
          <AppStack.Screen name="CreateTicket" component={CreateTicket} />
          <AppStack.Screen name="SupportDetail" component={SupportDetail} />
          <AppStack.Screen name="ChangeCountry" component={ChangeCountry} />
          <AppStack.Screen name="IncomingCall" component={IncomingCall} />
          <AppStack.Screen name="GroupVideoCall" component={GroupVideoCall} />
          <AppStack.Screen name="GroupVoiceCall" component={GroupVoiceCall} />
        </AppStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MainAppNav;

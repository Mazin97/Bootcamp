import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const SubmitBtn = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  margin-left: 10px;
  padding: 0 12px;
`;

export const ProfileBtn = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background-color: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const ProfileBtnText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

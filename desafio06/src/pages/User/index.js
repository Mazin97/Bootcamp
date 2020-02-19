import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    loading: false,
    login: '',
    page: 2,
    refreshing: false,
  };

  async componentDidMount() {
    const {
      route: {
        params: { user },
      },
    } = this.props;

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false, login: user.login });
  }

  async loadMore() {
    const { page, login, stars } = this.state;

    const response = await api.get(`/users/${login}/starred?page=${page}`);

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      page: page + 1,
    });
  }

  async refreshList() {
    const { login } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${login}/starred`);

    this.setState({ stars: response.data, loading: false, page: 2 });
  }

  async openRepository(name, url) {
    const { navigation } = this.props;

    navigation.navigate('Repository', { name, url });
  }

  render() {
    const {
      route: {
        params: { user },
      },
    } = this.props;

    const { stars, loading, refreshing } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={() => this.loadMore()} // Função que carrega mais itens
            onRefresh={() => this.refreshList()} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            renderItem={({ item }) => (
              <Starred
                onPress={() => this.openRepository(item.name, item.html_url)}
              >
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.object,
    }),
  }).isRequired,
};

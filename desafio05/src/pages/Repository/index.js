import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Container from '../../Components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  IssueFilterLi,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'all',
    pageSize: 5,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { state, pageSize } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: state,
          per_page: pageSize,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async handleFilter(filter) {
    try {
      const { pageSize } = this.state;

      const issues = await api.get(
        `/repos/${this.state.repository.full_name}/issues?state=${filter}`,
        {
          params: {
            per_page: pageSize,
          },
        }
      );

      this.setState({
        issues: issues.data,
        state: filter,
        page: 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handlePagination(arg) {
    try {
      const { pageSize, state } = this.state;
      let { page } = this.state;

      if (arg === 'prev' && page > 1) {
        page = page - 1;
      } else if (arg === 'next') {
        page = page + 1;
      }

      const issues = await api.get(
        `/repos/${this.state.repository.full_name}/issues?state=${state}`,
        {
          params: {
            per_page: pageSize,
            page: page,
          },
        }
      );

      this.setState({
        page: page,
        issues: issues.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { repository, issues, loading, state, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter>
          Issues
          <div>
            <FaChevronLeft
              style={{
                cursor: page > 1 ? 'pointer' : 'auto',
                color: page > 1 ? '#000' : '#c4c4c4',
              }}
              onClick={() => this.handlePagination('prev')}
            />

            <ul>
              <IssueFilterLi
                itemKey={'all'}
                state={state}
                onClick={() => this.handleFilter('all')}
              >
                Todos
              </IssueFilterLi>
              <IssueFilterLi
                itemKey={'open'}
                state={state}
                onClick={() => this.handleFilter('open')}
              >
                Abertos
              </IssueFilterLi>
              <IssueFilterLi
                itemKey={'closed'}
                state={state}
                onClick={() => this.handleFilter('closed')}
              >
                Fechados
              </IssueFilterLi>
            </ul>

            <FaChevronRight
              style={{ cursor: 'pointer' }}
              onClick={() => this.handlePagination('next')}
            />
          </div>
        </IssueFilter>

        <IssueList>
          {issues.length ? (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          ) : (
            <h3
              style={{
                textAlign: 'center',
              }}
            >
              Esse projeto não possui nenhum issue.
            </h3>
          )}
        </IssueList>
      </Container>
    );
  }
}

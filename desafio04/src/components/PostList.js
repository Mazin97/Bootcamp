import React, { Component } from 'react';

import Post from './Post';

export default class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Mateus Bertolazo',
          avatar: 'https://avatars1.githubusercontent.com/u/25750974?s=100'
        },
        date: '06 Jan 2020',
        content: 'Fala galera, beleza? Esse bootcamp tá uma maravilha!',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars1.githubusercontent.com/u/2254731?s=100'
            },
            content: 'É verdade.'
          },
          {
            id: 2,
            author: {
              name: 'Usuário do Facebook',
              avatar: 'https://avatars1.githubusercontent.com/u/40604081?s=100&'
            },
            content: 'Concordo plenamente!'
          }
        ]
      },
      {
        id: 2,
        author: {
          name: 'Júlio Alcantara',
          avatar: 'https://avatars1.githubusercontent.com/u/42323?s=100'
        },
        date: '08 Jan 2020',
        content: 'Fala galera, beleza? Esse bootcamp tá uma maravilha!',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars1.githubusercontent.com/u/2254731?s=100'
            },
            content: 'Conteúdo do comentário'
          }
        ]
      },
      {
        id: 3,
        author: {
          name: 'Filipe Deschamps',
          avatar: 'https://avatars1.githubusercontent.com/u/4248081?s=100&'
        },
        date: '10 Jan 2020',
        content: 'Fala galera, beleza? Esse bootcamp tá uma delicinha!',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars1.githubusercontent.com/u/2254731?s=100'
            },
            content: 'Conteúdo do comentário'
          }
        ]
      }
    ]
  };

  render() {
    return (
      <section>
        {this.state.posts.map(post => (
          <Post key={post.id} data={post} />
        ))}
      </section>
    );
  }
}
